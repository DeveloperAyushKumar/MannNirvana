import { useState, useEffect } from "react";
import { useWalletContext } from "../../context/WalletContext";
import defaultAvatar from "../../assets/user.png";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const BackendURL = import.meta.env.VITE_BACKEND_URL;

// Function to convert file to Base64
const toBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const ProfilePage = () => {
  const { user, setUser, isConnected } = useWalletContext();
  const [profile, setProfile] = useState({
    name: "Anonymous User",
    avatar: defaultAvatar,
  });

  useEffect(() => {
    if (!isConnected) {
      window.location.href = "/";
    } else {
      setProfile({
        name: user?.name || "Anonymous User",
        avatar: user?.avatar || defaultAvatar,
      });
      
    }
  }, [isConnected, user]);

  // Handle image selection and conversion to Base64
  const handleImageChange = async (e) => {
    const selectedFile = e.target.files?.[0];
    console.log(selectedFile)
    if (!selectedFile) return;

    // Check file size (100KB limit)
    if (selectedFile.size > 100 * 1024) {
      alert("Please select an image smaller than 100KB.");
      return;
    }

    try {
      const base64 = await toBase64(selectedFile);
      // console.log(base64)
      setProfile((prev) => {
        const updatedProfile = { ...prev, avatar: base64 };
        console.log("Updated Profile:", updatedProfile);  // Log updated value
        return updatedProfile;
      });
      
    } catch (error) {
      console.error("Error converting image to base64:", error);
    }
  };

  async function saveProfile() {
    try {
      const { name, avatar } = profile;
      console.log("Saving profile:", profile);
      const response = await axios.put(`${BackendURL}/user/edit/${user._id}`, {
        name,
        address: user.address,
        avatar
      });
      
      console.log("Profile saved:", response.data);
      setUser(response.data.user);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  }

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center relative">
    {/* Coins Section (Aligned to Right) */}
    <div className="absolute top-4 right-4 flex items-center gap-2">
        <p className="text-lg font-semibold text-gray-800">{user?.coins}Mann Coins</p>
        <FontAwesomeIcon icon={faCoins} className="text-yellow-500 text-2xl" />
    </div>

    {/* Profile Card */}
    <div className="flex flex-col items-center p-6 bg-white shadow-md rounded-lg w-80 border">
        <h2 className="text-xl font-semibold mb-4">Profile</h2>

        {/* Avatar Preview */}
        <img
        src={profile.avatar}
        alt="Avatar Preview"
        className="w-24 h-24 rounded-full border-2 border-gray-300"
        />

        {/* Upload Avatar */}
        <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mt-2 text-sm text-gray-600"
        />

        {/* Name Input */}
        <div className="w-full mt-4">
        <label className="block text-gray-700 font-medium mb-1">Name:</label>
        <input
            type="text"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        </div>

        {/* Save Button */}
        <button
        onClick={saveProfile}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
        Save Profile
        </button>

        {/* Logout Section */}
        <div className="mt-4 flex flex-col items-center">
        <p className="text-sm text-gray-600">Want to logout?</p>
        <WalletSelector />
        </div>
    </div>
    </div>
  );
};

export default ProfilePage;
