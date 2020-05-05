import express from 'express';
import { connect } from 'mongoose';
import { port } from './app/utils/constant';

const app = express();

app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('body-parser').json());

// Connect to MongoDB:
connect('mongodb://127.0.0.1:27017/todo_project', {
  useNewUrlParser: true,
});

import authRoutes from './app/data/controllers/authRoutes';
import productRoutes from './app/data/controllers/productRoutes';
import userRoutes from './app/data/controllers/userRoutes';
import commentRoutes from './app/data/controllers/commentRoutes';

app.use('/', authRoutes);
app.use('/product', productRoutes);
app.use('/user', userRoutes);
app.use('/comment', commentRoutes);

app.listen(5000, () => {
  console.log('Connect to server successfully!');
});
