// This file contains all the API calls related to modules
const API_BASE_URL = "http://localhost:8081/";

export const createModule = async (
  moduleTitle,
  description,
  teachers,
  students,
  assignments,
  institutionName,
  moduleCode,
  token
) => {
  const response = await fetch(`${API_BASE_URL}module/create`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      title: moduleTitle,
      description: description,
      teachers: teachers,
      students: students,
      assignments: assignments,
      institutionName: institutionName,
      moduleCode: moduleCode,
    }),
  });
  return response;
};

// Get all teachers by module id
export const getTeachers = async (moduleId, token) => {
  console.log(moduleId);
  const response = await fetch(
    `${API_BASE_URL}moduleteachers?moduleId=${moduleId}`,
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

// Get module data of Institution
export const getModuleInfo = async (modulecode, institution, token) => {
  const response = await fetch(
    `${API_BASE_URL}module?moduleCode=${modulecode}&institutionName=${institution}`,
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

// Get all modules of User
export const getUserModules = async (userEmail, token) => {
  const response = await fetch(`${API_BASE_URL}modules?email=${userEmail}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

// Get all modules of Institution
export const getInstitutionModules = async (institution, token) => {
  const response = await fetch(
    `${API_BASE_URL}admin/getallmodules?institution=${institution}`,
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
