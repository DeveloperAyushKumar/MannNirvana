import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useAddPostMutation } from "../redux/features/posts/postsApi.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage ,faCamera, faUpload } from '@fortawesome/free-solid-svg-icons';
import { useWalletContext } from "../context/WalletContext.jsx";
import availableTags from '../utils/tags.js';
import ClipLoader from "react-spinners/ClipLoader";
import { FaArrowCircleDown, FaArrowCircleUp } from "react-icons/fa";
import {motion} from 'motion/react'
export default function PostForm() {
  const [dropDown, setDropDown]=useState(true) 
  const [post, setPost] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const {user, isConnected} = useWalletContext();
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [addPost, { isError, error }] = useAddPostMutation();

  const handleSubmit = async () => {
    setIsLoading(true);
    if(!user){
      notify("Please login to add post", "warn");
      setIsLoading(false);
      return;
    }
    if (!post.trim()) return;

    try {
      const hateSpeechUrl = import.meta.env.VITE_BACKEND_URL;

      // Hate detection
      const hateResponse = await axios.post(`${hateSpeechUrl}/posts/detect-hate-speech`, {text: post}, {
        headers: { "Content-Type": "application/json" },
      });

      if (hateResponse.status === 250) {
        notify("Please Maintain a Safe Space Here", "warn");
        setIsLoading(false);
        return;
      }

      const data = {
        content: post,
        tags: tags,
        ...(file && { image_file: file }),
        user: { _id: user._id}, 
      };

      // Post submission if no hate speech is detected
      const response = await addPost(data).unwrap();
      console.log('Post submitted successfully:', response.data);

      // Clear the form after successful submission
      setPost("");
      setFile(null);
      setPreview(null);
      setTags([]); // Reset selected tags
      notify("posted successfully!", "success");
    } catch (error) {
      console.error('Error submitting post:', error);
      notify("Error analyzing post. Please try again later.", "error");
    } finally {
      setIsLoading(false);
    }
  };


  function toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const notify = (text, type) => {
    if (type === "warn") {
      toast.warning(text, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        style: { fontSize: "16px", fontWeight: "bold", color: "#ff9800" }, // Warning color (orange)
      });
    } else if (type === "success") {
      toast.success(text, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        style: { fontSize: "16px", fontWeight: "bold", color: "#28a745" }, // Success color (green)
      });
    } else if (type === "error") {
      toast.error(text, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        style: { fontSize: "16px", fontWeight: "bold", color: "#dc3545" }, // Error color (red)
      });
    }
  };  

  const handleImageChange = async (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile.size > 300 * 1024) {
      notify("Image size should be less than 300KB", "warn");
      return;
    }

    try {
      const base64 = await toBase64(selectedFile);
      setFile({ name: selectedFile.name, image: base64 });
      setPreview(base64);
    } catch (error) {
      console.error("Error converting image to base64:", error);
    }
  };

  const handleTagClick = (tag) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };


  return (
    <div className="mx-auto p-4 pb-2 rounded-r-md bg-white text-[#4A4A4A] border-white border-b-4">
      <Textarea
        placeholder="Write your post..."
        value={post}
        onChange={(e) => setPost(e.target.value)}
        className="mb-2 text-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-dark focus:border-dark"
      />
      {preview && (
        <div className="mt-1 mb-2 w-full">
          <img src={preview} alt="Preview" className="mt-2 w-full h-48 object-cover rounded-md" />
        </div>
      )}
      
      {/* Updated tags display */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, idx) => (
          <span 
            onClick={() => setTags(tags.filter((t) => t !== tag))}
            key={idx} 
            className="px-3 py-1 bg-light rounded-lg cursor-pointer hover:bg-gray-300 transition-colors"
          >
            # {tag}
          </span>
        ))}
      </div>
<motion.div
initial={false}
animate={{height:dropDown?"auto":0,opacity:dropDown?1:0}}
transition={{duration:0.4,ease:"easeInOut"}}
className="overflow-hidden flex justify-between gap-1"
>

      <div className={`flex justify-between gap-1`}>
        <div className="mb-2 w-full">
          <p className="font-bold text-lg mb-2">Tags</p>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag, idx) => {
              if(tags.includes(tag)) return null;
              return (
                <button
                key={idx}
                onClick={() => handleTagClick(tag)}
                className="px-3 py-1 border border-dark text-dark rounded-lg hover:bg-light w-auto"
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row w-1/4 lg:justify-around mt-4 gap-2">
          <Button className="flex text-md bg-dark rounded-lg items-center w-full max-h-10 m-0 py-5">
            <label htmlFor="imageUpload" className="cursor-pointer">
              <div className="flex items-center gap-1 text-white">
                <FontAwesomeIcon icon={faUpload} className="text-white" />
                Upload
              </div>
            </label>
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              />
          </Button>
  
          <Button onClick={handleSubmit} disabled={isLoading} className="w-full text-white text-md max-h-10 bg-dark">
            {isLoading ? <ClipLoader color="#ffffff" size={20} /> : "Post"}
          </Button>
        </div>
      </div>
              </motion.div>
              <motion.button
  className="w-full flex justify-end mt-2"
  onClick={() => setDropDown(!dropDown)}
  initial={false}
  animate={{ rotate: dropDown ? 180 : 0 }}
  transition={{ duration: 0.4, ease: "easeInOut" }}
>
  <FaArrowCircleDown className="size-7" />
</motion.button>
    </div>
  );
}
