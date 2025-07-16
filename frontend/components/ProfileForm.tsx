import { useState } from "react";
import { supabase } from "../utils/supabaseClient";

export default function ProfileForm({ userId }: { userId: string }) {
  const [fullName, setFullName] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase
      .from("users")
      .update({ full_name: fullName })
      .eq("id", userId);

    if (error) {
      setStatus("Error updating name: " + error.message);
    } else {
      setStatus("Name updated successfully!");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
      <input
        type="text"
        placeholder="Enter your full name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
      />
      <button type="submit">Save</button>
      <p>{status}</p>
    </form>
  );
}
