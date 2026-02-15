import React from "react";
import ReportsAnalytics from "../components/ReportsAnalytics";

const ReportsPage = () => {
  return (
    <div>
      <h1 style={styles.pageTitle}>Reports & Analytics</h1>
      <ReportsAnalytics />
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

export default ReportsPage;