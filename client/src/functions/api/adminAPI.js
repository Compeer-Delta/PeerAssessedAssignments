// This file contains all the API calls related to admin
const API_BASE_URL = "http://localhost:8081/";

// Get all users of specific Institution (optional filter by role)
export default getAllInInstitution = async (institution, token, role = "") => {
  const url = role
    ? `${API_BASE_URL}admin/getallusers?institutionName=${institution}&role=${role}`
    : `${API_BASE_URL}admin/getallusers?institutionName=${institution}`; // If role is not specified, get all users
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  return response;
};
