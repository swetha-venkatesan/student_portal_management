import React from "react";
import FeeManagement from "../components/FeeManagement";

const FeesPage = () => {
  return (
    <div>
      <h1 style={styles.pageTitle}>Fee Management</h1>
      <FeeManagement />
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

export default FeesPage;