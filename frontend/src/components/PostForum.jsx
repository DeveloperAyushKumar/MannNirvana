import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from 'axios';
import { useAddPostMutation } from "../redux/features/posts/postsApi.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage ,faCamera, faUpload } from '@fortawesome/free-solid-svg-icons';
import { useWalletContext } from "../context/WalletContext.jsx";
import availableTags from '../utils/tags.js';

export default function PostForm() {
  const [post, setPost] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const {user, isConnected} = useWalletContext();
  const [tags, setTags] = useState([]);
  const [addPost, { isLoading, isError, error }] = useAddPostMutation();

  const handleSubmit = async () => {
    if(!user){
      alert("Please login to add post");
      return;
    }
    if (!post.trim()) return;

    try {
      const hateSpeechUrl = import.meta.env.VITE_HATE_SPEECH_API;

      // Hate detection
      const hateResponse = await axios.post(`${hateSpeechUrl}/analyze-text/`, {text: post, user_id: user._id}, {
        headers: { "Content-Type": "application/json" },
      });

      console.log('Hate speech response:', hateResponse.data, hateResponse.status);
      if (hateResponse.status === 250) {
        alert("Please Maintain a Safe Space Here");
        return;
      }

      const data = {
        content: post,
        tags: tags,
        ...(file && { image_file: file }),
        user: { _id: user._id }, 
      };

      // Post submission if no hate speech is detected
      const response = await addPost(data).unwrap();
      console.log('Post submitted successfully:', response.data);

      // Clear the form after successful submission
      setPost("");
      setFile(null);
      setPreview(null);
      setTags([]); // Reset selected tags

    } catch (error) {
      console.error('Error submitting post:', error);
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


  const handleImageChange = async (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile.size > 300 * 1024) {
      alert("Please select an image smaller than 100KB.");
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
    <div className="mx-auto p-4 rounded-r-md bg-white text-[#4A4A4A] border-white border-b-4">
      <Textarea
        placeholder="Write your post..."
        value={post}
        onChange={(e) => setPost(e.target.value)}
        className="mb-4 text-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-dark focus:border-dark"
      />
      {preview && (
        <div className="mt-1 w-full">
          <img src={preview} alt="Preview" className="mt-2 max-h-96 object-cover rounded-md" />
        </div>
      )}
      
      {/* Updated tags display */}
      <div className="flex flex-wrap gap-2 mb-4">
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

      <div className="flex justify-between">
        <div className="mb-4 w-full">
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

        <div className="flex w-1/4 justify-around mt-6">
          <Button className="flex bg-dark rounded-lg items-center space-x-2 max-h-10 m-0">
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
  
          <Button onClick={handleSubmit} className="text-white max-h-10 bg-extraDark">
            Add Post
          </Button>
        </div>
      </div>
    </div>
  );
}