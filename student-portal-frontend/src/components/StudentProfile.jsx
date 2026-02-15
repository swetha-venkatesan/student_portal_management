import React, { useEffect, useState } from "react";
import { getStudent } from "../services/StudentService";
import { getStudentEnrollments } from "../services/EnrollmentService";
import { getAllCourses } from "../services/CourseService";

const StudentProfile = ({ studentId, onClose }) => {
  const [student, setStudent] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (studentId) {
      getStudent(studentId).then((res) => setStudent(res.data));
      getStudentEnrollments(studentId).then((res) => setEnrollments(res.data));
      getAllCourses().then((res) => setCourses(res.data));
    }
  }, [studentId]);

  const getCourseName = (courseId) => {
    const course = courses.find((c) => c.id === courseId);
    return course ? `${course.courseCode} - ${course.courseName}` : "Unknown Course";
  };

  if (!student) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h2>Student Profile</h2>
          <button onClick={onClose} style={styles.closeBtn}>×</button>
        </div>

        <div style={styles.profileInfo}>
          <div style={styles.avatar}>
            {student.name.charAt(0).toUpperCase()}
          </div>
          <div style={styles.details}>
            <h3>{student.name}</h3>
            <p><strong>Student ID:</strong> {student.studentId || "N/A"}</p>
            <p><strong>Email:</strong> {student.email}</p>
            <p><strong>Department:</strong> {student.department}</p>
            <p><strong>Phone:</strong> {student.phone || "N/A"}</p>
            <p><strong>Address:</strong> {student.address || "N/A"}</p>
            <p><strong>Enrollment Date:</strong> {student.enrollmentDate || "N/A"}</p>
          </div>
        </div>

        <hr />

        <div style={styles.section}>
          <h3>Enrolled Courses</h3>
          {enrollments.length === 0 ? (
            <p>No enrollments found</p>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Course</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Grade</th>
                </tr>
              </thead>
              <tbody>
                {enrollments.map((e) => (
                  <tr key={e.id}>
                    <td style={styles.td}>{getCourseName(e.courseId)}</td>
                    <td style={styles.td}>{e.status}</td>
                    <td style={styles.td}>{e.grade || "Not Graded"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
  },
  modal: {
    background: "white",
    padding: "30px",
    borderRadius: "10px",
    width: "700px",
    maxWidth: "90%",
    maxHeight: "90vh",
    overflow: "auto"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  },
  closeBtn: {
    background: "none",
    border: "none",
    fontSize: "30px",
    cursor: "pointer",
    color: "#999"
  },
  profileInfo: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px"
  },
  avatar: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "48px",
    fontWeight: "bold"
  },
  details: {
    flex: 1
  },
  section: {
    marginTop: "20px"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px"
  },
  th: {
    background: "#667eea",
    color: "white",
    padding: "10px",
    textAlign: "left"
  },
  td: {
    padding: "10px",
    border: "1px solid #ddd"
  }
};

export default StudentProfile;