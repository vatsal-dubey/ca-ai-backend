import express from 'express';
import { uploadDocument } from './document.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import {
  checkSubscription,
  checkDocumentLimit
} from '../../middlewares/subscription.middleware.js';

const router = express.Router();

router.post(
  '/upload',
  authMiddleware,
  checkSubscription,
  checkDocumentLimit,
  uploadDocument
);

export default router;
