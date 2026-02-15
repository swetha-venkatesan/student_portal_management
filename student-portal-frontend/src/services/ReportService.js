import axios from "axios";

const BASE_URL = "http://localhost:8080/api/reports";

export const downloadStudentReport = () => {
  return axios.get(`${BASE_URL}/students`, {
    responseType: 'blob'
  });
};

export const downloadCourseReport = () => {
  return axios.get(`${BASE_URL}/courses`, {
    responseType: 'blob'
  });
};

export const downloadEnrollmentReport = () => {
  return axios.get(`${BASE_URL}/enrollments`, {
    responseType: 'blob'
  });
};