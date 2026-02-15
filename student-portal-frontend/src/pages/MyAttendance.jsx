import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";

const MyAttendance = () => {
  const { studentId } = useOutletContext();
  const [attendance, setAttendance] = useState([]);
  const [courses, setCourses] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    present: 0,
    absent: 0,
    late: 0,
    percentage: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (studentId) {
      fetchAttendance();
      fetchCourses();
    }
  }, [studentId]);

  const fetchAttendance = () => {
    axios.get(`http://localhost:8080/api/student-portal/attendance/${studentId}`)
      .then((res) => {
        setAttendance(res.data);
        calculateStats(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const fetchCourses = () => {
    axios.get(`http://localhost:8080/api/student-portal/enrollments/${studentId}`)
      .then((res) => {
        setCourses(res.data);
      })
      .catch((error) => console.error(error));
  };

  const calculateStats = (data) => {
    const total = data.length;
    const present = data.filter(a => a.status === "PRESENT").length;
    const absent = data.filter(a => a.status === "ABSENT").length;
    const late = data.filter(a => a.status === "LATE").length;
    const percentage = total > 0 ? ((present / total) * 100).toFixed(1) : 0;

    setStats({ total, present, absent, late, percentage });
  };

  const getCourseName = (courseId) => {
    const course = courses.find(c => c.courseId === courseId);
    return course ? `${course.courseCode} - ${course.courseName}` : "Unknown Course";
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "PRESENT": return "#28a745";
      case "ABSENT": return "#dc3545";
      case "LATE": return "#ffc107";
      default: return "#6c757d";
    }
  };

  if (loading) {
    return <div style={styles.loading}>Loading attendance...</div>;
  }

  return (
    <div>
      <h1 style={styles.pageTitle}>My Attendance</h1>

      {/* Statistics Cards */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>📊</div>
          <div>
            <h3 style={styles.statNumber}>{stats.percentage}%</h3>
            <p style={styles.statLabel}>Overall Attendance</p>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statIcon}>✅</div>
          <div>
            <h3 style={styles.statNumber}>{stats.present}</h3>
            <p style={styles.statLabel}>Present</p>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statIcon}>❌</div>
          <div>
            <h3 style={styles.statNumber}>{stats.absent}</h3>
            <p style={styles.statLabel}>Absent</p>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statIcon}>⏰</div>
          <div>
            <h3 style={styles.statNumber}>{stats.late}</h3>
            <p style={styles.statLabel}>Late</p>
          </div>
        </div>
      </div>

      {/* Attendance Records */}
      {attendance.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>✅</div>
          <h3>No Attendance Records</h3>
          <p>No attendance has been recorded yet.</p>
        </div>
      ) : (
        <div style={styles.tableContainer}>
          <h3>Attendance History</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Course</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((record) => (
                <tr key={record.id}>
                  <td style={styles.td}>{record.date}</td>
                  <td style={styles.td}>{getCourseName(record.courseId)}</td>
                  <td style={styles.td}>
                    <span style={{
                      ...styles.statusBadge,
                      background: getStatusColor(record.status)
                    }}>
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
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
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    marginBottom: "30px"
  },
  statCard: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    display: "flex",
    alignItems: "center",
    gap: "15px"
  },
  statIcon: {
    fontSize: "40px"
  },
  statNumber: {
    fontSize: "28px",
    margin: "0",
    color: "#667eea",
    fontWeight: "bold"
  },
  statLabel: {
    margin: "5px 0 0 0",
    color: "#666",
    fontSize: "14px"
  },
  tableContainer: {
    background: "white",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    overflowX: "auto"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "15px"
  },
  th: {
    background: "#667eea",
    color: "white",
    padding: "12px",
    textAlign: "left",
    fontSize: "14px",
    fontWeight: "600"
  },
  td: {
    padding: "12px",
    border: "1px solid #ddd",
    fontSize: "14px"
  },
  statusBadge: {
    padding: "5px 12px",
    borderRadius: "20px",
    color: "white",
    fontSize: "12px",
    fontWeight: "600"
  },
  emptyState: {
    background: "white",
    padding: "60px 20px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  },
  emptyIcon: {
    fontSize: "64px",
    marginBottom: "20px"
  },
  loading: {
    textAlign: "center",
    padding: "50px",
    fontSize: "18px",
    color: "#666"
  }
};

export default MyAttendance;