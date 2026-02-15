import axios from "axios";

const BASE_URL = "http://localhost:8080/api/students";

export const getAllStudents = () => {
  return axios.get(BASE_URL);
};

export const getStudent = (id) => {
  return axios.get(`${BASE_URL}/${id}`);
};

export const addStudent = (student) => {
  return axios.post(BASE_URL, student);
};

export const updateStudent = (id, student) => {
  return axios.put(`${BASE_URL}/${id}`, student);
};

export const deleteStudent = (id) => {
  return axios.delete(`${BASE_URL}/${id}`);
};

export const searchStudents = (keyword) => {
  return axios.get(`${BASE_URL}/search`, { params: { keyword } });
};













// import axios from "axios";

// const BASE_URL = "http://localhost:8080/api/students";

// export const getAllStudents = () => {
//   return axios.get(BASE_URL);
// };

// export const addStudent = (student) => {
//   return axios.post(BASE_URL, student);
// };

// export const deleteStudent = (id) => {
//   return axios.delete(`${BASE_URL}/${id}`);
// };








