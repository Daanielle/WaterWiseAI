const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        req.user = null; // No token provided
        return next(); // Proceed without authentication
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            req.user = null; // Invalid token
        } else {
            req.user = user; // Valid token
        }
        next();
    });
}

module.exports = authenticateToken;
