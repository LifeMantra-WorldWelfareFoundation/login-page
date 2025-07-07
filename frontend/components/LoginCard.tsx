
import React from 'react';
import { Provider } from '../types';
import ProviderButton from './ProviderButton';
import { GoogleIcon } from './icons/GoogleIcon';
import { FacebookIcon } from './icons/FacebookIcon';
import { XIcon } from './icons/XIcon';
import { TikTokIcon } from './icons/TikTokIcon';
import { DiscordIcon } from './icons/DiscordIcon';

const LoginCard: React.FC = () => {
  const handleLogin = (provider: Provider) => {
    // In a real application, this would initiate the OAuth flow.
    console.log(`Attempting to log in with ${provider}`);
  };

  return (
    <div className="bg-white w-full max-w-md p-8 md:p-10 rounded-2xl shadow-xl space-y-8 animate-fade-in">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Create an account</h1>
        <p className="mt-2 text-gray-600">Choose your preferred provider to continue.</p>
      </div>
      
      <div className="space-y-4">
        <ProviderButton
          provider={Provider.Google}
          onClick={() => handleLogin(Provider.Google)}
          icon={<GoogleIcon />}
          className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
        >
          Continue with Google
        </ProviderButton>
        
        <ProviderButton
          provider={Provider.Facebook}
          onClick={() => handleLogin(Provider.Facebook)}
          icon={<FacebookIcon />}
          className="bg-[#1877F2] text-white hover:bg-[#166eeb]"
        >
          Continue with Facebook
        </ProviderButton>

        <ProviderButton
          provider={Provider.X}
          onClick={() => handleLogin(Provider.X)}
          icon={<XIcon />}
          className="bg-black text-white hover:bg-gray-800"
        >
          Continue with X
        </ProviderButton>

        <ProviderButton
          provider={Provider.TikTok}
          onClick={() => handleLogin(Provider.TikTok)}
          icon={<TikTokIcon />}
          className="bg-black text-white hover:bg-gray-800"
        >
          Continue with TikTok
        </ProviderButton>

        <ProviderButton
          provider={Provider.Discord}
          onClick={() => handleLogin(Provider.Discord)}
          icon={<DiscordIcon />}
          className="bg-[#5865F2] text-white hover:bg-[#4f5bda]"
        >
          Continue with Discord
        </ProviderButton>
      </div>

      <p className="text-center text-xs text-gray-500 pt-4">
        By continuing, you agree to our <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Terms of Service</a> and <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Privacy Policy</a>.
      </p>
    </div>
  );
};

export default LoginCard;
