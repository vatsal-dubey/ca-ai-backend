import express from 'express';
import authRoutes from './module/auth/auth.routes.js';
import adminRoutes from './module/admin/admin.routes.js';

const router = express.Router();

router.use('/auth', authRoutes);

// router.post(
//   '/ask',
//   // authMiddleware,
//   // checkSubscription,
//   // checkAIQueryLimit,
//   // askAI
// );

// router.post(
//   '/users',
//   // authMiddleware,
//   // checkSubscription,
//   // checkStaffLimit,
//   // createStaff
// );

// router.post(
//   '/documents/upload',
//   // authMiddleware,
//   // checkSubscription,
//   // checkDocumentLimit,
//   // uploadDocument
// );

router.use('/admin', adminRoutes);  

export default router;
