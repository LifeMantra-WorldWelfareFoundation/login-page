
import React from 'react';
import { Provider } from '../types';

interface ProviderButtonProps {
  provider: Provider;
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const ProviderButton: React.FC<ProviderButtonProps> = ({ onClick, icon, children, className }) => {
  const baseClasses = "w-full flex items-center justify-center p-3 rounded-lg font-semibold text-base transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";
  
  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${className}`}
    >
      <span className="w-6 h-6 mr-3 flex items-center justify-center">{icon}</span>
      {children}
    </button>
  );
};

export default ProviderButton;
