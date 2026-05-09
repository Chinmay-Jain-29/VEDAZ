import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Award, ChevronRight } from 'lucide-react';

const ExpertCard = ({ expert }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
            {expert.name}
          </h3>
          <span className="inline-block mt-1 px-3 py-1 bg-indigo-50 text-indigo-600 text-sm font-medium rounded-full">
            {expert.category}
          </span>
        </div>
        <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-md">
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
          <span className="text-sm font-bold text-yellow-700">{expert.rating}</span>
        </div>
      </div>
      
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{expert.bio}</p>
      
      <div className="flex items-center gap-2 text-gray-500 text-sm mb-6">
        <Award className="w-4 h-4" />
        <span>{expert.experience} years experience</span>
      </div>
      
      <Link
        to={`/expert/${expert._id}`}
        className="w-full py-2.5 px-4 bg-gray-50 hover:bg-indigo-600 text-gray-700 hover:text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
      >
        View Available Slots
        <ChevronRight className="w-4 h-4" />
      </Link>
    </div>
  );
};

export default ExpertCard;
