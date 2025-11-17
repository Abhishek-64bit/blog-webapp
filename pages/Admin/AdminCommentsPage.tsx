import React, { useState, useEffect, useCallback } from 'react';
import { Comment } from '../../types';
import { MOCK_COMMENTS, MOCK_BLOG_POSTS } from '../../constants';
import Button from '../../components/Button';
import LoadingSpinner from '../../components/LoadingSpinner';

const AdminCommentsPage: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null); // To track which comment is being acted upon

  const fetchComments = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      // Deep copy to avoid direct mutation of constant if needed, though slice usually suffices
      const sortedComments = [...MOCK_COMMENTS].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setComments(sortedComments);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleModerateComment = async (id: string, approve: boolean) => {
    setActionLoading(id);
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API call

    const commentIndex = MOCK_COMMENTS.findIndex(c => c.id === id);
    if (commentIndex > -1) {
      MOCK_COMMENTS[commentIndex].approved = approve; // Mutate for demo
    }
    fetchComments(); // Re-fetch or update state
    setActionLoading(null);
  };

  const handleDeleteComment = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      setActionLoading(id);
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API call
      
      const index = MOCK_COMMENTS.findIndex(c => c.id === id);
      if (index > -1) {
        MOCK_COMMENTS.splice(index, 1); // Mutate for demo
      }
      fetchComments(); // Re-fetch or update state
      setActionLoading(null);
    }
  };

  const getPostTitle = (postId: string) => {
    return MOCK_BLOG_POSTS.find(p => p.id === postId)?.title || 'Unknown Post';
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6">Comment Moderation</h1>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="space-y-4">
          {comments.length === 0 ? (
            <p className="text-gray-700 dark:text-gray-300 text-lg text-center">No comments to display.</p>
          ) : (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md border-l-4
                  border-indigo-500 dark:border-indigo-400
                  flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    On post: <span className="font-medium text-indigo-600 dark:text-indigo-400">{getPostTitle(comment.postId)}</span>
                  </p>
                  <p className="text-gray-900 dark:text-white font-semibold text-lg line-clamp-1">{comment.author}</p>
                  <p className="text-gray-700 dark:text-gray-300 mt-1 line-clamp-3">{comment.content}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{new Date(comment.date).toLocaleString()}</p>
                </div>
                <div className="flex space-x-2 flex-shrink-0 w-full md:w-auto justify-end">
                  {!comment.approved ? (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleModerateComment(comment.id, true)}
                      isLoading={actionLoading === comment.id}
                      disabled={actionLoading !== null}
                    >
                      {actionLoading === comment.id ? 'Approving...' : 'Approve'}
                    </Button>
                  ) : (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleModerateComment(comment.id, false)}
                      isLoading={actionLoading === comment.id}
                      disabled={actionLoading !== null}
                    >
                      {actionLoading === comment.id ? 'Unapproving...' : 'Unapprove'}
                    </Button>
                  )}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteComment(comment.id)}
                    isLoading={actionLoading === comment.id}
                    disabled={actionLoading !== null}
                  >
                    {actionLoading === comment.id ? 'Deleting...' : 'Delete'}
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AdminCommentsPage;
