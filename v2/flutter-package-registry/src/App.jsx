import './App.css'
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Home from "./pages/home";
import Packages from './pages/packages';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/packages" element={<Packages />} />
      </Routes>
    </Router>
  );
}

export default App
