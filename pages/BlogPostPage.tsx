import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_BLOG_POSTS, MOCK_COMMENTS } from '../constants';
import { BlogPost, Comment } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import Button from '../components/Button';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCommentContent, setNewCommentContent] = useState('');
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentError, setCommentError] = useState('');

  useEffect(() => {
    setLoading(true);
    setPost(null);
    setComments([]);

    setTimeout(() => {
      const foundPost = MOCK_BLOG_POSTS.find((p) => p.slug === slug);
      if (foundPost) {
        setPost(foundPost);
        const postComments = MOCK_COMMENTS.filter(
          (c) => c.postId === foundPost.id && c.approved
        ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Newest first
        setComments(postComments);
      } else {
        // Handle post not found, maybe redirect to 404
        console.warn('Post not found for slug:', slug);
      }
      setLoading(false);
    }, 500);
  }, [slug]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentContent.trim()) {
      setCommentError('Comment cannot be empty.');
      return;
    }
    if (!post) return;

    setCommentLoading(true);
    setCommentError('');

    // Simulate API call to submit comment
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newComment: Comment = {
      id: `c${MOCK_COMMENTS.length + 1}`, // Simple unique ID
      postId: post.id,
      author: 'Guest User', // In a real app, this would be authenticated user
      date: new Date().toISOString(),
      content: newCommentContent,
      approved: false, // Comments typically need moderation
    };

    // Add to mock data (for UI update only, won't persist on refresh)
    MOCK_COMMENTS.push(newComment); // This modifies the global constant, for demonstration only.
    
    setComments((prevComments) => [newComment, ...prevComments]); // Add to current comments (unapproved for display)
    setNewCommentContent('');
    setCommentLoading(false);
    alert('Your comment has been submitted and is awaiting moderation.');
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!post) {
    return <div className="text-center text-red-500">Post not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <article className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden mb-10">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-80 object-cover"
        />
        <div className="p-6">
          <div className="flex flex-wrap gap-2 mb-4">
            <Link to={`/?category=${post.category.toLowerCase()}`} className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide hover:underline">
              {post.category}
            </Link>
            {post.tags.map((tag, index) => (
              <Link key={index} to={`/?tag=${tag.toLowerCase()}`} className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:underline">
                #{tag}
              </Link>
            ))}
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            {post.title}
          </h1>
          <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-6">
            <span className="mr-4">By {post.author}</span>
            <span>{new Date(post.date).toLocaleDateString()}</span>
            <span className="ml-4 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
              {post.views.toLocaleString()} views
            </span>
          </div>

          <div
            className="prose dark:prose-invert max-w-none text-gray-800 dark:text-gray-200 leading-relaxed text-lg"
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>

          {/* Social Sharing (Placeholder) */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Share this post</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200">Facebook</a>
              <a href="#" className="text-blue-400 hover:text-blue-600 dark:text-blue-300 dark:hover:text-blue-100">Twitter</a>
              <a href="#" className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200">Pinterest</a>
              <a href="#" className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">LinkedIn</a>
            </div>
          </div>
        </div>
      </article>

      {/* Comments Section */}
      <section className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Comments ({comments.length})</h2>

        {/* Comment Form */}
        <form onSubmit={handleCommentSubmit} className="mb-8 p-4 border border-gray-200 dark:border-gray-700 rounded-md">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Leave a Comment</h3>
          <div className="mb-4">
            <label htmlFor="commentContent" className="sr-only">Your Comment</label>
            <textarea
              id="commentContent"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
              rows={5}
              placeholder="Write your comment here..."
              value={newCommentContent}
              onChange={(e) => setNewCommentContent(e.target.value)}
              required
              disabled={commentLoading}
            ></textarea>
          </div>
          {commentError && <p className="text-red-500 text-sm mb-4">{commentError}</p>}
          <Button type="submit" isLoading={commentLoading} disabled={commentLoading}>
            {commentLoading ? 'Submitting...' : 'Submit Comment'}
          </Button>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Your comment will be visible after moderation.</p>
        </form>

        {comments.length > 0 ? (
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 font-semibold text-lg">
                    {comment.author.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold text-gray-900 dark:text-white">{comment.author}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(comment.date).toLocaleString()}
                    </p>
                  </div>
                </div>
                <p className="text-gray-800 dark:text-gray-200 ml-12 text-base">
                  {comment.content}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-700 dark:text-gray-300">No comments yet. Be the first to comment!</p>
        )}
      </section>
    </div>
  );
};

export default BlogPostPage;
