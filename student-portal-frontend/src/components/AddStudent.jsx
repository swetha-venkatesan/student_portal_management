import React, { useState } from "react";
import { addStudent } from "../services/StudentService";

const AddStudent = ({ onAdd }) => {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    department: "",
    phone: "",
    address: ""
  });

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addStudent(student)
      .then(() => {
        alert("Student Added Successfully");
        setStudent({ name: "", email: "", department: "", phone: "", address: "" });
        if (onAdd) onAdd();
      })
      .catch((error) => console.error(error));
  };

  return (
    <div style={styles.container}>
      <h2>Add New Student</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={student.name}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
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
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={student.phone}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={student.address}
          onChange={handleChange}
          style={{...styles.input, gridColumn: "1 / -1"}}
        />
        <button type="submit" style={styles.button}>
          Add Student
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    background: "white",
    padding: "25px",
    borderRadius: "8px",
    marginBottom: "20px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
  },
  form: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "15px",
    marginTop: "15px"
  },
  input: {
    padding: "12px",
    fontSize: "14px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    boxSizing: "border-box"
  },
  button: {
    gridColumn: "1 / -1",
    padding: "12px",
    background: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600"
  }
};

export default AddStudent;
// import React, { useState } from "react";
// import { addStudent } from "../services/StudentService";

// const AddStudent = () => {
//   const [student, setStudent] = useState({
//     name: "",
//     email: "",
//     department: ""
//   });

//   const handleChange = (e) => {
//     setStudent({ ...student, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     addStudent(student)
//       .then(() => {
//         alert("Student Added Successfully");
//         setStudent({ name: "", email: "", department: "" });
//         window.location.reload(); // Refresh to show new student
//       })
//       .catch((error) => console.error(error));
//   };

//   return (
//     <div style={styles.container}>
//       <h2>Add Student</h2>
//       <form onSubmit={handleSubmit} style={styles.form}>
//         <input
//           type="text"
//           name="name"
//           placeholder="Name"
//           value={student.name}
//           onChange={handleChange}
//           required
//           style={styles.input}
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={student.email}
//           onChange={handleChange}
//           required
//           style={styles.input}
//         />
//         <input
//           type="text"
//           name="department"
//           placeholder="Department"
//           value={student.department}
//           onChange={handleChange}
//           required
//           style={styles.input}
//         />
//         <button type="submit" style={styles.button}>
//           Add Student
//         </button>
//       </form>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     background: "#f8f9fa",
//     padding: "20px",
//     borderRadius: "8px",
//     marginBottom: "20px"
//   },
//   form: {
//     display: "flex",
//     gap: "10px",
//     flexWrap: "wrap"
//   },
//   input: {
//     flex: "1",
//     minWidth: "200px",
//     padding: "10px",
//     fontSize: "14px",
//     border: "1px solid #ddd",
//     borderRadius: "5px"
//   },
//   button: {
//     padding: "10px 20px",
//     background: "#28a745",
//     color: "white",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer"
//   }
// };

// export default AddStudent;










// // import React, { useState } from "react";
// // import { addStudent } from "../services/StudentService";

// // const AddStudent = () => {
// //   const [student, setStudent] = useState({
// //     name: "",
// //     email: "",
// //     department: ""
// //   });

// //   const handleChange = (e) => {
// //     setStudent({ ...student, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();

// //     addStudent(student)
// //       .then(() => {
// //         alert("Student Added Successfully");
// //         setStudent({ name: "", email: "", department: "" });
// //       })
// //       .catch((error) => console.error(error));
// //   };

// //   return (
// //     <div>
// //       <h2>Add Student</h2>

// //       <form onSubmit={handleSubmit}>
// //         <input
// //           type="text"
// //           name="name"
// //           placeholder="Name"
// //           value={student.name}
// //           onChange={handleChange}
// //           required
// //         />
// //         <br /><br />

// //         <input
// //           type="email"
// //           name="email"
// //           placeholder="Email"
// //           value={student.email}
// //           onChange={handleChange}
// //           required
// //         />
// //         <br /><br />

// //         <input
// //           type="text"
// //           name="department"
// //           placeholder="Department"
// //           value={student.department}
// //           onChange={handleChange}
// //           required
// //         />
// //         <br /><br />

// //         <button type="submit">Add Student</button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default AddStudent;
