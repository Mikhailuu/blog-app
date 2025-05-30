import Form from "../Form";

const Profile = ({ user }) => {
  const { username, email } = user;
  const labels = {
    title: "Efit Profile",
    inputLabels: [
      "Username",
      "Email address",
      "New Password",
      "Avatar image (url)",
    ],
    inputTypes: ["text", "email", "password", "url"],
    placeholders: [username, email],
    button: {
      label: "Save",
      onClick: () => console.log("saved"),
    },
  };

  return <Form labels={labels} />;
};
export default Profile;
