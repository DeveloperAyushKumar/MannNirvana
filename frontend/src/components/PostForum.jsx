import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from 'axios';
import { useAddPostMutation } from "../redux/features/posts/postsApi.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage ,faCamera, faUpload } from '@fortawesome/free-solid-svg-icons';

export default function PostForm() {
  const [post, setPost] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [tags, setTags] = useState([]);
  const [addPost, { isLoading, isError, error }] = useAddPostMutation();
  
  const availableTags = ["MentalHealthMatters","Grief","HealingJourney","EmotionalSupport","MentalHealthAwareness","VulnerableButStrong","YouAreNotAlone","BreakingTheSilence","SelfCompassion","HealingTogether"];

  const handleSubmit = async () => {
    // ... (previous submit logic remains the same)
  };

  function toBase64(file) {
    // ... (previous toBase64 function remains the same)
  }

  const handleImageChange = async (e) => {
    // ... (previous image change logic remains the same)
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