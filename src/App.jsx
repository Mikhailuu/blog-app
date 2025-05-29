import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Articles from "./components/Articles";
import Header from "./components/Header";
import ArticleDetails from "./components/ArticleDetails";

function App() {
  return (
    <Router>
      <header className="header">
        <Header />
      </header>
      <main className="main">
        <Routes>
          <Route path="/" element={<Articles />} />
          <Route path="/articles/:slug" element={<ArticleDetails />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
