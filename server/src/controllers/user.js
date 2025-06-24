import { comparePassword, createJWT, hashPassword } from '../lib/auth.js';
import User from '../models/user.js';
import db from '../db/db.js';

export const createUser = async (req, res, next) => {
  await db.connect();
  try {
    const { username, password, location } = req.body;

    const existingUser = await User.findOne({
      $or: [{ username }],
    });

    if (existingUser) {
      const error = new Error('Username already exists');
      error.statusCode = 400;
      return next(error);
    }

    const hashedPassword = await hashPassword(password, 16);

    const newUser = new User({
      username,
      password: hashedPassword,
      location,
    });

    await newUser.save();

    const token = createJWT(
      {
        _id: newUser._id,
        username: newUser.username,
        role: newUser.role,
      },
      '30d',
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ message: 'User created successfully' });
    await db.close();
  } catch (error) {
    return next(error);
  }
};

export const verifyUser = async (req, res, next) => {
  await db.connect();
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      const error = new Error('Invalid username or password');
      error.statusCode = 401;
      return next(error);
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      const error = new Error('Invalid username or password');
      error.statusCode = 401;
      return next(error);
    }

    const { _id, role } = user;

    const token = createJWT({ _id, username, role }, '30d');

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: 'Login successful' });
    await db.close();
  } catch (error) {
    return next(error);
  }
};
