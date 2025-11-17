import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../types';

interface BlogPostCardProps {
  post: BlogPost;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <Link to={`/blog/${post.slug}`}>
        <img
          src={post.imageUrl || 'https://picsum.photos/600/300'}
          alt={post.title}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
        />
      </Link>
      <div className="p-5">
        <div className="flex flex-wrap gap-2 mb-2">
          <Link to={`/category/${post.category.toLowerCase()}`} className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide hover:underline">
            {post.category}
          </Link>
          {post.tags.slice(0, 2).map((tag, index) => (
            <Link key={index} to={`/tag/${tag.toLowerCase()}`} className="text-xs font-medium text-gray-500 dark:text-gray-400 hover:underline">
              #{tag}
            </Link>
          ))}
        </div>
        <Link to={`/blog/${post.slug}`}>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">
            {post.title}
          </h3>
        </Link>
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>By {post.author}</span>
          <span>{new Date(post.date).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default BlogPostCard;
