import React, { useState, useEffect } from "react";
import { getStudent, updateStudent } from "../services/StudentService";

const EditStudent = ({ studentId, onClose, onUpdate }) => {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    department: "",
    phone: "",
    address: ""
  });

  useEffect(() => {
    if (studentId) {
      getStudent(studentId)
        .then((response) => setStudent(response.data))
        .catch((error) => console.error(error));
    }
  }, [studentId]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateStudent(studentId, student)
      .then(() => {
        alert("Student Updated Successfully");
        onUpdate();
        onClose();
      })
      .catch((error) => console.error(error));
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Edit Student</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={student.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={student.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="text"
            name="department"
            placeholder="Department"
            value={student.department}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={student.phone || ""}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={student.address || ""}
            onChange={handleChange}
            style={styles.input}
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
    width: "500px",
    maxWidth: "90%"
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

export default EditStudent;