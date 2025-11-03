const jwt = require("jsonwebtoken");

const authUserMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Not authorized, no token" });
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedToken) {
            return res.status(401).json({ message: "Not authorized, token invalid" });
        }
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Not authorized, token failed" });
    }
};


const authFoodPartnerMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Not authorized, no token provided" });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        if (!decodedToken) {
            return res.status(401).json({ message: "Not authorized, token is invalid" });
        }

        req.user = decodedToken;

        next();

    } catch (error) {
        return res.status(401).json({ message: "Not authorized, token failed verification" });
    }
};

module.exports = {
    authUserMiddleware,
    authFoodPartnerMiddleware,
};