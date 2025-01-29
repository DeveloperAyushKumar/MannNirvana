import User from './User.model.js';
const createUser = async (req, res) => {
    const { username, email, fullName, avatar, avatarPublicId, password, coins } = req.body;
    try {
        const user = await User.create({ username, email, fullName, avatar, avatarPublicId, password, coins });
        res.status(201).json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export { createUser, getUser }