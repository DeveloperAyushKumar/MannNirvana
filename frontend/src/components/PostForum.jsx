import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function PostForm() {
  const [post, setPost] = useState("");

  const handleSubmit = () => {
    if (!post.trim()) return;
    console.log("Post Submitted:", post);
    setPost("");
  };

  return (
    <div className="mx-auto p-4 border rounded-lg shadow-md bg-[#FFF8E6] text-[#4A4A4A]">
      <Textarea
        placeholder="Write your post..."
        value={post}
        onChange={(e) => setPost(e.target.value)}
        className="mb-4 text-[#4A4A4A]"
      />
      <Button onClick={handleSubmit} className="w-full text-white bg-blue-500">
        Add Post
      </Button>
    </div>
  );
}
