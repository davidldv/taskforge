import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import User from '../models/user.model';
import { NODE_ENV } from './env';

const SERVER_URL = process.env.SERVER_URL || 'http://localhost:5500';

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'YOUR_GOOGLE_CLIENT_SECRET',
    callbackURL: `${SERVER_URL}/api/v1/auth/google/callback`
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if user exists
      let user = await User.findOne({ googleId: profile.id });
      
      if (!user) {
        // Check if user exists with same email
        const email = profile.emails?.[0]?.value;
        if (email) {
          user = await User.findOne({ email });
          if (user) {
            // Link account
            user.googleId = profile.id;
            await user.save();
            return done(null, user);
          }
        }

        // Create new user
        user = await User.create({
          name: profile.displayName,
          email: email,
          googleId: profile.id,
        });
      }
      
      return done(null, user);
    } catch (error) {
      return done(error as any, undefined);
    }
  }
));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID || 'YOUR_GITHUB_CLIENT_ID',
    clientSecret: process.env.GITHUB_CLIENT_SECRET || 'YOUR_GITHUB_CLIENT_SECRET',
    callbackURL: `${SERVER_URL}/api/v1/auth/github/callback`,
    scope: ['user:email']
  },
  async (accessToken: string, refreshToken: string, profile: any, done: any) => {
    try {
      let user = await User.findOne({ githubId: profile.id });
      
      if (!user) {
        const email = profile.emails?.[0]?.value;
        if (email) {
          user = await User.findOne({ email });
          if (user) {
            user.githubId = profile.id;
            await user.save();
            return done(null, user);
          }
        }

        user = await User.create({
          name: profile.displayName || profile.username,
          email: email,
          githubId: profile.id,
        });
      }
      
      return done(null, user);
    } catch (error) {
      return done(error, undefined);
    }
  }
));

export default passport;
