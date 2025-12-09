import React from 'react';
import { AlertCircle, Utensils, Calendar, Wifi, Bell } from 'lucide-react';
import { Complaint, Notice, Page } from '../types';

interface DashboardProps {
  complaints: Complaint[];
  notices: Notice[];
  setActivePage: (page: Page) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ complaints, notices, setActivePage }) => {
  const pendingComplaints = complaints.filter(c => c.status !== 'Resolved').length;
  const recentNotice = notices[0];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Status Card 1 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Pending Complaints</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{pendingComplaints}</p>
            </div>
            <div className={`p-3 rounded-full ${pendingComplaints > 0 ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'}`}>
              <AlertCircle size={24} />
            </div>
          </div>
          <button onClick={() => setActivePage('complaints')} className="text-xs text-indigo-600 font-medium mt-4 hover:underline">View details &rarr;</button>
        </div>

        {/* Status Card 2 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Next Meal</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">Lunch</p>
            </div>
            <div className="p-3 rounded-full bg-orange-50 text-orange-500">
              <Utensils size={24} />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-4 truncate">Rice, Dal Makhani, Mixed Veg...</p>
        </div>

        {/* Status Card 3 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Wi-Fi Status</p>
              <p className="text-2xl font-bold text-green-600 mt-1">Online</p>
            </div>
            <div className="p-3 rounded-full bg-green-50 text-green-500">
              <Wifi size={24} />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-4">Speed: 45 Mbps</p>
        </div>

        {/* Status Card 4 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Attendance</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">85%</p>
            </div>
            <div className="p-3 rounded-full bg-blue-50 text-blue-500">
              <Calendar size={24} />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-4">Present Today</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Notice */}
        <div className="lg:col-span-2 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Bell className="mr-2" size={20} /> Latest Notice
            </h3>
            <span className="text-xs bg-white/20 px-2 py-1 rounded text-white">{recentNotice?.type}</span>
          </div>
          <h2 className="text-2xl font-bold mb-2">{recentNotice?.title}</h2>
          <p className="text-indigo-100 mb-6 line-clamp-2">{recentNotice?.content}</p>
          <button onClick={() => setActivePage('notices')} className="bg-white text-indigo-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors">
            Read Full Notice
          </button>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button onClick={() => setActivePage('outpass')} className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
              <span className="font-medium text-gray-700 group-hover:text-gray-900">Request Outpass</span>
              <span className="text-gray-400 group-hover:text-gray-600">&rarr;</span>
            </button>
            <button onClick={() => setActivePage('complaints')} className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
              <span className="font-medium text-gray-700 group-hover:text-gray-900">Register Complaint</span>
              <span className="text-gray-400 group-hover:text-gray-600">&rarr;</span>
            </button>
             <button onClick={() => setActivePage('mess')} className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
              <span className="font-medium text-gray-700 group-hover:text-gray-900">Rate Lunch</span>
              <span className="text-gray-400 group-hover:text-gray-600">&rarr;</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;