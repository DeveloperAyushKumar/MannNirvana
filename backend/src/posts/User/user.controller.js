import { User } from './user.model.js';
import cloudinary from '../../../config/cloudStorage.js';
import { createToken } from '../../../utils/token.js';

function isBase64Image(str) {
    return /^data:image\/(png|jpeg|jpg|gif|bmp|webp|svg\+xml);base64,/.test(str);
}

// Create User & Generate JWT Token
export const createUser = async (req, res) => {
    const { name, address, avatar } = req.body;

    try {
        let avatarUrl = avatar;

        // Upload avatar if provided
        if (avatar && isBase64Image(avatar)) {
            const uploadResult = await cloudinary.uploader.upload(avatar, {
                upload_preset: "unsigned_upload",
                folder: "user_avatars",
                allowed_formats: ["jpg", "jpeg", "png"]
            });
            avatarUrl = uploadResult.secure_url;
        }

        // Create user in DB
        const user = await User.create({ name, address, avatar: avatarUrl });

        // Generate JWT Token (RS256)
        const token = createToken(user);

        res.status(201).json({ message: "User created successfully", user, token });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Edit User (Update name, address, and avatar)
export const editUser = async (req, res) => {
    const userId = req.params.id;
    const { name, address, avatar } = req.body;

    try {
        let updatedData = { name, address };

        // Upload new avatar if provided
        if (avatar && isBase64Image(avatar)) {
            const uploadResult = await cloudinary.uploader.upload(avatar, {
                upload_preset: "unsigned_upload",
                folder: "user_avatars",
                allowed_formats: ["jpg", "jpeg", "png"]
            });
            updatedData.avatar = uploadResult.secure_url;
        }

        // Update user
        const user = await User.findByIdAndUpdate(userId, updatedData, { new: true });

        if (!user) {
            return res.status(250).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get User by Address
export const getUser = async (req, res) => {
    try {
        const user = await User.findOne({ address: req.params.id });

        if (!user) {
            return res.status(250).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User found", user, token: createToken(user) });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Increment User Coins
export const incrementCoins = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.coins = (user.coins || 0) + 10;
        await user.save();

        res.status(200).json({ message: "Coins incremented successfully", coins: user.coins });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get Top 10 Users by Coins
export const getTop10User = async (req, res) => {
    try {
        const topUsers = await User.find().sort({ coins: -1 }).limit(10);

        res.status(200).json({ message: "Top 10 users fetched", users: topUsers });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
