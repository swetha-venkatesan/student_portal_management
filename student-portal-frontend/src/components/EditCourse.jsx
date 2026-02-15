import React, { useState, useEffect } from "react";
import { getCourse, updateCourse } from "../services/CourseService";

const EditCourse = ({ courseId, onClose, onUpdate }) => {
  const [course, setCourse] = useState({
    courseName: "",
    courseCode: "",
    instructor: "",
    credits: "",
    semester: "",
    description: ""
  });

  useEffect(() => {
    if (courseId) {
      getCourse(courseId)
        .then((response) => setCourse(response.data))
        .catch((error) => console.error(error));
    }
  }, [courseId]);

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCourse(courseId, course)
      .then(() => {
        alert("Course Updated Successfully");
        onUpdate();
        onClose();
      })
      .catch((error) => console.error(error));
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Edit Course</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="courseCode"
            placeholder="Course Code"
            value={course.courseCode}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="text"
            name="courseName"
            placeholder="Course Name"
            value={course.courseName}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="text"
            name="instructor"
            placeholder="Instructor"
            value={course.instructor || ""}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="number"
            name="credits"
            placeholder="Credits"
            value={course.credits || ""}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="text"
            name="semester"
            placeholder="Semester"
            value={course.semester || ""}
            onChange={handleChange}
            style={styles.input}
          />
          <textarea
            name="description"
            placeholder="Description"
            value={course.description || ""}
            onChange={handleChange}
            style={styles.textarea}
          />
          <div style={styles.buttons}>
            <button type="submit" style={styles.saveBtn}>
              Update
            </button>
            <button type="button" onClick={onClose} style={styles.cancelBtn}>
              Cancel
            </button>
          </div>
        </form>
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
    width: "600px",
    maxWidth: "90%",
    maxHeight: "90vh",
    overflow: "auto"
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "14px",
    boxSizing: "border-box"
  },
  textarea: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "14px",
    minHeight: "80px",
    boxSizing: "border-box"
  },
  buttons: {
    display: "flex",
    gap: "10px",
    marginTop: "20px"
  },
  saveBtn: {
    flex: 1,
    padding: "10px",
    background: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },
  cancelBtn: {
    flex: 1,
    padding: "10px",
    background: "#6c757d",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }
};

export default EditCourse;