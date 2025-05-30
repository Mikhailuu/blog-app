import classes from "./Form.module.scss";

import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const Form = ({ labels }) => {
  const {
    title,
    inputLabels,
    inputTypes = [],
    placeholders = [],
    checkboxLabel,
    button,
    linkLabel,
  } = labels;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const getValidationRules = (label, idx) => {
    const fieldType = inputTypes[idx];
    const baseRules = {
      required: `${label} обязательно для заполнения`,
      noSpaces: (value) => !value.includes(" ") || "Пробелы недопустимы",
    };

    if (label === "Username") {
      return {
        ...baseRules,
        pattern: {
          value: /^[a-z0-9_-]{3,20}$/,
        },
        minLength: {
          value: 3,
          message: "Username должен быть от 3 до 20 символов (включительно)",
        },
        maxLength: {
          value: 20,
          message: "Username должен быть от 3 до 20 символов (включительно)",
        },
      };
    }

    if (fieldType === "email") {
      return {
        ...baseRules,
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Введите корректный email адрес",
        },
      };
    }

    if (fieldType === "password") {
      return {
        ...baseRules,
        minLength: {
          value: 6,
          message: "Пароль должен быть от 6 до 40 символов",
        },
        maxLength: {
          value: 40,
          message: "Пароль должен быть от 6 до 40 символов",
        },
      };
    }

    if (label === "Repeat Password") {
      return {
        ...baseRules,
        validate: (value) => value === password || "Пароли не совпадают",
      };
    }

    if (fieldType === "url") {
      return {
        ...baseRules,
        required: "URL обязателен",
        validate: {
          validUrl: (value) => {
            try {
              new URL(value);
              return true;
            } catch {
              return "Ввеите корректный URL";
            }
          },
          httpsOnly: (value) =>
            value.startsWith("https://") ||
            "Сайт должен использовать HTTPS протокол",
          noTrailingSlash: (value) =>
            !value.endsWith("/") || "Уберите слэш в конце URL",
        },
      };
    }

    return baseRules;
  };

  const password = watch("Password");

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={classes.title}>{title}</h2>
      {inputLabels.map((label, idx) => (
        <div key={label}>
          <label className={classes.label}>
            {label}
            <input
              type={inputTypes[idx] || "text"}
              placeholder={placeholders[idx] ? placeholders[idx] : label}
              className={`${classes.input} ${
                errors[label] ? classes.error : ""
              }`}
              {...register(label, {
                ...getValidationRules(label, idx),
                ...(label === "Repeat Password" && {
                  validate: (value) =>
                    value === watch("Password") || "Пароли не совпадают",
                }),
              })}
            />
          </label>
          {errors[label] && (
            <span className={classes.errorMessage}>
              {errors[label]?.message?.toString()}
            </span>
          )}
        </div>
      ))}
      {checkboxLabel && (
        <div>
          <label
            className={`${classes.label} ${classes["label-with-checkbox"]}`}
          >
            <input
              className={classes.checkbox}
              type="checkbox"
              {...register("checkbox", {
                required: "Необходимо согласие",
              })}
            />
            {checkboxLabel}
          </label>
          {errors.checkbox && (
            <span className={classes.errorMessage}>
              {errors.checkbox.message?.toString()}
            </span>
          )}
        </div>
      )}
      {button && (
        <button className={classes.button} type="submit">
          {button.label}
        </button>
      )}
      {linkLabel && (
        <small className={classes.small}>
          {linkLabel.label}
          <Link to={linkLabel.link.trim()}>{linkLabel.link}</Link>
        </small>
      )}
    </form>
  );
};

export default Form;
