import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import handler from 'express-async-handler';
import UserModel from '../models/user.model.js';// Correct the import path and remove 
const userRouter = Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Replace with your actual JWT secret
const PASSWORD_HASH_SALT_ROUNDS = 10;

// Generate JWT token for user
const generateToken = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    JWT_SECRET,
    {
      expiresIn: '30d', // Token expiration (adjust as needed)
    }
  );

  return token;
};

// Middleware to verify JWT and attach user to req.user
const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach decoded user to request object
    next();
  } catch (error) {
    console.error('JWT verification error:', error);
    return res.status(403).json({ message: 'Invalid token' });
  }
};

// Login endpoint
userRouter.post(
  '/login',
  handler(async (req, res) => {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user);
    res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
      token,
    });
  })
);

// Register endpoint
userRouter.post(
  '/register',
  handler(async (req, res) => {
    const { name, email, password, address } = req.body;

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, PASSWORD_HASH_SALT_ROUNDS);

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      address,
    });

    await newUser.save();

    const token = generateToken(newUser);
    res.status(201).json({
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      isAdmin: newUser.isAdmin,
      token,
    });
  })
);

// Update profile endpoint
userRouter.put(
  '/updateProfile',
  auth, // Middleware to verify JWT
  handler(async (req, res) => {
    const { name, address } = req.body;

    const updatedUser = await UserModel.findByIdAndUpdate(
      req.user.id,
      { name, address },
      { new: true } // Return updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const token = generateToken(updatedUser);
    res.json({
      id: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.name,
      address: updatedUser.address,
      isAdmin: updatedUser.isAdmin,
      token,
    });
  })
);

// Change password endpoint
userRouter.put(
  '/changePassword',
  auth, // Middleware to verify JWT
  handler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    const user = await UserModel.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isEqual = await bcrypt.compare(currentPassword, user.password);

    if (!isEqual) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, PASSWORD_HASH_SALT_ROUNDS);
    user.password = hashedNewPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  })
);

export default userRouter;
