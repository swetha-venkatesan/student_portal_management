import React, { useEffect, useState } from "react";
import { getAllStudents, deleteStudent, searchStudents } from "../services/StudentService";
import EditStudent from "./EditStudent";
import StudentProfile from "./StudentProfile";

const StudentList = ({ userRole }) => {
  const [students, setStudents] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [viewingStudentId, setViewingStudentId] = useState(null);

  const fetchStudents = () => {
    getAllStudents()
      .then((response) => setStudents(response.data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      deleteStudent(id).then(() => fetchStudents());
    }
  };

  const handleSearch = () => {
    if (searchKeyword.trim()) {
      searchStudents(searchKeyword)
        .then((response) => setStudents(response.data))
        .catch((error) => console.error(error));
    } else {
      fetchStudents();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <div style={styles.header}>
        <h2>Student List</h2>
        <div style={styles.searchBox}>
          <input
            type="text"
            placeholder="Search by name, email, department, student ID..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyPress={handleKeyPress}
            style={styles.searchInput}
          />
          <button onClick={handleSearch} style={styles.searchBtn}>
            🔍 Search
          </button>
          <button onClick={fetchStudents} style={styles.resetBtn}>
            🔄 Reset
          </button>
        </div>
      </div>

      {students.length === 0 ? (
        <p style={styles.noData}>No students found.</p>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Student ID</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Department</th>
                <th style={styles.th}>Phone</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id} style={styles.tr}>
                  <td style={styles.td}>{s.id}</td>
                  <td style={styles.td}>{s.studentId || "N/A"}</td>
                  <td style={styles.td}>{s.name}</td>
                  <td style={styles.td}>{s.email}</td>
                  <td style={styles.td}>{s.department}</td>
                  <td style={styles.td}>{s.phone || "N/A"}</td>
                  <td style={styles.td}>
                    <button 
                      onClick={() => setViewingStudentId(s.id)} 
                      style={styles.viewBtn}
                      title="View Profile"
                    >
                      👁️ View
                    </button>
                    {userRole === "ADMIN" && (
                      <>
                        <button 
                          onClick={() => setEditingStudentId(s.id)} 
                          style={styles.editBtn}
                          title="Edit Student"
                        >
                          ✏️ Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(s.id)} 
                          style={styles.deleteBtn}
                          title="Delete Student"
                        >
                          🗑️ Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Student Modal */}
      {editingStudentId && (
        <EditStudent
          studentId={editingStudentId}
          onClose={() => setEditingStudentId(null)}
          onUpdate={fetchStudents}
        />
      )}

      {/* View Student Profile Modal */}
      {viewingStudentId && (
        <StudentProfile
          studentId={viewingStudentId}
          onClose={() => setViewingStudentId(null)}
        />
      )}
    </div>
  );
};

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    flexWrap: "wrap",
    gap: "15px"
  },
  searchBox: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap"
  },
  searchInput: {
    padding: "10px 15px",
    border: "2px solid #e0e0e0",
    borderRadius: "5px",
    width: "300px",
    fontSize: "14px"
  },
  searchBtn: {
    padding: "10px 20px",
    background: "#667eea",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600"
  },
  resetBtn: {
    padding: "10px 20px",
    background: "#6c757d",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600"
  },
  tableContainer: {
    background: "white",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    overflow: "hidden"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse"
  },
  th: {
    background: "#667eea",
    color: "white",
    padding: "15px",
    textAlign: "left",
    fontWeight: "600",
    fontSize: "14px"
  },
  tr: {
    borderBottom: "1px solid #f0f0f0",
    transition: "background 0.2s"
  },
  td: {
    padding: "12px 15px",
    fontSize: "14px",
    color: "#333"
  },
  viewBtn: {
    padding: "6px 12px",
    background: "#17a2b8",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "5px",
    fontSize: "13px"
  },
  editBtn: {
    padding: "6px 12px",
    background: "#ffc107",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "5px",
    fontSize: "13px"
  },
  deleteBtn: {
    padding: "6px 12px",
    background: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "13px"
  },
  noData: {
    textAlign: "center",
    padding: "40px",
    color: "#999",
    fontSize: "16px"
  }
};

export default StudentList;



// import React, { useEffect, useState } from "react";
// import { getAllStudents, deleteStudent, searchStudents } from "../services/StudentService";
// import EditStudent from "./EditStudent";

// const StudentList = ({ userRole }) => {
//   const [students, setStudents] = useState([]);
//   const [searchKeyword, setSearchKeyword] = useState("");
//   const [editingStudentId, setEditingStudentId] = useState(null);

//   const fetchStudents = () => {
//     getAllStudents()
//       .then((response) => setStudents(response.data))
//       .catch((error) => console.error(error));
//   };

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this student?")) {
//       deleteStudent(id).then(() => fetchStudents());
//     }
//   };

//   const handleSearch = () => {
//     if (searchKeyword.trim()) {
//       searchStudents(searchKeyword)
//         .then((response) => setStudents(response.data))
//         .catch((error) => console.error(error));
//     } else {
//       fetchStudents();
//     }
//   };

//   return (
//     <div>
//       <div style={styles.header}>
//         <h2>Student List</h2>
//         <div style={styles.searchBox}>
//           <input
//             type="text"
//             placeholder="Search by name, email, department..."
//             value={searchKeyword}
//             onChange={(e) => setSearchKeyword(e.target.value)}
//             style={styles.searchInput}
//           />
//           <button onClick={handleSearch} style={styles.searchBtn}>
//             Search
//           </button>
//           <button onClick={fetchStudents} style={styles.resetBtn}>
//             Reset
//           </button>
//         </div>
//       </div>

//       {students.length === 0 ? (
//         <p>No students found.</p>
//       ) : (
//         <table style={styles.table}>
//           <thead>
//             <tr>
//               <th style={styles.th}>ID</th>
//               <th style={styles.th}>Student ID</th>
//               <th style={styles.th}>Name</th>
//               <th style={styles.th}>Email</th>
//               <th style={styles.th}>Department</th>
//               <th style={styles.th}>Phone</th>
//               {userRole === "ADMIN" && <th style={styles.th}>Actions</th>}
//             </tr>
//           </thead>
//           <tbody>
//             {students.map((s) => (
//               <tr key={s.id}>
//                 <td style={styles.td}>{s.id}</td>
//                 <td style={styles.td}>{s.studentId || "N/A"}</td>
//                 <td style={styles.td}>{s.name}</td>
//                 <td style={styles.td}>{s.email}</td>
//                 <td style={styles.td}>{s.department}</td>
//                 <td style={styles.td}>{s.phone || "N/A"}</td>
//                 {userRole === "ADMIN" && (
//                   <td style={styles.td}>
//                     <button 
//                       onClick={() => setEditingStudentId(s.id)} 
//                       style={styles.editBtn}
//                     >
//                       Edit
//                     </button>
//                     <button 
//                       onClick={() => handleDelete(s.id)} 
//                       style={styles.deleteBtn}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 )}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {editingStudentId && (
//         <EditStudent
//           studentId={editingStudentId}
//           onClose={() => setEditingStudentId(null)}
//           onUpdate={fetchStudents}
//         />
//       )}
//     </div>
//   );
// };

// const styles = {
//   header: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: "20px"
//   },
//   searchBox: {
//     display: "flex",
//     gap: "10px"
//   },
//   searchInput: {
//     padding: "8px",
//     border: "1px solid #ddd",
//     borderRadius: "5px",
//     width: "300px"
//   },
//   searchBtn: {
//     padding: "8px 20px",
//     background: "#667eea",
//     color: "white",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer"
//   },
//   resetBtn: {
//     padding: "8px 20px",
//     background: "#6c757d",
//     color: "white",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer"
//   },
//   table: {
//     width: "100%",
//     borderCollapse: "collapse",
//     marginTop: "10px"
//   },
//   th: {
//     background: "#667eea",
//     color: "white",
//     padding: "12px",
//     textAlign: "left",
//     border: "1px solid #ddd"
//   },
//   td: {
//     padding: "10px",
//     border: "1px solid #ddd"
//   },
//   editBtn: {
//     padding: "5px 15px",
//     background: "#ffc107",
//     color: "white",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//     marginRight: "5px"
//   },
//   deleteBtn: {
//     padding: "5px 15px",
//     background: "#dc3545",
//     color: "white",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer"
//   }
// };

// export default StudentList;
