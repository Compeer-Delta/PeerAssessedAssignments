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

// Add new assignment
export const addAssignment = async (
  token,
  supervisorId,
  moduleId,
  title,
  description,
  brief,
  startDate,
  endDate,
  numOfReviewers,
  imageURL,
  teachers = [],
  students = []
) => {
  const response = await fetch(`${API_BASE_URL}assignment/add/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      supervisorId: supervisorId,
      moduleId: moduleId,
      title: title,
      description: description,
      brief: brief,
      startDate: startDate,
      endDate: endDate,
      numOfReviewers: numOfReviewers,
      imageURL: imageURL,
      students: students,
      teachers: teachers,
    }),
  });
  return response;
};

// Update assignment details by assignment id
export const updateAssignment = async (assignmentId, updates, token) => {
  const response = await fetch(
    `${API_BASE_URL}assignment/update/${assignmentId}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updates), // updates is an object with the fields to be updated i.e. {title: "new title", description: "new description"}
    }
  );
  return response;
};
