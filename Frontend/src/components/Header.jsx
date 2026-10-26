
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext.jsx";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  function goToSection(sectionId) {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>DEV@Deakin</h1>
        </Link>

        <nav>
          <a href="/#articles" onClick={(e) => {
            e.preventDefault();
            goToSection("articles");
          }}>Articles</a>

          <a href="/#tutorials" onClick={(e) => {
            e.preventDefault();
            goToSection("tutorials");
          }}>Tutorials</a>

          <a href="/#about" onClick={(e) => {
            e.preventDefault();
            goToSection("about");
          }}>About</a>

          <Link to="/pricing">Pricing</Link>
        </nav>

        <div className="header-buttons">
          <Link to="/post" className="header-btn post-nav-btn">
            Post
          </Link>

          {user ? (
            <button className="header-btn" onClick={handleLogout}>
              Log Out
            </button>
          ) : (
            <>
              <Link to="/login" className="header-btn">Log In</Link>
              <Link to="/register" className="header-btn signup-btn">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
