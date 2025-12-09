export type Page = 'dashboard' | 'complaints' | 'mess' | 'notices' | 'room' | 'outpass';

export interface Complaint {
  id: string;
  category: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Resolved';
  priority: 'Low' | 'Medium' | 'High';
  date: string;
  aiAnalysis?: string;
}

export interface MessReview {
  id: string;
  rating: number; // 1-5
  comment: string;
  mealType: 'Breakfast' | 'Lunch' | 'Dinner';
  date: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
  type: 'Event' | 'Rule' | 'General';
}

export interface OutpassRequest {
  id: string;
  reason: string;
  fromDate: string;
  toDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface StudentProfile {
  name: string;
  rollNumber: string;
  roomNumber: string;
  block: string;
  course: string;
}