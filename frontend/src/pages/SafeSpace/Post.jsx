import React, { useState,useEffect } from 'react';
import{ Card, CardContent, CardFooter} from '@/components/ui/card';
import { ToastContainer, toast } from 'react-toastify';
import { Button} from'@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAddCommentMutation, useFetchPostByIdQuery, useLikePostMutation } from '@/src/redux/features/posts/postsApi';
import { useParams } from 'react-router';
import { useWalletContext } from '../../context/WalletContext';
import avatar from '../../assets/user.png';
import axios from 'axios';


const PostPage = () => {
  const postId=useParams().id;
  const {user, isConnected} = useWalletContext();
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

  const[likePost]=useLikePostMutation();
  const[addComment]=useAddCommentMutation();

  // Handle comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      alert("Please Login to comment");
      return;
    }
    
    if (comment.trim()) {
      const hateSpeechUrl = import.meta.env.VITE_HATE_SPEECH_API;
  
      try {
        // Hate speech detection
        const hateResponse = await axios.post(`${hateSpeechUrl}/analyze-text/`, {
          text: comment, // Corrected this from `post` to `comment`
        }, {
          headers: { "Content-Type": "application/json" },
        });
  
        console.log("Hate speech response:", hateResponse.data, hateResponse.status);
  
        // Adjust condition based on actual API response
        if (hateResponse.status === 250) {
          alert("Please Maintain a Safe Space Here");
          return;
        }
  
        // Add comment if it's not flagged as hate speech
        setComments([...comments, { user, text: comment }]);
        setComment(""); // Reset comment input
        addComment({ id: post._id, user: user, text: comment });
        notify("commented successfully!", "success");
      } catch (error) {
        console.error("Error analyzing text:", error);
        notify("Error analyzing comment. Please try again later.", "error");
      }
    }
  };  

  const notify = (text, type) => {
    if (type === "warn") {
      toast.warning(text, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        style: { fontSize: "16px", fontWeight: "bold", color: "#ff9800" }, // Warning color (orange)
      });
    } else if (type === "success") {
      toast.success(text, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        style: { fontSize: "16px", fontWeight: "bold", color: "#28a745" }, // Success color (green)
      });
    } else if (type === "error") {
      toast.error(text, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        style: { fontSize: "16px", fontWeight: "bold", color: "#dc3545" }, // Error color (red)
      });
    }
  };  

  const handleLike = async () => {
    if(!user) {
      notify("Please login to Like a post", "warn");
      return 
    }
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
      notify(error.data.message, "error");
    }
  };
  

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <ToastContainer />
      {/* Post Content */}
      <Card className="w-full max-w-3xl mx-auto mb-8 p-4 border border-gray-200 rounded-lg space-y-4">
        <div className="flex items-center space-x-4">
          <img 
            src={post.author?.avatar || avatar} 
            alt="Author Image" 
            className="w-8 h-8 rounded-full"
          />

          <div className="flex flex-col">
            <span className="font-semibold text-lg text-gray-800">{post.author?.name||"Anonymous User"}</span>
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
          {user?
          <Button onClick={handleLike} className="bg-dark text-white font-semibold" size="sm">{likes} Like</Button>
          :
          <p className="p-2 rounded-md bg-dark text-white font-semibold">{likes} Likes</p>}
        </CardFooter>
      </Card>

      {/* Comments Section */}
      <div className="space-y-4 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">Comments</h2>
  {/* Add a Comment */}
  {user? <form onSubmit={handleCommentSubmit} className="flex items-center space-x-2">
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-dark focus:border-dark"
            rows={3}
          />
          <Button type="submit" variant="solid" size="sm" className="px-4 py-2 bg-extraDark text-white text-md ">Comment</Button>
        </form> : <></>}
        {/* Display Comments */}
        {comments.length > 0 ? (
          comments.slice().reverse().map((comment, index) => (
            <div key={index} className="flex items-start space-x-4 border-b pb-4 border-white ">
              <img 
                src={comment.user?.avatar||avatar} 
                alt="User Avatar" 
                className="w-8 h-8 rounded-full"
              />
              <div>
                <span className="font-semibold text-gray-800">{comment.user?comment.user.name:"Anonymous User"}</span>
                <p className="text-gray-900">{comment.text}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-900">No comments yet. Be the first to comment!</p>
        )}
      

      </div>
    </div>
  );
};

export default PostPage;
