const FoodPartner = require('../models/foodpartner.model'); // Verify this path/filename is correct
const Food = require('../models/food.model'); // Verify this path/filename is correct

exports.getPartnerProfile = async (req, res) => {
    try {
        const partnerId = req.params.id;

        // Find the partner's profile information
        const partner = await FoodPartner.findById(partnerId).select('-password');
        if (!partner) {
            return res.status(404).json({ message: "Food partner not found" });
        }

        // Find all videos created by this specific partner
        const videos = await Food.find({ foodPartner: partnerId }).sort({ createdAt: -1 });

        // Send both pieces of data back to the frontend
        res.status(200).json({
            partner,
            videos
        });

    } catch (error) {
        console.error("Error fetching partner profile:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};