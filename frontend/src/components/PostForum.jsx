import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from 'axios';
import { useAddPostMutation } from "../redux/features/posts/postsApi.js";

export default function PostForm() {
  const [post, setPost] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [tags, setTags] = useState([]);
  const [addPost, { isLoading, isError, error }] = useAddPostMutation();
  
  const availableTags = ["Mental Health", "Inspiration", "Stress Relief", "Wellness", "Self-care", "Women"];

  const handleSubmit = async () => {
    if (!post.trim()) return;
  
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL; 
      const data = {
        content: post,
        tags: tags,
        ...(file&&{image_file: file}),
        user: { _id: '6799288f3096d820266cbd6c' }, 
      };
  
      // Make the POST request
      // const response = await axios.post(`${backendUrl}/posts`, data, {
      //   headers: {
      //     'Content-Type': 'application/json', // Sending JSON payload
      //   },
      // });
      
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

    if (selectedFile.size > 100 * 1024) {
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
    <div className="mx-auto p-4 border rounded-lg shadow-md bg-[#FFF8E6] text-[#4A4A4A]">
      <Textarea
        placeholder="Write your post..."
        value={post}
        onChange={(e) => setPost(e.target.value)}
        className="mb-4 text-[#4A4A4A]"
      />
      <p>
        {tags.map((tag, idx) => (
          <span onClick={(e)=>{
            setTags(tags.filter((t) => t !== tag));
          }} key={idx} className="text-blue-500 rounded-lg mr-2"># {tag}</span>
        ))}
      </p>

      <div className="mb-4">
        <p className="font-bold text-lg">Tags</p>
        <div className="flex flex-wrap gap-2">
          {availableTags.map((tag, idx) => {
            if(tags.includes(tag)) return null;
            return (
              <button
                key={idx}
                onClick={() => handleTagClick(tag)}
                className="px-3 py-1 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-100"
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label htmlFor="imageUpload" className="block text-sm font-medium text-gray-600">
          Upload Image <span className="text-xs ">(Optional)</span>
        </label>
        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          onChange={handleImageChange}
          className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 text-black bg-[#fff]"
        />
      </div>

      {preview && (
        <div className="mt-3">
          <p className="text-sm text-gray-600">Image Preview:</p>
          <img src={preview} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-md" />
        </div>
      )}

      <Button onClick={handleSubmit} className="w-full text-white bg-blue-500 mt-4">
        Add Post
      </Button>
    </div>
  );
}
