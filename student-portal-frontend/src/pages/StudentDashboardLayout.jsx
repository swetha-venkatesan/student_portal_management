import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import NotificationBell from "../components/NotificationBell";

const StudentDashboardLayout = () => {
  const [user, setUser] = useState(null);
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loggedUser = localStorage.getItem("user");
    if (!loggedUser) {
      navigate("/");
    } else {
      const parsedUser = JSON.parse(loggedUser);
      setUser(parsedUser);
      
      // If user is not a student, redirect to admin dashboard
      if (parsedUser.role !== "STUDENT") {
        navigate("/dashboard-layout/overview");
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const isActive = (path) => location.pathname.includes(path);

  if (!user) return null;

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.title}>Student Portal</h1>
        <div style={styles.userInfo}>
          <span style={styles.welcomeText}>
            Welcome, <strong>{user.username}</strong>
          </span>
          
          <NotificationBell userId={user.id} />
          
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </header>

      {/* Navigation */}
      <nav style={styles.nav}>
        <Link 
          to="/student-portal/dashboard" 
          style={{...styles.navLink, ...(isActive('dashboard') ? styles.activeLink : {})}}
        >
          🏠 Dashboard
        </Link>
        
        <Link 
          to="/student-portal/profile" 
          style={{...styles.navLink, ...(isActive('profile') ? styles.activeLink : {})}}
        >
          👤 My Profile
        </Link>
        
        <Link 
          to="/student-portal/courses" 
          style={{...styles.navLink, ...(isActive('courses') ? styles.activeLink : {})}}
        >
          📚 My Courses
        </Link>
        
        <Link 
          to="/student-portal/timetable" 
          style={{...styles.navLink, ...(isActive('timetable') ? styles.activeLink : {})}}
        >
          📅 My Timetable
        </Link>
        
        <Link 
          to="/student-portal/attendance" 
          style={{...styles.navLink, ...(isActive('attendance') ? styles.activeLink : {})}}
        >
          ✅ My Attendance
        </Link>
        
        <Link 
          to="/student-portal/fees" 
          style={{...styles.navLink, ...(isActive('fees') ? styles.activeLink : {})}}
        >
          💰 My Fees
        </Link>
      </nav>

      {/* Main Content */}
      <main style={styles.main}>
        <Outlet context={{ user, studentId: user.studentId }} />
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>© 2024 Student Portal | Version 2.0.0</p>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "#f5f5f5"
  },
  header: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    padding: "20px 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
  },
  title: {
    margin: 0,
    fontSize: "24px",
    fontWeight: "700"
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: "20px"
  },
  welcomeText: {
    fontSize: "16px"
  },
  logoutBtn: {
    padding: "8px 20px",
    background: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600"
  },
  nav: {
    background: "white",
    padding: "0 40px",
    display: "flex",
    gap: "5px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
    overflowX: "auto"
  },
  navLink: {
    padding: "15px 20px",
    color: "#333",
    textDecoration: "none",
    borderBottom: "3px solid transparent",
    transition: "all 0.3s",
    fontSize: "15px",
    whiteSpace: "nowrap"
  },
  activeLink: {
    color: "#667eea",
    borderBottom: "3px solid #667eea",
    fontWeight: "600"
  },
  main: {
    flex: 1,
    padding: "30px 40px",
    maxWidth: "1400px",
    width: "100%",
    margin: "0 auto"
  },
  footer: {
    background: "#333",
    color: "white",
    textAlign: "center",
    padding: "15px"
  }
};

export default StudentDashboardLayout;