import React, { useState } from 'react';
import { Plus, CheckCircle, Clock, AlertTriangle, Cpu } from 'lucide-react';
import { Complaint } from '../types';
import { analyzeComplaint } from '../services/geminiService';

interface ComplaintsProps {
  complaints: Complaint[];
  setComplaints: React.Dispatch<React.SetStateAction<Complaint[]>>;
}

const Complaints: React.FC<ComplaintsProps> = ({ complaints, setComplaints }) => {
  const [description, setDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setIsAnalyzing(true);
    
    // AI Analysis
    const analysis = await analyzeComplaint(description);
    
    const newComplaint: Complaint = {
      id: Math.random().toString(36).substr(2, 9),
      category: analysis.category || 'General',
      priority: (analysis.priority as any) || 'Medium',
      description: description,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0],
      aiAnalysis: analysis.summary
    };

    setComplaints([newComplaint, ...complaints]);
    setDescription('');
    setIsAnalyzing(false);
    setShowForm(false);
  };

  const getPriorityColor = (p: string) => {
    switch (p) {
      case 'High': return 'bg-red-100 text-red-700 border-red-200';
      case 'Medium': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  const getStatusIcon = (s: string) => {
    switch (s) {
      case 'Resolved': return <CheckCircle size={18} className="text-green-500" />;
      case 'In Progress': return <Clock size={18} className="text-orange-500" />;
      default: return <AlertTriangle size={18} className="text-red-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Complaints & Requests</h2>
          <p className="text-gray-500 text-sm">Report issues directly to the warden.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-xl flex items-center font-medium hover:bg-indigo-700 transition"
        >
          <Plus size={18} className="mr-2" />
          New Complaint
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-indigo-100 animate-fade-in-down">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Cpu className="mr-2 text-indigo-500" size={20}/> AI-Assisted Report
          </h3>
          <form onSubmit={handleSubmit}>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the issue in detail (e.g., 'The tube light in room B-304 is flickering'). AI will automatically categorize and prioritize it."
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none h-32 resize-none"
            />
            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                disabled={isAnalyzing}
                className={`px-6 py-2 rounded-lg font-medium text-white transition-all ${
                  isAnalyzing ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                {isAnalyzing ? 'Analyzing...' : 'Submit Report'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {complaints.map((complaint) => (
          <div key={complaint.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center space-x-3">
                <span className={`px-2 py-1 rounded-md text-xs font-semibold border ${getPriorityColor(complaint.priority)}`}>
                  {complaint.priority}
                </span>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                  {complaint.category}
                </span>
                <span className="text-xs text-gray-400">{complaint.date}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm font-medium">
                {getStatusIcon(complaint.status)}
                <span className="text-gray-700">{complaint.status}</span>
              </div>
            </div>
            
            <p className="text-gray-800 font-medium">{complaint.description}</p>
            
            {complaint.aiAnalysis && (
              <div className="mt-3 p-3 bg-indigo-50 rounded-lg flex items-start space-x-2">
                 <Cpu size={16} className="text-indigo-600 mt-0.5 flex-shrink-0" />
                 <p className="text-xs text-indigo-800">
                   <span className="font-semibold">AI Summary:</span> {complaint.aiAnalysis}
                 </p>
              </div>
            )}
          </div>
        ))}
        {complaints.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <CheckCircle size={48} className="mx-auto mb-3 opacity-20" />
            <p>No active complaints. Enjoy your stay!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Complaints;