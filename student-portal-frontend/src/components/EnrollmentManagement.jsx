import React, { useEffect, useState } from "react";
import { enrollStudent, getStudentEnrollments, dropEnrollment } from "../services/EnrollmentService";
import { getAllStudents } from "../services/StudentService";
import { getAllCourses } from "../services/CourseService";

const EnrollmentManagement = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    getAllStudents().then((res) => setStudents(res.data));
    getAllCourses().then((res) => setCourses(res.data));
  };

  const handleEnroll = (e) => {
    e.preventDefault();
    const enrollment = {
      studentId: selectedStudent,
      courseId: selectedCourse,
      status: "ENROLLED"
    };
    enrollStudent(enrollment)
      .then(() => {
        alert("Student Enrolled Successfully");
        setSelectedStudent("");
        setSelectedCourse("");
      })
      .catch((error) => console.error(error));
  };

  const handleViewEnrollments = (studentId) => {
    getStudentEnrollments(studentId)
      .then((res) => setEnrollments(res.data))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h2>Enrollment Management</h2>
      
      <div style={styles.container}>
        <h3>Enroll Student in Course</h3>
        <form onSubmit={handleEnroll} style={styles.form}>
          <select
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            required
            style={styles.select}
          >
            <option value="">Select Student</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} - {s.email}
              </option>
            ))}
          </select>

          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            required
            style={styles.select}
          >
            <option value="">Select Course</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.courseCode} - {c.courseName}
              </option>
            ))}
          </select>

          <button type="submit" style={styles.button}>
            Enroll Student
          </button>
        </form>
      </div>

      <div style={styles.container}>
        <h3>View Student Enrollments</h3>
        <select
          onChange={(e) => handleViewEnrollments(e.target.value)}
          style={styles.select}
        >
          <option value="">Select Student to View Enrollments</option>
          {students.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        {enrollments.length > 0 && (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Course ID</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Grade</th>
              </tr>
            </thead>
            <tbody>
              {enrollments.map((e) => (
                <tr key={e.id}>
                  <td style={styles.td}>{e.courseId}</td>
                  <td style={styles.td}>{e.status}</td>
                  <td style={styles.td}>{e.grade || "Not Graded"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    background: "#f8f9fa",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "20px"
  },
  form: {
    display: "flex",
    gap: "15px",
    marginTop: "15px"
  },
  select: {
    flex: 1,
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "14px"
  },
  button: {
    padding: "10px 30px",
    background: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
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
    textAlign: "left",
    border: "1px solid #ddd"
  },
  td: {
    padding: "10px",
    border: "1px solid #ddd"
  }
};

export default EnrollmentManagement;