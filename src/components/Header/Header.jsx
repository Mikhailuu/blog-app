import { Link } from "react-router-dom";
import classes from "./Header.module.scss";
import UserDetails from "../UserDetails";

const Header = ({ isLogged = false, setIsLogged }) => {
  return (
    <div className={classes.header}>
      <Link to="/artiles">
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
      {isLogged && <UserDetails setIsLogged={setIsLogged} />}
    </div>
  );
};

export default Header;
