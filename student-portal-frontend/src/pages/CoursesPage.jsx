import React from "react";
import { useOutletContext } from "react-router-dom";
import AddCourse from "../components/AddCourse";
import CourseList from "../components/CourseList";

const CoursesPage = () => {
  const { userRole } = useOutletContext();
  const [refresh, setRefresh] = React.useState(0);

  return (
    <div>
      <h1 style={styles.pageTitle}>Course Management</h1>
      {userRole === "ADMIN" && (
        <>
          <AddCourse onAdd={() => setRefresh(refresh + 1)} />
          <hr style={styles.divider} />
        </>
      )}
      <CourseList userRole={userRole} key={refresh} />
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

export default CoursesPage;








// import React from "react";
// import { useOutletContext } from "react-router-dom";
// import AddCourse from "../components/AddCourse";
// import CourseList from "../components/CourseList";

// const CoursesPage = () => {
//   const { userRole } = useOutletContext();
//   const [refresh, setRefresh] = React.useState(0);

//   return (
//     <div>
//       <h1 style={styles.pageTitle}>Course Management</h1>
//       {userRole === "ADMIN" && (
//         <>
//           <AddCourse onAdd={() => setRefresh(refresh + 1)} />
//           <hr style={styles.divider} />
//         </>
//       )}
//       <CourseList userRole={userRole} key={refresh} />
//     </div>
//   );
// };

// const styles = {
//   pageTitle: {
//     fontSize: "28px",
//     marginBottom: "20px",
//     color: "#333"
//   },
//   divider: {
//     border: "none",
//     borderTop: "1px solid #ddd",
//     margin: "20px 0"
//   }
// };

// export default CoursesPage;

// import React from "react";
// import AddCourse from "../components/AddCourse";
// import CourseList from "../components/CourseList";

// const CoursesPage = ({ userRole }) => {
//   const [refresh, setRefresh] = React.useState(0);

//   return (
//     <div>
//       {userRole === "ADMIN" && (
//         <>
//           <AddCourse onAdd={() => setRefresh(refresh + 1)} />
//           <hr />
//         </>
//       )}
//       <CourseList userRole={userRole} key={refresh} />
//     </div>
//   );
// };

// export default CoursesPage;