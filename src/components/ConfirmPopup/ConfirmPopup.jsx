import classes from "./ConfirmPopup.module.scss";

const ConfirmPopup = ({ messages, onConfirm, onCancel }) => {
  return (
    <div className={classes["popup-overlay"]}>
      <div className={classes.popup}>
        <p>{messages}</p>
        <div className={classes.buttons}>
          <button onClick={onConfirm} className={classes["confirm-button"]}>
            Да
          </button>
          <button onClick={onCancel} className={classes["cancel-button"]}>
            Нет
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPopup;
