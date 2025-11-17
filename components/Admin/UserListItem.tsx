import React from 'react';
import { User, UserRole } from '../../types';
import Button from '../Button';

interface UserListItemProps {
  user: User;
  onEditRole: (userId: string, newRole: UserRole) => void;
  onDelete: (userId: string) => void;
  isLoading?: boolean;
}

const UserListItem: React.FC<UserListItemProps> = ({ user, onEditRole, onDelete, isLoading }) => {
  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onEditRole(user.id, e.target.value as UserRole);
  };

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="mb-4 md:mb-0">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{user.username}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
      </div>
      <div className="flex flex-col md:flex-row items-end md:items-center space-y-2 md:space-y-0 md:space-x-2 w-full md:w-auto">
        <select
          value={user.role}
          onChange={handleRoleChange}
          className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          disabled={isLoading}
        >
          {Object.values(UserRole).map((role) => (
            <option key={role} value={role}>
              {role.charAt(0) + role.slice(1).toLowerCase()}
            </option>
          ))}
        </select>
        <Button
          variant="danger"
          size="sm"
          onClick={() => onDelete(user.id)}
          disabled={isLoading}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default UserListItem;
