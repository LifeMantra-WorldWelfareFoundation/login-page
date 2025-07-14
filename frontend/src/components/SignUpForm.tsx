
import React, { useState } from 'react';
import TextInput from './TextInput';
import { FaUser, FaLock } from 'react-icons/fa';
import OAuthButtonGroup from './OAuthButtonGroup';

interface SignUpFormProps {
  onToggleView: () => void;
  onOAuthLogin: (provider: string) => void;
  onSignUp: (fullName: string, email: string) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onToggleView, onOAuthLogin, onSignUp }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    alert("Passwords don't match!");
    return;
  }

  const res = await fetch('http://localhost:8080/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });

  if (res.ok) {
    alert('Check your email to confirm your registration.');
    onSignUp(fullName, email); // inform parent (optional)
  } else {
    const { error } = await res.json();
    alert(`Signup failed: ${error}`);
  }
};


  return (
    <div className="w-full max-w-md rounded-3xl border dark:border-white/5 border-black/10 bg-gradient-to-b dark:from-white/[.08] dark:to-white/[.02] from-white/60 to-white/40 p-8 shadow-2xl backdrop-blur-2xl dark:[box-shadow:inset_0_1px_0_rgba(255,255,255,0.1)] [box-shadow:inset_0_1px_0_rgba(255,255,255,0.2)]">
      <h1 className="mb-6 bg-gradient-to-b dark:from-neutral-50 dark:to-neutral-300 from-slate-900 to-slate-700 bg-clip-text text-center text-3xl font-bold text-transparent sm:text-4xl md:mb-8">
        Create Account
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <TextInput
          id="full-name"
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          icon={<FaUser />}
          autoComplete="name"
          required
        />
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
          autoComplete="new-password"
          required
        />
        <TextInput
          id="confirm-password"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          icon={<FaLock />}
          autoComplete="new-password"
          required
        />

        <div className="flex items-start">
          <div className="flex h-5 items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="h-4 w-4 rounded border-neutral-400 bg-white/50 dark:bg-transparent text-slate-800 dark:text-white accent-slate-700/50 dark:accent-white/30 focus:ring-slate-700/50 dark:focus:ring-white/50"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="terms" className="text-slate-700 dark:text-neutral-300">
              I agree to the{' '}
              <a href="#" className="font-medium text-slate-800 hover:text-black dark:text-neutral-200 dark:hover:text-white hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="font-medium text-slate-800 hover:text-black dark:text-neutral-200 dark:hover:text-white hover:underline">
                Privacy Policy
              </a>.
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={!agreedToTerms}
          className="w-full rounded-xl border border-transparent dark:border-white/25 bg-slate-800/80 dark:bg-white/20 px-4 py-3 font-semibold text-white dark:text-neutral-100 shadow-lg transition-all duration-200 ease-in-out hover:bg-slate-900 dark:hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-slate-800 dark:focus:ring-white/50 disabled:cursor-not-allowed disabled:opacity-50 [box-shadow:inset_0_1px_0_rgba(255,255,255,0.1)] dark:[box-shadow:inset_0_1px_0_rgba(255,255,255,0.2)]"
        >
          Sign Up
        </button>
      </form>

      <div className="my-8 flex items-center">
        <div className="flex-grow border-t border-black/10 dark:border-white/10"></div>
        <span className="mx-4 flex-shrink text-sm text-slate-500 dark:text-neutral-300">Or continue with</span>
        <div className="flex-grow border-t border-black/10 dark:border-white/10"></div>
      </div>

      <OAuthButtonGroup onOAuthLogin={onOAuthLogin} />

      <p className="mt-8 text-center text-sm text-slate-600 dark:text-neutral-400">
        Already have an account?{' '}
        <button type="button" onClick={onToggleView} className="font-medium text-slate-800 hover:text-black dark:text-neutral-200 dark:hover:text-white hover:underline focus:outline-none">
          Login
        </button>
      </p>
    </div>
  );
};

export default SignUpForm;