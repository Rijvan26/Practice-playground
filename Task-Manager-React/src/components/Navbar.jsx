import { useState } from "react";
import { Link } from "react-router-dom";
import "./style/navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header">
      <nav className="nav">
        <h4 className="logo">
          <i class="ri-task-line"></i> TaskKaro!</h4>
        
        {/* Toggle the 'active' class based on state */}
        <div className={`navlinks ${isOpen ? "active" : ""}`}>
          <Link className="navlink" to="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link className="navlink" to="/users" onClick={() => setIsOpen(false)}>Users</Link>
          <Link className="navlink" to="/about" onClick={() => setIsOpen(false)}>About us</Link>
        </div>

        {/* Dynamic Icon Change: Changes from Menu to Close when open */}
        <i 
          className={`menuicon ${isOpen ? "ri-close-line" : "ri-menu-3-line"}`} 
          onClick={() => setIsOpen(!isOpen)}
        ></i>
      </nav>
    </header>
  );
};

export default Navbar;