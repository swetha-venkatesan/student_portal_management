import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import NotificationBell from "../components/NotificationBell";

const DashboardLayout = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loggedUser = localStorage.getItem("user");
    if (!loggedUser) {
      navigate("/");
    } else {
      setUser(JSON.parse(loggedUser));
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
        <h1 style={styles.title}>Student Portal Management System</h1>
        <div style={styles.userInfo}>
          <span style={styles.welcomeText}>
            Welcome, <strong>{user.username}</strong> ({user.role})
          </span>
          
          {/* Notification Bell */}
          <NotificationBell userId={user.id} />
          
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </header>

      {/* Navigation */}
      <nav style={styles.nav}>
        <Link 
          to="/dashboard-layout/overview" 
          style={{...styles.navLink, ...(isActive('overview') ? styles.activeLink : {})}}
        >
          📊 Dashboard
        </Link>
        
        <Link 
          to="/dashboard-layout/students" 
          style={{...styles.navLink, ...(isActive('students') ? styles.activeLink : {})}}
        >
          👨‍🎓 Students
        </Link>
        
        <Link 
          to="/dashboard-layout/courses" 
          style={{...styles.navLink, ...(isActive('courses') ? styles.activeLink : {})}}
        >
          📚 Courses
        </Link>
        
        {user.role === "ADMIN" && (
          <>
            <Link 
              to="/dashboard-layout/enrollments" 
              style={{...styles.navLink, ...(isActive('enrollments') ? styles.activeLink : {})}}
            >
              📝 Enrollments
            </Link>
            
            <Link 
              to="/dashboard-layout/attendance" 
              style={{...styles.navLink, ...(isActive('attendance') ? styles.activeLink : {})}}
            >
              ✅ Attendance
            </Link>
            
            <Link 
              to="/dashboard-layout/grades" 
              style={{...styles.navLink, ...(isActive('grades') ? styles.activeLink : {})}}
            >
              📈 Grades
            </Link>
            
            <Link 
              to="/dashboard-layout/fees" 
              style={{...styles.navLink, ...(isActive('fees') ? styles.activeLink : {})}}
            >
              💰 Fees
            </Link>
            
            <Link 
              to="/dashboard-layout/timetable" 
              style={{...styles.navLink, ...(isActive('timetable') ? styles.activeLink : {})}}
            >
              📅 Timetable
            </Link>
            
            <Link 
              to="/dashboard-layout/reports" 
              style={{...styles.navLink, ...(isActive('reports') ? styles.activeLink : {})}}
            >
              📄 Reports
            </Link>
          </>
        )}
      </nav>

      {/* Main Content */}
      <main style={styles.main}>
        <Outlet context={{ userRole: user.role, userId: user.id }} />
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>© 2024 Student Portal Management System | Version 2.0.0 | All Rights Reserved</p>
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
    fontWeight: "600",
    transition: "background 0.3s"
  },
  nav: {
    background: "white",
    padding: "0 40px",
    display: "flex",
    gap: "5px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
    overflowX: "auto",
    whiteSpace: "nowrap"
  },
  navLink: {
    padding: "15px 20px",
    color: "#333",
    textDecoration: "none",
    borderBottom: "3px solid transparent",
    transition: "all 0.3s",
    fontSize: "15px",
    display: "inline-block"
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
    padding: "15px",
    marginTop: "auto"
  }
};

export default DashboardLayout;


// import React, { useEffect, useState } from "react";
// import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";

// const DashboardLayout = () => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const loggedUser = localStorage.getItem("user");
//     if (!loggedUser) {
//       navigate("/");
//     } else {
//       setUser(JSON.parse(loggedUser));
//     }
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     navigate("/");
//   };

//   const isActive = (path) => location.pathname.includes(path);

//   if (!user) return null;

//   return (
//     <div style={styles.container}>
//       {/* Header */}
//       <header style={styles.header}>
//         <h1 style={styles.title}>Student Portal Management System</h1>
//         <div style={styles.userInfo}>
//           <span style={styles.welcomeText}>
//             Welcome, <strong>{user.username}</strong> ({user.role})
//           </span>
//           <button onClick={handleLogout} style={styles.logoutBtn}>
//             Logout
//           </button>
//         </div>
//       </header>

//       {/* Navigation */}
//       <nav style={styles.nav}>
//         <Link 
//           to="/dashboard-layout/overview" 
//           style={{...styles.navLink, ...(isActive('overview') ? styles.activeLink : {})}}
//         >
//           📊 Dashboard
//         </Link>
//         <Link 
//           to="/dashboard-layout/students" 
//           style={{...styles.navLink, ...(isActive('students') ? styles.activeLink : {})}}
//         >
//           👨‍🎓 Students
//         </Link>
//         <Link 
//           to="/dashboard-layout/courses" 
//           style={{...styles.navLink, ...(isActive('courses') ? styles.activeLink : {})}}
//         >
//           📚 Courses
//         </Link>
//         {user.role === "ADMIN" && (
//           <>
//             <Link 
//               to="/dashboard-layout/enrollments" 
//               style={{...styles.navLink, ...(isActive('enrollments') ? styles.activeLink : {})}}
//             >
//               📝 Enrollments
//             </Link>
//             <Link 
//               to="/dashboard-layout/attendance" 
//               style={{...styles.navLink, ...(isActive('attendance') ? styles.activeLink : {})}}
//             >
//               📅 Attendance
//             </Link>
//             <Link 
//               to="/dashboard-layout/grades" 
//               style={{...styles.navLink, ...(isActive('grades') ? styles.activeLink : {})}}
//             >
//               📊 Grades
//             </Link>
//           </>
//         )}
//       </nav>

//       {/* Main Content */}
//       <main style={styles.main}>
//         <Outlet context={{ userRole: user.role }} />
//       </main>

//       {/* Footer */}
//       <footer style={styles.footer}>
//         <p>© 2024 Student Portal Management System | Version 1.0.0</p>
//       </footer>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     minHeight: "100vh",
//     display: "flex",
//     flexDirection: "column",
//     background: "#f5f5f5"
//   },
//   header: {
//     background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//     color: "white",
//     padding: "20px 40px",
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
//   },
//   title: {
//     margin: 0,
//     fontSize: "24px"
//   },
//   userInfo: {
//     display: "flex",
//     alignItems: "center",
//     gap: "20px"
//   },
//   welcomeText: {
//     fontSize: "16px"
//   },
//   logoutBtn: {
//     padding: "8px 20px",
//     background: "#dc3545",
//     color: "white",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//     fontSize: "14px",
//     transition: "background 0.3s"
//   },
//   nav: {
//     background: "white",
//     padding: "0 40px",
//     display: "flex",
//     gap: "5px",
//     boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
//     flexWrap: "wrap"  // Added to handle multiple items
//   },
//   navLink: {
//     padding: "15px 20px",
//     color: "#333",
//     textDecoration: "none",
//     borderBottom: "3px solid transparent",
//     transition: "all 0.3s",
//     fontSize: "16px",
//     whiteSpace: "nowrap"
//   },
//   activeLink: {
//     color: "#667eea",
//     borderBottom: "3px solid #667eea",
//     fontWeight: "600"
//   },
//   main: {
//     flex: 1,
//     padding: "30px 40px",
//     maxWidth: "1400px",
//     width: "100%",
//     margin: "0 auto"
//   },
//   footer: {
//     background: "#333",
//     color: "white",
//     textAlign: "center",
//     padding: "15px",
//     marginTop: "auto"
//   }
// };

// export default DashboardLayout;
