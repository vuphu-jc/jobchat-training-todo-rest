import { CommentRepository } from '../repositories/commentRepository';
import { Router } from 'express';
import { statusCode } from '../../utils/constant';
import helper from '../../utils/helper';
import { isAuth } from '../middleware/authMiddleware';

const commentRouter = Router();
const commentRepository = new CommentRepository();
commentRouter.use(isAuth);

commentRouter.post('/', async (req, res) => {
  commentRepository.create(req.userData, req.body).then(
    () => res.status(statusCode.ok).send(),
    err => helper.route.handleError(res, err),
  );
});

commentRouter.get('/:productId', async (req, res) => {
  commentRepository.readCommentOfProduct(req.params.productId).then(
    comments => res.status(statusCode.ok).send(comments),
    err => helper.route.handleError(res, err),
  );
});

commentRouter.put('/:id', async (req, res) => {
  commentRepository.update(req.params.id, req.body).then(
    () => res.status(statusCode.ok).send(),
    err => helper.route.handleError(res, err),
  );
});

commentRouter.delete('/:id', async (req, res) => {
  commentRepository.delete(req.params.id).then(
    () => res.status(statusCode.ok).send(),
    err => helper.route.handleError(res, err),
  );
});

export default commentRouter;
