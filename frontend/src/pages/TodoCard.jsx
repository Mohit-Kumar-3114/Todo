import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import TodoButton from './TodoCompleted';

const url = import.meta.env.VITE_BACKEND_URL;

const TodoCard = ({ id, title, date, content, authorId,completed }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [more, setMore] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem("id");
  console.log(userId)
  const name=localStorage.getItem("name")

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Do you want to delete this task?");
    
    if (confirmDelete) {
      try {
        await axios.delete(`${url}/api/v1/todo/${id}`, {
          headers: {
            Authorization: token,
          },
        });
        setIsDeleted(true);
        alert("Task deleted successfully!");
      } catch (error) {
        console.error('Error deleting the task:', error);
      }
    }
  };
  

  if (isDeleted) {
    return null;
  }

  const handleUpdate = () => {
    navigate(`/update/${id}`);
  };

  const handleMore = () => {
    setMore(!more);
  };

  return (
    <div className="flex my-4 justify-center">
      <div className="border-4 border-sky-950 shadow-lg shadow-sky-800 rounded-lg w-3/4 mt-2 p-4">
        <div className="flex justify-between items-center mb-1">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-sky-950 rounded-full text-white">
              {name.slice(0,1).toUpperCase()}
            </div>
            <span className="pl-2 text-sky-950">{formatDistanceToNow(new Date(date), { addSuffix: true })}</span>
          </div>

          <div className="flex space-x-2">
            
              <>
                <button onClick={handleUpdate}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M 18.414062 2 C 18.158062 2 17.902031 2.0979687 17.707031 2.2929688 L 15.707031 4.2929688 L 14.292969 5.7070312 L 3 17 L 3 21 L 7 21 L 21.707031 6.2929688 C 22.098031 5.9019687 22.098031 5.2689063 21.707031 4.8789062 L 19.121094 2.2929688 C 18.926094 2.0979687 18.670063 2 18.414062 2 z"></path>
                  </svg>
                </button>
                <button className='pl-3' onClick={handleDelete}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M 10 2 L 9 3 L 3 3 L 3 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 4.3652344 7 L 5.8925781 20.263672 C 6.0245781 21.253672 6.877 22 7.875 22 L 16.123047 22 C 17.121047 22 17.974422 21.254859 18.107422 20.255859 L 19.634766 7 L 4.3652344 7 z"></path>
                  </svg>
                </button>
              </>
         
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center px-4 py-2 text-slate-50 rounded-md shadow-sm"
            >
              {isCopied ? (
                <img width="24" height="24" src="https://img.icons8.com/fluency-systems-filled/48/copy.png" alt="copy" />
              ) : (
                <img width="24" height="24" src="https://img.icons8.com/fluency-systems-regular/48/copy--v1.png" alt="copy--v1" />
              )}
            </button>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center font-serif text-sky-950 mb-1">{title.toUpperCase()}</h2>
        <p className="text-gray-700 font-mono mb-2">{more ? (content.slice(0, 300) + '  ...') : (content)}</p>
        <div className='flex justify-between'>
          <span className="font-serif text-sky-950">{Math.ceil(content.length / 200)} min read</span>
          <button
            onClick={handleMore}
            className='py-2 px-2 mb-2 rounded-md font-serif text-slate-50 bg-sky-950 hover:bg-sky-800 text-lg'>
            {more ? ("Show More") : ("Show Less")}
          </button>
        </div>
        <div>
          <TodoButton id={id} completed={completed}/>
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
