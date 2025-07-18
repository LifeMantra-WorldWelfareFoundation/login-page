import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuroraBackground from "../components/AuroraBackground";
import TextInput from "../components/TextInput";
import Spinner from "../components/Spinner";
import { FaEnvelope, FaLock } from "react-icons/fa";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

interface UserData {
  id: string;
  display_name: string;
  email: string;
  avatar_url: string | null;
  is_social_account: boolean;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [newEmail, setNewEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [updateMsg, setUpdateMsg] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/auth/me`, {
        credentials: "include",
      });
      if (res.ok) {
        const data: UserData = await res.json();
        setUser(data);
      } else if (res.status === 401) {
        navigate("/");
      } else {
        throw new Error("Failed to fetch user");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdateMsg(null);
    try {
      const res = await fetch(`${BACKEND_URL}/auth/update-profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ newEmail, oldPassword, newPassword }),
      });
      if (res.ok) {
        setUpdateMsg("Profile updated");
        setNewEmail("");
        setOldPassword("");
        setNewPassword("");
        fetchProfile();
      } else {
        const data = await res.json();
        setUpdateMsg(data.message || "Update failed");
      }
    } catch (err) {
      console.error(err);
      setUpdateMsg("Update failed");
    }
  };

  if (loading)
    return (
      <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden p-4">
        <AuroraBackground />
        <Spinner />
      </main>
    );
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden p-4">
      <AuroraBackground />
      {user && (
        <div className="w-full max-w-md rounded-3xl border dark:border-white/5 border-black/10 bg-gradient-to-b dark:from-white/[.08] dark:to-white/[.02] from-white/60 to-white/40 p-8 shadow-2xl backdrop-blur-2xl space-y-6">
          <div className="flex flex-col items-center space-y-2">
            {user.avatar_url && (
              <img
                src={user.avatar_url}
                alt="avatar"
                className="w-24 h-24 rounded-full object-cover"
              />
            )}
            <h2 className="text-xl font-semibold text-slate-800 dark:text-neutral-100">
              {user.display_name}
            </h2>
            <p className="text-gray-600 dark:text-neutral-300">{user.email}</p>
          </div>

          {!user.is_social_account ? (
            <form onSubmit={handleUpdate} className="space-y-4">
              {updateMsg && (
                <div className="text-sm text-center text-blue-600 dark:text-blue-400">
                  {updateMsg}
                </div>
              )}

              <div>
                <TextInput
                  id="newEmail"
                  type="email"
                  placeholder="New Email (optional)"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  icon={<FaEnvelope />}
                />
              </div>

              <div>
                <TextInput
                  id="oldPassword"
                  type="password"
                  placeholder="Current Password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  icon={<FaLock />}
                  required
                />
              </div>

              <div>
                <TextInput
                  id="newPassword"
                  type="password"
                  placeholder="New Password (optional)"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  icon={<FaLock />}
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl border border-transparent dark:border-white/25 bg-slate-800/80 dark:bg-white/20 px-4 py-3 font-semibold text-white dark:text-neutral-100 shadow-lg transition-all duration-200 ease-in-out hover:bg-slate-900 dark:hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-slate-800 dark:focus:ring-white/50"
              >
                Save Changes
              </button>
            </form>
          ) : (
            <p className="text-center text-sm text-gray-600 dark:text-neutral-400">
              Account created via social login. Email and password cannot be
              changed here.
            </p>
          )}
        </div>
      )}
    </main>
  );
};

export default Profile;
