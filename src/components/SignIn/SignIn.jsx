import Form from "../Form";

// Sign Up - регистрация, Sign In - вход
const SignIn = ({ isLogged = false, setIsLogged }) => {
  if (isLogged) return <div>You are logged</div>;

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

  return <Form labels={labels} setIsLogged={setIsLogged} />;
};

export default SignIn;
