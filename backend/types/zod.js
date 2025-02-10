const z = require("zod");

const signupInput = z.object({
    email: z.string().email(),
    password: z.string(),
    name: z.string(),
});
  
const signinInput = z.object({
    email: z.string().email(),
    password: z.string(),
});
  
const createTodoInput = z.object({
    title: z.string(),
    content: z.string(),
});
  
const updateTodoInput = z.object({
    title: z.string(),
    content: z.string(),
    id: z.string(), 
});

module.exports = { signupInput, signinInput, createTodoInput, updateTodoInput };
