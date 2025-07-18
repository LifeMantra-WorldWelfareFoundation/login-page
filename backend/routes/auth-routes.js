const router = require("express").Router();
const passport = require("passport");
const { isAuthenticated } = require("../middleware/auth");

const CLIENT_HOME_PAGE_URL =
  process.env.CLIENT_HOME_PAGE_URL || "http://localhost:5173";

// Success and failure redirect URLs
const successRedirect = `${CLIENT_HOME_PAGE_URL}/dashboard`;
const failureRedirect = `${CLIENT_HOME_PAGE_URL}/login?error=true`;

// Check if user is authenticated
router.get("/me", isAuthenticated, (req, res) => {
  res.json(req.user);
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

// Email/Password routes (placeholder - implement if needed)
router.post("/login", (req, res) => {
  res.status(501).json({
    message:
      "Email/password authentication not implemented. Please use social login.",
  });
});

router.post("/signup", (req, res) => {
  res.status(501).json({
    message: "Email/password signup not implemented. Please use social login.",
  });
});

module.exports = router;
