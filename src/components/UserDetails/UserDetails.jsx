import classes from "./UserDetails.module.scss";

import { Link, Navigate } from "react-router-dom";

const UserDetails = ({ user, setIsLogged }) => {
  return (
    <div className={classes.container}>
      <Link to="/new-article">
        <button type="button" className={classes["create-button"]}>
          Create artcle
        </button>
      </Link>
      <Link to="/profile" className={classes["profile-link"]}>
        <span className={classes.username}>{user.username}</span>
        <img
          className={classes.avatar}
          src={
            user.image
              ? user.image
              : "https://static.productionready.io/images/smiley-cyrus.jpg"
          }
          alt="User's avatar"
        />
      </Link>
      <button
        onClick={() => setIsLogged(false)}
        className={classes["logout-button"]}
      >
        Log Out
      </button>
    </div>
  );
};

export default UserDetails;
