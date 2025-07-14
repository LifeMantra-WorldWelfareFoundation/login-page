
import React, { useState } from 'react';
import TextInput from './TextInput';
import { FaUser, FaLock } from 'react-icons/fa';
import OAuthButtonGroup from './OAuthButtonGroup';

interface LoginFormProps {
  onToggleView: () => void;
  onOAuthLogin: (provider: string) => void;
  onLogin: (email: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onToggleView, onOAuthLogin, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const res = await fetch('http://localhost:8080/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });

  if (res.ok) {
    const { user } = await res.json();
    onLogin(user);  // use the callback to lift user up
  } else {
    const { error } = await res.json();
    alert(`Login failed: ${error}`);
  }
};

  return (
    <div className="w-full max-w-md rounded-3xl border dark:border-white/5 border-black/10 bg-gradient-to-b dark:from-white/[.08] dark:to-white/[.02] from-white/60 to-white/40 p-8 shadow-2xl backdrop-blur-2xl dark:[box-shadow:inset_0_1px_0_rgba(255,255,255,0.1)] [box-shadow:inset_0_1px_0_rgba(255,255,255,0.2)]">
      <h1 className="mb-6 bg-gradient-to-b dark:from-neutral-50 dark:to-neutral-300 from-slate-900 to-slate-700 bg-clip-text text-center text-3xl font-bold text-transparent sm:text-4xl md:mb-8">
        Welcome Back
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <TextInput
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<FaUser />}
          autoComplete="email"
          required
        />
        <TextInput
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={<FaLock />}
          autoComplete="current-password"
          required
        />
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-sm">
          <label htmlFor="remember-me" className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-neutral-400 bg-white/50 dark:bg-transparent text-slate-800 dark:text-white accent-slate-700/50 dark:accent-white/30 focus:ring-slate-700/50 dark:focus:ring-white/50"
            />
            <span className="ml-2 text-slate-700 dark:text-neutral-300">Remember me</span>
          </label>
          <a href="#" className="text-slate-700 hover:text-slate-950 dark:text-neutral-300 dark:hover:text-white hover:underline">
            Forgot password?
          </a>
        </div>
        <button
          type="submit"
          className="w-full rounded-xl border border-transparent dark:border-white/25 bg-slate-800/80 dark:bg-white/20 px-4 py-3 font-semibold text-white dark:text-neutral-100 shadow-lg transition-all duration-200 ease-in-out hover:bg-slate-900 dark:hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-slate-800 dark:focus:ring-white/50 [box-shadow:inset_0_1px_0_rgba(255,255,255,0.1)] dark:[box-shadow:inset_0_1px_0_rgba(255,255,255,0.2)]"
        >
          Login
        </button>
      </form>

      <div className="my-8 flex items-center">
        <div className="flex-grow border-t border-black/10 dark:border-white/10"></div>
        <span className="mx-4 flex-shrink text-sm text-slate-500 dark:text-neutral-300">Or continue with</span>
        <div className="flex-grow border-t border-black/10 dark:border-white/10"></div>
      </div>

      <OAuthButtonGroup onOAuthLogin={onOAuthLogin} />

      <p className="mt-8 text-center text-sm text-slate-600 dark:text-neutral-400">
        Don't have an account?{' '}
        <button type="button" onClick={onToggleView} className="font-medium text-slate-800 hover:text-black dark:text-neutral-200 dark:hover:text-white hover:underline focus:outline-none">
          Sign up
        </button>
      </p>
    </div>
  );
};

export default LoginForm;