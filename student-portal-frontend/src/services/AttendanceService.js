import axios from "axios";

const BASE_URL = "http://localhost:8080/api/attendance";

export const markAttendance = (attendance) => {
  return axios.post(BASE_URL, attendance);
};

export const getStudentAttendance = (studentId) => {
  return axios.get(`${BASE_URL}/student/${studentId}`);
};

export const getCourseAttendance = (courseId) => {
  return axios.get(`${BASE_URL}/course/${courseId}`);
};

export const getAttendanceStats = (studentId) => {
  return axios.get(`${BASE_URL}/stats/${studentId}`);
};

export const getAttendancePercentage = (studentId, courseId) => {
  return axios.get(`${BASE_URL}/percentage/${studentId}/${courseId}`);
};