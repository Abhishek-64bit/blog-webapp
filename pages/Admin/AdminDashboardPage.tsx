import React, { useEffect, useState } from 'react';
import { MOCK_BLOG_POSTS, MOCK_COMMENTS, MOCK_USERS } from '../../constants';
import LoadingSpinner from '../../components/LoadingSpinner';

const AdminDashboardPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalComments: 0,
    unapprovedComments: 0,
    totalUsers: 0,
    totalViews: 0,
  });

  useEffect(() => {
    setLoading(true);
    // Simulate fetching data
    setTimeout(() => {
      const totalPosts = MOCK_BLOG_POSTS.length;
      const totalComments = MOCK_COMMENTS.length;
      const unapprovedComments = MOCK_COMMENTS.filter(c => !c.approved).length;
      const totalUsers = MOCK_USERS.length;
      const totalViews = MOCK_BLOG_POSTS.reduce((sum, post) => sum + post.views, 0);

      setStats({
        totalPosts,
        totalComments,
        unapprovedComments,
        totalUsers,
        totalViews,
      });
      setLoading(false);
    }, 800);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6">Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Total Posts" value={stats.totalPosts} icon="📝" />
        <StatCard title="Total Comments" value={stats.totalComments} icon="💬" />
        <StatCard title="Unapproved Comments" value={stats.unapprovedComments} icon="⚠️" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" />
        <StatCard title="Total Users" value={stats.totalUsers} icon="👥" />
        <StatCard title="Total Views" value={stats.totalViews.toLocaleString()} icon="📊" />
      </div>

      {/* Recent Activity (Placeholder) */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
        <ul className="space-y-3 text-gray-700 dark:text-gray-300">
          <li>New post "The Future of AI" was published by Admin. (Just now)</li>
          <li>Comment on "Mastering React Hooks" by Jane Doe needs moderation. (5 mins ago)</li>
          <li>User "john_reader" registered. (1 hour ago)</li>
        </ul>
      </div>

      {/* Analytics Panel (Placeholder) */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Analytics Panel</h2>
        <p className="text-gray-700 dark:text-gray-300">
          Detailed analytics (views, engagement, traffic sources) would be displayed here using charts and graphs.
        </p>
        <div className="mt-4 p-8 bg-gray-100 dark:bg-gray-700 rounded-md text-center text-gray-500 dark:text-gray-400">
          (Chart placeholder - e.g., daily views, popular posts, user demographics)
          <div className="h-48 bg-gray-200 dark:bg-gray-600 rounded-md mt-4 flex items-center justify-center">
            <span className="text-lg">Graph/Chart Placeholder</span>
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, className }) => (
  <div className={`bg-indigo-50 dark:bg-indigo-900 p-6 rounded-lg shadow-md flex items-center ${className}`}>
    <div className="text-4xl mr-4">{icon}</div>
    <div>
      <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300">{title}</h3>
      <p className="text-3xl font-bold text-indigo-700 dark:text-indigo-200">{value}</p>
    </div>
  </div>
);

export default AdminDashboardPage;
