import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import { useEffect } from "react";

import Articles from "./components/Articles";
import Header from "./components/Header";
import ArticleDetails from "./components/ArticleDetails";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Profile from "./components/Profile";
import NewArticle from "./components/NewArticle";
import EditArticles from "./components/EditArticles";
import ProtectedRoute from "./components/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "./store/authSlice";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      const token = localStorage.getItem("token");
      try {
        dispatch(
          setCredentials({
            token,
            user: JSON.parse(localStorage.getItem("user")),
          })
        );
      } catch (error) {
        console.error("Failed to parse user data", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
  }, [dispatch]);

  return (
    <Router>
      <header className="header">
        <Header />
      </header>
      <main className="main">
        <Routes>
          <Route path="/*" Component={() => <div>Not found</div>} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/" element={<Articles />} />
          <Route path="/articles/:slug" element={<ArticleDetails />} />
          <Route
            path="/new-article"
            element={
              <ProtectedRoute>
                <NewArticle />
              </ProtectedRoute>
            }
          />
          <Route
            path="/articles/:slug/edit"
            element={
              <ProtectedRoute>
                <EditArticles />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
