import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';
import Button from './Button';
import { UserRole } from '../types';

interface HeaderProps {
  isAuthenticated: boolean;
  userRole: UserRole | null;
  onLogout: () => void;
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated, userRole, onLogout, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery(''); // Clear search query after submitting
    }
  };

  const isAdminOrEditor = userRole === UserRole.ADMIN || userRole === UserRole.EDITOR;

  return (
    <header className="bg-white shadow-sm dark:bg-gray-800 text-gray-800 dark:text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
          My Blog
        </Link>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center space-x-2">
          <DarkModeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 p-2 rounded-md"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
          <Link to="/categories" className="hover:text-indigo-600 dark:hover:text-indigo-400">Categories</Link>
          <Link to="/tags" className="hover:text-indigo-600 dark:hover:text-indigo-400">Tags</Link>

          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <svg
              className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </form>

          {isAdminOrEditor && (
            <Link to="/admin/dashboard" className="text-white bg-indigo-500 hover:bg-indigo-600 px-3 py-1.5 rounded-md">
              Admin
            </Link>
          )}

          {isAuthenticated ? (
            <Button variant="outline" onClick={onLogout} size="sm">
              Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button variant="primary" size="sm">
                Login
              </Button>
            </Link>
          )}
          <DarkModeToggle />
        </nav>
      </div>

      {/* Mobile menu dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 pb-4">
          <nav className="flex flex-col items-center space-y-3 pt-4">
            <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link to="/categories" className="hover:text-indigo-600 dark:hover:text-indigo-400" onClick={() => setIsMobileMenuOpen(false)}>Categories</Link>
            <Link to="/tags" className="hover:text-indigo-600 dark:hover:text-indigo-400" onClick={() => setIsMobileMenuOpen(false)}>Tags</Link>

            <form onSubmit={handleSearchSubmit} className="relative w-2/3 max-w-xs">
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <svg
                className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </form>

            {isAdminOrEditor && (
              <Link to="/admin/dashboard" className="text-white bg-indigo-500 hover:bg-indigo-600 px-3 py-1.5 rounded-md" onClick={() => setIsMobileMenuOpen(false)}>
                Admin
              </Link>
            )}

            {isAuthenticated ? (
              <Button variant="outline" onClick={() => { onLogout(); setIsMobileMenuOpen(false); }} size="sm">
                Logout
              </Button>
            ) : (
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="primary" size="sm">
                  Login
                </Button>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
