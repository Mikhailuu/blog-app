import App from "../App";

const API_BASE = "https://blog-platform.kata.academy/api";
const TOKEN = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;

export const fetchArticles = async () => {
  const response = await fetch(`${API_BASE}/articles`, {
    headers: {
      "Content-Type": "application/json",
      ...(localStorage.getItem("token") && {
        Authorization: `Token ${localStorage.getItem("token")}`,
      }),
    },
  });
  if (!response.ok) throw new Error("Failed fetch articles: ", response.status);

  const data = await response.json();

  return data.articles;
};

export const fetchLimitArticles = async (page = 0) => {
  const response = await fetch(
    `${API_BASE}/articles?offset=${page !== 1 ? page * 5 : 0}&limit=${5}`,
    {
      headers: {
        "Content-Type": "application/json",
        ...(localStorage.getItem("token") && {
          Authorization: `Token ${localStorage.getItem("token")}`,
        }),
      },
    }
  );

  const data = await response.json();

  return data;
};

export const fetchArticle = async (slug) => {
  const response = await fetch(`${API_BASE}/articles/${slug}`, {
    headers: {
      "Content-Type": "application/json",
      ...(localStorage.getItem("token") && {
        Authorization: `Token ${localStorage.getItem("token")}`,
      }),
    },
  });
  if (!response.ok) throw new Error("Failed fetch article: ", response.status);

  const data = await response.json();

  return data.article;
};

export const fetchByForm = async (endpoint, method = "GET", requestData) => {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(localStorage.getItem("token") && {
        Authorization: `Token ${localStorage.getItem("token")}`,
      }),
    },
    body: JSON.stringify(requestData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.errors?.message ||
        Object.values(errorData.errors).join(", ") ||
        "Something went wrong"
    );
  }

  return await response.json();
};

export const getCurrentUser = async (token) => {
  const response = await fetch(`${API_BASE}/user`, {
    headers: { Authorization: `Token ${token}` },
  });

  if (!response.ok) throw new Error("Get user failed:", response.status);

  return await response.json();
};

export const deleteArticle = async (slug) => {
  const response = await fetch(`${API_BASE}/articles/${slug}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${TOKEN}`,
    },
  });

  if (!response.ok) throw new Error("Delete article failed:", response.status);

  return response.ok;
};

export const likeArticle = async (slug) => {
  const response = await fetch(`${API_BASE}/articles/${slug}/favorite`, {
    method: "POST",
    headers: {
      Authorization: `Token ${TOKEN}`,
    },
  });

  if (!response.ok) throw new Error("Likes article failed:", response.status);

  return response.ok;
};

export const unLikeArticle = async (slug) => {
  const response = await fetch(`${API_BASE}/articles/${slug}/favorite`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${TOKEN}`,
    },
  });

  if (!response.ok) throw new Error("Unlikes article failed:", response.status);

  return response.ok;
};
