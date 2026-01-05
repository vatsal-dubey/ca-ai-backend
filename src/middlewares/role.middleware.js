export const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access only' });
  }
  next();
};
export const isCA = (req, res, next) => {
  if (req.user.role !== 'ca') {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};
