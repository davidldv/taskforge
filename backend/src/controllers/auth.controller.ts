import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/user.model';

import { JWT_SECRET, JWT_EXPIRES_IN, NODE_ENV } from '../config/env';

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email }).session(session);

    if (existingUser) {
      const error = new Error('Email is already in use');
      (error as any).statusCode = 400;
      throw error;
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = await User.create([{
      name,
      email,
      password: hashedPassword
    }], { session });

    const token = jwt.sign({ userId: newUser[0]._id }, JWT_SECRET as string, {
      expiresIn: JWT_EXPIRES_IN as any
    });

    await session.commitTransaction();
    session.endSession();

    res.cookie('token', token, {
      httpOnly: true,
      secure: NODE_ENV === 'production',
      sameSite: NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    const userResponse = newUser[0].toObject();
    delete (userResponse as any).password;

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: userResponse,
        token
      }
    })
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
}

export const signIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      const error = new Error('User not found');
      (error as any).statusCode = 404;
      throw error;
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password as string);

    if (!isPasswordValid) {
      const error = new Error('Invalid password');
      (error as any).statusCode = 401;
      throw error;
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET as string, {
      expiresIn: JWT_EXPIRES_IN as any
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: NODE_ENV === 'production',
      sameSite: NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    const userResponse = user.toObject();
    delete (userResponse as any).password;

    res.status(200).json({
      success: true,
      message: 'User signed in successfully',
      data: {
        user: userResponse,
        token
      }
    });
  } catch (error) {
    next(error);
  }
}

export const signOut = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: NODE_ENV === 'production',
      sameSite: NODE_ENV === 'production' ? 'none' : 'lax'
    });

    res.status(200).json({
      success: true,
      message: 'User signed out successfully'
    });
  } catch (error) {
    next(error);
  }
}

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
}


export const socialAuthCallback = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as any;
    const token = jwt.sign({ userId: user._id }, JWT_SECRET as string, {
      expiresIn: JWT_EXPIRES_IN as any
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: NODE_ENV === 'production',
      sameSite: NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 24 * 60 * 60 * 1000
    });

    // Redirect to frontend
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    res.redirect(frontendUrl);
  } catch (error) {
    next(error);
  }
}
