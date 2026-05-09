import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center py-12">
      <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
    </div>
  );
};

export default Loader;
