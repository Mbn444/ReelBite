const userModel = require("../models/user.model");
const foodPartnerModel = require("../models/foodpartner.model");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// No changes needed for regular user functions
async function registerUser(req, res) {
    const { fullName, email, password } = req.body;
    const isUserAlreadyExists = await userModel.findOne({ email });
    if (isUserAlreadyExists) {
        return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({ fullName, email, password: hashedPassword });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token);
    res.status(201).json({
        message: "User registered successfully",
        user: { _id: user._id, email: user.email, fullName: user.fullName }
    });
}

async function loginUser(req, res) {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token);
    res.status(200).json({
        message: "User logged in successfully",
        user: { _id: user._id, email: user.email, fullName: user.fullName }
    });
}

function logoutUser(req, res) {
    res.clearCookie("token");
    res.status(200).json({ message: "User logged out successfully" });
}

// No changes needed for food partner registration
async function registerFoodPartner(req, res) {
    const { name, email, password, phone, address, contactName } = req.body;
    const isAccountAlreadyExists = await foodPartnerModel.findOne({ email });
    if (isAccountAlreadyExists) {
        return res.status(400).json({ message: "Food partner account already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const foodPartner = await foodPartnerModel.create({ name, email, password: hashedPassword, phone, address, contactName });
    const token = jwt.sign({ id: foodPartner._id }, process.env.JWT_SECRET);
    res.cookie("token", token);
    res.status(201).json({
        message: "Food partner registered successfully",
        foodPartner: { _id: foodPartner._id, email: foodPartner.email, name: foodPartner.name, address: foodPartner.address, contactName: foodPartner.contactName, phone: foodPartner.phone }
    });
}

// --- THIS FUNCTION IS NOW FIXED ---
async function loginFoodPartner(req, res) {
    try {
        const { email, password } = req.body;
        const foodPartner = await foodPartnerModel.findOne({ email });
        if (!foodPartner) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isPasswordValid = await bcrypt.compare(password, foodPartner.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: foodPartner._id, isFoodPartner: true }, process.env.JWT_SECRET);
        res.cookie("token", token);

        // FIX 1: The response object key is now "user" to match the frontend.
        // FIX 2: Added "isFoodPartner: true" for the frontend to identify the role.
        // FIX 3: Changed "name" to "businessName" to match the dashboard component.
        res.status(200).json({
            message: "Food partner logged in successfully",
            user: {
                _id: foodPartner._id,
                email: foodPartner.email,
                businessName: foodPartner.name,
                isFoodPartner: true
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server error during login." });
    }
}

// --- THIS FUNCTION IS NOW FIXED AND MORE ROBUST ---
async function checkStatus(req, res) {
    // req.user is added by your authentication middleware and contains the decoded token
    if (req.user && req.user.id) {
        try {
            // Find the full user details from the database using the ID from the token
            const partner = await foodPartnerModel.findById(req.user.id).select("-password");
            if (partner) {
                // Send back the same rich user object as the login function
                return res.status(200).json({
                    user: {
                        _id: partner._id,
                        email: partner.email,
                        businessName: partner.name,
                        isFoodPartner: true
                    }
                });
            }
        } catch (error) {
             return res.status(500).json({ user: null });
        }
    }
    // If no user/ID in token, or user not found, they are not authenticated
    return res.status(401).json({ user: null });
}

function logoutFoodPartner(req, res) {
    res.clearCookie("token");
    res.status(200).json({ message: "Food partner logged out successfully" });
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner,
    checkStatus
};