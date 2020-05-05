const error = {
  // Common
  objectIsNotExist: 'Object is not exists',

  // Authentication
  accessTokenIsNotFound: 'Access token is not found',
  accessTokenIsNotValid: 'Access token is not valid',
  usernameAlreadyExists: 'Username already exists',
  usernameIsNotExists: 'Username is not exists',
  passwordIncorrect: 'Password is incorrect',
};

const statusCode = {
  ok: 200,
  badRequest: 400,
  forbidden: 403,
  internalError: 500,
};

const port = {
  expressPort: 5000,
};

const jwt = {
  secretSignature: 'JobChat',
  accessTokenLife: '2d',
  refreshTokenLife: '20d',
  hashAlgorithm: 'HS256',
};

const bcrypt = {
  saltRounds: 10,
};

module.exports = {
  error: { ...error },
  statusCode: { ...statusCode },
  port: { ...port },
  jwt: { ...jwt },
  bcrypt: { ...bcrypt },
};
