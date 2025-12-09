import React from 'react';
import { Phone, Users, Zap, ShieldCheck } from 'lucide-react';
import { MOCK_USER } from '../constants';

const RoomInfo: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Room & Emergency</h2>
        <p className="text-gray-500 text-sm">Roommates and important contacts.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Room Details */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
            <Users className="mr-2 text-indigo-500" /> Room Details
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-500">Room Number</span>
              <span className="font-semibold text-gray-900">{MOCK_USER.roomNumber}</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-500">Block</span>
              <span className="font-semibold text-gray-900">{MOCK_USER.block}</span>
            </div>
            
            <div className="pt-4">
              <p className="text-sm text-gray-500 mb-3">Roommates</p>
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-700">R1</div>
                <div>
                    <p className="text-sm font-medium text-gray-900">Rahul Sharma</p>
                    <p className="text-xs text-gray-400">CS-2024-043</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-xs font-bold text-green-700">R2</div>
                 <div>
                    <p className="text-sm font-medium text-gray-900">Vikram Singh</p>
                    <p className="text-xs text-gray-400">ME-2024-012</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
            <ShieldCheck className="mr-2 text-red-500" /> Emergency Contacts
          </h3>
          
          <div className="space-y-4">
            <a href="tel:1234567890" className="flex items-center justify-between p-3 bg-red-50 rounded-xl hover:bg-red-100 transition cursor-pointer">
              <div className="flex items-center">
                <Phone size={18} className="text-red-500 mr-3" />
                <span className="font-medium text-red-700">Warden (Emergency)</span>
              </div>
              <span className="text-sm text-red-600 font-bold">Call Now</span>
            </a>

             <a href="tel:101" className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition cursor-pointer">
              <div className="flex items-center">
                <Zap size={18} className="text-gray-500 mr-3" />
                <span className="font-medium text-gray-700">Electrician</span>
              </div>
              <span className="text-sm text-gray-500">Ext: 204</span>
            </a>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center">
                <Users size={18} className="text-gray-500 mr-3" />
                <span className="font-medium text-gray-700">Ambulance</span>
              </div>
              <span className="text-sm text-gray-500">108</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomInfo;