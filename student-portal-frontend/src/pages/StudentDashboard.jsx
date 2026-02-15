import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";

const StudentDashboard = () => {
  const { studentId } = useOutletContext();
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalFees: 0,
    paidFees: 0,
    attendancePercentage: 0
  });
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    if (studentId) {
      fetchDashboardData();
    }
  }, [studentId]);

  const fetchDashboardData = () => {
    // Fetch enrollments
    axios.get(`http://localhost:8080/api/student-portal/enrollments/${studentId}`)
      .then((res) => {
        setStats(prev => ({ ...prev, totalCourses: res.data.length }));
      })
      .catch((error) => console.error(error));

    // Fetch fees
    axios.get(`http://localhost:8080/api/student-portal/fees/${studentId}`)
      .then((res) => {
        setStats(prev => ({
          ...prev,
          totalFees: res.data.totalAmount || 0,
          paidFees: res.data.totalPaid || 0
        }));
      })
      .catch((error) => console.error(error));

    // Fetch attendance
    axios.get(`http://localhost:8080/api/student-portal/attendance/${studentId}`)
      .then((res) => {
        const total = res.data.length;
        const present = res.data.filter(a => a.status === "PRESENT").length;
        const percentage = total > 0 ? ((present / total) * 100).toFixed(1) : 0;
        setStats(prev => ({ ...prev, attendancePercentage: percentage }));
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1 style={styles.pageTitle}>My Dashboard</h1>

      {/* Statistics Cards */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>📚</div>
          <div>
            <h3 style={styles.statNumber}>{stats.totalCourses}</h3>
            <p style={styles.statLabel}>Enrolled Courses</p>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statIcon}>✅</div>
          <div>
            <h3 style={styles.statNumber}>{stats.attendancePercentage}%</h3>
            <p style={styles.statLabel}>Attendance</p>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statIcon}>💰</div>
          <div>
            <h3 style={styles.statNumber}>₹{stats.paidFees.toLocaleString()}</h3>
            <p style={styles.statLabel}>Fees Paid</p>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statIcon}>⏳</div>
          <div>
            <h3 style={styles.statNumber}>
              ₹{(stats.totalFees - stats.paidFees).toLocaleString()}
            </h3>
            <p style={styles.statLabel}>Fees Due</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={styles.quickActions}>
        <h3>Quick Actions</h3>
        <div style={styles.actionGrid}>
          <div style={styles.actionCard}>
            <div style={styles.actionIcon}>📖</div>
            <h4>View Courses</h4>
            <p>Check your enrolled courses and grades</p>
          </div>

          <div style={styles.actionCard}>
            <div style={styles.actionIcon}>📅</div>
            <h4>Check Timetable</h4>
            <p>View your weekly class schedule</p>
          </div>

          <div style={styles.actionCard}>
            <div style={styles.actionIcon}>💳</div>
            <h4>Pay Fees</h4>
            <p>View and pay your pending fees</p>
          </div>

          <div style={styles.actionCard}>
            <div style={styles.actionIcon}>👤</div>
            <h4>Update Profile</h4>
            <p>Manage your personal information</p>
          </div>
        </div>
      </div>

      {/* Important Notices */}
      <div style={styles.noticeSection}>
        <h3>Important Notices</h3>
        <div style={styles.noticeCard}>
          <div style={styles.noticeIcon}>📢</div>
          <div>
            <h4 style={styles.noticeTitle}>Welcome to Student Portal!</h4>
            <p style={styles.noticeText}>
              You can now view your courses, attendance, fees, and timetable from this portal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageTitle: {
    fontSize: "28px",
    marginBottom: "30px",
    color: "#333"
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginBottom: "30px"
  },
  statCard: {
    background: "white",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    display: "flex",
    alignItems: "center",
    gap: "20px"
  },
  statIcon: {
    fontSize: "48px"
  },
  statNumber: {
    fontSize: "32px",
    margin: "0",
    color: "#667eea",
    fontWeight: "bold"
  },
  statLabel: {
    margin: "5px 0 0 0",
    color: "#666",
    fontSize: "14px"
  },
  quickActions: {
    background: "white",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    marginBottom: "30px"
  },
  actionGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "15px",
    marginTop: "15px"
  },
  actionCard: {
    border: "2px solid #e0e0e0",
    borderRadius: "8px",
    padding: "20px",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.3s"
  },
  actionIcon: {
    fontSize: "40px",
    marginBottom: "10px"
  },
  noticeSection: {
    background: "white",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  },
  noticeCard: {
    display: "flex",
    gap: "15px",
    padding: "15px",
    background: "#f8f9fa",
    borderRadius: "8px",
    marginTop: "15px"
  },
  noticeIcon: {
    fontSize: "32px"
  },
  noticeTitle: {
    margin: "0 0 10px 0",
    color: "#333"
  },
  noticeText: {
    margin: 0,
    color: "#666",
    fontSize: "14px"
  }
};

export default StudentDashboard;