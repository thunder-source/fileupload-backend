const User = require('../model/user');
const jwt = require('jsonwebtoken');
const user = require('../model/user');
const secretKey = 'your_secret_key_here';

const login = async (req, res) => {
  const { email, password } = req.body;
  if (email === 'admin' && password === 'admin') {
    const token = jwt.sign({ email }, secretKey);
    res.send({ token });
  } else {
    res.status(401).send('Unauthorized');
  }
};

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = new User({
    email,
    password,
  });
  await user.save();
  res.send(user);
};

const logout = async (req, res) => {
  res.send('Logout');
};

const verifyUser = () => {
  jwt.verify(receivedToken, secretKey, (err, decoded) => {
    if (err) {
      console.error('Token verification failed:', err.message);
      // Token is invalid or expired
    } else {
      console.log('Decoded Token:', decoded);
      // The token is valid, and you can access the decoded data
    }
  });
};

module.exports = { login, signup, logout };
