import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import ProfileForm from "../components/ProfileForm";

export default function ProfilePage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserAndProfile = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (user && user.id) {
        setUserId(user.id);

        const { data, error } = await supabase
          .from("users")
          .select("full_name")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error("Error fetching full_name:", error.message);
        } else {
          setFullName(data.full_name);
        }
      }

      setLoading(false);
    };

    getUserAndProfile();
  }, []);

  return (
    <div>
      <h1>Welcome to Your Profile</h1>
      {loading ? (
        <p>Loading user data...</p>
      ) : (
        <>
          {fullName ? <p><strong>Full Name:</strong> {fullName}</p> : <p>No profile data found.</p>}
          {userId && <ProfileForm userId={userId} />}
        </>
      )}
    </div>
  );
}
