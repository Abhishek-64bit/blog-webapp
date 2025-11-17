
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { User, UserRole } from '../../types';
import { MOCK_USERS } from '../../constants'; // Access mock user data

const AdminSignupPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.READER);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Basic validation
    if (!username.trim() || !email.trim() || !password.trim()) {
      setError('All fields are required.');
      setIsLoading(false);
      return;
    }
    if (MOCK_USERS.some(u => u.username === username || u.email === email)) {
        setError('Username or email already exists.');
        setIsLoading(false);
        return;
    }

    // Simulate API call for adding user
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newUserId = `u${MOCK_USERS.length + 1}`; // Simple ID generation
    const newUser: User = {
      id: newUserId,
      username,
      email,
      role: selectedRole,
    };

    // For demo purposes, directly modify MOCK_USERS. In a real app, this would be an API call.
    MOCK_USERS.push(newUser); 

    alert(`User "${username}" created successfully with role ${selectedRole}. (Password: 'password')`);
    navigate('/admin/users'); // Redirect to user management page
    setIsLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6">Create New User</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Password (Default: 'password')
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter password (e.g., 'password')"
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            User Role
          </label>
          <select
            id="role"
            name="role"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value as UserRole)}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
            disabled={isLoading}
          >
            {Object.values(UserRole).map((role) => (
              <option key={role} value={role}>
                {role.charAt(0) + role.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <Button
          type="submit"
          className="w-full"
          isLoading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? 'Creating User...' : 'Create User'}
        </Button>
      </form>
    </div>
  );
};

export default AdminSignupPage;
