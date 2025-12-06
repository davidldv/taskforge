export const API_BASE_URL = '/api/v1';

export const AUTH_API_URL = `${API_BASE_URL}/auth`;

export const TASKS_API_URL = `${API_BASE_URL}/tasks`;

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(endpoint, {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Include cookies for authentication
    ...options,
  });
  return response;
};