import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

// Load Public & Private Keys Safely
let publicKey, privateKey;
try {
    publicKey = fs.readFileSync(path.resolve("/etc/secrets/public.pem"), "utf8");
    privateKey = fs.readFileSync(path.resolve("/etc/secrets/private.pem"), "utf8");
} catch (error) {
    console.error("Error loading RSA keys:", error.message);
}

// Middleware to Verify Token
export const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        const token = authHeader.split(" ")[1]; // Extract token after "Bearer "
        const decoded = jwt.verify(token, publicKey, { algorithms: ["RS256"] });

        req.user = decoded; // Attach user info to request
        next(); // Proceed
    } catch (error) {
        return res.status(403).json({ message: "Forbidden: Invalid or expired token" });
    }
};


// Function to Create JWT Token
export const createToken = (user) => {
    if (!privateKey) {
        throw new Error("Private key not found. Cannot generate token.");
    }

    return jwt.sign(
        { 
            _id: user._id, 
            name: user.name, 
            address: user.address, 
            avatar: user.avatar,
            coins: user.coins || 0 
        }, 
        privateKey,
        { algorithm: "RS256", expiresIn: "30d" }
    );
};
