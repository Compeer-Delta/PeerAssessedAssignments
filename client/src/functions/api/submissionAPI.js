// This file contains all the API calls related to submissions
const API_BASE_URL = "http://localhost:8081/";

// Get all accepted feedback by user id
export const acceptedFeedback = async (userId, token) => {
  const response = await fetch(
    `${API_BASE_URL}user/${userId}/submission/feedback/accepted`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

// Submit assignment submission
export const submitAssignment = async (formData, token) => {
  const response = await fetch(`${API_BASE_URL}assignment/submit/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: token,
    },
    body: formData,
  });
  return response;
};

// Get all submissions for a specific assignment
export const getSubmissions = async (assignmentId, token) => {
  const response = await fetch(
    `${API_BASE_URL}assignment/${assignmentId}/submissions`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};
