import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Articles from "./components/Articles";
import Header from "./components/Header";
import ArticleDetails from "./components/ArticleDetails";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";

import { useRef, useState } from "react";
import Profile from "./components/Profile";

function App() {
  const [isLogged, setIsLogged] = useState(true);
  const userTest = useRef({
    username: "John Doe",
    email: "john@example.com",
  });

  return (
    <Router>
      <header className="header">
        <Header isLogged={isLogged} setIsLogged={setIsLogged} />
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
          <Route
            path="/profile"
            element={<Profile user={userTest.current} />}
          />
          <Route path="/artiles" element={<Articles />} />
          <Route path="/articles/:slug" element={<ArticleDetails />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
