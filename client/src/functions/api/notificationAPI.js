// This file contains all the API calls related to notifications
const API_BASE_URL = "http://localhost:8081/";

// Get all notifications by user id
export const getAllNotifications = async (userId, token) => {
  const response = await fetch(`${API_BASE_URL}/notification/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

// Delete notification by user id and message id
export const deleteNotification = async (userId, messageId, token) => {
  const response = await fetch(
    `${API_BASE_URL}notification/${userId}/${messageId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};