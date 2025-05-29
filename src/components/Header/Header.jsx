import { Link } from "react-router-dom";
import classes from "./Header.module.scss";

const Header = () => {
  return (
    <div className={classes.header}>
      <Link to="/">
        <span>RealWorld Blog</span>
      </Link>
      <div className={classes.sign}>
        <span>Sign In</span>
        <button>Sign Up</button>
      </div>
    </div>
  );
};

export default Header;
