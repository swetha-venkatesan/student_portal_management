import axios from "axios";

const BASE_URL = "http://localhost:8080/api/courses";

export const getAllCourses = () => {
  return axios.get(BASE_URL);
};

export const getCourse = (id) => {
  return axios.get(`${BASE_URL}/${id}`);
};

export const addCourse = (course) => {
  return axios.post(BASE_URL, course);
};

export const updateCourse = (id, course) => {
  return axios.put(`${BASE_URL}/${id}`, course);
};

export const deleteCourse = (id) => {
  return axios.delete(`${BASE_URL}/${id}`);
};