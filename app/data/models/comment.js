import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    productId: { type: String, required: true },
    user: {
      _id: { type: String, required: true },
      name: { type: String, required: true },
      avatar: { type: String },
    },
    content: { type: String },
  },
  {
    versionKey: false,
    collection: 'comments',
  },
);

CommentSchema.index({ productId: 1 });

export default mongoose.model('Comment', CommentSchema);
