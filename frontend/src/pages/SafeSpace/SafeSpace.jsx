import React, { useState } from 'react';
import PostPreview from '../../components/PostPreview';
import PostForm from '@/src/components/PostForum';
import { Card } from '@/components/ui/card';
import { ScrollArea } from "@/components/ui/scroll-area"
import { useFetchAllPostsQuery } from '@/src/redux/features/posts/postsApi';
import tags from '../../utils/tags';
import { useWalletContext } from '../../context/WalletContext';
import { Link } from 'react-router';

const SafeSpace = () => {
  const {data:posts=[]} = useFetchAllPostsQuery();

  // State for selected tags and filtering
  const [selectedTags, setSelectedTags] = useState([]);
  const {isConnected} = useWalletContext();

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

  return (
    // space-y-6 flex justify-evenly
    <div className="grid grid-cols-5 p-2">
      {/* Top Selection/Tag-Adding Section */}
      
      <Card className="col-span-1 border-none border-r-4 border-gray-700 transition-shadow duration-300 mt-6 p-4 bg-white text-[#4A4A4A] rounded-none ">
    <div>

    <h1 className='text-2xl bg-white text-center mb-4 p-2 font-bold rounded-md border-gray-300 border-2 '>Filter By Tags </h1>
      <div className="flex flex-wrap gap-2 mb-4 ">
        {tags.map((tag) => (
          <button
          key={tag}
          className={`px-4 py-2 rounded-lg text-sm border border-gray-300 ${selectedTags.includes(tag) ? 'bg-dark text-white' : 'bg-white text-dark'}`}
          onClick={() => handleTagSelect(tag)}
          >
            # {tag}
          </button>
        ))} 
      </div>
        </div>
        <div>
          
        </div>


      </Card>

      <div className=' col-span-4 w-full h-full'>
      {isConnected? 
      <PostForm/>
      :
      <div className="border rounded-lg text-center py-4 text-3xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text drop-shadow-md animate-fade-in">
        Safe Space
      </div>}

      <ScrollArea >
      <div className={`w-full ${isConnected? "max-h-[28rem]" : "max-h-screen"}`}>

      {/* Display filtered posts */}
      {filteredPosts.length === 0 ? (
        <p className="text-gray-600">No posts match the selected tags.</p>
      ) : (
        filteredPosts.map((post) => (
          <Link to={"/safespace/"+post._id} key={post._id}>
          <PostPreview key={post.id} post={post}  />
          {/* <Separator className='my-2'/> */}
          </Link>
        ))
      )}
      </div>
      </ScrollArea>
      </div>
    </div>
  );
};

export default SafeSpace;
