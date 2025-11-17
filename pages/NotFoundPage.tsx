import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center bg-gray-50 dark:bg-gray-800">
      <div className="text-center p-8 bg-white dark:bg-gray-900 rounded-lg shadow-md">
        <h1 className="text-9xl font-extrabold text-indigo-600 dark:text-indigo-400">404</h1>
        <p className="text-3xl font-bold text-gray-900 dark:text-white mt-4 mb-2">Page Not Found</p>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link to="/">
          <Button variant="primary" size="lg">
            Go to Homepage
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
