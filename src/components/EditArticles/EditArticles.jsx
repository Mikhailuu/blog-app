import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchArticle } from "../../api/fetchApi";

import Form from "../Form";

const EditArticles = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const data = await fetchArticle(slug);
        setArticle(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [slug]);

  const labels = {
    title: "Edit article",
    inputLabels: ["Title", "Short description", "Text"],
    isTags: true,
    button: { label: "Send" },
    articleSlug: slug,
    initialValues: {
      Title: article?.title || "",
      "Short description": article?.description || "",
      Text: article?.body || "",
      tagList: article?.tagList || [],
    },
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <Navigate to="/articles" />;
  if (!article) return <div>Article not found</div>;

  return <Form labels={labels} />;
};

export default EditArticles;
