import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-6 mt-auto">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-sm">
        <div className="mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} My Blog. All rights reserved.
        </div>
        <nav className="flex space-x-4">
          <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
          <Link to="/privacy" className="hover:text-indigo-600 dark:hover:text-indigo-400">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-indigo-600 dark:hover:text-indigo-400">Terms of Service</Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
