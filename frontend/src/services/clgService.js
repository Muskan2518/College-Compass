import axios from 'axios';

const baseUrl = '/api/colleges';

// Function to fetch all colleges
export const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching all colleges:', error);
    throw error;
  }
};

// Function to search colleges by searchTerm
export const search = async (searchTerm) => {
  try {
    const response = await axios.get(`${baseUrl}/search/${searchTerm}`);
    return response.data;
  } catch (error) {
    console.error(`Error searching colleges with term ${searchTerm}:`, error);
    throw error;
  }
};

// Function to update college rating
export const updateCollegeRating = async (collegeId, userId, rating) => {
  try {
    const response = await axios.put(`${baseUrl}/${collegeId}/rating`, { userId, rating });
    return response.data;
  } catch (error) {
    console.error(`Error updating rating for college ${collegeId}:`, error);
    throw error;
  }
};

// Function to fetch all tags
export const getAllTags = async () => {
  try {
    const response = await axios.get(`${baseUrl}/tags`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all tags:', error);
    throw error;
  }
};

// Function to fetch colleges by tag
export const getCollegesByTag = async (tag) => {
  try {
    if (tag === 'All') {
      return getAll();
    }
    const response = await axios.get(`${baseUrl}/tags/${tag}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching colleges by tag ${tag}:`, error);
    throw error;
  }
};

// Function to fetch college by ID
export const getById = async (collegeId) => {
  try {
    const response = await axios.get(`${baseUrl}/${collegeId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching college with ID ${collegeId}:`, error);
    throw error;
  }
};

// Function to add a review for a college
export const addCollegeReview = async (collegeId, userId, userName, review) => {
  try {
    const response = await axios.post(`${baseUrl}/${collegeId}/reviews`, { userId, userName, review });
    return response.data;
  } catch (error) {
    console.error(`Error adding review for college ${collegeId}:`, error);
    throw error;
  }
};

// Function to fetch reviews for a college
export const getCollegeReviews = async (collegeId) => {
  try {
    const response = await axios.get(`${baseUrl}/${collegeId}/reviews`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching reviews for college ${collegeId}:`, error);
    throw error;
  }
};
