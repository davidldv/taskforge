import { Router } from 'express';
import { signIn, signOut, signUp, getProfile } from '../controllers/auth.controller';
import authorize from '../middlewares/auth.middleware';

const authRouter = Router();

authRouter.post('/sign-up', signUp);   
authRouter.post('/sign-in', signIn);
authRouter.post('/sign-out', signOut);
authRouter.get('/profile', authorize, getProfile);

export default authRouter;