import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
  },
  {
    versionKey: false,
    collection: 'products',
  },
);

export default mongoose.model('Product', ProductSchema);
