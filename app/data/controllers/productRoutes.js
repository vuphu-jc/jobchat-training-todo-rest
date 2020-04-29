import { ProductRepository } from '../repositories/productRepository';
import { Router } from 'express';
import { statusCode } from '../../utils/constant';
import helper from '../../utils/helper';
import { isAuth } from '../middleware/authMiddleware';

const productRouter = Router();
const productRepository = new ProductRepository();

productRouter.use(isAuth);

productRouter.post('/', async (req, res) => {
  productRepository.create(req.body).then(
    () => res.status(statusCode.ok).send(),
    err => helper.route.handleError(res, err),
  );
});

productRouter.get('/', async (req, res) => {
  productRepository.read().then(
    products => res.status(statusCode.ok).send(products),
    err => helper.route.handleError(res, err),
  );
});

productRouter.get('/:id', async (req, res) => {
  productRepository.readById(req.params.id).then(
    product => res.status(statusCode.ok).send(product),
    err => helper.route.handleError(res, err),
  );
});

productRouter.put('/:id', async (req, res) => {
  productRepository.update(req.params.id, req.body).then(
    () => res.status(statusCode.ok).send(),
    err => helper.route.handleError(res, err),
  );
});

productRouter.delete('/:id', async (req, res) => {
  productRepository.delete(req.params.id).then(
    () => res.status(statusCode.ok).send(),
    err => helper.route.handleError(res, err),
  );
});

export default productRouter;
