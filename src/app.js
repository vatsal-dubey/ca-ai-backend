import express from 'express';

import authRoutes from './routes/auth.routes.js';
import adminRoutes from './routes/admin.routes.js';
import firmRoutes from './routes/firm.routes.js';
import aiRoutes from './routes/ai.routes.js';

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/firms', firmRoutes);
app.use('/api/ai', aiRoutes);

export default app;
