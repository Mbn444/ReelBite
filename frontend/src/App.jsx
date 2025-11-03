import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            className: '',
            duration: 5000,
            style: {
              background: '#363636',
              color: '#fff',
              border: '1px solid #713200',
            },
            success: {
              duration: 3000,
              theme: {
                primary: 'green',
                secondary: 'black',
              },
            },
          }}
        />
        {/* The Navbar and <main> wrapper are no longer needed here */}
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
};

export default App;