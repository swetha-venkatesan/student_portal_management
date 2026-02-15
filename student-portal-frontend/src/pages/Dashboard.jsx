// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import AddStudent from "../components/AddStudent";
// import StudentList from "../components/StudentList";

// const Dashboard = () => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

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

//   if (!user) return null;

//   return (
//     <div style={styles.container}>
//       <div style={styles.header}>
//         <h1>Student Portal Dashboard</h1>
//         <div style={styles.userInfo}>
//           <span>Welcome, {user.username} ({user.role})</span>
//           <button onClick={handleLogout} style={styles.logoutBtn}>
//             Logout
//           </button>
//         </div>
//       </div>

//       {/* Only show Add Student form if user is ADMIN */}
//       {user.role === "ADMIN" && (
//         <>
//           <AddStudent />
//           <hr />
//         </>
//       )}

//       {/* Pass user role to StudentList */}
//       <StudentList userRole={user.role} />
//     </div>
//   );
// };

// const styles = {
//   container: {
//     padding: "20px",
//     maxWidth: "1200px",
//     margin: "0 auto"
//   },
//   header: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: "20px"
//   },
//   userInfo: {
//     display: "flex",
//     gap: "10px",
//     alignItems: "center"
//   },
//   logoutBtn: {
//     padding: "8px 16px",
//     background: "#dc3545",
//     color: "white",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer"
//   }
// };

// export default Dashboard;