import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import AdminLayout from './components/Admin/AdminLayout';
import HomePage from './pages/HomePage';
import BlogPostPage from './pages/BlogPostPage';
import CategoryPage from './pages/CategoryPage';
import TagsPage from './pages/TagsPage';
import LoginPage from './pages/Auth/LoginPage';
import SignupPage from './pages/Auth/SignupPage';
import AdminDashboardPage from './pages/Admin/AdminDashboardPage';
import AdminPostsPage from './pages/Admin/AdminPostsPage';
import AdminCommentsPage from './pages/Admin/AdminCommentsPage';
import AdminUsersPage from './pages/Admin/AdminUsersPage';
import AdminMediaPage from './pages/Admin/AdminMediaPage';
import NotFoundPage from './pages/NotFoundPage';
import { UserRole } from './types';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  const [userRole, setUserRole] = useState<UserRole | null>(() => {
    const storedRole = localStorage.getItem('userRole');
    return storedRole ? (storedRole as UserRole) : null;
  });
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogin = useCallback((role: UserRole) => {
    setIsAuthenticated(true);
    setUserRole(role);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userRole', role);
  }, []);

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
    setUserRole(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  // Set initial dark mode based on local storage or system preference
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <HashRouter>
      <Routes>
        {/* Public Routes with main layout */}
        <Route path="/" element={<Layout isAuthenticated={isAuthenticated} userRole={userRole} onLogout={handleLogout} onSearch={handleSearch} />}>
          <Route index element={<HomePage searchQuery={searchQuery} />} />
          <Route path="blog/:slug" element={<BlogPostPage />} />
          <Route path="categories" element={<TagsPage />} /> {/* Rerouting to general tag/category view */}
          <Route path="category/:categorySlug" element={<Navigate replace to="/?category=:categorySlug" />} />
          <Route path="tags" element={<TagsPage />} />
          <Route path="tag/:tagSlug" element={<Navigate replace to="/?tag=:tagSlug" />} />
          <Route path="search" element={<HomePage searchQuery={searchQuery} />} />
          <Route path="login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="privacy" element={<p className="text-center p-8">Privacy Policy page content.</p>} />
          <Route path="terms" element={<p className="text-center p-8">Terms of Service page content.</p>} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout isAuthenticated={isAuthenticated} userRole={userRole} />}>
          <Route index element={<Navigate replace to="dashboard" />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="posts" element={<AdminPostsPage />} />
          <Route path="comments" element={<AdminCommentsPage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="media" element={<AdminMediaPage />} />
        </Route>

        {/* Catch-all for 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
