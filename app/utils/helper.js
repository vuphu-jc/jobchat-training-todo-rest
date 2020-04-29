const jwt = require('jsonwebtoken');
const constant = require('./constant');

// Ref: https://github.com/trungquan17/nodejs-jwt-authenticate-user/blob/master/src/helpers/jwt.helper.js

const generateToken = (user, secretSignature, tokenLife) => {
  return new Promise((resolve, reject) => {
    const userData = {
      _id: user._id,
      username: user.username,
      name: user.name,
      avatar: user.avatar,
    };
    jwt.sign(
      { data: userData },
      secretSignature,
      {
        algorithm: constant.jwt.hashAlgorithm,
        expiresIn: tokenLife,
      },
      (err, token) => {
        return err ? reject(err) : resolve(token);
      },
    );
  });
};

const verifyToken = (token, secretSignature) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretSignature, null, (err, decoded) => {
      return err ? reject(err) : resolve(decoded);
    });
  });
};

function handleError(res, err, statusCode = constant.statusCode.badRequest) {
  res.status(statusCode).json({ message: err.toString() });
}

module.exports = {
  jwt: {
    generateToken: generateToken,
    verifyToken: verifyToken,
  },
  route: {
    handleError: handleError,
  },
};
