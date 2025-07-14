import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaSnapchatGhost, FaDiscord } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const oAuthProviders = [
  { name: 'Google', icon: <FcGoogle className="h-6 w-6" /> },
  { name: 'Facebook', icon: <FaFacebook className="h-6 w-6 text-[#1877F2]" /> },
  { name: 'Twitter', icon: <FaXTwitter className="h-6 w-6" /> },
  { name: 'Snapchat', icon: <FaSnapchatGhost className="h-6 w-6 text-[#FFFC00]" /> },
  { name: 'Discord', icon: <FaDiscord className="h-6 w-6 text-[#5865F2]" /> },
];

interface OAuthButtonGroupProps {
  onOAuthLogin: (provider: string) => void;
}

const OAuthButtonGroup: React.FC<OAuthButtonGroupProps> = ({ onOAuthLogin }) => {
  return (
    <div className="grid grid-cols-3 gap-4 md:grid-cols-5">
      {oAuthProviders.map((provider) => (
        <button
          key={provider.name}
          type="button"
          onClick={() => onOAuthLogin(provider.name.toLowerCase())}
          aria-label={`Continue with ${provider.name}`}
          className="flex h-12 w-full items-center justify-center rounded-xl border border-black/10 dark:border-white/20 bg-white/50 dark:bg-white/15 text-slate-700 dark:text-white shadow-md transition-all duration-200 ease-in-out hover:bg-white/70 dark:hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/50"
        >
          {provider.icon}
        </button>
      ))}
    </div>
  );
};

export default OAuthButtonGroup;