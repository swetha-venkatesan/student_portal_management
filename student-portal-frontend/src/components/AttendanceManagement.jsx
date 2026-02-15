import React, { useEffect, useState } from "react";
import { markAttendance, getCourseAttendance } from "../services/AttendanceService";
import { getAllStudents } from "../services/StudentService";
import { getAllCourses } from "../services/CourseService";

const AttendanceManagement = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [attendanceList, setAttendanceList] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState({});

  useEffect(() => {
    getAllStudents().then((res) => setStudents(res.data));
    getAllCourses().then((res) => setCourses(res.data));
  }, []);

  const handleCourseSelect = (courseId) => {
    setSelectedCourse(courseId);
    getCourseAttendance(courseId)
      .then((res) => {
        const records = {};
        res.data.forEach((att) => {
          records[att.studentId] = att.status;
        });
        setAttendanceRecords(records);
      })
      .catch((error) => console.error(error));
  };

  const handleAttendanceChange = (studentId, status) => {
    setAttendanceRecords({
      ...attendanceRecords,
      [studentId]: status
    });
  };

  const handleSubmit = () => {
    if (!selectedCourse) {
      alert("Please select a course");
      return;
    }

    const promises = students.map((student) => {
      const status = attendanceRecords[student.id] || "ABSENT";
      return markAttendance({
        studentId: student.id,
        courseId: selectedCourse,
        status: status
      });
    });

    Promise.all(promises)
      .then(() => {
        alert("Attendance marked successfully!");
        setAttendanceRecords({});
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h2>Attendance Management</h2>

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
          <span style={styles.date}>Date: {new Date().toLocaleDateString()}</span>
        </div>

        {selectedCourse && (
          <>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Student ID</th>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Attendance</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td style={styles.td}>{student.studentId || student.id}</td>
                    <td style={styles.td}>{student.name}</td>
                    <td style={styles.td}>{student.email}</td>
                    <td style={styles.td}>
                      <div style={styles.radioGroup}>
                        <label style={styles.radioLabel}>
                          <input
                            type="radio"
                            name={`attendance-${student.id}`}
                            value="PRESENT"
                            checked={attendanceRecords[student.id] === "PRESENT"}
                            onChange={() => handleAttendanceChange(student.id, "PRESENT")}
                          />
                          Present
                        </label>
                        <label style={styles.radioLabel}>
                          <input
                            type="radio"
                            name={`attendance-${student.id}`}
                            value="ABSENT"
                            checked={attendanceRecords[student.id] === "ABSENT"}
                            onChange={() => handleAttendanceChange(student.id, "ABSENT")}
                          />
                          Absent
                        </label>
                        <label style={styles.radioLabel}>
                          <input
                            type="radio"
                            name={`attendance-${student.id}`}
                            value="LATE"
                            checked={attendanceRecords[student.id] === "LATE"}
                            onChange={() => handleAttendanceChange(student.id, "LATE")}
                          />
                          Late
                        </label>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button onClick={handleSubmit} style={styles.submitBtn}>
              Submit Attendance
            </button>
          </>
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
  date: {
    marginLeft: "auto",
    fontWeight: "600",
    color: "#667eea"
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
  radioGroup: {
    display: "flex",
    gap: "15px"
  },
  radioLabel: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    cursor: "pointer"
  },
  submitBtn: {
    marginTop: "20px",
    padding: "12px 30px",
    background: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600"
  }
};

export default AttendanceManagement;