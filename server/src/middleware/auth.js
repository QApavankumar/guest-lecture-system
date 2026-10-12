const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'telangana_samagra_shiksha_jwt_secret_key_2026';

// Middleware to verify JWT token
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ 
      success: false, 
      message: 'Access denied. No authorization token provided.' 
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Contains id, username, role
    next();
  } catch (error) {
    return res.status(401).json({ 
      success: false, 
      message: 'Invalid or expired session token. Please log in again.' 
    });
  }
};

// Middleware to restrict access to ADMIN only
const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'ADMIN') {
    return res.status(403).json({ 
      success: false, 
      message: 'Access denied. State Administrator privileges required.' 
    });
  }
  next();
};

module.exports = {
  authenticate,
  requireAdmin
};

