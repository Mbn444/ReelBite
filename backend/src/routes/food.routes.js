const express = require('express');
const foodController = require("../controllers/food.controller");
const authMiddleware = require("../middleware/auth.middleware");
const router = express.Router();
const multer = require("multer");

const upload = multer({
    storage: multer.memoryStorage(),
});

// To create a food item (This should remain protected)
router.post('/',
    authMiddleware.authFoodPartnerMiddleware,
    upload.single("video"),
    foodController.createFood
);

// To get ALL food items (This route is now public)
router.get('/',
    // authMiddleware.authFoodPartnerMiddleware, // <-- REMOVE OR COMMENT OUT THIS LINE
    foodController.getFoodItems
);

// To get a SINGLE food item by its ID (This can also be public)
router.get("/:id",
    // authMiddleware.authFoodPartnerMiddleware, // <-- Consider making this public too
    foodController.getFoodById
);

module.exports = router;