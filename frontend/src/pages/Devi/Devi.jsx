import React, { useState, useEffect } from "react";

const API_KEY = "b6e0fb0b17ae48f1ae12106a82068657"; 
const URL = `https://newsapi.org/v2/everything?q=women%20mental%20health&sortBy=publishedAt&apiKey=${API_KEY}`;

const Devi = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(URL);
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
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-teal-600 via-cyan-700 to-blue-900 text-transparent bg-clip-text drop-shadow-lg">
  Women’s Mental Health News
</h1>
      {loading && <p className="text-center text-gray-600">Loading articles...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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

    </div>
  );
};

export default Devi;
