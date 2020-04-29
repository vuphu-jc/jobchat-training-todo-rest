import express from 'express';
import constant from '../../utils/constant';
import helper from '../../utils/helper';
import { AuthService } from '../services/authService';

const authRouter = express.Router();
const authService = new AuthService();

// Ref: https://trungquandev.com/nodejs-xac-thuc-nguoi-dung-su-dung-jwt-token-refreshtoken/

authRouter.post('register', async (req, res) => {
  authService.register(req.body).then(
    () => res.status(constant.statusCode.ok).send(),
    err => helper.route.handleError(res, err),
  );
});

authRouter.post('/login', async (req, res) => {
  let userData = req.body;
  authService.login(userData).then(
    async userData => {
      try {
        const accessToken = await helper.jwt.generateToken(
          userData,
          constant.jwt.secretSignature,
          constant.jwt.accessTokenLife,
        );
        const refreshToken = await helper.jwt.generateToken(
          userData,
          constant.jwt.secretSignature,
          constant.jwt.refreshTokenLife,
        );
        res.status(constant.statusCode.ok).json({ accessToken, refreshToken });
      } catch (err) {
        helper.route.handleError(res, err, constant.statusCode.internalError);
      }
    },
    err => helper.route.handleError(res, err),
  );
});

authRouter.get('/refreshToken', async (req, res) => {
  const refreshToken = req.refreshToken;
  if (refreshToken && tokenList[refreshToken]) {
    try {
      const userData = await helper.jwt.verifyToken(refreshToken, constant.jwt.secretSignature);
      const accessToken = helper.jwt.generateToken(
        userData,
        constant.jwt.secretSignature,
        constant.jwt.accessTokenLife,
      );
      res.status(constant.statusCode.ok).json({ accessToken });
    } catch (err) {
      helper.route.handleError(res, err);
    }
  }
});

module.exports = authRouter;
