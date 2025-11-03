const express = require('express');
const foodController = require("../controllers/food.controller");
const { authFoodPartnerMiddleware } = require("../middleware/auth.middleware");
const router = express.Router();
const multer = require("multer");

const upload = multer({
    storage: multer.memoryStorage(),
});

router.post('/',
    authFoodPartnerMiddleware,
    upload.single("video"),
    foodController.createFood
);

router.get('/',
    authFoodPartnerMiddleware,
    foodController.getFoodItems
);

router.get('/explore',
    authFoodPartnerMiddleware,
    foodController.getExploreItems
);

module.exports = router;