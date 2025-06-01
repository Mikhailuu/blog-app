import { useNavigate } from "react-router-dom";
import classes from "./Card.module.scss";

const Card = ({ data }) => {
  const { description, title, createdAt, tagList, author } = data;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/articles/${data.slug}`);
  };

  return (
    <div className={classes.container} onClick={handleClick}>
      <div className={classes.wrapper}>
        <h5 className={classes.title}>{title ? title.trim() : null}</h5>

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
      </div>
    </div>
  );
};

export default Card;
