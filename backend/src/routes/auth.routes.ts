import { Router } from 'express';
import passport from 'passport';
import { signIn, signOut, signUp, getProfile, socialAuthCallback } from '../controllers/auth.controller';
import authorize from '../middlewares/auth.middleware';
import '../config/passport'; // Initialize passport strategies

const authRouter = Router();

authRouter.post('/sign-up', signUp);   
authRouter.post('/sign-in', signIn);
authRouter.post('/sign-out', signOut);
authRouter.get('/profile', authorize, getProfile);

// Google Auth
authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
authRouter.get('/google/callback', 
  passport.authenticate('google', { session: false, failureRedirect: '/sign-in' }),
  socialAuthCallback
);

// GitHub Auth
authRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
authRouter.get('/github/callback', 
  passport.authenticate('github', { session: false, failureRedirect: '/sign-in' }),
  socialAuthCallback
);

export default authRouter;