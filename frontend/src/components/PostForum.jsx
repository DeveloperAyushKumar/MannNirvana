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
  
  const availableTags = ["Mental Health", "Inspiration", "Stress Relief", "Wellness", "Self-care", "Women"];

  const handleSubmit = async () => {
    if (!post.trim()) return;
  
    try {
      const hateSpeechUrl = import.meta.env.VITE_HATE_SPEECH_API;

      
      // hate detection 
      const hateResponse = await fetch(hateSpeechUrl,{
        method:'POST',
        headers:{"Content-type":"application.json",
        body :JSON.stringify({post}),

        },

      })
      if(hateResponse.status!=200){
        alert("Remove Content Detected !! Please Maintain a Safe Space Here "
        )
        return 
      }
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
    <div className="mx-auto p-4 rounded-r-md bg-[#FFF8E6] text-[#4A4A4A] border-white  border-b-4">
      <Textarea
      
        placeholder="Write your post..."
        value={post}
        onChange={(e) => setPost(e.target.value)}
        className="mb-4 text-[#4A4A4A]"
      />
         {preview && (
        <div className="mt-1 w-full">
          {/* <p className="text-sm text-gray-600">Image Preview:</p> */}
          <img src={preview} alt="Preview" className="mt-2 max-h-96 object-cover rounded-md" />
        </div>
      )}
      <p>
        {tags.map((tag, idx) => (
          <span onClick={(e)=>{
            setTags(tags.filter((t) => t !== tag));
          }} key={idx} className="text-blue-500 rounded-lg mr-2"># {tag}</span>
        ))}
      </p>

    <div className="flex justify-between">
      <div className="mb-4 w-1/2">
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

      <div className="flex w-1/4 justify-between mt-6">
      <Button className="flex  bg-blue-500 rounded-lg items-center space-x-2 max-h-10 m-0">
  <label htmlFor="imageUpload" className="cursor-pointer">
<div className="flex items-center   gap-1  text-white">
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

  
      <Button onClick={handleSubmit} className=" text-white max-h-10 bg-blue-500 ">
        Add Post
      </Button>
      </div>

      </div>
    </div>
  );
}
