import { UserRepository } from '../repositories/userRepository';
import { Router } from 'express';
import { statusCode } from '../../utils/constant';
import helper from '../../utils/helper';
import { isAuth } from '../middleware/authMiddleware';

const userRouter = Router();
const userRepository = new UserRepository();

userRouter.use(isAuth);

userRouter.get('/', async (req, res) => {
  userRepository.read().then(
    users => res.status(statusCode.ok).send(users),
    err => helper.route.handleError(res, err),
  );
});

userRouter.get('/:id', async (req, res) => {
  userRepository.readById(req.params.id).then(
    user => res.status(statusCode.ok).send(user),
    err => helper.route.handleError(res, err),
  );
});

userRouter.put('/:id', async (req, res) => {
  userRepository.update(req.params.id, req.body).then(
    () => res.status(statusCode.ok).send(),
    err => helper.route.handleError(res, err),
  );
});

userRouter.delete('/:id', async (req, res) => {
  userRepository.delete(req.params.id).then(
    () => res.status(statusCode.ok).send(),
    err => helper.route.handleError(res, err),
  );
});

export default userRouter;
