import express from 'express';
import routes from './routes.js';
import cors from 'cors';

const app = express();
// app.use(cors());
app.use(cors({
  origin: 'http://localhost:3000', // exact frontend URL
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// Mount the central router which defines all sub-routes
app.use('/api', routes);

export default app;
