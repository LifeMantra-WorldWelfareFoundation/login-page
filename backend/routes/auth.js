const express = require("express");
const router = express.Router();
const supabase = require("../supabaseClient");

router.post("/signup", async (req, res) => {
  const { email, password, fullName } = req.body;

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: process.env.EMAIL_REDIRECT_URL,
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      console.error("Supabase signup error:", error.message);
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ message: "Signup successful" });
  } catch (err) {
    console.error("Unexpected signup error:", err);
    return res.status(500).json({ error: err.message || "Unexpected error" });
  }
});





router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.error("Login error:", error.message);
      return res.status(401).json({ error: error.message });
    }

    return res.status(200).json({ user: data.user, session: data.session });
  } catch (err) {
    console.error("Server error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;
