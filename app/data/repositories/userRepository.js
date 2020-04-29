import { BaseRepository } from './baseRepository';
import { CRUDContainer } from './CRUDContainer';
import mongoose from 'mongoose';
import User from '../models/user';

export class UserRepository extends BaseRepository {
  constructor() {
    super();
    this.model = User;
    this.CRUDContainer = new CRUDContainer(this.model);
  }

  async isExistUser(username) {
    const item = await this.model.findOne({ username: username });
    return item ? true : false;
  }

  async create(userInfo) {
    const user = {
      _id: new mongoose.Types.ObjectId().toString(),
      username: userInfo.username,
      password: userInfo.password,
      name: userInfo.name,
      avatar: userInfo.avatar,
    };
    await this.CRUDContainer.create(user);
    return user._id;
  }

  async read() {
    return this.CRUDContainer.read();
  }

  async readByUsername(username) {
    return this.CRUDContainer.readOne({ username: username });
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
