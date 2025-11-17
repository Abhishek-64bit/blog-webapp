import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ADMIN_NAV_ITEMS } from '../../constants';

const AdminSidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-gray-800 dark:bg-gray-900 text-white min-h-screen p-4 shadow-lg sticky top-0 md:relative z-40">
      <h2 className="text-2xl font-bold mb-8 text-indigo-400">Admin Panel</h2>
      <nav>
        <ul className="space-y-2">
          {ADMIN_NAV_ITEMS.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center px-4 py-2 rounded-md text-lg transition-colors duration-200
                  ${location.pathname === item.path
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'hover:bg-gray-700 dark:hover:bg-gray-800 text-gray-300 hover:text-white'
                  }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
