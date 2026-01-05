import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwt.js';

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization token missing' });
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, jwtConfig.secret);

    req.user = {
      id: decoded.id,
      role: decoded.role,
      firm_id: decoded.firm_id
    };

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
