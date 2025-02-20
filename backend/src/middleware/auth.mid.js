import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Replace with your actual JWT secret

// Middleware to verify JWT and attach user to req.user
export const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach decoded user to request object
    next();
  } catch (error) {
    console.error('JWT verification error:', error);
    return res.status(403).send('Invalid token');
  }
};
