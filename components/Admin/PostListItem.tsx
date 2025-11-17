import React from 'react';
import { BlogPost } from '../../types';
import Button from '../Button';

interface PostListItemProps {
  post: BlogPost;
  onEdit: (post: BlogPost) => void;
  onDelete: (id: string) => void;
  isLoading?: boolean;
}

const PostListItem: React.FC<PostListItemProps> = ({ post, onEdit, onDelete, isLoading }) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center mb-4 md:mb-0">
        <img
          src={post.imageUrl || 'https://picsum.photos/100/60'}
          alt={post.title}
          className="w-20 h-12 object-cover rounded-md mr-4"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">{post.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium">{post.author}</span> | {new Date(post.date).toLocaleDateString()} | {post.category}
          </p>
        </div>
      </div>
      <div className="flex space-x-2 w-full md:w-auto justify-end">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onEdit(post)}
          disabled={isLoading}
        >
          Edit
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={() => onDelete(post.id)}
          disabled={isLoading}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default PostListItem;
