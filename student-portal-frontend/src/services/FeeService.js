import axios from "axios";

const BASE_URL = "http://localhost:8080/api/fees";

export const getAllFees = () => {
  return axios.get(BASE_URL);
};

export const addFee = (fee) => {
  return axios.post(BASE_URL, fee);
};

export const updateFee = (id, fee) => {
  return axios.put(`${BASE_URL}/${id}`, fee);
};

export const deleteFee = (id) => {
  return axios.delete(`${BASE_URL}/${id}`);
};

export const getStudentFees = (studentId) => {
  return axios.get(`${BASE_URL}/student/${studentId}`);
};

export const payFee = (feeId, amount) => {
  return axios.post(`${BASE_URL}/pay/${feeId}`, { amount });
};

export const getStudentFeesSummary = (studentId) => {
  return axios.get(`${BASE_URL}/summary/${studentId}`);
};

export const getPendingFees = () => {
  return axios.get(`${BASE_URL}/pending`);
};

export const getOverallFeeStats = () => {
  return axios.get(`${BASE_URL}/stats`);
};