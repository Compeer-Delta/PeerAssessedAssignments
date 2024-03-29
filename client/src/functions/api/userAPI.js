// This file contains all the API calls related to users
const API_BASE_URL = "http://localhost:8081/";

// Validate user/admin login
export const login = async (type, userEmail, userPassword, token) => {
  const fr = type === "adminAccount" ? "admin/login" : "login";
  const response = await fetch(`${API_BASE_URL}${fr}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ email: userEmail, password: userPassword }),
  });
  return response;
};

// Register new admin
export const register = async (
  userPassword,
  institution,
  firstname,
  lastname,
  email
) => {
  const response = await fetch(`${API_BASE_URL}admin/register`, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      password: userPassword,
      institution: institution,
      firstname: firstname,
      surname: lastname,
      email: email,
    }),
  });
  return response;
};

// Register new user
export const createUser = async (
  userPassword,
  firstname,
  surname,
  email,
  institution,
  role
) => {
  const response = await fetch(`${API_BASE_URL}admin/register`, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      password: userPassword,
      firstname: firstname,
      surname: surname,
      email: email,
      institutionName: institution,
      role: role,
    }),
  });
  return response;
};

// Get user/admin account page
export const accountPage = async (type, userEmail, token) => {
  const url =
    type === "adminAccount"
      ? `${API_BASE_URL}admin/me?email=${userEmail}`
      : `${API_BASE_URL}user/me?email=${userEmail}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

// Get user firstname by email
export const getUserName = async (userEmail, token, type) => {
  const fr = type === "adminAccount" ? "admin/me" : "user/me";
  const response = await fetch(`${API_BASE_URL}${fr}?email=${userEmail}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

// Get user ID by email
export const getUserId = async (userEmail, token) => {
  const response = await fetch(`${API_BASE_URL}user/id?email=${userEmail}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};