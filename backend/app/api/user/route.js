import { NextResponse } from "next/server";
import { createClient } from "../../../utils/supabaseServer.js";

export async function GET(request) {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json(
      { error: error?.message ?? "Not authenticated" },
      { status: 401 }
    );
  }

  return NextResponse.json({ user });
}
