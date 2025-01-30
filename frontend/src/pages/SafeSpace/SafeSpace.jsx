import React, { useEffect, useState } from 'react';
import PostPreview from '../../components/PostPreview';
import PostForm from '@/src/components/PostForum';
import { Card } from '@/components/ui/card';
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from '@radix-ui/react-separator';
import { useFetchAllPostsQuery } from '@/src/redux/features/posts/postsApi';

import { Link } from 'react-router';
// import { use } from 'react';

const SafeSpace = () => {
  // Example posts with tags
  const {data:posts=[]} = useFetchAllPostsQuery();
  // console.log(posts)

  // State for selected tags and filtering
  const [selectedTags, setSelectedTags] = useState([]);

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

  useEffect(() => {
    axios.get(`${backendUrl}/posts`)
    .then((response) => {
      setPosts(response.data.posts);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <div className="space-y-6 flex justify-evenly max-h-screen">
      {/* Top Selection/Tag-Adding Section */}
  <Card className="max-w-sm shadow-lg hover:shadow-xl transition-shadow duration-300 mt-6 max-h-80 p-4 bg-[#F5E8F9] border border-[#DADADA] text-[#4A4A4A]">
    <h1 className='text-2xl bg-white text-center mb-4 p-2 font-bold rounded-md border-gray-300 border-2 '>Tags </h1>
      <div className="flex flex-wrap gap-2 mb-4 ">
        {['Mental Health', 'Inspiration', 'Women', 'Stress Relief', 'Wellness', 'Self-care'].map((tag) => (
          <button
          key={tag}
          className={`px-4 py-2 rounded-lg text-sm border border-gray-300 ${selectedTags.includes(tag) ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
          onClick={() => handleTagSelect(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
        </Card>

    <div className='w-2/3 max-h-screen flex flex-col gap-8'>
      <PostForm/>

      <ScrollArea className="shadow-lg">
      <div className='w-full max-h-[26rem] '>

      {/* Display filtered posts */}
      {filteredPosts.length === 0 ? (
        <p className="text-gray-600">No posts match the selected tags.</p>
      ) : (
        filteredPosts.map((post) => (
          <Link to={"/safespace/"+post._id} key={post._id}>
          <PostPreview key={post.id} post={post}  />
          <Separator className='my-2'/>
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
