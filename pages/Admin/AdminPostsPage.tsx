import React, { useState, useEffect, useCallback } from 'react';
import { BlogPost } from '../../types';
import { MOCK_BLOG_POSTS } from '../../constants';
import PostListItem from '../../components/Admin/PostListItem';
import Button from '../../components/Button';
import LoadingSpinner from '../../components/LoadingSpinner';
import PostForm from '../../components/Admin/PostForm';

const AdminPostsPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState<BlogPost | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchPosts = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setPosts([...MOCK_BLOG_POSTS].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleCreatePost = () => {
    setCurrentPost(undefined);
    setIsFormOpen(true);
  };

  const handleEditPost = (post: BlogPost) => {
    setCurrentPost(post);
    setIsFormOpen(true);
  };

  const handleDeletePost = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API call
      
      const index = MOCK_BLOG_POSTS.findIndex(p => p.id === id);
      if (index > -1) {
        MOCK_BLOG_POSTS.splice(index, 1); // Mutate for demo purposes
      }
      fetchPosts(); // Re-fetch or update state
    }
  };

  const handleFormSubmit = async (post: BlogPost) => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call

    if (post.id) {
      // Edit existing post
      const index = MOCK_BLOG_POSTS.findIndex(p => p.id === post.id);
      if (index > -1) {
        MOCK_BLOG_POSTS[index] = { ...post, date: new Date().toISOString() }; // Update date on edit
      }
    } else {
      // Create new post
      const newId = (MOCK_BLOG_POSTS.length + 1).toString();
      const newPost = { ...post, id: newId, date: new Date().toISOString(), views: 0 };
      MOCK_BLOG_POSTS.unshift(newPost); // Add to beginning for demo
    }

    fetchPosts();
    setIsFormOpen(false);
    setIsSubmitting(false);
  };

  const handleFormCancel = () => {
    setIsFormOpen(false);
    setCurrentPost(undefined);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">Manage Posts</h1>
        <Button variant="primary" onClick={handleCreatePost}>
          Add New Post
        </Button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="space-y-4">
          {posts.length === 0 ? (
            <p className="text-gray-700 dark:text-gray-300 text-lg text-center">No posts found.</p>
          ) : (
            posts.map((post) => (
              <PostListItem
                key={post.id}
                post={post}
                onEdit={handleEditPost}
                onDelete={handleDeletePost}
                isLoading={loading}
              />
            ))
          )}
        </div>
      )}

      {isFormOpen && (
        <Modal onClose={handleFormCancel}>
          <PostForm
            initialData={currentPost}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
            isLoading={isSubmitting}
          />
        </Modal>
      )}
    </div>
  );
};

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-[100]">
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-3xl font-bold"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default AdminPostsPage;
