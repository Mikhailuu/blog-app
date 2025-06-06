import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import { useEffect, useState } from "react";
import { getCurrentUser } from "./api/fetchApi";

import Articles from "./components/Articles";
import Header from "./components/Header";
import ArticleDetails from "./components/ArticleDetails";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Profile from "./components/Profile";
import NewArticle from "./components/NewArticle";
import EditArticles from "./components/EditArticles";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const loadUserData = async () => {
      const userData = await getCurrentUser(localStorage.getItem("token"));

      if (userData) setUser(userData.user);
    };

    if (localStorage.getItem("token")) {
      setIsLogged(true);
      loadUserData();
    }
  }, [isLogged]);

  return (
    <Router>
      <header className="header">
        <Header user={user} isLogged={isLogged} setIsLogged={setIsLogged} />
      </header>
      <main className="main">
        <Routes>
          <Route path="/*" Component={() => <div>Not found</div>} />
          <Route
            path="/sign-in"
            element={<SignIn isLogged={isLogged} setIsLogged={setIsLogged} />}
          />
          <Route
            path="/sign-up"
            element={<SignUp isLogged={isLogged} setIsLogged={setIsLogged} />}
          />
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
