import { BaseRepository } from './baseRepository';
import { CRUDContainer } from './CRUDContainer';
import mongoose from 'mongoose';
import Product from '../models/product';

export class ProductRepository extends BaseRepository {
  constructor() {
    super();
    this.model = Product;
    this.CRUDContainer = new CRUDContainer(this.model);
  }

  async create(productInfo) {
    const product = {
      _id: new mongoose.Types.ObjectId().toString(),
      name: productInfo.name,
      description: productInfo.description,
      price: productInfo.price,
    };
    await this.CRUDContainer.create(product);
    return product._id;
  }

  async read() {
    return this.CRUDContainer.read();
  }

  async readById(id) {
    return this.CRUDContainer.readOne({ _id: id });
  }

  async update(id, userInfo) {
    await this.CRUDContainer.update({ _id: id }, userInfo);
  }

  async delete(id) {
    await this.CRUDContainer.delete({ _id: id });
  }
}
