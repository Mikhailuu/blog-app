import classes from "./LikeButton.module.scss";

import { useState } from "react";
import { likeArticle, unLikeArticle } from "../../api/fetchApi";
import { useSelector } from "react-redux";
import ConfirmPopup from "../ConfirmPopup/ConfirmPopup";

const LikeButton = ({ initialLikes = 0, initialLiked = false, slug }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [showPopup, setShowPopup] = useState(false);

  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(initialLiked);

  const handleLike = async (e) => {
    e.stopPropagation();

    if (!isAuthenticated) {
      setShowPopup(true);
      return;
    }

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
    <>
      <label
        className={`${classes["like-button"]} ${isLiked ? classes.active : ""}`}
      >
        <input
          type="checkbox"
          onClick={handleLike}
          className={classes["like-input"]}
          defaultChecked={isLiked}
        />
        <span className={classes["like-span"]}>{likes}</span>
      </label>

      {showPopup && (
        <ConfirmPopup messages={"Log in required"} isLogin={true} />
      )}
    </>
  );
};

export default LikeButton;
