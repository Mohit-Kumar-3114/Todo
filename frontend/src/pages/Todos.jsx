import { useEffect, useState } from 'react';
import TodoCard from './TodoCard';
import axios from 'axios';

const url = import.meta.env.VITE_BACKEND_URL;

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const name = localStorage.getItem("name");
  const token = localStorage.getItem("token");

  
    const fetchTodos = async () => {
      try {
        const response = await axios.get(`${url}/api/v1/all-todo`, {
          headers: {
            'Authorization': token,
          },
        });

        const sortedTodos = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setTodos(sortedTodos);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };
    useEffect(() => {
    fetchTodos();
  }, [token]);

  return (
    <div>
      <nav className="bg-sky-950 p-4">
        <div className="mx-auto flex items-center justify-between">
          <div className="text-slate-50 text-4xl font-bold font-serif ml-12">ToDo App</div>
          <div className="space-x-6">
            <a href="/write" className="text-slate-50 font-serif text-xl hover:underline">Create Todo</a>
            <a href="/signin" className="text-slate-50 font-serif text-xl hover:underline">Logout</a>
            <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-white rounded-full">
              <span className="font-medium text-sky-950">{name?.slice(0, 1).toUpperCase()}</span>
            </div>
          </div>
        </div>
      </nav>
      <div className="mt-4">
        {todos.map((todo) => (
          <TodoCard
            id={todo._id}
            authorId={todo.authorId}
            title={todo.title}
            content={todo.content}
            date={todo.createdAt} 
            completed={todo.completed}
          />
        ))}
      </div>
    </div>
  );
};

export default Todos;
