// This file contains all the API calls related to assignment
const API_BASE_URL = "http://localhost:8081/";

// Get assignment by module id and assignment id
export const getAssignmentInfo = async (moduleId, assignmentId, token) => {
  const response = await fetch(
    `${API_BASE_URL}assignment/${moduleId}/${assignmentId}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
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