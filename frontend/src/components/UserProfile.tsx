
import React from 'react';

// This interface now matches the data structure provided by our backend
interface UserProfileData {
  display_name: string;
  email: string;
  avatar_url: string;
}

interface UserProfileProps {
  user: UserProfileData;
  onLogout: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onLogout }) => {
  return (
    <div className="w-full max-w-md rounded-3xl border dark:border-white/5 border-black/10 bg-gradient-to-b dark:from-white/[.08] dark:to-white/[.02] from-white/60 to-white/40 p-8 text-center shadow-2xl backdrop-blur-2xl dark:[box-shadow:inset_0_1px_0_rgba(255,255,255,0.1)] [box-shadow:inset_0_1px_0_rgba(255,255,255,0.2)]">
      <img
        src={user.avatar_url || 'https://avatar.vercel.sh/person.svg'}
        alt="Profile Picture"
        className="mx-auto h-24 w-24 rounded-full border-2 border-black/10 dark:border-white/30 object-cover shadow-lg"
      />
      <h1 className="mt-6 mb-1 bg-gradient-to-b dark:from-neutral-50 dark:to-neutral-300 from-slate-900 to-slate-700 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
        {user.display_name}
      </h1>
      <p className="text-slate-500 dark:text-neutral-400">{user.email}</p>

      <div className="my-8 border-t border-black/10 dark:border-white/10"></div>

      <button
        onClick={onLogout}
        className="w-full rounded-xl border border-transparent dark:border-white/25 bg-slate-800/80 dark:bg-white/20 px-4 py-3 font-semibold text-white dark:text-neutral-100 shadow-lg transition-all duration-200 ease-in-out hover:bg-slate-900 dark:hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-slate-800 dark:focus:ring-white/50 [box-shadow:inset_0_1px_0_rgba(255,255,255,0.1)] dark:[box-shadow:inset_0_1px_0_rgba(255,255,255,0.2)]"
      >
        Logout
      </button>
    </div>
  );
};

export default UserProfile;