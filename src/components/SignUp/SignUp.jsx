import { useSelector } from "react-redux";
import Form from "../Form";

// Sign Up - регистрация, Sign In - вход
const SignUp = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (isAuthenticated) return <div>You are logged</div>;

  const labels = {
    title: "Create new account",
    inputLabels: ["Username", "Email address", "Password", "Repeat Password"],
    inputTypes: ["text", "email", "password", "password"],
    button: { label: "Create" },
    checkboxLabel: "I agree to the processing of my personal information",
    linkLabel: {
      label: "Already have an account?",
      link: "/sign-in",
    },
  };

  return <Form labels={labels} />;
};

export default SignUp;
