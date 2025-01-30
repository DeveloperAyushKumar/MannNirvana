import React from 'react';
import { Card, CardContent, CardTitle } from "@/components/ui/card"; // ShadCN Card components
import { Badge } from "@/components/ui/badge"; // ShadCN Badge component
import { Heart, MessageCircle } from 'react-feather'; // Icons for Likes and Comments

// const post = {
//     id: 1,
//     title: 'Understanding Anxiety: A Journey to Overcome Fear',
//     author: 'John Doe',
//     authorImage: '/path/to/image.jpg',
//     description: 'This post explores what anxiety is, how it affects us, and practical ways to cope with it.',
//     likes: 42,
//     comments: [
//       { author: 'Jane Smith', text: 'Great insights! Thank you for sharing.' },
//       { author: 'Sarah Lee', text: 'This really helped me understand anxiety better.' },
//     ],
//     image: '/path/to/post-image.jpg', // Optional
//     date: 'January 29, 2025',
//   };
  
const PostPreview = ({post}) => {
  console.log(post)
  return (
    <Card className=" mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300 bg-[#FFF8E6]">
      <CardTitle className="text-s font-semibold text-gray-900 mt-4 m-2">
        {post.authorName?post.authorName:"Anonymous User"}

      </CardTitle>
      
      {/* Render image if available */}
      {post.image && (
        <img 
          src={post.image} 
          alt="Post image" 
          className="w-full h-48 object-cover rounded-t-lg" 
        />
      )}
      
      
      <CardContent>
        {/* Post Description */}
        <p className="text-gray-700 mb-4">{post.content.length>200?post.content.slice(0,200):post.content}</p>

        {/* Author */}
      

        {/* Post ID (optional) */}
        {/* <div className="text-sm text-gray-600">
          <strong>Post ID:</strong> {post.id}
        </div> */}
        
        {/* Likes and Comments */}
        <div className="flex items-center space-x-4 mt-4">
          <div className="flex items-center space-x-1">
            <Heart size={18} className="text-red-500" />
            <span className="text-gray-600">{post.likes?post.likes.length:0}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MessageCircle size={18} className="text-blue-500" />
            <span className="text-gray-600">{post.comments?post.comments.length:0}</span>
          </div>
        </div>

        {/* Display tags using Badge */}
        {post.tags && (
          <div className="flex space-x-2 mt-4">
            {post.tags.map((tag, index) => (
              <Badge key={index} className="bg-blue-100 text-blue-800 p-2 w-28">
                # {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PostPreview;
