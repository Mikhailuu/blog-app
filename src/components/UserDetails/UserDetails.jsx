import { Link } from "react-router-dom";
import classes from "./UserDetails.module.scss";

const UserDetails = ({ setIsLogged }) => {
  return (
    <div className={classes.container}>
      <button>Create artcle</button>
      <Link to="/profile">
        <span>Username</span>
        <img alt="User's avatar" />
      </Link>
      <button onClick={() => setIsLogged(false)}>Log Out</button>
    </div>
  );
};

export default UserDetails;
