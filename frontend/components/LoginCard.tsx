import React, { useState } from 'react';
import { Provider } from '../types';
import ProviderButton from './ProviderButton';

const LoginCard: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleLogin = (provider: Provider) => {
    console.log(`Attempting to log in with ${provider}`);
  };

  const handleEmailSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log(`Attempting to sign up with email: ${email}`);
    }
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

      {/* OR Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">OR</span>
        </div>
      </div>

      {/* Email Signup Section */}
      <form onSubmit={handleEmailSignup} className="space-y-4">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full flex items-center justify-center p-3 rounded-lg font-semibold text-base transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-indigo-600 text-white hover:bg-indigo-700"
        >
          Continue with Email
        </button>
      </form>

      {/* Already have account link */}
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <button className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200">
            Log in
          </button>
        </p>
      </div>

      <p className="text-center text-xs text-gray-500 pt-4">
        By continuing, you agree to our <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Terms of Service</a> and <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Privacy Policy</a>.
      </p>
    </div>
  );
};

export default LoginCard;