import classes from "./ArticleDetails.module.scss";
import "./MarkdownStyles.scss";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticle } from "../../api/fetchApi";
import Markdown from "markdown-to-jsx";

const ArticleDetails = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  console.log(slug);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const data = await fetchArticle(slug);
        setArticle(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadArticle();
  }, [slug]);

  if (isLoading) return <div>Loading...</div>;
  if (!article) return <div>Article not found</div>;

  const { description, body, createdAt, tagList, author } = article;
  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <div className={classes.wrapper}>
          <h5 className={classes.title}>
            {description ? description.trim() : null}
          </h5>
          {tagList.length !== 0 &&
            tagList.map(
              (tag, idx) =>
                tag !== "" && (
                  <span key={idx} className={classes.tag}>
                    {tag}
                  </span>
                )
            )}
          <p className={classes.text}>{description}</p>
        </div>
        <div className={classes["author-details"]}>
          <div className={classes.details}>
            <span>{author.username}</span>
            <span className={classes["create-at"]}>
              {new Date(createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          <img className={classes.avatar} src={author.image}></img>
        </div>
      </header>
      <article className={classes.article}>
        <Markdown
          options={{
            overrides: {
              img: { props: { className: "markdown-image" } },
            },
          }}
        >
          {body}
        </Markdown>
      </article>
    </div>
  );
};

export default ArticleDetails;
