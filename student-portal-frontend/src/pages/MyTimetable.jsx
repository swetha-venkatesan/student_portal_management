import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";

const MyTimetable = () => {
  const { studentId } = useOutletContext();
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  const days = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
  const timeSlots = [
    "08:00", "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00", "17:00"
  ];

  useEffect(() => {
    if (studentId) {
      fetchTimetable();
    }
  }, [studentId]);

  const fetchTimetable = () => {
    axios.get(`http://localhost:8080/api/student-portal/timetable/${studentId}`)
      .then((res) => {
        setSchedules(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
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

  if (loading) {
    return <div style={styles.loading}>Loading timetable...</div>;
  }

  const timetableGrid = renderTimetableGrid();

  return (
    <div>
      <h1 style={styles.pageTitle}>My Timetable</h1>

      {schedules.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>📅</div>
          <h3>No Classes Scheduled</h3>
          <p>You don't have any classes scheduled yet.</p>
        </div>
      ) : (
        <>
          {/* List View for Mobile */}
          <div style={styles.listView}>
            <h3>Class Schedule</h3>
            {schedules.map((schedule, index) => (
              <div key={index} style={styles.scheduleCard}>
                <div style={styles.scheduleHeader}>
                  <span style={styles.dayBadge}>{schedule.dayOfWeek}</span>
                  <span style={styles.timeBadge}>
                    {schedule.startTime.substring(0, 5)} - {schedule.endTime.substring(0, 5)}
                  </span>
                </div>
                <h4 style={styles.courseTitle}>
                  {schedule.courseCode} - {schedule.courseName}
                </h4>
                <div style={styles.scheduleDetails}>
                  <span>👨‍🏫 {schedule.instructor || "N/A"}</span>
                  <span>📍 {schedule.room}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Grid View for Desktop */}
          <div style={styles.gridView}>
            <h3>Weekly View</h3>
            <div style={styles.timetableGrid}>
              <div style={styles.timeColumn}>
                <div style={styles.cornerCell}>Time</div>
                {timeSlots.map((time) => (
                  <div key={time} style={styles.timeCell}>{time}</div>
                ))}
              </div>

              {days.map((day) => (
                <div key={day} style={styles.dayColumn}>
                  <div style={styles.dayHeader}>{day.substring(0, 3)}</div>
                  {timeSlots.map((time) => (
                    <div key={`${day}-${time}`} style={styles.scheduleCell}>
                      {timetableGrid[day][time].map((schedule, idx) => (
                        <div key={idx} style={styles.scheduleItem}>
                          <div style={styles.scheduleCourse}>
                            {schedule.courseCode}
                          </div>
                          <div style={styles.scheduleTime}>
                            {schedule.startTime.substring(0, 5)} - {schedule.endTime.substring(0, 5)}
                          </div>
                          <div style={styles.scheduleRoom}>
                            📍 {schedule.room}
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  pageTitle: {
    fontSize: "28px",
    marginBottom: "30px",
    color: "#333"
  },
  listView: {
    display: "block",
    marginBottom: "30px"
  },
  scheduleCard: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    marginBottom: "15px"
  },
  scheduleHeader: {
    display: "flex",
    gap: "10px",
    marginBottom: "10px"
  },
  dayBadge: {
    background: "#667eea",
    color: "white",
    padding: "5px 12px",
    borderRadius: "5px",
    fontSize: "12px",
    fontWeight: "600"
  },
  timeBadge: {
    background: "#f0f0f0",
    color: "#333",
    padding: "5px 12px",
    borderRadius: "5px",
    fontSize: "12px",
    fontWeight: "600"
  },
  courseTitle: {
    margin: "10px 0",
    fontSize: "18px",
    color: "#333"
  },
  scheduleDetails: {
    display: "flex",
    gap: "20px",
    fontSize: "14px",
    color: "#666"
  },
  gridView: {
    background: "white",
    padding: "25px",
    borderRadius: "10px",
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
    fontSize: "14px",
    borderRadius: "5px 0 0 0"
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
    marginBottom: "5px"
  },
  scheduleCourse: {
    fontWeight: "bold",
    marginBottom: "3px"
  },
  scheduleTime: {
    fontSize: "10px",
    opacity: 0.9
  },
  scheduleRoom: {
    fontSize: "10px",
    opacity: 0.9
  },
  emptyState: {
    background: "white",
    padding: "60px 20px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  },
  emptyIcon: {
    fontSize: "64px",
    marginBottom: "20px"
  },
  loading: {
    textAlign: "center",
    padding: "50px",
    fontSize: "18px",
    color: "#666"
  }
};

export default MyTimetable;