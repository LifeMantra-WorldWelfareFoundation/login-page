const router = require("express").Router();
const passport = require("passport");
const supabase = require("../db");
const { isAuthenticated } = require("../middleware/auth");

const CLIENT_HOME_PAGE_URL =
  process.env.CLIENT_HOME_PAGE_URL || "http://localhost:5173";

// Success and failure redirect URLs
const successRedirect = `${CLIENT_HOME_PAGE_URL}/dashboard`;
const failureRedirect = `${CLIENT_HOME_PAGE_URL}/login?error=true`;

// Check if user is authenticated
router.get("/me", isAuthenticated, (req, res) => {
  const { id, display_name, email, avatar_url, password_hash } = req.user;
  res.json({
    id,
    display_name,
    email,
    avatar_url,
    is_social_account: !password_hash,
  });
});

// Logout route
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Error logging out" });
    }
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Error destroying session" });
      }
      res.redirect(CLIENT_HOME_PAGE_URL);
    });
  });
});

// OAuth routes for each provider
const providers = ["google", "facebook", "twitter", "snapchat", "discord"];

providers.forEach((provider) => {
  // Initial auth route
  router.get(`/${provider}`, (req, res, next) => {
    const scopes = {
      google: ["profile", "email"],
      facebook: ["email"],
      twitter: [],
      snapchat: ["user.display_name", "user.bitmoji.avatar"],
      discord: ["identify", "email"],
    };

    passport.authenticate(provider, { scope: scopes[provider] })(
      req,
      res,
      next
    );
  });

  // Callback route
  router.get(
    `/${provider}/callback`,
    passport.authenticate(provider, { failureRedirect }),
    (req, res) => {
      res.redirect(successRedirect);
    }
  );
});

// ---------------- Local Auth Routes ----------------
const bcrypt = require("bcryptjs");

// Local signup
router.post("/signup", async (req, res) => {
  const { email, password, display_name } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    // Check existing user
    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .single();

    if (existingUser) {
      return res.status(409).json({ message: "Email already registered." });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const { data: newUser, error } = await supabase
      .from("users")
      .insert({
        email,
        password_hash,
        display_name: display_name || email.split("@")[0],
      })
      .select()
      .single();

    if (error) throw error;

    // Log the user in using Passport's req.login
    req.login(newUser, (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Signup succeeded but login failed." });
      }
      return res.json({
        id: newUser.id,
        email: newUser.email,
        display_name: newUser.display_name,
        avatar_url: newUser.avatar_url,
        is_social_account: false,
      });
    });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Local login
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res
        .status(401)
        .json({ message: info?.message || "Invalid credentials." });
    }
    req.login(user, (err) => {
      if (err) return next(err);
      return res.json({
        id: user.id,
        email: user.email,
        display_name: user.display_name,
        avatar_url: user.avatar_url,
        is_social_account: false,
      });
    });
  })(req, res, next);
});

// Update email / password
router.put("/update-profile", isAuthenticated, async (req, res) => {
  const { newEmail, oldPassword, newPassword } = req.body;
  const user = req.user;

  if (!user.password_hash) {
    return res.status(400).json({
      message: "Cannot update credentials for social login accounts.",
    });
  }

  if (!oldPassword) {
    return res.status(400).json({ message: "Old password required." });
  }

  try {
    const isMatch = await bcrypt.compare(oldPassword, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: "Old password incorrect." });
    }

    const updates = {};

    if (newEmail && newEmail !== user.email) {
      updates.email = newEmail;
    }

    if (newPassword) {
      updates.password_hash = await bcrypt.hash(newPassword, 10);
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No changes provided." });
    }

    const { data: updatedUser, error } = await supabase
      .from("users")
      .update(updates)
      .eq("id", user.id)
      .select()
      .single();

    if (error) throw error;

    // Update session
    req.login(updatedUser, (err) => {
      if (err) {
        console.error("Error re-login after update:", err);
      }
    });

    return res.json({
      id: updatedUser.id,
      email: updatedUser.email,
      display_name: updatedUser.display_name,
      avatar_url: updatedUser.avatar_url,
      is_social_account: false,
    });
  } catch (err) {
    console.error("Update profile error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
