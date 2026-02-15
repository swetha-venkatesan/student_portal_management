import React, { useState, useEffect } from "react";
import { downloadStudentReport, downloadCourseReport, downloadEnrollmentReport } from "../services/ReportService";
import { getDashboardStats } from "../services/DashboardService";

const ReportsAnalytics = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCourses: 0,
    totalEnrollments: 0
  });
  const [loading, setLoading] = useState("");

  useEffect(() => {
    getDashboardStats()
      .then((res) => setStats(res.data))
      .catch((error) => console.error(error));
  }, []);

  const handleDownloadReport = (type) => {
    setLoading(type);
    
    let downloadPromise;
    let filename;

    switch(type) {
      case 'student':
        downloadPromise = downloadStudentReport();
        filename = 'student-report.pdf';
        break;
      case 'course':
        downloadPromise = downloadCourseReport();
        filename = 'course-report.pdf';
        break;
      case 'enrollment':
        downloadPromise = downloadEnrollmentReport();
        filename = 'enrollment-report.pdf';
        break;
      default:
        return;
    }

    downloadPromise
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
        setLoading("");
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to download report");
        setLoading("");
      });
  };

  return (
    <div>
      <h2>Reports & Analytics</h2>

      {/* Statistics Cards */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>👨‍🎓</div>
          <div style={styles.statContent}>
            <h3 style={styles.statNumber}>{stats.totalStudents}</h3>
            <p style={styles.statLabel}>Total Students</p>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statIcon}>📚</div>
          <div style={styles.statContent}>
            <h3 style={styles.statNumber}>{stats.totalCourses}</h3>
            <p style={styles.statLabel}>Total Courses</p>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statIcon}>📝</div>
          <div style={styles.statContent}>
            <h3 style={styles.statNumber}>{stats.totalEnrollments}</h3>
            <p style={styles.statLabel}>Total Enrollments</p>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statIcon}>📊</div>
          <div style={styles.statContent}>
            <h3 style={styles.statNumber}>
              {stats.totalCourses > 0 ? (stats.totalEnrollments / stats.totalCourses).toFixed(1) : 0}
            </h3>
            <p style={styles.statLabel}>Avg Enrollments/Course</p>
          </div>
        </div>
      </div>

      {/* Report Download Section */}
      <div style={styles.reportSection}>
        <h3>Download Reports</h3>
        <div style={styles.reportGrid}>
          <div style={styles.reportCard}>
            <div style={styles.reportIcon}>📄</div>
            <h4>Student Report</h4>
            <p>Complete list of all registered students</p>
            <button 
              onClick={() => handleDownloadReport('student')}
              style={styles.downloadBtn}
              disabled={loading === 'student'}
            >
              {loading === 'student' ? '⏳ Generating...' : '⬇️ Download PDF'}
            </button>
          </div>

          <div style={styles.reportCard}>
            <div style={styles.reportIcon}>📚</div>
            <h4>Course Report</h4>
            <p>All courses with details and instructors</p>
            <button 
              onClick={() => handleDownloadReport('course')}
              style={styles.downloadBtn}
              disabled={loading === 'course'}
            >
              {loading === 'course' ? '⏳ Generating...' : '⬇️ Download PDF'}
            </button>
          </div>

          <div style={styles.reportCard}>
            <div style={styles.reportIcon}>📊</div>
            <h4>Enrollment Report</h4>
            <p>Student enrollments and grades</p>
            <button 
              onClick={() => handleDownloadReport('enrollment')}
              style={styles.downloadBtn}
              disabled={loading === 'enrollment'}
            >
              {loading === 'enrollment' ? '⏳ Generating...' : '⬇️ Download PDF'}
            </button>
          </div>
        </div>
      </div>

      {/* Analytics Section */}
      <div style={styles.analyticsSection}>
        <h3>Analytics Overview</h3>
        <div style={styles.analyticsGrid}>
          <div style={styles.analyticsCard}>
            <h4>Student Distribution by Department</h4>
            <div style={styles.chartPlaceholder}>
              📊 Chart Coming Soon
            </div>
          </div>

          <div style={styles.analyticsCard}>
            <h4>Course Enrollment Trends</h4>
            <div style={styles.chartPlaceholder}>
              📈 Chart Coming Soon
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
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
  statContent: {
    flex: 1
  },
  statNumber: {
    fontSize: "36px",
    margin: "0",
    color: "#667eea",
    fontWeight: "bold"
  },
  statLabel: {
    margin: "5px 0 0 0",
    color: "#666",
    fontSize: "14px"
  },
  reportSection: {
    background: "white",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    marginBottom: "30px"
  },
  reportGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
    marginTop: "20px"
  },
  reportCard: {
    border: "2px solid #e0e0e0",
    borderRadius: "8px",
    padding: "20px",
    textAlign: "center",
    transition: "all 0.3s"
  },
  reportIcon: {
    fontSize: "48px",
    marginBottom: "15px"
  },
  downloadBtn: {
    marginTop: "15px",
    padding: "10px 25px",
    background: "#667eea",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    width: "100%"
  },
  analyticsSection: {
    background: "white",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  },
  analyticsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
    gap: "20px",
    marginTop: "20px"
  },
  analyticsCard: {
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    padding: "20px"
  },
  chartPlaceholder: {
    height: "200px",
    background: "#f8f9fa",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "24px",
    color: "#999",
    marginTop: "15px"
  }
};

export default ReportsAnalytics;