import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minLength: [3, 'Name must be at least 3 characters long'],
    maxLength: [50, 'Name must be at most 50 characters long']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^\S+@\S+\.\S+$/,
      'Please provide a valid email address'
    ],
  },
  password: {
    type: String,
    required: [false, 'Password is required'], // Not required for OAuth users
    minLength: [6, 'Password must be at least 6 characters long'],
    select: false,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
    select: false,
  },
  githubId: {
    type: String,
    unique: true,
    sparse: true,
    select: false,
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;