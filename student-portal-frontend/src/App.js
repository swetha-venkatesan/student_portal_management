import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardLayout from "./pages/DashboardLayout";
import DashboardPage from "./pages/DashboardPage";
import StudentsPage from "./pages/StudentsPage";
import CoursesPage from "./pages/CoursesPage";
import EnrollmentsPage from "./pages/EnrollmentsPage";
import AttendancePage from "./pages/AttendancePage";
import GradesPage from "./pages/GradesPage";
import ReportsPage from "./pages/ReportsPage";
import TimetablePage from "./pages/TimetablePage";
import FeesPage from "./pages/FeesPage";

// Student Portal Pages
import StudentDashboardLayout from "./pages/StudentDashboardLayout";
import StudentDashboard from "./pages/StudentDashboard";
import MyProfile from "./pages/MyProfile";
import MyCourses from "./pages/MyCourses";
import MyTimetable from "./pages/MyTimetable";
import MyAttendance from "./pages/MyAttendance";
import MyFees from "./pages/MyFees";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Admin Dashboard */}
        <Route path="/dashboard-layout" element={<DashboardLayout />}>
          <Route index element={<Navigate to="overview" replace />} />
          <Route path="overview" element={<DashboardPage />} />
          <Route path="students" element={<StudentsPage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="enrollments" element={<EnrollmentsPage />} />
          <Route path="attendance" element={<AttendancePage />} />
          <Route path="grades" element={<GradesPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="timetable" element={<TimetablePage />} />
          <Route path="fees" element={<FeesPage />} />
        </Route>

        {/* Student Portal */}
        <Route path="/student-portal" element={<StudentDashboardLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="profile" element={<MyProfile />} />
          <Route path="courses" element={<MyCourses />} />
          <Route path="timetable" element={<MyTimetable />} />
          <Route path="attendance" element={<MyAttendance />} />
          <Route path="fees" element={<MyFees />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;



// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./pages/Login";
// import DashboardLayout from "./pages/DashboardLayout";
// import DashboardPage from "./pages/DashboardPage";
// import StudentsPage from "./pages/StudentsPage";
// import CoursesPage from "./pages/CoursesPage";
// import EnrollmentsPage from "./pages/EnrollmentsPage";
// import AttendancePage from "./pages/AttendancePage";
// import GradesPage from "./pages/GradesPage";
// import ReportsPage from "./pages/ReportsPage";
// import TimetablePage from "./pages/TimetablePage";
// import FeesPage from "./pages/FeesPage";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/dashboard-layout" element={<DashboardLayout />}>
//           <Route index element={<Navigate to="overview" replace />} />
//           <Route path="overview" element={<DashboardPage />} />
//           <Route path="students" element={<StudentsPage />} />
//           <Route path="courses" element={<CoursesPage />} />
//           <Route path="enrollments" element={<EnrollmentsPage />} />
//           <Route path="attendance" element={<AttendancePage />} />
//           <Route path="grades" element={<GradesPage />} />
//           <Route path="reports" element={<ReportsPage />} />
//           <Route path="timetable" element={<TimetablePage />} />
//           <Route path="fees" element={<FeesPage />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;











// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./pages/Login";
// import DashboardLayout from "./pages/DashboardLayout";
// import DashboardPage from "./pages/DashboardPage";
// import StudentsPage from "./pages/StudentsPage";
// import CoursesPage from "./pages/CoursesPage";
// import EnrollmentsPage from "./pages/EnrollmentsPage";
// import AttendancePage from "./pages/AttendancePage";
// import GradesPage from "./pages/GradesPage";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/dashboard-layout" element={<DashboardLayout />}>
//           <Route index element={<Navigate to="overview" replace />} />
//           <Route path="overview" element={<DashboardPage />} />
//           <Route path="students" element={<StudentsPage />} />
//           <Route path="courses" element={<CoursesPage />} />
//           <Route path="enrollments" element={<EnrollmentsPage />} />
//           <Route path="attendance" element={<AttendancePage />} />
//           <Route path="grades" element={<GradesPage />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;
