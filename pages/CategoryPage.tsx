// This component is now deprecated.
// Category filtering is handled directly within HomePage using URL search parameters.
// Navigating to /category/technology will be handled by App.tsx redirecting to /?category=technology.

// If you need a dedicated page structure for categories in the future,
// you would implement it here and modify App.tsx routing accordingly.

import React from 'react';
import { useParams } from 'react-router-dom';

const CategoryPage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();

  return (
    <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Viewing posts in category: <span className="text-indigo-600 dark:text-indigo-400 capitalize">{categorySlug}</span>
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300">
        This page would typically display all posts belonging to the "{categorySlug}" category.
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
        (Note: For this demo, category filtering is directly integrated into the home page for simplicity.
        Navigating to /category/{categorySlug} redirects to /?category={categorySlug})
      </p>
    </div>
  );
};

export default CategoryPage;
