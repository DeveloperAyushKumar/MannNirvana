import { User } from './user.model.js';
import cloudinary from '../../../config/cloudStorage.js';

const createUser = async (req, res) => {
    const { name, address, avatar } = req.body;

    try {
        let avatarUrl = null;
        let user = null;
        // If an avatar is provided, upload it to Cloudinary
        if (avatar) {
            await cloudinary.uploader.upload(
                avatar, 
                {
                    upload_preset: "unsigned_upload",
                    folder: "user_avatars",
                    allowed_formats: ["jpg", "jpeg", "png"]
                },
                async (err, result) => {
                    if (err) {
                        console.log("Cloudinary upload failed:", err);
                        return res.status(500).json({ message: "Avatar upload failed" });
                    } else {
                        avatarUrl = result.secure_url;
                        user = await User.create({
                            name,
                            address,
                            avatar: avatarUrl,  
                        });
                    }
                }
            );
        }
        else{
            // console.log({name, address})
            user = await User.create({
                name,
                address,
            });
        }

        res.status(201).json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const editUser = async (req, res) => {
    const userId  = req.params.id;  // Assuming user ID is passed in the URL
    const { name, address, avatar } = req.body;
    console.log("avatar url")
    console.log(avatar)

    try {
        let avatarUrl = null;
        let updatedData = { name, address };

        // If a new avatar is provided, upload it to Cloudinary
        if (avatar) {
            await cloudinary.uploader.upload(
                avatar,
                {
                    upload_preset: "unsigned_upload",
                    folder: "user_avatars",
                    allowed_formats: ["jpg", "jpeg", "png"]
                },
                async (err, result) => {
                    if (err) {
                        console.log("Cloudinary upload failed:", err);
                        return res.status(500).json({ message: "Avatar upload failed" });
                    } else {
                        avatarUrl = result.secure_url;
                        updatedData.avatar = avatarUrl;  
                    }
                }
            );
        }

        // Update the user record
        console.log(updatedData);
        const user = await User.findByIdAndUpdate(userId, updatedData, { new: true });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getUser = async (req, res) => {
    try {
        console.log(req.params.id);
        const user = await User.findOne({ address: req.params.id });
        if (!user) {
            return res.status(250).json({ message: "User not found" })
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
const incrementCoins = async (req, res) => {
    try {
        const user = await User.findOne({ address: req.params.id });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.coins = (user.coins || 0) + 10; // Increment coins
        await user.save(); // Save updated user

        res.status(200).json({ message: "Coins incremented successfully", coins: user.coins });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};




export { createUser, getUser, editUser, incrementCoins};
