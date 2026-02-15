import React from "react";
import { useOutletContext } from "react-router-dom";
import AddStudent from "../components/AddStudent";
import StudentList from "../components/StudentList";

const StudentsPage = () => {
  const { userRole } = useOutletContext();
  const [refresh, setRefresh] = React.useState(0);

  return (
    <div>
      <h1 style={styles.pageTitle}>Student Management</h1>
      {userRole === "ADMIN" && (
        <>
          <AddStudent onAdd={() => setRefresh(refresh + 1)} />
          <hr style={styles.divider} />
        </>
      )}
      <StudentList userRole={userRole} key={refresh} />
    </div>
  );
};

const styles = {
  pageTitle: {
    fontSize: "28px",
    marginBottom: "20px",
    color: "#333"
  },
  divider: {
    border: "none",
    borderTop: "1px solid #ddd",
    margin: "20px 0"
  }
};

export default StudentsPage;

























// import React from "react";
// import AddStudent from "../components/AddStudent";
// import StudentList from "../components/StudentList";

// const StudentsPage = ({ userRole }) => {
//   const [refresh, setRefresh] = React.useState(0);

//   return (
//     <div>
//       {userRole === "ADMIN" && (
//         <>
//           <AddStudent onAdd={() => setRefresh(refresh + 1)} />
//           <hr />
//         </>
//       )}
//       <StudentList userRole={userRole} key={refresh} />
//     </div>
//   );
// };

// export default StudentsPage;