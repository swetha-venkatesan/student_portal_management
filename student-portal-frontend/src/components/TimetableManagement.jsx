import React, { useEffect, useState } from "react";
import { getAllSchedules, addSchedule, deleteSchedule } from "../services/TimetableService";
import { getAllCourses } from "../services/CourseService";

const TimetableManagement = () => {
  const [schedules, setSchedules] = useState([]);
  const [courses, setCourses] = useState([]);
  const [newSchedule, setNewSchedule] = useState({
    courseId: "",
    dayOfWeek: "",
    startTime: "",
    endTime: "",
    room: ""
  });

  const days = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];
  const timeSlots = [
    "08:00", "09:00", "10:00", "11:00", "12:00", 
    "13:00", "14:00", "15:00", "16:00", "17:00"
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    getAllSchedules().then((res) => setSchedules(res.data));
    getAllCourses().then((res) => setCourses(res.data));
  };

  const handleChange = (e) => {
    setNewSchedule({
      ...newSchedule,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addSchedule(newSchedule)
      .then(() => {
        alert("Schedule added successfully!");
        setNewSchedule({ courseId: "", dayOfWeek: "", startTime: "", endTime: "", room: "" });
        fetchData();
      })
      .catch((error) => console.error(error));
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this schedule?")) {
      deleteSchedule(id).then(() => fetchData());
    }
  };

  const getCourseName = (courseId) => {
    const course = courses.find((c) => c.id === courseId);
    return course ? `${course.courseCode} - ${course.courseName}` : "Unknown";
  };

  const renderTimetableGrid = () => {
    const grid = {};
    
    days.forEach(day => {
      grid[day] = {};
      timeSlots.forEach(time => {
        grid[day][time] = [];
      });
    });

    schedules.forEach(schedule => {
      const startHour = schedule.startTime.substring(0, 5);
      if (grid[schedule.dayOfWeek] && grid[schedule.dayOfWeek][startHour]) {
        grid[schedule.dayOfWeek][startHour].push(schedule);
      }
    });

    return grid;
  };

  const timetableGrid = renderTimetableGrid();

  return (
    <div>
      <h2>Timetable Management</h2>

      {/* Add Schedule Form */}
      <div style={styles.formContainer}>
        <h3>Add New Schedule</h3>
        <form onSubmit={handleSubmit} style={styles.form}>
          <select
            name="courseId"
            value={newSchedule.courseId}
            onChange={handleChange}
            required
            style={styles.input}
          >
            <option value="">Select Course</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.courseCode} - {c.courseName}
              </option>
            ))}
          </select>

          <select
            name="dayOfWeek"
            value={newSchedule.dayOfWeek}
            onChange={handleChange}
            required
            style={styles.input}
          >
            <option value="">Select Day</option>
            {days.map((day) => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>

          <input
            type="time"
            name="startTime"
            value={newSchedule.startTime}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            type="time"
            name="endTime"
            value={newSchedule.endTime}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            type="text"
            name="room"
            placeholder="Room Number"
            value={newSchedule.room}
            onChange={handleChange}
            style={styles.input}
          />

          <button type="submit" style={styles.submitBtn}>
            Add Schedule
          </button>
        </form>
      </div>

      {/* Timetable Grid View */}
      <div style={styles.gridContainer}>
        <h3>Weekly Timetable</h3>
        <div style={styles.timetableGrid}>
          <div style={styles.timeColumn}>
            <div style={styles.cornerCell}>Time</div>
            {timeSlots.map((time) => (
              <div key={time} style={styles.timeCell}>{time}</div>
            ))}
          </div>

          {days.map((day) => (
            <div key={day} style={styles.dayColumn}>
              <div style={styles.dayHeader}>{day}</div>
              {timeSlots.map((time) => (
                <div key={`${day}-${time}`} style={styles.scheduleCell}>
                  {timetableGrid[day][time].map((schedule) => (
                    <div key={schedule.id} style={styles.scheduleItem}>
                      <div style={styles.courseName}>
                        {getCourseName(schedule.courseId)}
                      </div>
                      <div style={styles.scheduleDetails}>
                        {schedule.startTime.substring(0, 5)} - {schedule.endTime.substring(0, 5)}
                      </div>
                      <div style={styles.scheduleDetails}>
                        📍 {schedule.room}
                      </div>
                      <button 
                        onClick={() => handleDelete(schedule.id)}
                        style={styles.deleteBtn}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  formContainer: {
    background: "white",
    padding: "25px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    marginBottom: "30px"
  },
  form: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "15px",
    marginTop: "15px"
  },
  input: {
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "14px"
  },
  submitBtn: {
    padding: "10px 20px",
    background: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600"
  },
  gridContainer: {
    background: "white",
    padding: "25px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    overflowX: "auto"
  },
  timetableGrid: {
    display: "flex",
    gap: "2px",
    marginTop: "20px",
    minWidth: "1000px"
  },
  timeColumn: {
    width: "80px",
    flexShrink: 0
  },
  dayColumn: {
    flex: 1,
    minWidth: "120px"
  },
  cornerCell: {
    height: "50px",
    background: "#667eea",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "14px"
  },
  timeCell: {
    height: "100px",
    background: "#f8f9fa",
    border: "1px solid #ddd",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: "600"
  },
  dayHeader: {
    height: "50px",
    background: "#667eea",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "14px"
  },
  scheduleCell: {
    height: "100px",
    border: "1px solid #ddd",
    padding: "5px",
    overflow: "auto"
  },
  scheduleItem: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    padding: "8px",
    borderRadius: "4px",
    fontSize: "11px",
    marginBottom: "5px",
    position: "relative"
  },
  courseName: {
    fontWeight: "bold",
    marginBottom: "3px"
  },
  scheduleDetails: {
    fontSize: "10px",
    opacity: 0.9
  },
  deleteBtn: {
    position: "absolute",
    top: "2px",
    right: "2px",
    background: "rgba(255,255,255,0.3)",
    border: "none",
    borderRadius: "50%",
    width: "18px",
    height: "18px",
    cursor: "pointer",
    fontSize: "14px",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
};

export default TimetableManagement;