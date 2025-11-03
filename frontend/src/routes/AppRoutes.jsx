import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Layouts and Guards
import MainLayout from '../components/MainLayout';
import FeedLayout from '../components/FeedLayout';
import PartnerLayout from '../components/PartnerLayout';
import ProtectedRoute from '../components/ProtectedRoute';
import FoodPartnerRoute from '../components/FoodPartnerRoute';

// --- PAGE IMPORTS ---
// (Ensure all these files exist at these paths)
import Landing from '../pages/general/Landing';
import Feed from '../pages/general/Feed';
import Explore from '../pages/general/Explore';
import MyProfile from '../pages/general/MyProfile'; // <-- The missing import
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


      {/* --- LEVEL 1: GENERAL PROTECTED ROUTES (For any logged-in user) --- */}
      <Route element={<ProtectedRoute />}>
        {/* Routes with the Instagram-style Feed Layout */}
        <Route element={<FeedLayout />}>
          <Route path="/feed" element={<Feed />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/profile" element={<MyProfile />} />
        </Route>

        {/* Other public-facing routes with the standard top navbar */}
        <Route element={<MainLayout />}>
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