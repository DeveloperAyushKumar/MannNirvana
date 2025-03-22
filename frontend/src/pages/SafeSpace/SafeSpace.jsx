import React, { useState } from 'react';
import PostPreview from '../../components/PostPreview';
import PostForm from '@/src/components/PostForum';
import { Card } from '@/components/ui/card';
import { ScrollArea } from "@/components/ui/scroll-area"
import { useFetchAllPostsQuery } from '@/src/redux/features/posts/postsApi';
import { ToastContainer, toast } from 'react-toastify';
import tags from '../../utils/tags';
import { useWalletContext } from '../../context/WalletContext';
import { RxCross2 } from "react-icons/rx";  // From Radix Icons
import { Link } from 'react-router';
import { FaRobot } from "react-icons/fa";
import { ClipLoader } from 'react-spinners';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useRef } from 'react';

const BackendURL = import.meta.env.VITE_BACKEND_URL;

const SafeSpace = () => {
  const scrollRef = useRef(null);
  const {data:posts=[]} = useFetchAllPostsQuery();
  const [chats, setChats] = useState(["mr-autoHello! How can I help you?"]);
  const [loading, setLoading] = useState(false);
  const [showBot, setShowBot] = useState(false);
  // State for selected tags and filtering
  const [selectedTags, setSelectedTags] = useState([]);
  const {user, isConnected} = useWalletContext();

  // Function to handle tag selection
  const handleTagSelect = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag) ? prevTags.filter((t) => t !== tag) : [...prevTags, tag]
    );
  };

  // Filter posts based on selected tags
  const filteredPosts = posts.filter((post) =>
    selectedTags.every((tag) => post.tags.includes(tag))
  );

  const handleQuery = (e) => {
    e.preventDefault();
    
    const message = e.target[0].value.trim(); 
    
    if (!message) {
      toast.error("Please enter a valid query");
      return;
    }

    if(!user){
      toast.error("Please login to chat with your dost");
      return;
    }
  
    setChats((prevChats) => [...prevChats, "ml-auto"+message]); 
    e.target[0].value = "";  
    setLoading(true);
  
    axios.post(`${BackendURL}/chatbot/generate-response/`, {
      text: message,  
      user_id: user._id,
    })
    .then((res) => {
      setChats((prevChats) => [...prevChats, "mr-auto"+res.data.response.slice(14)]);  
      setLoading(false);
    })
    .catch((err) => {
      console.error("Error:", err);
      toast.error("Error in fetching response");
      setLoading(false);
    });
  };  

  return (
    // space-y-6 flex justify-evenly
    <div>
      <ToastContainer />
    <div className="grid grid-cols-5 p-2">
      {/* Top Selection/Tag-Adding Section */}
      {/* <ToastContainer /> */}
      <Card className="hidden lg:block col-span-1 border-none border-r-4 border-gray-700 transition-shadow duration-300 mt-6 p-4 bg-white text-[#4A4A4A] rounded-none ">
    <div  >

    <h1 className='text-xl xl:text-2xl  bg-white text-center mb-4 p-2 font-bold rounded-md border-gray-300 border-2 '>Filter By Tags </h1>
      <div className="flex flex-wrap gap-2 mb-4 ">
        {tags.map((tag) => (
          <button
          key={tag}
          className={`px-1 py-2 rounded-lg w-full text-sm border border-gray-300 ${selectedTags.includes(tag) ? 'bg-dark text-white' : 'bg-white text-dark'}`}
          onClick={() => handleTagSelect(tag)}
          >
            # {tag}
          </button>
        ))} 
      </div>
        </div>
      </Card>

      <div className=' col-span-5 lg:col-span-4 w-full h-full'>
      {user? 
      <PostForm/>
      :
      <div className="border rounded-lg text-center py-4 text-3xl font-extrabold bg-gradient-to-r text-[#817f7f] bg-clip-text animate-fade-in">
        Safe Space
      </div>}

        <motion.div
      ref={scrollRef}
      className="w-full p-0 overflow-y-auto overflow-x-hidden custom-scrollbar"
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      transition={{ ease: 'easeInOut', duration: 0.5 }}
    >
      <div className={`w-full ${user ? "max-h-[28rem]" : "max-h-screen"}`}>
        <div className="mt-0 lg:hidden border-none border-r-4 border-gray-700 transition-shadow duration-300 p-2 bg-white text-[#4A4A4A] rounded-none">
          <h1 className='text-lg bg-white text-center mb-4 p-2 font-bold rounded-md border-gray-300 border-2'>Filter By Tags</h1>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag) => (
              <button
                key={tag}
                className={`px-2 py-2 rounded-lg text-sm border border-gray-300 ${selectedTags.includes(tag) ? 'bg-dark text-white' : 'bg-white text-dark'}`}
                onClick={() => handleTagSelect(tag)}
              >
                # {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Display filtered posts */}
        {filteredPosts.length === 0 ? (
          <p className="text-gray-600">No posts match the selected tags.</p>
        ) : (
          filteredPosts.slice().reverse().map((post) => (
            <Link to={`/safespace/${post._id}`} key={post._id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <PostPreview key={post.id} post={post} />
              </motion.div>
            </Link>
          ))
        )}
      </div>
    </motion.div>
      </div>
    </div>
    {/* {showBot ? (
      <div className="fixed bottom-[35vh] right-5 z-[999] bg-gray-200 p-2 rounded-lg h-[500px] flex flex-col shadow-lg">
      <div className="flex justify-between m-2">
          <span className="font-bold text-lg">Your Dost</span>
          <button
            onClick={() => {
              setLoading(false);
              setShowBot(!showBot);
              setChats(["mr-autoHello! How can I help you?"]);
            }}
          >
            <RxCross2 size={24} className="text-gray-600 hover:text-red-500" />
          </button>
        </div>

        <div
          className="flex flex-col gap-3 my-2 max-h-[400px] overflow-y-auto px-2"
          style={{ scrollbarWidth: "none" }}
        >
          {chats.map((chat, index) => (
            <div
              key={index}
              className={`bg-dark text-white p-2 rounded-lg w-60 text-left ${chat.slice(0, 7)}`}
            >
              {chat.slice(7)}
            </div>
          ))}
        </div>

        <form className="mt-auto flex items-center" onSubmit={handleQuery}>
          <input
            type="text"
            placeholder="Write something..."
            className="border-2 border-gray-300 p-2 rounded-lg w-60"
          />
          {loading ? (
            <span className="ml-2 py-2 px-6 bg-dark rounded-lg">
              <ClipLoader color="white" size={18} />
            </span>
          ) : (
            <button className="ml-2 bg-dark text-white p-2 rounded-lg">
              Submit
            </button>
          )}
        </form>
      </div>
    ) : (
      <button
        className="fixed bottom-[35vh] right-5 z-[999]"
        onClick={() => setShowBot(!showBot)}
      >
        <FaRobot size={56} className="text-gray-600 hover:text-blue-500" />
      </button>
    )} */}
    </div>
  );
};

export default SafeSpace;
