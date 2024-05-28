import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const User = () => {
  const [tasks, setTasks] = useState([]);
  const [newTiming, setNewTiming] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  const handleTimingChange = (taskId, timing) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, timing } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleTaskCompleted = (taskId) => {
    const completedTaskIndex = tasks.findIndex(task => task.id === taskId);
    if (completedTaskIndex !== -1) {
      const updatedTasks = [...tasks];
      updatedTasks.splice(completedTaskIndex, 1);
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));

      
      const completedTask = tasks[completedTaskIndex];
      const completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];
      completedTasks.push(completedTask);
      localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
    }
  };
  const handleLogout = () => {
    navigate("/");
  };
  return (
    <div>
      <h2>Tasks Received from Admin</h2>
      <button onClick={handleLogout}>Logout</button>
      <table style={{ width: '100%', marginTop: '20px' }}>
        <thead>
          <tr>
            <th style={{ backgroundColor: 'black', fontWeight: 'bold', textAlign: 'left', padding: '10px', border: '1px solid #ccc',color:'white' }}>Task Name</th>
            <th style={{ backgroundColor: 'black', fontWeight: 'bold', textAlign: 'left', padding: '10px', border: '1px solid #ccc' }}>User</th>
            <th style={{ backgroundColor: 'black', fontWeight: 'bold', textAlign: 'left', padding: '10px', border: '1px solid #ccc' }}>Estimated Time</th>
            <th style={{ backgroundColor: 'black', fontWeight: 'bold', textAlign: 'left', padding: '10px', border: '1px solid #ccc' }}>Timing</th>
            <th style={{ backgroundColor: 'black', fontWeight: 'bold', textAlign: 'left', padding: '10px', border: '1px solid #ccc' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td style={{ padding: '10px', border: '1px solid #ccc' }}>{task.taskName}</td>
              <td style={{ padding: '10px', border: '1px solid #ccc' }}>{task.assignedTo}</td>
              <td style={{ padding: '10px', border: '1px solid #ccc' }}>{task.estimatedTime}</td>
              <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                <input
                  type="text"
                  value={task.timing || ''}
                  onChange={(e) => handleTimingChange(task.id, e.target.value)}
                  style={{ width: '100%', padding: '5px' }}
                />
              </td>
              <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                <button
                  onClick={() => handleTaskCompleted(task.id)}
                  style={{ marginRight: '5px', padding: '5px 10px', backgroundColor: 'green', color: '#fff' }}
                >
                  Completed
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;
