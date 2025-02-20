// UserServices.js

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust baseURL as per your backend API
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`, // Include JWT token here
  },
});

export const login = async (email, password) => {
  try {
    const response = await api.post('/users/login', { email, password });
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const register = async (name, email, password) => {
  try {
    const response = await api.post('/users/register', { name, email, password });
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUser = () => {
  // Retrieve user data from localStorage or wherever you store it
  const userJSON = localStorage.getItem('user');
  if (userJSON) {
    try {
      // Parse the JSON data
      const userData = JSON.parse(userJSON);
      return userData;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  } else {
    return null;
  }
};

export const updateProfile = async (updatedUserData) => {
  try {
    const response = await api.put('/users/updateProfile', updatedUserData);
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw new Error(error.response?.data?.message || 'Failed to update profile');
  }
};

export const changePassword = async (currentPassword, newPassword) => {
  try {
    const response = await api.put('/users/changePassword', {
      currentPassword,
      newPassword,
    });
    return response.data;
  } catch (error) {
    console.error('Error changing password:', error);
    throw new Error(error.response?.data?.message || 'Failed to change password');
  }
};
