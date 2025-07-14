import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-slate-400/20 dark:border-white/20 border-t-slate-700 dark:border-t-white"></div>
    </div>
  );
};

export default Spinner;