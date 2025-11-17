import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import BlogPostCard from '../components/BlogPostCard';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';
import { MOCK_BLOG_POSTS, MOCK_CATEGORIES, MOCK_TAGS, FEATURED_POST_IDS } from '../constants';
import { BlogPost } from '../types';

interface HomePageProps {
  searchQuery: string;
}

const POSTS_PER_PAGE = 6;

const HomePage: React.FC<HomePageProps> = ({ searchQuery }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchParams] = useSearchParams();

  const currentCategory = searchParams.get('category');
  const currentTag = searchParams.get('tag');
  const internalSearchQuery = searchParams.get('q'); // Query from header search

  useEffect(() => {
    setLoading(true);
    // Simulate API call for fetching posts
    setTimeout(() => {
      let filteredPosts = MOCK_BLOG_POSTS;

      if (currentCategory) {
        filteredPosts = filteredPosts.filter(
          (post) => post.category.toLowerCase() === currentCategory.toLowerCase()
        );
      }

      if (currentTag) {
        filteredPosts = filteredPosts.filter((post) =>
          post.tags.some((tag) => tag.toLowerCase() === currentTag.toLowerCase())
        );
      }

      const activeSearchQuery = searchQuery || internalSearchQuery;

      if (activeSearchQuery) {
        filteredPosts = filteredPosts.filter(
          (post) =>
            post.title.toLowerCase().includes(activeSearchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(activeSearchQuery.toLowerCase()) ||
            post.content.toLowerCase().includes(activeSearchQuery.toLowerCase())
        );
      }
      
      setPosts(filteredPosts);
      setCurrentPage(1); // Reset to first page on filter/search change
      setLoading(false);
    }, 500);
  }, [currentCategory, currentTag, searchQuery, internalSearchQuery]);

  const featuredPosts = useMemo(() => {
    return MOCK_BLOG_POSTS.filter(post => FEATURED_POST_IDS.includes(post.id));
  }, []);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const currentPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    return posts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  }, [currentPage, posts]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPageTitle = () => {
    if (searchQuery || internalSearchQuery) {
      return `Search Results for "${searchQuery || internalSearchQuery}"`;
    }
    if (currentCategory) {
      return `Category: ${currentCategory}`;
    }
    if (currentTag) {
      return `Tag: ${currentTag}`;
    }
    return 'All Blog Posts';
  };

  return (
    <div className="container mx-auto px-4">
      {!(searchQuery || internalSearchQuery || currentCategory || currentTag) && (
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Featured Posts</h2>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-lg shadow-md h-80"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </section>
      )}

      <section className="flex flex-col lg:flex-row gap-8 mb-12">
        <div className="lg:w-3/4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{getPageTitle()}</h2>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 animate-pulse">
              {[...Array(POSTS_PER_PAGE)].map((_, i) => (
                <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-lg shadow-md h-64"></div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <p className="text-gray-700 dark:text-gray-300 text-lg">No posts found matching your criteria.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {currentPosts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          )}
          {!loading && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />}
        </div>

        <aside className="lg:w-1/4 space-y-8">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Categories</h3>
            <ul className="space-y-2">
              {MOCK_CATEGORIES.map((category) => (
                <li key={category.slug}>
                  <Link
                    to={`/?category=${category.slug}`}
                    className="text-indigo-600 dark:text-indigo-400 hover:underline hover:text-indigo-800 dark:hover:text-indigo-200"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {MOCK_TAGS.map((tag) => (
                <Link
                  key={tag.slug}
                  to={`/?tag=${tag.slug}`}
                  className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm px-3 py-1 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-900 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors duration-200"
                >
                  {tag.name}
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default HomePage;
