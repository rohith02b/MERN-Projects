import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({
    name: '',
  });

  const handleChange = (e) => {
    setTask((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3000/api/v1/tasks/`, task);
      getTasks();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    console.log('Calling Api');
    try {
      let data = await axios.get('http://localhost:3000/api/v1/tasks/');
      setTasks(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/tasks/${id}`);
      getTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async (id, complete) => {
    let updatedTask = {
      completed: !complete,
    };
    try {
      await axios.patch(
        `http://localhost:3000/api/v1/tasks/${id}`,
        updatedTask
      );
      getTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const allTasks = tasks.map((each) => {
    return (
      <div
        className='bg-blue-300 text-black w-[90%] lg:w-[50%] h-36 md:h-24 shadow-lg flex justify-around flex-col md:flex-row items-center rounded-full mx-auto my-12'
        key={each.id}
      >
        <div>
          <h1 className='text-xl pl-5 mt-4 md:mt-0 '>{each.name}</h1>
        </div>
        <div className='mb-4 md:mb-0'>
          <button
            className='px-6 py-3 bg-sky-100 hover:bg-black hover:text-white transition-all duration-500 rounded-full lg:mx-2 mx-1 '
            onClick={() => updateTask(each._id, each.completed)}
          >
            {each.completed ? <>Completed</> : <>Not Completed</>}
          </button>
          <button
            className='px-6 py-3 bg-sky-100 hover:bg-black hover:text-white transition-all duration-500 rounded-full lg:mx-2 mx-1'
            onClick={() => deleteTask(each._id)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  });

  return (
    <>
      <h1 className='text-3xl text-center mt-24'>Task Manager</h1>
      <div className='text-center'>
        <input
          type='text'
          name='name'
          id='name'
          className='mt-12 border border-lg border-slate-800 w-1/4 h-12 rounded-full mx-6 px-3'
          placeholder='Enter task'
          onChange={handleChange}
        />
        <button
          className='px-5 py-3 rounded-full bg-green-600 text-white hover:bg-green-400 hover:text-black transition-all duration-300'
          onClick={handleSubmit}
        >
          Add
        </button>
      </div>
      <div className='mt-20'>{allTasks}</div>
    </>
  );
};

export default App;
