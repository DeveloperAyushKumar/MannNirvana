import React, { useState } from 'react';
import PostPreview from '../../components/PostPreview';

const SafeSpace = () => {
  // Example posts with tags
  const posts = [
    {
      title: 'Overcoming Anxiety',
      description: 'A personal story of overcoming anxiety and finding peace.',
      author: 'Jane Doe',
      id: '1',
      likes: 120,
      comments: 35,
      tags: ['Mental Health', 'Inspiration'],
      image: 'https://via.placeholder.com/500',
    },
    {
      title: 'Finding Balance',
      description: 'Tips for maintaining balance during stressful times.',
      author: 'John Smith',
      id: '2',
      likes: 85,
      comments: 15,
      tags: ['Stress Relief', 'Wellness'],
      image: '',
    },
    {
      title: 'Coping with Depression',
      description: 'A guide to managing depression with self-care.',
      author: 'Sarah Lee',
      id: '3',
      likes: 45,
      comments: 10,
      tags: ['Mental Health', 'Self-care'],
      image: 'https://via.placeholder.com/500',
    },
  ];

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

  return (
    <div className="space-y-4">
      {/* Top Selection/Tag-Adding Section */}
      <div className="flex flex-wrap gap-2 mb-4">
        {['Mental Health', 'Inspiration', 'Stress Relief', 'Wellness', 'Self-care'].map((tag) => (
          <button
            key={tag}
            className={`px-4 py-2 rounded-lg text-sm border border-gray-300 ${selectedTags.includes(tag) ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
            onClick={() => handleTagSelect(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Display filtered posts */}
      {filteredPosts.length === 0 ? (
        <p className="text-gray-600">No posts match the selected tags.</p>
      ) : (
        filteredPosts.map((post) => (
          <PostPreview key={post.id} post={post} />
        ))
      )}
    </div>
  );
};

export default SafeSpace;
