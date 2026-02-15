import React, { useState } from "react";
import { addCourse } from "../services/CourseService";

const AddCourse = ({ onAdd }) => {
  const [course, setCourse] = useState({
    courseName: "",
    courseCode: "",
    instructor: "",
    credits: "",
    semester: "",
    description: ""
  });

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addCourse(course)
      .then(() => {
        alert("Course Added Successfully");
        setCourse({ courseName: "", courseCode: "", instructor: "", credits: "", semester: "", description: "" });
        if (onAdd) onAdd();
      })
      .catch((error) => console.error(error));
  };

  return (
    <div style={styles.container}>
      <h2>Add Course</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="courseCode"
          placeholder="Course Code (e.g., CS101)"
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
          value={course.instructor}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="number"
          name="credits"
          placeholder="Credits"
          value={course.credits}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="semester"
          placeholder="Semester (e.g., Fall 2024)"
          value={course.semester}
          onChange={handleChange}
          style={styles.input}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={course.description}
          onChange={handleChange}
          style={styles.textarea}
        />
        <button type="submit" style={styles.button}>
          Add Course
        </button>
      </form>
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
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "15px"
  },
  input: {
    padding: "10px",
    fontSize: "14px",
    border: "1px solid #ddd",
    borderRadius: "5px"
  },
  textarea: {
    gridColumn: "1 / -1",
    padding: "10px",
    fontSize: "14px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    minHeight: "80px"
  },
  button: {
    gridColumn: "1 / -1",
    padding: "12px",
    background: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px"
  }
};

export default AddCourse;