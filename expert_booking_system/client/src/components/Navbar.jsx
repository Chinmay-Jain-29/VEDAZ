import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="glass sticky top-0 z-50 py-4 px-6 mb-8 flex justify-between items-center">
      <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-indigo-600">
        <Calendar className="w-8 h-8" />
        <span>ExpertBook</span>
      </Link>
      <div className="flex gap-4">
        <Link to="/" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
          Experts
        </Link>
        <Link to="/my-bookings" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
          My Bookings
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
