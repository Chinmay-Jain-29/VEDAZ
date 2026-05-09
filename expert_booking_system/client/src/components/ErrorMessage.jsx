import React from 'react';
import { AlertCircle } from 'lucide-react';

const ErrorMessage = ({ message }) => {
  return (
    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-3">
      <AlertCircle className="w-5 h-5 text-red-500" />
      <p>{message || "Something went wrong. Please try again later."}</p>
    </div>
  );
};

export default ErrorMessage;
