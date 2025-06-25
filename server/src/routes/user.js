import express from 'express';
import { createUser, verifyUser } from '../controllers/user.js';
import { verifyUserToken } from '../middleware/verify-user-token.js';
import { validateInputs } from '../middleware/input-validation.js';
import { userValidationRules } from '../lib/auth-rules.js';
import UserModel from '../models/user.js';
import db from '../db/db.js';
export const router = express.Router();

router
  .route('/register')
  .post(validateInputs(userValidationRules.register), createUser);
router
  .route('/login')
  .post(verifyUserToken, validateInputs(userValidationRules.login), verifyUser);

router.get('/list', async (req, res) => {
  await db.connect();
  const users = await UserModel.find();
  console.log(users);

  res.json(users);
});
