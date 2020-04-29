import constant from '../../utils/constant';
import helper from '../../utils/helper';

// Ref: https://trungquandev.com/nodejs-xac-thuc-nguoi-dung-su-dung-jwt-token-refreshtoken/
// Ref: https://stackoverflow.com/questions/30350486/how-do-i-access-gettoken-in

function getTokenFromHeaderOrQueryString(req) {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
    return req.headers.authorization.split(' ')[1];
  else if (req.query && req.query.token) return req.query.token;

  return null;
}

export const isAuth = async (req, res, next) => {
  const token = getTokenFromHeaderOrQueryString(req);
  if (!token) {
    return helper.route.handleError(
      res,
      constant.error.accessTokenIsNotFound,
      constant.statusCode.badRequest,
    );
  }
  try {
    let decoded = await helper.jwt.verifyToken(token, constant.jwt.secretSignature);
    req.userData = decoded.data;
    next();
  } catch (err) {
    helper.route.handleError(
      res,
      constant.error.accessTokenIsNotValid,
      constant.statusCode.forbidden,
    );
  }
};
