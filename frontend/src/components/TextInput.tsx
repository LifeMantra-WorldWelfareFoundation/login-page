
import React from 'react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const TextInput: React.FC<TextInputProps> = ({ icon, ...props }) => {
  return (
    <div className="relative flex items-center">
      {icon && (
        <span className="absolute left-4 text-slate-500 dark:text-neutral-400">
          {icon}
        </span>
      )}
      <input
        {...props}
        className={`w-full rounded-xl border border-black/10 dark:border-white/15 bg-white/50 dark:bg-white/5 py-3 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-neutral-300 transition-all duration-300 focus:border-black/20 dark:focus:border-white/30 focus:bg-white/70 dark:focus:bg-white/10 focus:outline-none focus:ring-0 ${icon ? 'pl-12' : 'pl-4'} pr-4 [box-shadow:inset_0_1px_2px_rgba(0,0,0,0.05)] dark:[box-shadow:inset_0_1px_2px_rgba(0,0,0,0.1)]`}
      />
    </div>
  );
};

export default TextInput;