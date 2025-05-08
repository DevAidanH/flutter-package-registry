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
          <div class="logo">Logo</div>
          <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/packages">Packages</Link></li>
              {!isAuth ? 
                <li><Link to="/login">Login</Link></li> : 
                <>
                  <li><Link to="/profile">Profile</Link></li>
                  <li onClick={signUserOut}><Link to="">Log Out</Link></li>
                </>
              }
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
          <p className="credits">Credit to Reddit users <span>u/AHostOfIssues</span> and <span>u/Financial_Willow4221</span> for the idea</p>
      </footer>
    </Router>
  );
}

export default App
