import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { isCA } from '../middlewares/role.middleware.js';
import { checkSubscription } from '../middlewares/subscription.middleware.js';
import { checkUserLimit } from '../middlewares/user-limit.middleware.js';
import {
  createUser,
  listUsers,
  deactivateUser
} from '../controllers/staff.controller.js';

const router = express.Router();

router.post(
  '/',
  authMiddleware,
  isCA,
  checkSubscription,
  checkUserLimit,
  createUser
);

router.get(
  '/',
  authMiddleware,
  isCA,
  listUsers
);

router.put(
  '/:id/deactivate',
  authMiddleware,
  isCA,
  deactivateUser
);

export default router;
