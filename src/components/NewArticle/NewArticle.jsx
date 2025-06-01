import Form from "../Form";

import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const NewArticle = () => {
  const [redirectTo, setRedirectTo] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("token")) setRedirectTo("/sign-in");
  }, []);

  const labels = {
    title: "Create new article",
    inputLabels: ["Title", "Short description", "Text"],
    isTags: true,
    button: { label: "Send" },
  };

  if (redirectTo) return <Navigate to="/sign-in" replace />;

  return <Form labels={labels} />;
};

export default NewArticle;
