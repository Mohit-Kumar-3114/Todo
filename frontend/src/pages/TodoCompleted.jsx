import { useState} from "react";
import axios from "axios";
const TodoButton = ({ id, completed}) => {
  const [isCompleted, setIsCompleted] = useState(completed);
 const token=localStorage.getItem("token")
 
  const handleComplete = async () => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/v1/complete-todo`,{id},
    {
        headers: {
            Authorization: token,
          },
    }
      )


      if (response.status==200) {
        setIsCompleted(true);

      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <button     className='py-2 px-2 mb-2 rounded-md font-serif text-slate-50 bg-sky-950 hover:bg-sky-800 text-lg' onClick={handleComplete}>
      {isCompleted ? "Completed" : "Mark as completed"}
    </button>
  );
};

export default TodoButton;
