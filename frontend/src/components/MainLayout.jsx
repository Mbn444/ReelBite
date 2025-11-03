import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="main-content">
        {/* The <Outlet> component from react-router-dom will render */}
        {/* the actual page component for the current route (e.g., Home, Dashboard, etc.) */}
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;