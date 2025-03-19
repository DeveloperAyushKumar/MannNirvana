import jwt from "jsonwebtoken";
const secret = process.env.SECRET;

if (!secret) {
    throw new Error("JWT Secret is not defined in environment variables.");
}

// Middleware to Verify Token
export const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        const token = authHeader.split(" ")[1]; // Extract token after "Bearer "
        const decoded = jwt.verify(token, secret);

        req.user = decoded; // Attach user info to request
        next(); // Proceed
    } catch (error) {
        return res.status(403).json({ message: "Forbidden: Invalid or expired token" });
    }
};

// Function to Create JWT Token
export const createToken = (user) => {
    if (!secret) {
        throw new Error("Secret key not found. Cannot generate token.");
    }

    return jwt.sign(
        { 
            _id: user._id, 
            name: user.name, 
            address: user.address, 
            avatar: user.avatar,
            phone: user.phone,
            bio: user.bio,
            coins: user.coins || 0 
        }, 
        secret,
        { expiresIn: "30d" }
    );
};
