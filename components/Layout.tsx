import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { UserRole } from '../types';

interface LayoutProps {
  isAuthenticated: boolean;
  userRole: UserRole | null;
  onLogout: () => void;
  onSearch: (query: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ isAuthenticated, userRole, onLogout, onSearch }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header isAuthenticated={isAuthenticated} userRole={userRole} onLogout={onLogout} onSearch={onSearch} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;