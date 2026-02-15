import axios from "axios";

const BASE_URL = "http://localhost:8080/api/enrollments";

export const enrollStudent = (enrollment) => {
  return axios.post(BASE_URL, enrollment);
};

export const getStudentEnrollments = (studentId) => {
  return axios.get(`${BASE_URL}/student/${studentId}`);
};

export const getCourseEnrollments = (courseId) => {
  return axios.get(`${BASE_URL}/course/${courseId}`);
};

export const updateGrade = (enrollmentId, grade) => {
  return axios.put(`${BASE_URL}/${enrollmentId}/grade`, grade);
};

export const dropEnrollment = (enrollmentId) => {
  return axios.delete(`${BASE_URL}/${enrollmentId}`);
};