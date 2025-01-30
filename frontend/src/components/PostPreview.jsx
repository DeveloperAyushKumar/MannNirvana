import React from 'react';
import { Card, CardContent, CardTitle } from "@/components/ui/card"; // ShadCN Card components
import { Heart, MessageCircle } from 'react-feather'; // Icons for Likes and Comments
  
const PostPreview = ({post}) => {
  return (
    <Card className=" mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300 bg-[#FFF8E6]">
      
      {/* Render image if available */}
      {post.image && (
        <img 
          src={post.image} 
          alt="Post image" 
          className="w-full h-48 object-cover rounded-t-lg" 
        />
      )}
      
      {/* <CardTitle className="text-xl font-semibold text-gray-900 mt-4">{post.title}</CardTitle> */}
      
      <CardContent>
        {/* Author */}
        <div className="text-sm text-gray-600">
          <strong>Author:</strong> {post.author.name}
        </div>

        {/* Post Description */}
        <p className="text-gray-700 mb-4">{post.content}</p>

        {/* Display tags using Badge */}
        {post.tags && (
          <div className="flex space-x-2 mt-4">
            {post.tags.map((tag, index) => (
              <p className='text-blue-500'># {tag} </p>
            ))}
          </div>
        )}
        
        {/* Likes and Comments */}
        <div className="flex items-center space-x-4 mt-4">
          <div className="flex items-center space-x-1">
            <Heart size={18} className="text-red-500" />
            <span className="text-gray-600">{post.likes}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MessageCircle size={18} className="text-blue-500" />
            <span className="text-gray-600">{post.comments}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostPreview;
