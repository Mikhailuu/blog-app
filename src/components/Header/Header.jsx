import { Link, Navigate } from "react-router-dom";
import classes from "./Header.module.scss";
import UserDetails from "../UserDetails";
import { useSelector } from "react-redux";

const Header = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className={classes.header}>
      <Link to="/" className={classes["main-link"]}>
        <span>RealWorld Blog</span>
      </Link>
      {!isAuthenticated && (
        <div className={classes.sign}>
          <Link to="/sign-in">
            <span>Sign In</span>
          </Link>
          <Link to="/sign-up">
            <button>Sign Up</button>
          </Link>
        </div>
      )}
      {isAuthenticated && <UserDetails />}
    </div>
  );
};

export default Header;
