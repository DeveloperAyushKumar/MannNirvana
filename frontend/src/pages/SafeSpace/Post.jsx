import React, { useState,useEffect } from 'react';
import{ Card, CardContent, CardFooter} from '@/components/ui/card';
import { Button} from'@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAddCommentMutation, useFetchPostByIdQuery, useLikePostMutation } from '@/src/redux/features/posts/postsApi';
import { useParams } from 'react-router';
import { useWalletContext } from '../../context/WalletContext';
import avatar from '../../assets/user.png';



const PostPage = () => {
  const postId=useParams().id;
  const {user} = useWalletContext();
  const {data:post={},} =useFetchPostByIdQuery(postId);
  const[likes,setLikes]=useState(post.likes?post.likes:0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  useEffect(() => {
    if (post?.comments) {
        setComments(post.comments);
    }
    if(post?.likes){
        setLikes(post.likes.length);
    }
}, [post]);

  console.log(comments)
  const[likePost]=useLikePostMutation();
  const[addComment]=useAddCommentMutation();
// console.log(post)

  // Handle comment submission
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments([...comments, { author: 'User', text: comment }]);
      setComment(''); // Reset comment input
      addComment({id:post._id,user:user,text:comment});
    }
  };
  const handleLike = async () => {
    const prevLikes = likes;
    setLikes((prev) => prev + 1); // Optimistically update UI
  
    try {
      const response = await likePost({ id: post._id, user: user }).unwrap();
      console.log(response)
      if (response) {
        setLikes(response.likes.length); // Sync with API response
      }
    } catch (error) {
      console.error('Error liking the post:', error);
      setLikes(prevLikes); // Revert on error
      alert(error.data.message)
      
    }
  };
  

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* Post Content */}
      <Card className="w-full max-w-3xl mx-auto mb-8 p-4 border border-gray-200 rounded-lg space-y-4">
        <div className="flex items-center space-x-4">
          {post.author?.avatar && <img 
            src={post.author.avatar || avatar} 
            alt="Author Image" 
            className="w-8 h-8 rounded-full"
          />}

          <div className="flex flex-col">
            <span className="font-semibold text-lg text-gray-800">{post.author?.name}</span>
          </div><span className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>

        {/* Post Description */}
        <CardContent className="border-2 border-white rounded-lg ">
          {/* Image (Optional) */}
          {post.image && <img src={post.image} alt="Post Image" className="w-full h-auto rounded-md mt-4 mb-8" />}
          <p className="text-gray-800 text-lg font-primary">{post.content}</p>

        </CardContent>

        {/* Post Footer (Likes) */}
        <CardFooter className="flex justify-between items-center">
          <Button onClick={handleLike} className="bg-dark text-white font-semibold" size="sm">{likes} Like</Button>
        </CardFooter>
      </Card>

      {/* Comments Section */}
      <div className="space-y-4 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">Comments</h2>

        {/* Display Comments */}
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="flex items-start space-x-4 border-b pb-4 border-white ">
              <img 
                src={avatar} 
                alt="User Avatar" 
                className="w-8 h-8 rounded-full"
              />
              <div>
                <span className="font-semibold text-gray-800">{comment.authorName?.name?comment.authorName?.name:"Anonymous User"}</span>
                <p className="text-gray-900">{comment.text}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-900">No comments yet. Be the first to comment!</p>
        )}

        {/* Add a Comment */}
        <form onSubmit={handleCommentSubmit} className="flex items-center space-x-2">
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-dark focus:border-dark"
            rows={3}
          />
          <Button type="submit" variant="solid" size="sm" className="px-4 py-2 bg-extraDark text-white text-md ">Comment</Button>
        </form>
      </div>
    </div>
  );
};

export default PostPage;
