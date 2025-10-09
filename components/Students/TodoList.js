import { useState } from 'react';
import { prisma } from '../../util/db.server.js'
import axios from 'axios';

const TodoList = ({ tasks, studentId }) => {
  const [taskText, setTaskText] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingforerror, setloadingforerror] =useState(false)
  const [error , setError] = useState(false);
  const addTask = async () => {
    if (taskText.trim() === '') return;
      setLoading(true)
      const data = await axios.post(`../../api/student/addStudent`,{
        "text": taskText,
        "completed": false,
        "students_id":studentId
      }).then(function (response) {
          window.location.reload();
          setLoading(false)
      }).catch(function (error) {
          setError("Creating To Do List Fail")
          setLoading(false)
      });  
  };

  const deleteTask = async(id) => {
    setloadingforerror(true)
    const data = await axios.delete(`../api/student/deletetask/${id}`,{
    }).then(function (response) {
      console.log(response.data);
      window.location.reload();
      setloadingforerror(false)
    }).catch(function (error) {
      console.log(error);
      setloadingforerror(false)
    });
    
  }

  return (
    <div className="w-full">
      <h1 className="text-center text-2xl font-bold mb-5">To Do List</h1>
      <div className="mb-4 flex">
        <input
          type="text"
          className="flex-grow p-2 border border-gray-300 rounded-l"
          placeholder="Add a new task..."
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />
        <button
          className={` bg-blue-500 text-white p-2 rounded-r ${ loading ? 'bg-opacity-10' : ""}`}
          onClick={addTask}
          disabled={loading}
        >
          Add
        </button>
      </div>

      <ul>
        {tasks?.map((task,index) => (

          <li
            key={task.id}
            className="bg-white w-full flex justify-between items-center rounded-lg px-2 py-2 border-b border-gray-300 mb-5"
          >
            {task.text}
            <button
              disabled={loadingforerror}
              onClick={() => {
                deleteTask(task.id)
              }}
              className={` ${ loadingforerror ? 'bg-opacity-10' : ""} bg-red-500 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:scale-110 duration-1000 ease-in-out rounded`}
            >
              completed
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
