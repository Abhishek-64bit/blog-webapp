import React, { useState, useEffect, useCallback } from 'react';
import { User, UserRole } from '../../types';
import { MOCK_USERS } from '../../constants';
import UserListItem from '../../components/Admin/UserListItem';
import LoadingSpinner from '../../components/LoadingSpinner';

const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null); // To track which user is being acted upon

  const fetchUsers = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      // Deep copy to avoid direct mutation of constant if needed
      setUsers([...MOCK_USERS].sort((a, b) => a.username.localeCompare(b.username)));
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleEditRole = async (userId: string, newRole: UserRole) => {
    setActionLoading(userId);
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API call

    const userIndex = MOCK_USERS.findIndex(u => u.id === userId);
    if (userIndex > -1) {
      MOCK_USERS[userIndex].role = newRole; // Mutate for demo
    }
    fetchUsers(); // Re-fetch or update state
    setActionLoading(null);
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setActionLoading(userId);
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API call
      
      const index = MOCK_USERS.findIndex(u => u.id === userId);
      if (index > -1) {
        MOCK_USERS.splice(index, 1); // Mutate for demo
      }
      fetchUsers(); // Re-fetch or update state
      setActionLoading(null);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6">User Management</h1>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="space-y-4">
          {users.length === 0 ? (
            <p className="text-gray-700 dark:text-gray-300 text-lg text-center">No users found.</p>
          ) : (
            users.map((user) => (
              <UserListItem
                key={user.id}
                user={user}
                onEditRole={handleEditRole}
                onDelete={handleDeleteUser}
                isLoading={actionLoading === user.id}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AdminUsersPage;
