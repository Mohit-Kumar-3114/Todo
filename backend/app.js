const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { signupInput, signinInput, createTodoInput, updateTodoInput } = require('./types/zod');
const {User, Todo}=require("./db/model")
const {authenticate} =require("./middleware/auth")

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DATABASE_URL
).then(() => {
    console.log('Connected to DB');
}).catch(err => console.log(err));




app.post('/api/v1/signup', async (req, res) => {
  const { email, password, name } = req.body;
  const result = signupInput.safeParse({ name, email, password });
  if (!result.success) {
    return res.status(400).json({ error: 'Invalid input' });
  }
  try {
    user = await User.create(result.data);
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ jwt: token, name: user.name, id: user._id });
  } catch (error) {
    res.status(403).json({ error: 'Error while signing up' });
  }
});




app.post('/api/v1/signin', async (req, res) => {
  const { email, password } = req.body;
  const result = signinInput.safeParse({ email, password });
  if (!result.success) {
    return res.status(400).json({ error: 'Invalid input' });
  }
  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(403).json({ error: 'User not found' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ jwt: token, name: user.name, id: user._id });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});




app.post('/api/v1/todo', authenticate, async (req, res) => {
  const { title, content } = req.body;
  const result = createTodoInput.safeParse({ title, content });
  if (!result.success) {
    return res.status(400).json({ error: 'Invalid input' });
  }
  try {
    const todo = await Todo.create({
      title: result.data.title,
      content: result.data.content,
      authorId: req.userId,
    });
    return res.json({ id: todo._id });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while creating the todo' });
  }
});




app.put('/api/v1/todo', authenticate, async (req, res) => {
  const { id, title, content } = req.body;
  const result = updateTodoInput.safeParse({ id, title, content });
  if (!result.success) {
    return res.status(400).json({ error: 'Invalid input' });
  }
  try {
    await Todo.updateOne({ _id: id, authorId: req.userId }, { title, content });
    return res.status(200).json({ message: 'Updated todo' });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while updating the todo' });
  }
});




app.delete('/api/v1/todo/:id', authenticate, async (req, res) => {
  try {
    await Todo.deleteOne({ _id: req.params.id, authorId: req.userId });
    return res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred' });
  }
});




app.get('/api/v1/todo/:id', authenticate, async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id });
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    return res.status(200).json(todo);
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred' });
  }
});




app.get('/api/v1/all-todo', authenticate, async (req, res) => {
  try {
    const todos = await Todo.find({ authorId: req.userId })
    return res.status(200).json(todos);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'An error occurred while fetching todos' });
  }
});




app.put('/api/v1/complete-todo', authenticate, async (req, res) => {
  const { id} = req.body;

  try {
    await Todo.updateOne(
      { _id: id, authorId: req.userId },
      { completed: true }
    );

    return res.status(200).json({ message: 'Updated todo and marked as completed' });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while updating the todo' });
  }
});





const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
