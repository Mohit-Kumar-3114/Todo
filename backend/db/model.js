const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
const TodoSchema = new mongoose.Schema({
    title: String,
    content: String,
    createdAt: { type: Date, default: Date.now },
    completed:{type:Boolean, default:false},
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  });

const User = mongoose.model('User', UserSchema);
const Todo = mongoose.model('Todo', TodoSchema);

module.exports={User,Todo}