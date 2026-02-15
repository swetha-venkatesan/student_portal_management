import axios from "axios";

const BASE_URL = "http://localhost:8080/api/notifications";

export const createNotification = (notification) => {
  return axios.post(BASE_URL, notification);
};

export const getUserNotifications = (userId) => {
  return axios.get(`${BASE_URL}/user/${userId}`);
};

export const getUnreadNotifications = (userId) => {
  return axios.get(`${BASE_URL}/unread/${userId}`);
};

export const getUnreadCount = (userId) => {
  return axios.get(`${BASE_URL}/unread-count/${userId}`);
};

export const markAsRead = (notificationId) => {
  return axios.put(`${BASE_URL}/mark-read/${notificationId}`);
};

export const markAllAsRead = (userId) => {
  return axios.put(`${BASE_URL}/mark-all-read/${userId}`);
};

export const deleteNotification = (id) => {
  return axios.delete(`${BASE_URL}/${id}`);
};