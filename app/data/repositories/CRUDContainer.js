import constant from '../../utils/constant';

export class CRUDContainer {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    await this.model(data).save();
  }

  async read(condition = {}) {
    return this.model.find(condition);
  }

  async readOne(condition = {}) {
    return this.model.findOne(condition);
  }

  async update(condition = {}, data) {
    const item = await this.model.findOne(condition);
    if (!item) throw constant.error.objectIsNotExist;
    await this.model.findOneAndUpdate(condition, data);
  }

  async delete(condition = {}) {
    const res = await this.model.deleteOne(condition);
    if (!res.deletedCount) throw constant.error.objectIsNotExist;
  }
}
