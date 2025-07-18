import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuroraBackground from "../components/AuroraBackground";
import Spinner from "../components/Spinner";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

interface UserData {
  display_name: string;
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/auth/me`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else if (res.status === 401) {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden p-4">
        <AuroraBackground />
        <Spinner />
      </main>
    );

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden p-4">
      <AuroraBackground />
      <div className="w-full max-w-md rounded-3xl border dark:border-white/5 border-black/10 bg-gradient-to-b dark:from-white/[.08] dark:to-white/[.02] from-white/60 to-white/40 p-8 shadow-2xl backdrop-blur-2xl space-y-6 text-center">
        <h1 className="text-2xl font-bold bg-gradient-to-b dark:from-neutral-50 dark:to-neutral-300 from-slate-900 to-slate-700 bg-clip-text text-transparent">
          Dashboard
        </h1>
        {user && (
          <p className="text-slate-700 dark:text-neutral-300">
            Welcome, {user.display_name}!
          </p>
        )}
        </div>
        <div>
      <Link to="/profile" className="absolute top-6 right-6 rounded-xl border border-transparent dark:border-white/25 bg-slate-800/80 dark:bg-white/20 px-4 py-2 text-sm font-semibold text-white dark:text-neutral-100 shadow-lg transition-all hover:bg-slate-900 dark:hover:bg-white/25 backdrop-blur-md">
        Profile
      </Link>
      </div>
    </main>
  );
};

export default Dashboard;
