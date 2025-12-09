import React from 'react';
import { Calendar, Info, ShieldAlert } from 'lucide-react';
import { Notice } from '../types';

interface NoticesProps {
  notices: Notice[];
}

const Notices: React.FC<NoticesProps> = ({ notices }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'Event': return <Calendar className="text-purple-500" />;
      case 'Rule': return <ShieldAlert className="text-red-500" />;
      default: return <Info className="text-blue-500" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'Event': return 'bg-purple-50 border-purple-100';
      case 'Rule': return 'bg-red-50 border-red-100';
      default: return 'bg-blue-50 border-blue-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Notice Board</h2>
          <p className="text-gray-500 text-sm">Official announcements and schedules.</p>
        </div>
        <div className="text-sm text-gray-400">
            Updated: Today
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {notices.map((notice) => (
          <div key={notice.id} className={`p-6 rounded-2xl border ${getBgColor(notice.type)} transition-transform hover:scale-[1.01] duration-200`}>
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="mt-1 bg-white p-2 rounded-lg shadow-sm">
                  {getIcon(notice.type)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{notice.title}</h3>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mt-1 mb-2">{notice.date} • {notice.type}</p>
                  <p className="text-gray-700 leading-relaxed">{notice.content}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notices;