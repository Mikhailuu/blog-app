import classes from "./Form.module.scss";

import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { fetchByForm } from "../../api/fetchApi";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const generateId = () => Math.random().toString(36).substring(2, 9);

const Form = ({ labels, setIsLogged }) => {
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [redirectTo, setRedirectTo] = useState(null);
  const {
    title,
    inputLabels,
    inputTypes = [],
    placeholders = [],
    isTags = false,
    articleSlug,
    checkboxLabel,
    button,
    linkLabel,
    initialValues,
  } = labels;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    formState: { dirtyFields },
    reset,
  } = useForm({
    disabled: false,
    mode: "onChange",
    defaultValues: initialValues || {},
  });

  useEffect(() => {
    if (isTags && initialValues?.tagList) {
      const initialTags = initialValues.tagList.map((tag) => ({
        id: generateId(),
        text: tag,
      }));
      setTags(initialTags);
    }

    if (initialValues) {
      reset(initialValues);
    }
  }, [initialValues, reset, isTags]);

  const shouldShowError = (fieldName) => {
    return dirtyFields[fieldName] && errors[fieldName];
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.some((tag) => tag.text === newTag.trim())) {
      setTags((prevTags) => [
        ...prevTags,
        { id: generateId(), text: newTag.trim() },
      ]);
      setNewTag("");
    }
  };

  const handleDeleteTag = (idToDelete) => {
    setTags((prevTags) => {
      const newTags = prevTags.filter((tag) => tag.id !== idToDelete);
      return newTags;
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      setError(null);
      const formType = labels.title.toLowerCase();

      let endpoint;
      let method = "POST";

      const tagsData = tags.map((item) => item.text);

      const requestDataKey =
        formType === "create new article" || formType === "edit article"
          ? "article"
          : "user";
      const requestData = {
        [requestDataKey]: {
          ...(formType === "create new account" && {
            username: data["Username"],
            email: data["Email address"],
            password: data["Password"],
          }),
          ...(formType === "sign in" && {
            email: data["Email address"],
            password: data["Password"],
          }),
          ...(formType === "edit profile" && {
            username: data["Username"],
            email: data["Email address"],
            password: data["Password"] || undefined,
            image: data["Avatar image (url)"] || undefined,
          }),
          ...(formType === "create new article" && {
            title: data["Title"],
            description: data["Short description"],
            body: data["Text"],
            tagList: tagsData,
          }),
          ...(formType === "edit article" && {
            title: data["Title"],
            description: data["Short description"],
            body: data["Text"],
            tagList: tagsData,
          }),
        },
      };

      switch (formType) {
        case "create new account":
          endpoint = "/users";
          break;
        case "sign in":
          endpoint = "/users/login";
          break;
        case "edit profile":
          endpoint = "/user";
          method = "PUT";
          break;
        case "create new article":
          endpoint = "/articles";
          break;
        case "edit article":
          endpoint = `/articles/${articleSlug}`;
          method = "PUT";
          break;
        default:
          endpoint = "/default-endpoint";
      }

      const responseData = await fetchByForm(endpoint, method, requestData);
      console.log("Success:", responseData);

      if (formType.includes("sign in") && responseData.user?.token) {
        localStorage.setItem("token", responseData.user.token);
        setIsLogged(true);
        setRedirectTo("/profile");
      }

      if (formType === "create new article" && responseData) {
        setRedirectTo("/");
      }

      if (formType === "edit article" && responseData) {
        setRedirectTo(`/articles/${articleSlug}`);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getValidationRules = (label, idx) => {
    const fieldType = inputTypes[idx];
    const baseRules = {
      required:
        label.includes("url") || label === "New Password"
          ? null
          : `${label} обязательно для заполнения`,
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

    if (fieldType === "url" && label === "") {
      return {
        ...baseRules,
        validate: {
          validUrl: (value) => {
            try {
              new URL(value);
              return true;
            } catch {
              return "Введите корректный URL";
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

  if (redirectTo) return <Navigate to={redirectTo} replace />;

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={classes.title}>{title}</h2>
      {inputLabels.map((label, idx) => (
        <div key={label} className={classes["input-box"]}>
          <label className={classes.label}>
            {label}
            {label === "Text" ? (
              <textarea
                placeholder={placeholders[idx] ? placeholders[idx] : label}
                className={`${classes.input} ${classes.textarea} ${
                  errors[label] ? classes.error : ""
                }`}
                {...register(label, {
                  ...getValidationRules(label, idx),
                })}
                rows={4}
              />
            ) : (
              <input
                type={inputTypes[idx] || "text"}
                defaultValue={title === "Edit Profile" ? placeholders[idx] : ""}
                placeholder={placeholders[idx] ? placeholders[idx] : label}
                className={`${classes.input} ${
                  shouldShowError(label) ? classes.error : ""
                }`}
                {...register(label, {
                  ...getValidationRules(label, idx),
                  ...(label === "Repeat Password" && {
                    validate: (value) =>
                      value === watch("Password") || "Пароли не совпадают",
                  }),
                })}
              />
            )}
          </label>
          {shouldShowError(label) && (
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
      {isTags && (
        <div className={`${classes["input-box"]} ${classes.tags}}`}>
          <p className={classes.label}>Tags</p>
          <div className={classes["tags-container"]}>
            {tags.map((tag) => (
              <div
                key={tag.id}
                className={classes.tagItem}
                onClick={(e) => e.stopPropagation()}
              >
                <span className={classes.tagText}>{tag.text}</span>
                <button
                  type="button"
                  className={classes.tagDelete}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleDeleteTag(tag.id);
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
            <div className={classes.tagInputWrapper}>
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={handleKeyDown}
                className={classes.tagInput}
                placeholder="Tag"
              />
              <button
                type="button"
                className={classes.tagAdd}
                onClick={handleAddTag}
                disabled={!newTag.trim()}
              >
                Add tag
              </button>
            </div>
          </div>
        </div>
      )}
      {button && (
        <button
          className={`${classes.button} ${isTags && classes["button-for-tag"]}`}
          type="submit"
        >
          {isLoading ? "Отправка..." : button.label}
        </button>
      )}
      {linkLabel && (
        <small className={classes.small}>
          {linkLabel.label}
          <Link to={linkLabel.link.trim()}>{linkLabel.link}</Link>
        </small>
      )}
      {error && <div className={classes.errorMessage}>{error.message}</div>}
    </form>
  );
};

export default Form;
