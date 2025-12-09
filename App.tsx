import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Complaints from './components/Complaints';
import Mess from './components/Mess';
import Notices from './components/Notices';
import RoomInfo from './components/RoomInfo';
import Outpass from './components/Outpass';
import { Page, Complaint } from './types';
import { INITIAL_COMPLAINTS, INITIAL_NOTICES } from './constants';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [complaints, setComplaints] = useState<Complaint[]>(INITIAL_COMPLAINTS);
  
  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard complaints={complaints} notices={INITIAL_NOTICES} setActivePage={setActivePage} />;
      case 'complaints':
        return <Complaints complaints={complaints} setComplaints={setComplaints} />;
      case 'mess':
        return <Mess />;
      case 'notices':
        return <Notices notices={INITIAL_NOTICES} />;
      case 'room':
        return <RoomInfo />;
      case 'outpass':
        return <Outpass />;
      default:
        return <Dashboard complaints={complaints} notices={INITIAL_NOTICES} setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <div className="md:hidden bg-indigo-900 text-white p-4 flex items-center justify-between">
            <span className="font-bold text-lg">Smart Hostel Manager</span>
            <button onClick={() => setIsSidebarOpen(true)}>
                <Menu size={24} />
            </button>
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;