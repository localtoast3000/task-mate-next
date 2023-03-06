import mongoose from 'mongoose';

export default mongoose.model(
  'tasks',
  mongoose.Schema({
    author: mongoose.SchemaTypes.ObjectId,
    description: String,
    ends: Date,
    completed: Boolean,
  })
);
