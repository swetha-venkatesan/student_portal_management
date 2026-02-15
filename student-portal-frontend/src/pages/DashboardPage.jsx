// import React from "react";
// import DashboardStats from "../components/DashboardStats";

// const DashboardPage = () => {
//   return (
//     <div>
//       <h1>Dashboard Overview</h1>
//       <DashboardStats />
      
//       <div style={styles.infoGrid}>
//         <div style={styles.infoCard}>
//           <h3>Quick Actions</h3>
//           <ul>
//             <li>Manage Students</li>
//             <li>Manage Courses</li>
//             <li>Enroll Students</li>
//             <li>View Reports</li>
//           </ul>
//         </div>
        
//         <div style={styles.infoCard}>
//           <h3>Recent Activity</h3>
//           <p>No recent activity</p>
//         </div>
        
//         <div style={styles.infoCard}>
//           <h3>System Info</h3>
//           <p>Version: 1.0.0</p>
//           <p>Status: Active</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   infoGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
//     gap: "20px",
//     marginTop: "30px"
//   },
//   infoCard: {
//     background: "white",
//     padding: "20px",
//     borderRadius: "8px",
//     boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
//   }
// };

// export default DashboardPage;

import React from "react";
import DashboardStats from "../components/DashboardStats";

const DashboardPage = () => {
  return (
    <div>
      <h1>Dashboard Overview</h1>
      <DashboardStats />
      
      <div style={styles.infoGrid}>
        <div style={styles.infoCard}>
          <h3>Quick Actions</h3>
          <ul>
            <li>Manage Students</li>
            <li>Manage Courses</li>
            <li>Enroll Students</li>
            <li>View Reports</li>
          </ul>
        </div>
        
        <div style={styles.infoCard}>
          <h3>Recent Activity</h3>
          <p>No recent activity</p>
        </div>
        
        <div style={styles.infoCard}>
          <h3>System Info</h3>
          <p>Version: 1.0.0</p>
          <p>Status: Active</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
    marginTop: "30px"
  },
  infoCard: {
    background: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
  }
};

export default DashboardPage;