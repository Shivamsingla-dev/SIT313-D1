
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import FeaturedArticles from "./components/FeaturedArticles";
import FeaturedTutorials from "./components/FeaturedTutorials";
import Footer from "./components/Footer";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import "./App.css";
import NewPost from "./pages/NewPost.jsx";
import Pricing from "./pages/Pricing.jsx";
import Upgrade from "./pages/Upgrade.jsx";

function Home() {
  return (
    <main>
      <section className="welcome">
        <div className="welcome-content">
          <h2>Welcome to DEV@Deakin</h2>
          <p>
            Explore articles, tutorials and useful resources
            to help you learn and improve your development skills.
          </p>

          <div className="welcome-buttons">
            <a href="#articles">Explore Articles</a>
            <a href="#tutorials">Explore Tutorials</a>
          </div>
        </div>
      </section>

      <section id="articles">
        <FeaturedArticles />
      </section>

      <section id="tutorials">
        <FeaturedTutorials />
      </section>

      <section id="about">
        <h2>About DEV@Deakin</h2>
        <p>
          DEV@Deakin is a place to discover articles, tutorials,
          and resources for developers.
        </p>
      </section>
    </main>
  );
}

function App() {
  return (
    <div className="app">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/post" element={<NewPost />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/upgrade" element={<Upgrade />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
