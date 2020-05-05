import { BaseRepository } from './baseRepository';
import { CRUDContainer } from './CRUDContainer';
import { UserRepository } from '../repositories/userRepository';
import { Types } from 'mongoose';
import Comment from '../models/comment'

export class CommentRepository extends BaseRepository {
  constructor() {
    super();
    this.model = Comment;
    this.CRUDContainer = new CRUDContainer(this.model);
    this.userRepository = new UserRepository();
  }

  async create(userInfo, commentInfo) {
    const comment = {
      _id: new Types.ObjectId().toString(),
      productId: commentInfo.productId,
      user: {
        _id: userInfo._id,
        name: userInfo.name,
        avatar: userInfo.avatar || '',
      },
      content: commentInfo.content,
    };
    await this.CRUDContainer.create(comment);
    return comment._id;
  }

  async readCommentOfProduct(productId) {
    return this.CRUDContainer.read({ productId: productId });
  }

  async update(id, userInfo) {
    await this.CRUDContainer.update({ _id: id }, userInfo);
  }

  async delete(id) {
    await this.CRUDContainer.delete({ _id: id });
  }
}
