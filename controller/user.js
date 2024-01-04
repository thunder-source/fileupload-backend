const User = require('../model/user');

// Data to be included in the token (e.g., user information)
const userData = {
  userId: '12345',
  username: 'example_user',
  // Add more data as needed
};

// Generate a token with an expiration time (optional)
const token = jwt.sign(userData, secretKey, { expiresIn: '1h' }); // Token expires in 1 hour

const receivedToken = token;

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).send('Unauthorized');
    return;
  }
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      res.status(401).send('Unauthorized');
      return;
    }
    req.user = decoded;
    next();
  });
};
