const foodModel = require("../models/food.model");
const storageService = require("../services/storage.services");
const { v4: uuid } = require("uuid");

async function createFood(req, res) {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ message: "Video file is required." });
    }
    const fileUploadResult = await storageService.uploadFile(
      req.file.buffer,
      uuid(),
      "food-items"
    );
    if (!fileUploadResult || !fileUploadResult.url) {
        return res.status(500).json({ message: "File upload failed." });
    }
    const foodItem = await foodModel.create({
      name: req.body.name,
      description: req.body.description,
      video: fileUploadResult.url,
      foodPartner: req.user.id,
    });
    res.status(201).json({
      message: "food created successfully",
      food: foodItem,
    });
  } catch (error) {
    console.error("Error in createFood:", error);
    res.status(500).json({
      message: "An error occurred while creating the food item.",
    });
  }
}

async function getFoodItems(req, res) {
  try {
    const foodItems = await foodModel.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      foodItems,
    });
  } catch (error) {
    console.error("Error in getFoodItems:", error);
    res.status(500).json({ message: "An error occurred." });
  }
}

async function getExploreItems(req, res) {
    try {
        const foodItems = await foodModel.aggregate([
            { $sample: { size: 50 } }
        ]);
        res.status(200).json({
            foodItems,
        });
    } catch (error) {
        console.error("Error in getExploreItems:", error);
        res.status(500).json({ message: "An error occurred while fetching explore items." });
    }
}

async function getFoodById(req, res) {
  try {
    const foodItem = await foodModel.findById(req.params.id);
    if (!foodItem) {
      return res.status(404).json({ message: "Food item not found." });
    }
    res.status(200).json({
      message: "Food item retrieved successfully",
      food: foodItem,
    });
  } catch (error) {
    console.error("Error in getFoodById:", error);
    res.status(500).json({ message: "An error occurred." });
  }
}

module.exports = {
  createFood,
  getFoodItems,
  getExploreItems,
  getFoodById,
};