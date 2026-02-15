import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";

const MyCourses = () => {
  const { studentId } = useOutletContext();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (studentId) {
      fetchCourses();
    }
  }, [studentId]);

  const fetchCourses = () => {
    axios.get(`http://localhost:8080/api/student-portal/enrollments/${studentId}`)
      .then((res) => {
        setCourses(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const getGradeColor = (grade) => {
    if (!grade) return "#999";
    if (grade === "A" || grade === "A+") return "#28a745";
    if (grade === "B" || grade === "B+") return "#17a2b8";
    if (grade === "C") return "#ffc107";
    return "#dc3545";
  };

  if (loading) {
    return <div style={styles.loading}>Loading courses...</div>;
  }

  return (
    <div>
      <h1 style={styles.pageTitle}>My Courses</h1>

      {courses.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>📚</div>
          <h3>No Courses Enrolled</h3>
          <p>You are not enrolled in any courses yet.</p>
        </div>
      ) : (
        <div style={styles.courseGrid}>
          {courses.map((course) => (
            <div key={course.id} style={styles.courseCard}>
              <div style={styles.courseHeader}>
                <h3 style={styles.courseName}>{course.courseName}</h3>
                <span style={styles.courseCode}>{course.courseCode}</span>
              </div>

              <div style={styles.courseBody}>
                <div style={styles.courseInfo}>
                  <span style={styles.label}>Instructor:</span>
                  <span style={styles.value}>{course.instructor || "N/A"}</span>
                </div>

                <div style={styles.courseInfo}>
                  <span style={styles.label}>Credits:</span>
                  <span style={styles.value}>{course.credits || "N/A"}</span>
                </div>

                <div style={styles.courseInfo}>
                  <span style={styles.label}>Status:</span>
                  <span style={{
                    ...styles.statusBadge,
                    background: course.status === "ENROLLED" ? "#28a745" : "#6c757d"
                  }}>
                    {course.status}
                  </span>
                </div>

                <div style={styles.courseInfo}>
                  <span style={styles.label}>Grade:</span>
                  <span style={{
                    ...styles.gradeBadge,
                    background: getGradeColor(course.grade)
                  }}>
                    {course.grade || "Not Graded"}
                  </span>
                </div>
              </div>
            </div>
          ))}
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
  courseGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
    gap: "20px"
  },
  courseCard: {
    background: "white",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    overflow: "hidden",
    transition: "transform 0.2s"
  },
  courseHeader: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    padding: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  courseName: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "600"
  },
  courseCode: {
    background: "rgba(255,255,255,0.2)",
    padding: "5px 10px",
    borderRadius: "5px",
    fontSize: "14px"
  },
  courseBody: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  courseInfo: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  label: {
    fontSize: "14px",
    color: "#666",
    fontWeight: "600"
  },
  value: {
    fontSize: "14px",
    color: "#333"
  },
  statusBadge: {
    padding: "5px 12px",
    borderRadius: "20px",
    color: "white",
    fontSize: "12px",
    fontWeight: "600"
  },
  gradeBadge: {
    padding: "5px 15px",
    borderRadius: "5px",
    color: "white",
    fontSize: "14px",
    fontWeight: "bold"
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

export default MyCourses;