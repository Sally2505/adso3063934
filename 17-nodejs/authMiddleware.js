const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret';

module.exports = (req, res, next) => {
    const authHeader = req.header('Authorization') || req.header('authorization');

    if (!authHeader) return res.status(401).json({ error: 'Access Denied!' });

    const parts = authHeader.trim().split(' ');
    const token = parts.length > 1 ? parts[1] : parts[0];

    if (!token) return res.status(401).json({ error: 'Access Denied!' });

    try {
        const verified = jwt.verify(token, SECRET_KEY);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ error: 'Invalid Token!' });
    }
};