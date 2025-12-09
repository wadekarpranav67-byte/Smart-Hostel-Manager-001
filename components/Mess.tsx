import React, { useState } from 'react';
import { Star, ThumbsUp, Coffee, Sun, Moon, Sparkles } from 'lucide-react';
import { INITIAL_MESS_MENU } from '../constants';
import { generateMessReport } from '../services/geminiService';

const Mess: React.FC = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [aiReport, setAiReport] = useState<string | null>(null);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFeedback('');
    setRating(0);
  };

  const handleGenerateReport = async () => {
    setIsGeneratingReport(true);
    // Mocking some previous feedbacks for the AI to analyze
    const mockFeedbacks = [
      "The Dal was too spicy today.",
      "Loved the paneer, very soft.",
      "Roti was a bit dry.",
      "Need more variety in salad.",
      "Excellent lunch overall!"
    ];
    if (feedback) mockFeedbacks.push(feedback);
    
    const report = await generateMessReport(mockFeedbacks);
    setAiReport(report);
    setIsGeneratingReport(false);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Mess & Food</h2>
        <p className="text-gray-500 text-sm">Today's Menu and Feedback System</p>
      </div>

      {/* Menu Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
          <div className="flex items-center space-x-2 mb-4 text-orange-700">
            <Coffee size={24} />
            <h3 className="font-bold text-lg">Breakfast</h3>
          </div>
          <p className="text-gray-700">{INITIAL_MESS_MENU.Breakfast}</p>
          <p className="text-xs text-orange-500 mt-2 font-medium">07:30 AM - 09:30 AM</p>
        </div>

        <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-100">
          <div className="flex items-center space-x-2 mb-4 text-yellow-700">
            <Sun size={24} />
            <h3 className="font-bold text-lg">Lunch</h3>
          </div>
          <p className="text-gray-700">{INITIAL_MESS_MENU.Lunch}</p>
          <p className="text-xs text-yellow-600 mt-2 font-medium">12:30 PM - 02:30 PM</p>
        </div>

        <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
          <div className="flex items-center space-x-2 mb-4 text-indigo-700">
            <Moon size={24} />
            <h3 className="font-bold text-lg">Dinner</h3>
          </div>
          <p className="text-gray-700">{INITIAL_MESS_MENU.Dinner}</p>
          <p className="text-xs text-indigo-500 mt-2 font-medium">07:30 PM - 09:30 PM</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Feedback Form */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Rate Today's Meal</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`transition-colors ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                  <Star fill={rating >= star ? "currentColor" : "none"} size={32} />
                </button>
              ))}
            </div>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Any suggestions? e.g. 'Less oil in vegetables', 'More fruits'"
              className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 h-24 resize-none"
            />
            <div className="flex items-center justify-between">
               <button
                type="submit"
                className="bg-gray-900 text-white px-6 py-2 rounded-xl font-medium hover:bg-black transition"
              >
                Submit Feedback
              </button>
              {submitted && <span className="text-green-600 text-sm font-medium animate-pulse">Thanks for your feedback!</span>}
            </div>
          </form>
        </div>

        {/* AI Insight */}
        <div className="bg-gradient-to-br from-purple-600 to-indigo-600 p-6 rounded-2xl text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold flex items-center">
              <Sparkles className="mr-2" size={20} />
              AI Kitchen Insight
            </h3>
            <button 
              onClick={handleGenerateReport}
              disabled={isGeneratingReport}
              className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition"
            >
              {isGeneratingReport ? 'Analyzing...' : 'Refresh Analysis'}
            </button>
          </div>
          
          <div className="bg-white/10 rounded-xl p-4 min-h-[140px]">
            {aiReport ? (
              <p className="text-sm leading-relaxed text-indigo-50">{aiReport}</p>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-indigo-200 text-sm text-center">
                <p>Click "Refresh Analysis" to get an AI summary of all student feedback today.</p>
              </div>
            )}
          </div>
          <p className="mt-4 text-xs text-indigo-200 opacity-70">
            Powered by Gemini • Summarizes feedback for the Kitchen Staff
          </p>
        </div>
      </div>
    </div>
  );
};

export default Mess;