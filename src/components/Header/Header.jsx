import { Link } from "react-router-dom";
import classes from "./Header.module.scss";
import UserDetails from "../UserDetails";

const Header = ({ user, isLogged, setIsLogged }) => {
  return (
    <div className={classes.header}>
      <Link to="/">
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
      {isLogged && (
        <UserDetails
          user={user}
          setIsLogged={() => {
            localStorage.removeItem("token");
            setIsLogged(false);
          }}
        />
      )}
    </div>
  );
};

export default Header;
