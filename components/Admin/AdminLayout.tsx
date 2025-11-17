import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { UserRole } from '../../types';

interface AdminLayoutProps {
  isAuthenticated: boolean;
  userRole: UserRole | null;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ isAuthenticated, userRole }) => {
  if (!isAuthenticated || (userRole !== UserRole.ADMIN && userRole !== UserRole.EDITOR)) {
    // Redirect to login or a permission denied page
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex bg-gray-100 dark:bg-gray-950 min-h-screen">
      <AdminSidebar />
      <main className="flex-grow p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;