const API_BASE_URL = 'http://localhost:8080/api/admin/users';

export const fetchUsers = async () => {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
};

export const searchUsers = async (term) => {
  const response = await fetch(`${API_BASE_URL}/search?term=${term}`);
  if (!response.ok) {
    throw new Error('Failed to search users');
  }
  return response.json();
};

export const deleteUser = async (uid) => {
  const response = await fetch(`${API_BASE_URL}/${uid}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    throw new Error('Failed to delete user');
  }
  return response.json();
};

export const toggleUserStatus = async (uid) => {
  const response = await fetch(`${API_BASE_URL}/${uid}/toggle-status`, {
    method: 'PUT'
  });
  if (!response.ok) {
    throw new Error('Failed to toggle user status');
  }
  return response.json();
};

export const updateUser = async (uid, userData) => {
  const response = await fetch(`${API_BASE_URL}/${uid}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  });
  if (!response.ok) {
    throw new Error('Failed to update user');
  }
  return response.json();
};

export const deleteUserByDetails = async (name, email) => {
  const response = await fetch(`${API_BASE_URL}/delete-by-details`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email })
  });
  if (!response.ok) {
    throw new Error('Failed to delete user by details');
  }
  return response.json();
};