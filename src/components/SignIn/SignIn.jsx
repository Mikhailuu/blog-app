import { useSelector } from "react-redux";
import Form from "../Form";
import { Navigate } from "react-router-dom";

// Sign Up - регистрация, Sign In - вход
const SignIn = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (isAuthenticated)
    return (
      <div>
        You are logged
        <Navigate to="/" />
      </div>
    );

  const labels = {
    title: "Sign In",
    inputLabels: ["Email address", "Password"],
    inputTypes: ["email", "password"],
    button: { label: "Login" },
    linkLabel: {
      label: "Don’t have an account?",
      link: "/sign-up",
    },
  };

  return <Form labels={labels} />;
};

export default SignIn;
