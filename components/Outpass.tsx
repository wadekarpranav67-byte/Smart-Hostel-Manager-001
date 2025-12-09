import React, { useState } from 'react';
import { Send, CalendarDays } from 'lucide-react';
import { OutpassRequest } from '../types';

const Outpass: React.FC = () => {
  const [requests, setRequests] = useState<OutpassRequest[]>([
    {
      id: '1',
      reason: 'Going home for sister\'s wedding',
      fromDate: '2024-05-10',
      toDate: '2024-05-14',
      status: 'Approved'
    }
  ]);
  
  const [reason, setReason] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRequest: OutpassRequest = {
        id: Math.random().toString(),
        reason,
        fromDate,
        toDate,
        status: 'Pending'
    };
    setRequests([newRequest, ...requests]);
    setReason('');
    setFromDate('');
    setToDate('');
  };

  const getStatusColor = (status: string) => {
      switch(status) {
          case 'Approved': return 'text-green-600 bg-green-50';
          case 'Rejected': return 'text-red-600 bg-red-50';
          default: return 'text-yellow-600 bg-yellow-50';
      }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Outpass Request</h2>
        <p className="text-gray-500 text-sm">Apply for leave or night out.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-6">New Request</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">From</label>
                        <input 
                            type="date" 
                            required
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">To</label>
                         <input 
                            type="date" 
                            required
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Reason</label>
                    <textarea 
                        required
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Why do you need to leave?"
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 h-24 resize-none"
                    ></textarea>
                </div>
                <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-xl font-medium hover:bg-indigo-700 transition flex items-center justify-center">
                    <Send size={18} className="mr-2" /> Submit Request
                </button>
            </form>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
             <h3 className="text-lg font-bold text-gray-800 mb-6">Request History</h3>
             <div className="space-y-4">
                 {requests.map(req => (
                     <div key={req.id} className="flex items-start justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition">
                         <div className="flex items-start space-x-3">
                             <div className="mt-1 text-gray-400">
                                 <CalendarDays size={20} />
                             </div>
                             <div>
                                 <p className="font-medium text-gray-900">{req.reason}</p>
                                 <p className="text-xs text-gray-500 mt-1">{req.fromDate} to {req.toDate}</p>
                             </div>
                         </div>
                         <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(req.status)}`}>
                             {req.status}
                         </span>
                     </div>
                 ))}
             </div>
        </div>
      </div>
    </div>
  );
};

export default Outpass;