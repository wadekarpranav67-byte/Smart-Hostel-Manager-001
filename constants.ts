import { Complaint, MessReview, Notice, OutpassRequest, StudentProfile } from './types';

export const MOCK_USER: StudentProfile = {
  name: "Arjun Verma",
  rollNumber: "CS-2024-042",
  roomNumber: "B-304",
  block: "Aryabhatta Block",
  course: "B.Tech Computer Science"
};

export const INITIAL_NOTICES: Notice[] = [
  {
    id: '1',
    title: 'Annual Cultural Fest - Auditions',
    content: 'Auditions for the annual cultural fest "Tarang" start this Saturday at the Main Auditorium from 10 AM.',
    date: '2024-05-20',
    type: 'Event'
  },
  {
    id: '2',
    title: 'Revised Library Timings',
    content: 'Due to upcoming exams, the library will remain open 24/7 starting next Monday until further notice.',
    date: '2024-05-18',
    type: 'General'
  },
  {
    id: '3',
    title: 'Quiet Hours Enforcement',
    content: 'Strict quiet hours are to be observed from 11 PM to 6 AM. Violators will face disciplinary action.',
    date: '2024-05-15',
    type: 'Rule'
  }
];

export const INITIAL_COMPLAINTS: Complaint[] = [
  {
    id: 'c1',
    category: 'Electrical',
    description: 'The ceiling fan in room B-304 is making a loud noise and wobbling.',
    status: 'In Progress',
    priority: 'Medium',
    date: '2024-05-21'
  },
  {
    id: 'c2',
    category: 'Wi-Fi',
    description: 'No internet connectivity on the 3rd floor since yesterday evening.',
    status: 'Pending',
    priority: 'High',
    date: '2024-05-22'
  }
];

export const INITIAL_MESS_MENU = {
  Breakfast: "Masala Dosa, Sambar, Coconut Chutney, Coffee/Tea",
  Lunch: "Rice, Dal Makhani, Mixed Veg, Roti, Curd, Salad",
  Dinner: "Paneer Butter Masala, Jeera Rice, Chapati, Gulab Jamun"
};