import express from 'express';
import {
  getFirms,
  activateFirm,
  blockFirm
} from './admin.controller.js';

import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { isAdmin } from '../../middlewares/role.middleware.js';
import {
  assignSubscription
} from './admin.controller.js';
const router = express.Router();

router.get(
  '/firms',
  authMiddleware,
  isAdmin,
  getFirms
);

router.put(
  '/firms/:id/activate',
  authMiddleware,
  isAdmin,
  activateFirm
);

router.put(
  '/firms/:id/deactivate',
  authMiddleware,
  isAdmin,
  blockFirm
);
router.post(
  '/firm/:firmId/assign-subscription',
  authMiddleware,
  isAdmin,
  assignSubscription
);

export default router;
