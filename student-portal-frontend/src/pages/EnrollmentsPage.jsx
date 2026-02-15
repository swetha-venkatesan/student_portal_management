import React from "react";
import EnrollmentManagement from "../components/EnrollmentManagement";

const EnrollmentsPage = () => {
  return (
    <div>
      <h1 style={styles.pageTitle}>Enrollment Management</h1>
      <EnrollmentManagement />
    </div>
  );
};

const styles = {
  pageTitle: {
    fontSize: "28px",
    marginBottom: "20px",
    color: "#333"
  }
};

export default EnrollmentsPage;





// import React from "react";
// import EnrollmentManagement from "../components/EnrollmentManagement";

// const EnrollmentsPage = () => {
//   return (
//     <div>
//       <h1 style={styles.pageTitle}>Enrollment Management</h1>
//       <EnrollmentManagement />
//     </div>
//   );
// };

// const styles = {
//   pageTitle: {
//     fontSize: "28px",
//     marginBottom: "20px",
//     color: "#333"
//   }
// };

// export default EnrollmentsPage;

// import React from "react";
// import EnrollmentManagement from "../components/EnrollmentManagement";

// const EnrollmentsPage = () => {
//   return (
//     <div>
//       <EnrollmentManagement />
//     </div>
//   );
// };

// export default EnrollmentsPage;