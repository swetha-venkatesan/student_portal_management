import React from "react";
import TimetableManagement from "../components/TimetableManagement";

const TimetablePage = () => {
  return (
    <div>
      <h1 style={styles.pageTitle}>Timetable Management</h1>
      <TimetableManagement />
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

export default TimetablePage;