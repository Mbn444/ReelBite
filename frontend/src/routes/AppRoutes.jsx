// frontend/src/routes/AppRoutes.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import UserRegister from '../pages/UserRegister';
import UserLogin from '../pages/UserLogin';
import FoodPartnerRegister from '../pages/FoodPartnerRegister';
import FoodPartnerLogin from '../pages/FoodPartnerLogin';
import Home from '../pages/general/Home';
import Createfood from '../pages/food-partner/Createfood';
import Profile from '../pages/food-partner/Profile';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/user/register" element={<UserRegister />} />
      <Route path="/user/login" element={<UserLogin />} />
      <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
      <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
      <Route path="/" element={<Home />} />
      <Route path="/create-food" element={<Createfood />} />
      <Route path="/food-partner/:profile" element={<Profile />} />
    </Routes>
  );
};

export default AppRoutes;