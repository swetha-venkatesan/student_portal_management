import React from "react";
import GradeManagement from "../components/GradeManagement";

const GradesPage = () => {
  return (
    <div>
      <h1 style={styles.pageTitle}>Grade Management</h1>
      <GradeManagement />
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

export default GradesPage;