import classes from "./UserDetails.module.scss";

import { Link, Navigate } from "react-router-dom";

const UserDetails = ({ user, setIsLogged }) => {
  return (
    <div className={classes.container}>
      <Link to="/new-article">Create artcle</Link>
      <Link to="/profile" className={classes["profile-link"]}>
        <span className={classes.username}>{user.username}</span>
        <img className={classes.avatar} src={user.image} alt="User's avatar" />
      </Link>
      <button onClick={() => setIsLogged(false)}>Log Out</button>
    </div>
  );
};

export default UserDetails;
