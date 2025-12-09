import React from 'react';
import { LayoutDashboard, AlertCircle, Utensils, Bell, Home, LogOut, Menu, X } from 'lucide-react';
import { Page } from '../types';

interface SidebarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage, isOpen, setIsOpen }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'complaints', label: 'Complaints', icon: AlertCircle },
    { id: 'mess', label: 'Mess & Food', icon: Utensils },
    { id: 'notices', label: 'Notice Board', icon: Bell },
    { id: 'room', label: 'Room Info', icon: Home },
    { id: 'outpass', label: 'Outpass', icon: LogOut },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-indigo-900 text-white transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-auto flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        <div className="flex items-center justify-between p-6 border-b border-indigo-800">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center font-bold text-lg">
              S
            </div>
            <span className="text-lg font-bold tracking-wide">Smart Hostel</span>
          </div>
          <button className="md:hidden" onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActivePage(item.id as Page);
                  setIsOpen(false);
                }}
                className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-indigo-700 text-white shadow-lg' 
                    : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'
                }`}
              >
                <Icon size={20} className="mr-3" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-indigo-800">
          <div className="flex items-center space-x-3">
            <img 
              src="https://picsum.photos/100/100" 
              alt="Profile" 
              className="w-10 h-10 rounded-full border-2 border-indigo-400"
            />
            <div>
              <p className="text-sm font-semibold">Arjun Verma</p>
              <p className="text-xs text-indigo-300">Room B-304</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;