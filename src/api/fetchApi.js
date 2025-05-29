import App from "../App";

const API_BASE = "https://blog-platform.kata.academy/api";

export const fetchArticles = async () => {
  const response = await fetch(`${API_BASE}/articles`);
  if (!response.ok) throw new Error("Failed fetch articles: ", response.status);

  const data = await response.json();

  return data.articles;
};

export const fetchLimitArticles = async (page = 0) => {
  const response = await fetch(
    `${API_BASE}/articles?offset=${page !== 1 ? page * 5 : 0}&limit=${5}`
  );

  const data = await response.json();

  return data;
};

export const fetchArticle = async (slug) => {
  const response = await fetch(`${API_BASE}/articles/${slug}`);
  if (!response.ok) throw new Error("Failed fetch article: ", response.status);

  const data = await response.json();

  return data.article;
};
