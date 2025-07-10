import { NextResponse } from "next/server";
import { createClient } from "../../utils/supabaseServer.js";

export async function GET(request) {
  // Exchange the auth code in the URL for a session and set cookies.
  const supabase = await createClient();
  await supabase.auth.getUser();

  // After cookies are set, redirect the browser back to the Vite frontend.
  return NextResponse.redirect("http://localhost:5173", {
    status: 302,
  });
}
