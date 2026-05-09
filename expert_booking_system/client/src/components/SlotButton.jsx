import React from 'react';

const SlotButton = ({ slot, isSelected, onClick, disabled }) => {
  return (
    <button
      onClick={() => onClick(slot)}
      disabled={disabled}
      className={`
        px-4 py-2 rounded-lg font-medium text-sm transition-all
        ${disabled 
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed line-through border border-transparent' 
          : isSelected
            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 border border-indigo-600'
            : 'bg-white text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 border border-gray-200 hover:border-indigo-200 cursor-pointer'
        }
      `}
    >
      {slot}
    </button>
  );
};

export default SlotButton;
