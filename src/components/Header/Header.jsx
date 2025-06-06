import { Link, Navigate, useNavigate } from "react-router-dom";
import classes from "./Header.module.scss";
import UserDetails from "../UserDetails";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthentiated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/sign-in");
  };

  return (
    <div className={classes.header}>
      <Link to="/" className={classes["main-link"]}>
        <span>RealWorld Blog</span>
      </Link>
      {!isAuthentiated && (
        <div className={classes.sign}>
          <Link to="/sign-in">
            <span>Sign In</span>
          </Link>
          <Link to="/sign-up">
            <button>Sign Up</button>
          </Link>
        </div>
      )}
      {isAuthentiated && <UserDetails user={user} setIsLogged={handleLogout} />}
    </div>
  );
};

export default Header;
