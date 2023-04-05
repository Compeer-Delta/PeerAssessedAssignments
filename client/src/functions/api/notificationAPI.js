// This file contains all the API calls related to notifications
const API_BASE_URL = "http://localhost:8081/";

// Get all notifications by user id and module
export const getAllNotifications = async (userId, moduleId, token) => {
  const response = await fetch(`${API_BASE_URL}notifications/${userId}/${moduleId}`, {
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

// Create a notification using the below parameters
export const createNotification = async (
  userId, //Takes an array of userId's (contrary to name)
  notifTitle,
  notifContent,
  urgency,
  assignmentId,
  moduleId,
  token
) => {
  const response = await fetch(`${API_BASE_URL}notification/create`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      userId: userId,
      notifTitle: notifTitle,
      notifContent: notifContent,
      urgency: urgency,
      assignmentId: assignmentId,
      moduleId: moduleId
    }),
  });

  return response;
};
