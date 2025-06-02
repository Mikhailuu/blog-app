import classes from "./ArticleDetails.module.scss";
import "./MarkdownStyles.scss";

import { useEffect, useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { deleteArticle, fetchArticle } from "../../api/fetchApi";
import Markdown from "markdown-to-jsx";
import LikeButton from "../LikeButton";

const ArticleDetails = () => {
  const { user } = useSelector((state) => state.auth);
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [redirectTo, setRedirectTo] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

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

  const handleDeleteClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    setPopupPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
    });
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    setShowConfirm(false);
    const response = await deleteArticle(slug);
    if (response) setRedirectTo(true);
  };

  const isAuthor = user && article && user.username === article.author.username;

  if (redirectTo) return <Navigate to="/" replace />;
  if (isLoading) return <div>Loading...</div>;
  if (!article) return <div>Article not found</div>;

  const { description, body, createdAt, tagList, author } = article;
  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <div className={classes.wrapper}>
          <div className={`${classes["title-with-likes"]}`}>
            <h5 className={classes.title}>
              {description ? description.trim() : null}
            </h5>
            <LikeButton
              initialLikes={article.favoritesCount}
              initialLiked={article.favorited}
              slug={slug}
            />
          </div>
          <div className={classes.tags}>
            {tagList.length !== 0 &&
              tagList.map(
                (tag, idx) =>
                  tag !== "" && (
                    <span key={idx} className={classes.tag}>
                      {tag}
                    </span>
                  )
              )}
          </div>
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
          {isAuthor && (
            <>
              <button
                className={`${classes.button} ${classes.delete}`}
                onClick={handleDeleteClick}
              >
                Delete
              </button>
              {showConfirm && (
                <div
                  className={classes.confirmPopup}
                  style={{
                    top: `${popupPosition.top}px`,
                    left: `${popupPosition.left}px`,
                  }}
                >
                  <p>Are you sure to delete this article?</p>
                  <div className={classes.popupButtons}>
                    <button onClick={handleConfirmDelete}>Да</button>
                    <button onClick={() => setShowConfirm(false)}>Нет</button>
                  </div>
                </div>
              )}
              <Link to={`/articles/${slug}/edit`}>
                <button className={`${classes.button} ${classes.edit}`}>
                  Edit
                </button>
              </Link>
            </>
          )}
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
