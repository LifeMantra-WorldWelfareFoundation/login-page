const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const SnapchatStrategy = require('passport-snapchat').Strategy;
const DiscordStrategy = require('passport-discord').Strategy;
const supabase = require('../db');
require('dotenv').config();

// Serialize user for the session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
    try {
        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', id)
            .single();
        
        if (error) throw error;
        done(null, user);
    } catch (error) {
        console.error('Error deserializing user:', error);
        done(error, null);
    }
});

// Generic function to handle OAuth user creation/retrieval
async function findOrCreateUser(provider, profile, done) {
    try {
        // Check for existing social connection
        const { data: existingConnection, error: connError } = await supabase
            .from('social_connections')
            .select('*, users(*)')
            .eq('provider', provider)
            .eq('provider_user_id', profile.id)
            .single();

        if (existingConnection && !connError) {
            return done(null, existingConnection.users);
        }
        
        // Extract user data from profile
        const email = profile.emails?.[0]?.value || null;
        let avatarUrl = profile.photos?.[0]?.value || null;
        
        // Provider-specific avatar URLs
        if (provider === 'discord' && profile.avatar) {
            avatarUrl = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`;
        } else if (provider === 'snapchat' && profile.bitmoji?.avatarUrl) {
            avatarUrl = profile.bitmoji.avatarUrl;
        }

        // Try to find existing user by email
        let user = null;
        if (email) {
            const { data: existingUser } = await supabase
                .from('users')
                .select('*')
                .eq('email', email)
                .single();
            user = existingUser;
        }

        // Create new user if not found
        if (!user) {
            const { data: newUser, error: createError } = await supabase
                .from('users')
                .insert({
                    display_name: profile.displayName || profile.username || 'User',
                    email: email,
                    avatar_url: avatarUrl,
                })
                .select()
                .single();
                
            if (createError) throw createError;
            user = newUser;
        }

        // Create social connection
        const { error: linkError } = await supabase
            .from('social_connections')
            .insert({
                user_id: user.id,
                provider: provider,
                provider_user_id: profile.id
            });
            
        if (linkError) throw linkError;

        return done(null, user);

    } catch (error) {
        console.error(`Error in findOrCreateUser for ${provider}:`, error);
        return done(error, null);
    }
}

// Configure strategies only if credentials are provided
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
        findOrCreateUser('google', profile, done);
    }));
}

if (process.env.FACEBOOK_CLIENT_ID && process.env.FACEBOOK_CLIENT_SECRET) {
    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: '/auth/facebook/callback',
        profileFields: ['id', 'displayName', 'photos', 'email']
    }, (accessToken, refreshToken, profile, done) => {
        findOrCreateUser('facebook', profile, done);
    }));
}

if (process.env.TWITTER_CONSUMER_KEY && process.env.TWITTER_CONSUMER_SECRET) {
    passport.use(new TwitterStrategy({
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        callbackURL: '/auth/twitter/callback'
    }, (token, tokenSecret, profile, done) => {
        findOrCreateUser('twitter', profile, done);
    }));
}

if (process.env.SNAPCHAT_CLIENT_ID && process.env.SNAPCHAT_CLIENT_SECRET) {
    passport.use(new SnapchatStrategy({
        clientID: process.env.SNAPCHAT_CLIENT_ID,
        clientSecret: process.env.SNAPCHAT_CLIENT_SECRET,
        callbackURL: '/auth/snapchat/callback',
        scope: ['user.display_name', 'user.bitmoji.avatar']
    }, (accessToken, refreshToken, profile, done) => {
        findOrCreateUser('snapchat', profile, done);
    }));
}

if (process.env.DISCORD_CLIENT_ID && process.env.DISCORD_CLIENT_SECRET) {
    passport.use(new DiscordStrategy({
        clientID: process.env.DISCORD_CLIENT_ID,
        clientSecret: process.env.DISCORD_CLIENT_SECRET,
        callbackURL: '/auth/discord/callback',
        scope: ['identify', 'email']
    }, (accessToken, refreshToken, profile, done) => {
        findOrCreateUser('discord', profile, done);
    }));
}

module.exports = passport;