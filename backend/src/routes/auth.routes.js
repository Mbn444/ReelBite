const express = require('express');
const authController = require('../controllers/auth.controller');
// --- Import BOTH middleware functions ---
const { authUserMiddleware, authFoodPartnerMiddleware } = require('../middleware/auth.middleware');
const router = express.Router();

// --- Regular User Auth Routes ---
router.post('/user/register', authController.registerUser);
router.post('/user/login', authController.loginUser);
router.post('/user/logout', authController.logoutUser);

// FIX #1: This must be a GET request to match the frontend call
router.get('/user/me', 
    authUserMiddleware, // Use the general middleware
    authController.getMyUser
);

// --- Food Partner Auth Routes ---
router.post('/food-partner/register', authController.registerFoodPartner);
router.post('/food-partner/login', authController.loginFoodPartner);
router.post('/food-partner/logout', authController.logoutFoodPartner);

// --- General Status Check Route ---
// FIX #2: Use the general authUserMiddleware so it works for BOTH user types
router.get('/status', 
    authUserMiddleware, 
    authController.checkStatus
);

module.exports = router;