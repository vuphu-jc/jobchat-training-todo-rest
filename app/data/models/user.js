import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    avatar: { type: String },
  },
  {
    versionKey: false,
    collection: 'users',
  },
);

export default mongoose.model('User', UserSchema);
