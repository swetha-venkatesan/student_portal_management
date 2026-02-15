import React, { useEffect, useState } from "react";
import { getDashboardStats } from "../services/DashboardService";

const DashboardStats = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCourses: 0,
    totalEnrollments: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = () => {
    getDashboardStats()
      .then((response) => setStats(response.data))
      .catch((error) => console.error(error));
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h3 style={styles.number}>{stats.totalStudents}</h3>
        <p style={styles.label}>Total Students</p>
      </div>
      <div style={styles.card}>
        <h3 style={styles.number}>{stats.totalCourses}</h3>
        <p style={styles.label}>Total Courses</p>
      </div>
      <div style={styles.card}>
        <h3 style={styles.number}>{stats.totalEnrollments}</h3>
        <p style={styles.label}>Total Enrollments</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    gap: "20px",
    marginBottom: "30px"
  },
  card: {
    flex: 1,
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    padding: "30px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
  },
  number: {
    fontSize: "48px",
    margin: "0",
    fontWeight: "bold"
  },
  label: {
    fontSize: "16px",
    margin: "10px 0 0 0"
  }
};

export default DashboardStats;