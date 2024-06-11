const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const token = req.headers['x-auth-token'];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Attach user information to request object
      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    // const authHeader = req.headers['authorization'];
    // const token = authHeader && authHeader.split(' ')[1];

    // if (token == null) {
    //     req.user = null; // No token provided
    //     return next(); // Proceed without authentication
    // }

    // jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    //     if (err) {
    //         req.user = null; // Invalid token
    //     } else {
    //         req.user = user; // Valid token
    //     }
    //     next();
    // });
}

module.exports = authenticateToken;
