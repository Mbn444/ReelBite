import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Layouts and Guards
import MainLayout from '../components/MainLayout';
import ProtectedRoute from '../components/ProtectedRoute'; // General guard
import FoodPartnerRoute from '../components/FoodPartnerRoute'; // Specific guard

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
      {/* --- LEVEL 0: PUBLIC ROUTES (No Navbar, No Login Required) --- */}
      <Route path="/" element={<Landing />} />
      <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
      <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
      <Route path="/user/register" element={<UserRegister />} />
      <Route path="/user/login" element={<UserLogin />} />


      {/* --- LEVEL 1: PROTECTED ROUTES FOR ANY LOGGED-IN USER (With Navbar) --- */}
      {/* The ProtectedRoute checks if authUser exists. If not, it redirects. */}
      {/* If it exists, it renders the MainLayout. */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          
          <Route path="/feed" element={<Feed />} />
          <Route path="/food-partner/:profile" element={<Profile />} />

          {/* --- LEVEL 2: PROTECTED ROUTES FOR FOOD PARTNERS ONLY --- */}
          {/* The FoodPartnerRoute checks if authUser.isFoodPartner is true. */}
          {/* If not, it redirects. If yes, it renders the child route. */}
          <Route element={<FoodPartnerRoute />}>
            <Route path="/partner/dashboard" element={<Dashboard />} />
            <Route path="/partner/create-food" element={<CreateFood />} />
          </Route>

        </Route>
      </Route>

    </Routes>
  );
};

export default AppRoutes;