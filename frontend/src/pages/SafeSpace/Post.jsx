import React, { useState } from 'react';
import { Avatar} from '@/components/ui/avatar';
import{ Card, CardContent, CardFooter} from '@/components/ui/card';
import { Button} from'@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';


const post = {
    id: 1,
    title: 'Understanding Anxiety: A Journey to Overcome Fear',
    author: 'John Doe',
    authorImage: '/path/to/image.jpg',
    description: 'This post explores what anxiety is, how it affects us, and practical ways to cope with it.',
    likes: 42,
    comments: [
      { author: 'Jane Smith', text: 'Great insights! Thank you for sharing.' },
      { author: 'Sarah Lee', text: 'This really helped me understand anxiety better.' },
    ],
    image: '/path/to/post-image.jpg', // Optional
    date: 'January 29, 2025',
  };
const PostPage = () => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(post.comments);

  // Handle comment submission
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments([...comments, { author: 'User', text: comment }]);
      setComment(''); // Reset comment input
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* Post Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>

      {/* Post Content */}
      <Card className="w-full max-w-3xl mx-auto mb-8 p-4 border border-gray-200 rounded-lg space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar src={post.authorImage} alt={post.author} className="w-10 h-10" />
          <div className="flex flex-col">
            <span className="font-semibold text-lg text-gray-800">{post.author}</span>
            <span className="text-sm text-gray-500">{post.date}</span>
          </div>
        </div>

        {/* Post Description */}
        <CardContent>
          <p className="text-gray-600">{post.description}</p>

          {/* Image (Optional) */}
          {post.image && <img src={post.image} alt="Post Image" className="w-full h-auto rounded-md mt-4" />}
        </CardContent>

        {/* Post Footer (Likes) */}
        <CardFooter className="flex justify-between items-center">
          <div className="flex space-x-4 text-sm text-gray-500">
            <span>{post.likes} Likes</span>
          </div>
          <Button variant="outline" size="sm">Like</Button>
        </CardFooter>
      </Card>

      {/* Comments Section */}
      <div className="space-y-4 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">Comments</h2>

        {/* Display Comments */}
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="flex items-start space-x-4 border-b pb-4">
              <Avatar src="/path/to/user-avatar.jpg" alt={comment.author} className="w-8 h-8" />
              <div>
                <span className="font-semibold text-gray-800">{comment.author}</span>
                <p className="text-gray-600">{comment.text}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        )}

        {/* Add a Comment */}
        <form onSubmit={handleCommentSubmit} className="flex items-center space-x-2">
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full border-gray-300 rounded-md p-2"
            rows={3}
          />
          <Button type="submit" variant="solid" size="sm" className="px-4 py-2">Post Comment</Button>
        </form>
      </div>
    </div>
  );
};

export default PostPage;
