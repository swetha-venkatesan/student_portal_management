import axios from "axios";

const BASE_URL = "http://localhost:8080/api/timetable";

export const getAllSchedules = () => {
  return axios.get(BASE_URL);
};

export const addSchedule = (schedule) => {
  return axios.post(BASE_URL, schedule);
};

export const updateSchedule = (id, schedule) => {
  return axios.put(`${BASE_URL}/${id}`, schedule);
};

export const deleteSchedule = (id) => {
  return axios.delete(`${BASE_URL}/${id}`);
};

export const getSchedulesByDay = (dayOfWeek) => {
  return axios.get(`${BASE_URL}/day/${dayOfWeek}`);
};

export const getCourseSchedule = (courseId) => {
  return axios.get(`${BASE_URL}/course/${courseId}`);
};