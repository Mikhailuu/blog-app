import { useNavigate } from "react-router-dom";
import classes from "./ConfirmPopup.module.scss";

const ConfirmPopup = ({ messages, isLogin = false, onConfirm, onCancel }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/sign-in");
  };
  return (
    <div className={classes["popup-overlay"]}>
      <div className={classes.popup}>
        <p>{messages}</p>
        <div className={classes.buttons}>
          {onConfirm && onCancel && (
            <>
              <button onClick={onConfirm} className={classes["confirm-button"]}>
                Да
              </button>
              <button onClick={onCancel} className={classes["cancel-button"]}>
                Нет
              </button>
            </>
          )}
          {isLogin && (
            <button onClick={handleClick} className={classes["cancel-button"]}>
              go to Sign up
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmPopup;
