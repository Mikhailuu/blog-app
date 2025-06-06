import classes from "./UserDetails.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../store/authSlice";

const UserDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/sign-in");
  };

  return (
    <div className={classes.container}>
      <Link to="/new-article">
        <button type="button" className={classes["create-button"]}>
          Create article
        </button>
      </Link>
      <Link to="/profile" className={classes["profile-link"]}>
        <span className={classes.username}>{user.username}</span>
        <img
          className={classes.avatar}
          src={
            user.image ||
            "https://static.productionready.io/images/smiley-cyrus.jpg"
          }
          alt="User's avatar"
        />
      </Link>
      <button onClick={handleLogout} className={classes["logout-button"]}>
        Log Out
      </button>
    </div>
  );
};

export default UserDetails;
