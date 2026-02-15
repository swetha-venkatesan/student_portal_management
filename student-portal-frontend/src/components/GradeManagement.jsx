import React, { useEffect, useState } from "react";
import { getAllCourses } from "../services/CourseService";
import { getCourseEnrollments, updateGrade } from "../services/EnrollmentService";
import { getAllStudents } from "../services/StudentService";

const GradeManagement = () => {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [grades, setGrades] = useState({});

  useEffect(() => {
    getAllCourses().then((res) => setCourses(res.data));
    getAllStudents().then((res) => setStudents(res.data));
  }, []);

  const handleCourseSelect = (courseId) => {
    setSelectedCourse(courseId);
    getCourseEnrollments(courseId)
      .then((res) => {
        setEnrollments(res.data);
        const gradeData = {};
        res.data.forEach((e) => {
          gradeData[e.id] = e.grade || "";
        });
        setGrades(gradeData);
      })
      .catch((error) => console.error(error));
  };

  const handleGradeChange = (enrollmentId, grade) => {
    setGrades({
      ...grades,
      [enrollmentId]: grade
    });
  };

  const handleSaveGrade = (enrollmentId) => {
    const grade = grades[enrollmentId];
    if (!grade) {
      alert("Please enter a grade");
      return;
    }

    updateGrade(enrollmentId, grade)
      .then(() => {
        alert("Grade updated successfully!");
      })
      .catch((error) => console.error(error));
  };

  const getStudentName = (studentId) => {
    const student = students.find((s) => s.id === studentId);
    return student ? student.name : "Unknown";
  };

  const getGradeColor = (grade) => {
    if (!grade) return "#999";
    if (grade === "A" || grade === "A+") return "#28a745";
    if (grade === "B" || grade === "B+") return "#17a2b8";
    if (grade === "C") return "#ffc107";
    return "#dc3545";
  };

  return (
    <div>
      <h2>Grade Management</h2>

      <div style={styles.container}>
        <div style={styles.header}>
          <label style={styles.label}>Select Course:</label>
          <select
            value={selectedCourse}
            onChange={(e) => handleCourseSelect(e.target.value)}
            style={styles.select}
          >
            <option value="">-- Select Course --</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.courseCode} - {c.courseName}
              </option>
            ))}
          </select>
        </div>

        {selectedCourse && enrollments.length > 0 && (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Student Name</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Current Grade</th>
                <th style={styles.th}>New Grade</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {enrollments.map((enrollment) => (
                <tr key={enrollment.id}>
                  <td style={styles.td}>{getStudentName(enrollment.studentId)}</td>
                  <td style={styles.td}>
                    <span style={{
                      ...styles.badge,
                      background: enrollment.status === "ENROLLED" ? "#28a745" : "#6c757d"
                    }}>
                      {enrollment.status}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <span style={{
                      ...styles.gradeBadge,
                      background: getGradeColor(enrollment.grade)
                    }}>
                      {enrollment.grade || "Not Graded"}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <select
                      value={grades[enrollment.id] || ""}
                      onChange={(e) => handleGradeChange(enrollment.id, e.target.value)}
                      style={styles.gradeSelect}
                    >
                      <option value="">Select Grade</option>
                      <option value="A+">A+</option>
                      <option value="A">A</option>
                      <option value="B+">B+</option>
                      <option value="B">B</option>
                      <option value="C+">C+</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                      <option value="F">F</option>
                    </select>
                  </td>
                  <td style={styles.td}>
                    <button
                      onClick={() => handleSaveGrade(enrollment.id)}
                      style={styles.saveBtn}
                    >
                      Save Grade
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {selectedCourse && enrollments.length === 0 && (
          <p style={styles.noData}>No enrollments found for this course</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    background: "white",
    padding: "25px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "20px"
  },
  label: {
    fontWeight: "600",
    fontSize: "16px"
  },
  select: {
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "14px",
    minWidth: "300px"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px"
  },
  th: {
    background: "#667eea",
    color: "white",
    padding: "12px",
    textAlign: "left"
  },
  td: {
    padding: "12px",
    border: "1px solid #ddd"
  },
  badge: {
    padding: "5px 10px",
    borderRadius: "4px",
    color: "white",
    fontSize: "12px",
    fontWeight: "600"
  },
  gradeBadge: {
    padding: "5px 15px",
    borderRadius: "4px",
    color: "white",
    fontSize: "14px",
    fontWeight: "bold"
  },
  gradeSelect: {
    padding: "8px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "14px"
  },
  saveBtn: {
    padding: "8px 15px",
    background: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px"
  },
  noData: {
    textAlign: "center",
    padding: "40px",
    color: "#999"
  }
};

export default GradeManagement;