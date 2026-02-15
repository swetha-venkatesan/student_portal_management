import React, { useEffect, useState } from "react";
import { getAllCourses, deleteCourse } from "../services/CourseService";
import EditCourse from "./EditCourse";

const CourseList = ({ userRole }) => {
  const [courses, setCourses] = useState([]);
  const [editingCourseId, setEditingCourseId] = useState(null);

  const fetchCourses = () => {
    getAllCourses()
      .then((response) => setCourses(response.data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      deleteCourse(id).then(() => fetchCourses());
    }
  };

  return (
    <div>
      <h2>Course List</h2>
      {courses.length === 0 ? (
        <p>No courses found.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Course Code</th>
              <th style={styles.th}>Course Name</th>
              <th style={styles.th}>Instructor</th>
              <th style={styles.th}>Credits</th>
              <th style={styles.th}>Semester</th>
              {userRole === "ADMIN" && <th style={styles.th}>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {courses.map((c) => (
              <tr key={c.id}>
                <td style={styles.td}>{c.id}</td>
                <td style={styles.td}>{c.courseCode}</td>
                <td style={styles.td}>{c.courseName}</td>
                <td style={styles.td}>{c.instructor || "N/A"}</td>
                <td style={styles.td}>{c.credits || "N/A"}</td>
                <td style={styles.td}>{c.semester || "N/A"}</td>
                {userRole === "ADMIN" && (
                  <td style={styles.td}>
                    <button 
                      onClick={() => setEditingCourseId(c.id)} 
                      style={styles.editBtn}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(c.id)} 
                      style={styles.deleteBtn}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {editingCourseId && (
        <EditCourse
          courseId={editingCourseId}
          onClose={() => setEditingCourseId(null)}
          onUpdate={fetchCourses}
        />
      )}
    </div>
  );
};

const styles = {
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
  },
  editBtn: {
    padding: "5px 15px",
    background: "#ffc107",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "5px"
  },
  deleteBtn: {
    padding: "5px 15px",
    background: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  }
};

export default CourseList;