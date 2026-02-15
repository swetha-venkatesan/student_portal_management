import React from "react";
import AttendanceManagement from "../components/AttendanceManagement";

const AttendancePage = () => {
  return (
    <div>
      <h1 style={styles.pageTitle}>Attendance Management</h1>
      <AttendanceManagement />
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

export default AttendancePage;