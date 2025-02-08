import React, { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts/news`);
        if (!response.ok) {
          throw new Error("Failed to fetch articles");
        }

        const data = await response.json();
        setArticles(data.articles || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    
    <div className="p-4 w-full mx-auto">
      <h1 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-teal-600 via-cyan-700 to-blue-900 text-transparent bg-clip-text drop-shadow-lg">
  Women’s Mental Health News
</h1>
      {loading && <p className="text-center text-gray-600">Loading articles...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <ScrollArea className=" w-full border-white border-2 rounded-sm p-2">
      <div className="grid md:grid-cols-3 lg:grid-cols-5  gap-4 max-h-[40rem] ">
  {articles.map((article, index) => (
    <a
      key={index}
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-6 bg-blue-50 border border-gray-200 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition duration-300 backdrop-blur-md"
    >
      <img 
        src={article.urlToImage || "https://via.placeholder.com/400"} 
        alt={article.title} 
        className="w-full h-48 object-cover rounded-xl"
      />
      <h2 className="text-xl font-bold text-gray-800 mt-3">{article.title}</h2>
      <p className="text-gray-600 mt-2 line-clamp-3">{article.description}</p>
      <span className="text-indigo-600 font-medium mt-3 inline-block">Read more →</span>
    </a>
  ))}
</div>
   </ScrollArea>

    </div>
  );
};

export default News;