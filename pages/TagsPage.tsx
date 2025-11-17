// This component is now deprecated.
// Tag filtering is handled directly within HomePage using URL search parameters.
// Navigating to /tag/react will be handled by App.tsx redirecting to /?tag=react.

// If you need a dedicated page structure for tags in the future,
// you would implement it here and modify App.tsx routing accordingly.

import React from 'react';
import { useParams } from 'react-router-dom';
import { MOCK_TAGS } from '../constants';
import { Link } from 'react-router-dom';

const TagsPage: React.FC = () => {
  // Although the routing now uses /?tag=slug, this page could list all available tags
  // or provide a more detailed view if needed.
  // For now, it simply displays a list of all tags.

  return (
    <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Explore by Tags</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Browse articles by their associated tags to find content on specific topics.
      </p>

      <div className="flex flex-wrap gap-4">
        {MOCK_TAGS.map((tag) => (
          <Link
            key={tag.slug}
            to={`/?tag=${tag.slug}`} // Link to the home page with tag filter
            className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-lg px-5 py-2 rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-700 transition-colors duration-200 font-semibold"
          >
            #{tag.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TagsPage;
