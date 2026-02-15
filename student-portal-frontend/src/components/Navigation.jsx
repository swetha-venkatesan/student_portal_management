import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navigation = ({ userRole }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={styles.nav}>
      <Link 
        to="/dashboard" 
        style={{...styles.link, ...(isActive('/dashboard') ? styles.activeLink : {})}}
      >
        Dashboard
      </Link>
      <Link 
        to="/students" 
        style={{...styles.link, ...(isActive('/students') ? styles.activeLink : {})}}
      >
        Students
      </Link>
      <Link 
        to="/courses" 
        style={{...styles.link, ...(isActive('/courses') ? styles.activeLink : {})}}
      >
        Courses
      </Link>
      {userRole === "ADMIN" && (
        <Link 
          to="/enrollments" 
          style={{...styles.link, ...(isActive('/enrollments') ? styles.activeLink : {})}}
        >
          Enrollments
        </Link>
      )}
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    gap: "20px",
    background: "#667eea",
    padding: "15px 30px",
    marginBottom: "20px",
    borderRadius: "8px"
  },
  link: {
    color: "white",
    textDecoration: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    transition: "background 0.3s"
  },
  activeLink: {
    background: "rgba(255,255,255,0.2)",
    fontWeight: "bold"
  }
};

export default Navigation;