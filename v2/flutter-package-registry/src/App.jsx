import './App.css'
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import React, { useState } from "react";
import { signOut } from "firebase/auth"
import { auth, provider } from "./firebase-config";
import Home from "./pages/home";
import Packages from "./pages/packages";
import Login from "./pages/login";
import Profile from "./pages/profile"

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const [menuOpen, setMenuOpen] = useState(false);

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    })
  }

  return (
    <Router>
      <nav>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            <i className={`fas ${menuOpen ? "fa-times" : "fa-bars"}`}></i>
          </button>
          <ul className={menuOpen ? "nav-links open" : "nav-links"}>
            <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link to="/packages" onClick={() => setMenuOpen(false)}>Packages</Link></li>
            {!isAuth ? (
              <li><Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link></li>
            ) : (
              <>
                <li><Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link></li>
                <li onClick={signUserOut} className="logout-btn">Log Out</li>
              </>
            )}
          </ul>
        </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
      </Routes>
      <footer>
          <h3>Created by <span>Dev Aidan H</span></h3>
          
          <a className="git-link" target="_blank" href="https://github.com/DevAidanH">
            <i className="fab fa-github"></i>
          </a>

          <p className="footer-disclaimer">Access to this project is completely free and open-source but if you want to support my work please click below</p>

          <a href="https://www.buymeacoffee.com/devaidanh" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/arial-yellow.png" alt="Buy Me A Coffee" style={{height: "42px", width: "152px", margin: "15px"}} /></a>
          
          <script type="text/javascript" src="https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js" data-name="bmc-button" data-slug="devaidanh" data-color="#FFDD00" data-emoji=""  data-font="Arial" data-text="Buy me a coffee" data-outline-color="#000000" data-font-color="#000000" data-coffee-color="#ffffff" ></script>
          
          <p className="credits">Credit to Reddit users <span>u/AHostOfIssues</span> and <span>u/Financial_Willow4221</span> for the idea</p>
      </footer>
    </Router>
  );
}

export default App
