import classes from "./Articles.module.scss";
import Card from "../Card";
import Pagination from "../Pagination";

import { fetchLimitArticles } from "../../api/fetchApi";
import { useEffect, useState, useRef } from "react";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = useRef(5);

  useEffect(() => {
    const loadArticles = async () => {
      setIsLoading(true);
      try {
        const data = await fetchLimitArticles(currentPage);
        setArticles(data.articles);
        setTotalItems(data.articlesCount);
        if (data && data.articles && typeof data.articlesCount === "number") {
          setArticles(data.articles);
          setTotalItems(data.articlesCount);
        } else {
          console.error("Unexpected API response structure:", data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadArticles();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (isLoading) return <div className={classes.loading}>Loading...</div>;

  return (
    <div className={classes.container}>
      {articles.map((article) => {
        return <Card key={article.slug} data={article} />;
      })}
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage.current}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Articles;
