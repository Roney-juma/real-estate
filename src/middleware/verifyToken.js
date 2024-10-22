const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const { TokenIssuer, TokenSecret } = require('../constants/encryption.constants.js');

const folderPath = path.resolve(`${process.cwd()}/keys`);
const publicKey = fs.readFileSync(`${folderPath}/public.pem`, 'utf8');


const verifyToken = (roles = []) => (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
      return res.status(401).json({ message: 'No token provided' });
  }

  try {
      jwt.verify(token, publicKey.replace(/\\n/gm, '\n'), {
          issuer: TokenIssuer,
          algorithms: ['RS512'],
      }, (err, decoded) => {
          if (err) {
              return res.status(401).json({ message: 'Invalid or expired token' });
          }
          req.user = decoded.payload;

          // Check if the user's role is in the allowed roles
          if (roles.length && !roles.includes(req.user.role_ID)) {
              return res.status(403).json({ message: 'Forbidden: Restricted Access' });
          }

          next();
      });
  } catch (err) {
      console.error('Error verifying token:', err);
      return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = verifyToken;
