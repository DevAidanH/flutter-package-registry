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
        <Link to="/">Home</Link>
        <Link to="/packages">Packages</Link>
        {!isAuth ? 
          <Link to="/login">Login</Link> : 
          <>
            <Link to="/profile">Profile</Link>
            <button onClick={signUserOut}>Log Out</button>
          </>
        }
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
      </Routes>
    </Router>
  );
}

export default App
