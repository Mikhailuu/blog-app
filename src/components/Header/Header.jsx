import { Link } from "react-router-dom";
import classes from "./Header.module.scss";
import UserDetails from "../UserDetails";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";

const Header = ({ user, isLogged }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className={classes.header}>
      <Link to="/" className={classes["main-link"]}>
        <span>RealWorld Blog</span>
      </Link>
      {!isLogged && (
        <div className={classes.sign}>
          <Link to="/sign-in">
            <span>Sign In</span>
          </Link>
          <Link to="/sign-up">
            <button>Sign Up</button>
          </Link>
        </div>
      )}
      {isLogged && <UserDetails user={user} setIsLogged={handleLogout} />}
    </div>
  );
};

export default Header;
