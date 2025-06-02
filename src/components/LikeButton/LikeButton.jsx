import classes from "./LikeButton.module.scss";

import { useState } from "react";
import { likeArticle, unLikeArticle } from "../../api/fetchApi";

const LikeButton = ({ initialLikes = 0, initialLiked = false, slug }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(initialLiked);

  const handleLike = async () => {
    try {
      if (isLiked) {
        await unLikeArticle(slug);
        setLikes(likes - 1);
      } else {
        await likeArticle(slug);
        setLikes(likes + 1);
      }

      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Like error:", error);
    }
  };

  return (
    <label
      className={`${classes["like-button"]} ${isLiked ? classes.active : ""}`}
    >
      <input
        type="checkbox"
        onClick={handleLike}
        className={classes["like-input"]}
      />
      <span className={classes["like-span"]}>{likes}</span>
    </label>
  );
};

export default LikeButton;
