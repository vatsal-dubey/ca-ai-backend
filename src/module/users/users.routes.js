import express from 'express';
import { createStaff } from './user.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import {
  checkSubscription,
  checkStaffLimit
} from '../../middlewares/subscription.middleware.js';

const router = express.Router();

router.post(
  '/',
  authMiddleware,
  checkSubscription,
  checkStaffLimit,
  createStaff
);

export default router;
