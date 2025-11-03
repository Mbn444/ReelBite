import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Layouts and Guards
import MainLayout from '../components/MainLayout';
import PartnerLayout from '../components/PartnerLayout';
import ProtectedRoute from '../components/ProtectedRoute';
import FoodPartnerRoute from '../components/FoodPartnerRoute';

// Page Imports
import Landing from '../pages/general/Landing';
import Feed from '../pages/general/Feed';
import Profile from '../pages/food-partner/Profile';
import FoodPartnerLogin from '../pages/FoodPartnerLogin';
import FoodPartnerRegister from '../pages/FoodPartnerRegister';
import UserRegister from '../pages/UserRegister';
import UserLogin from '../pages/UserLogin';
import Dashboard from '../pages/food-partner/Dashboard';
import CreateFood from '../pages/food-partner/CreateFood';

const AppRoutes = () => {
  return (
    <Routes>
      {/* --- LEVEL 0: PUBLIC & AUTH ROUTES (No Navbar) --- */}
      <Route path="/" element={<Landing />} />
      <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
      <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
      <Route path="/user/register" element={<UserRegister />} />
      <Route path="/user/login" element={<UserLogin />} />

      {/* --- LEVEL 1: GENERAL PROTECTED ROUTES (For any logged-in user, with top navbar) --- */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/feed" element={<Feed />} />
          {/* This is the public profile page, correctly placed to have the top navbar */}
          <Route path="/food-partner/:profile" element={<Profile />} /> 
        </Route>
      </Route>

      {/* --- LEVEL 2: FOOD PARTNER DASHBOARD ROUTES (With dedicated sidebar) --- */}
      <Route element={<FoodPartnerRoute />}>
        <Route element={<PartnerLayout />}>
          <Route path="/partner/dashboard" element={<Dashboard />} />
          <Route path="/partner/create-food" element={<CreateFood />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;