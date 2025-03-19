import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useWalletContext } from '../../context/WalletContext';
import { ClipLoader } from 'react-spinners';
import axios from 'axios';

const BackendURL = import.meta.env.VITE_BACKEND_URL;

const Bot = () => {
    const { user } = useWalletContext();
    const [loading, setLoading] = useState(false);
    const [chats, setChats] = useState(["mr-autoHello! How can I help you?"]);

    const handleQuery = async (e) => {
        e.preventDefault();
        const message = e.target[0].value.trim();

        if (!message) {
            toast.error("Please enter a valid query");
            return;
        }

        if (!user) {
            toast.error("Please login to chat with your dost");
            return;
        }

        setChats((prevChats) => [...prevChats, "ml-auto" + message]);
        e.target[0].value = "";
        setLoading(true);

        try {
            const res = await axios.post(`${BackendURL}/chatbot/generate-response/`, {
                text: message,
                user_id: user._id,
            });
            setChats((prevChats) => [...prevChats, "mr-auto" + res.data.response.slice(14)]);
        } catch (error) {
            console.error("Error:", error);
            toast.error("Error in fetching response");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[85vh] items-center">
            <ToastContainer />

            <div className="w-[90vw] h-full flex flex-col p-4">

                <div className="flex-1 overflow-y-auto p-4 rounded-lg">
                    {chats.map((chat, index) => (
                        <div
                            key={index}
                            className={`p-3 my-4 rounded-lg max-w-[75%] ${
                                chat.startsWith("ml-auto") ? "bg-gray-300 ml-auto" : "bg-gray-300"
                            }`}
                        >
                            {chat.slice(7)}
                        </div>
                    ))}
                </div>

                <form className="mt-4 flex items-center gap-2" onSubmit={handleQuery}>
                    <input
                        type="text"
                        placeholder="Write something..."
                        className="flex-1 p-3 rounded-lg bg-gray-200 text-white border-none"
                    />
                    {loading ? (
                        <span className="p-3 bg-blue-800 rounded-lg">
                            <ClipLoader color="white" size={18} />
                        </span>
                    ) : (
                        <button className="p-3 bg-blue-600 text-white rounded-lg">Send</button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Bot;