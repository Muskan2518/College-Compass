import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/Homepage';
import CollegePredictor from './components/CollegePredictor/CollegePredictor';
import CollegePageWithAuthProvider from './components/College/Collegepage';
import AboutUs from './components/Aboutus/Aboutus';
import Bookmarks from './components/Bookmarks/Bookmarks';
import LoginPage from './components/Login/LoginPage';
import RegisterPage from './components/Register/RegisterPage';
import ProfilePage from './components/Profile/Profile';

export default function AppRoutes() {
  return (
    
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search/:searchTerm" element={<HomePage />} />
      <Route path="/tag/:tag" element={<HomePage />} />
      <Route path="/college-predictor" element={<CollegePredictor />} />
      <Route path="/college/:collegeId" element={<CollegePageWithAuthProvider />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/bookmarks" element={<Bookmarks />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
}
