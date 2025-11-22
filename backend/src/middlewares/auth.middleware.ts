import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import { JWT_SECRET } from '../config/env';

import User from '../models/user.model';

const authorize = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token;

    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) return res.status(401).json({ success: false, message: 'No token provided, authorization denied' });

    const decoded = jwt.verify(token, JWT_SECRET as string) as { userId: string };

    const user = await User.findById(decoded.userId).select('-password');

    if (!user) return res.status(401).json({ success: false, message: 'User not found, authorization denied' });

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Authorization failed', error });
  }
}

export default authorize;