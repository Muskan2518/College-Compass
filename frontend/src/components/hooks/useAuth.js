import React, { createContext, useContext, useState } from "react";
import * as UserService from "./UserServices"; // Adjust the path to your UserService or UserServices file
import { toast } from "react-toastify";

// Create a context for authentication
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Initialize state for user, retrieving initial user data from UserService
  const [user, setUser] = useState(UserService.getUser());

  // Function to handle login
  const login = async (email, password) => {
    try {
      // Call login function from UserService to authenticate user
      const userData = await UserService.login(email, password);
      setUser(userData); // Set the authenticated user into state
      toast.success("Login successful"); // Notify user of successful login
    } catch (error) {
      console.error("Login error:", error); // Log error to console
      toast.error("Login failed. Please check your credentials."); // Notify user of login failure
    }
  };

  // Function to handle logout
  const logout = () => {
    UserService.logout(); // Call logout function from UserService to clear user session
    setUser(null); // Clear user state
    toast.info("Logged out successfully"); // Notify user of successful logout
  };

  // Function to handle registration
  const register = async (name, email, password) => {
    try {
      // Call register function from UserService to create a new user
      const userData = await UserService.register(name, email, password);
      setUser(userData); // Set the authenticated user into state
      toast.success("Registration successful"); // Notify user of successful registration
    } catch (error) {
      console.error("Registration error:", error); // Log error to console
      toast.error("Registration failed. Please try again."); // Notify user of registration failure
    }
  };

  // Function to handle updating user profile
  const updateProfile = async (updatedUserData) => {
    try {
      // Call updateProfile function from UserService to update user profile
      const updatedUser = await UserService.updateProfile(updatedUserData);
      setUser(updatedUser); // Update the user state with updated data
      toast.success("Profile updated successfully"); // Notify user of successful profile update
    } catch (error) {
      console.error("Profile update error:", error); // Log error to console
      toast.error("Profile update failed. Please try again."); // Notify user of profile update failure
    }
  };

  // Function to handle changing user password
  const changePassword = async (passwords) => {
    try {
      await UserService.changePassword(passwords);
      logout(); // Log out after password change (adjust as per your application's logic)
      toast.success("Password changed successfully");
    } catch (error) {
      console.error("Change password error:", error);
      toast.error("Failed to change password. Please try again.");
    }
  };

  // Provide the AuthContext.Provider with user state, login, logout, register, updateProfile, and changePassword functions to children components
  return (
    <AuthContext.Provider value={{ user, login, logout, register, updateProfile, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to consume the AuthContext
export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return authContext;
};
