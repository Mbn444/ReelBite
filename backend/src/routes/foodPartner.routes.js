const express = require('express');
const foodPartnerController = require('../controllers/foodPartner.controller');
const router = express.Router();

// Defines the route GET /api/food-partner/:id
router.get('/:id', foodPartnerController.getPartnerProfile);

module.exports = router;