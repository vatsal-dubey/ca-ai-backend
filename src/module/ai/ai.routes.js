import express from 'express';

import authRoutes from './modules/auth/auth.routes.js';
import aiRoutes from './modules/ai/ai.routes.js';
import userRoutes from './modules/users/user.routes.js';
import documentRoutes from './modules/documents/document.routes.js';
import authMiddleware from './middlewares/auth.middleware.js';
import { askAI } from './modules/ai/ai.controller.js';
import { checkSubscription } from './middlewares/subscription.middleware.js';
import { checkAiLimit } from './middlewares/ai-limit.middleware.js';
const router = express.Router();

router.use('/auth', authRoutes);
router.use('/ai', aiRoutes);
router.use('/users', userRoutes);
router.use('/documents', documentRoutes);
router.post(
  '/ask',
  authMiddleware,
  checkSubscription,
  checkAiLimit,
  askAI
);


export default router;
