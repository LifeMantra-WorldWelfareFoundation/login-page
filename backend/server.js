const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./routes/auth');
require('dotenv').config();

// Initialize the Express app
const app = express();
const PORT = process.env.PORT || 8080;
const CLIENT_HOME_PAGE_URL = process.env.CLIENT_HOME_PAGE_URL || 'http://localhost:5173';

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/auth', limiter);

// Enable CORS
app.use(cors({
    origin: CLIENT_HOME_PAGE_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing middleware
app.use(express.json());
app.use('/auth', authRoutes);
app.use(express.urlencoded({ extended: true }));

// Configure Express Sessions
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax'
    }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Import Passport configuration
require('./config/passport-setup');

// Routes
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const socialAuthRoutes = require('./routes/auth-routes');
app.use('/auth/social', socialAuthRoutes);


// Health check route
app.get('/', (req, res) => {
    res.json({ 
        status: 'ok',
        message: 'Liquid Glass Login API is running'
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message || 'Internal server error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`🔑 Frontend is expected at: ${CLIENT_HOME_PAGE_URL}`);
    console.log(`📦 Environment: ${process.env.NODE_ENV || 'development'}`);
});