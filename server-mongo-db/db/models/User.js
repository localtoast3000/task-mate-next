import mongoose from 'mongoose';

export default mongoose.model(
  'users',
  mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
  })
);
