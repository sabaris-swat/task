import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }

    const storedCompletedTasks = JSON.parse(
      localStorage.getItem("completedTasks")
    );
    if (storedCompletedTasks) {
      setCompletedTasks(storedCompletedTasks);
    }
  }, []);

  const handleAddTask = () => {
    if (taskName === "" || assignedTo === "" || estimatedTime === "") {
      alert("Please fill all fields");
      return;
    }

    const newTask = {
      id: tasks.length + 1,
      taskName: taskName,
      assignedTo: assignedTo,
      estimatedTime: estimatedTime,
    };

    setTasks([...tasks, newTask]);
    localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));

    setTaskName("");
    setAssignedTo("");
    setEstimatedTime("");
    alert("Task added and sent to user");
  };

  const handleEditTask = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    if (taskToEdit) {
      setTaskName(taskToEdit.taskName);
      setAssignedTo(taskToEdit.assignedTo);
      setEstimatedTime(taskToEdit.estimatedTime);
      setEditingTaskId(taskId);
    }
  };

  const handleSaveTask = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === editingTaskId
        ? { ...task, taskName, assignedTo, estimatedTime }
        : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    setTaskName("");
    setAssignedTo("");
    setEstimatedTime("");
    setEditingTaskId(null);
    alert("Task edited successfully");
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    alert(`Task with ID: ${taskId} deleted`);
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div>
      <h2>Tasks Assigned to Users</h2>
      <div>
        <input
          type="text"
          placeholder="Task"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        
        />
        
        <select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)}>
          <option value="">Select User</option>
          <option value="User1">User1</option>
          <option value="User2">User2</option>
          <option value="User3">User3</option>
        </select>
        <input
          type="text"
          placeholder="Time to complete"
          value={estimatedTime}
          onChange={(e) => setEstimatedTime(e.target.value)}
        />
        {!editingTaskId ? (
          <button onClick={handleAddTask}>Add Task and Send</button>
        ) : (
          <button onClick={handleSaveTask}>Save Task</button>
        )}
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div style={{ marginTop: "20px", overflowX: "auto" }}>
        <h2>Tasks in Progress</h2>
        <table style={{ width: "100%", border: "1px solid #ddd",  }}>
          <thead>
            <tr>
              <th style={{ backgroundColor: "black", padding: "8px" ,color:'white'}}>ID</th>
              <th style={{ backgroundColor: "black", padding: "8px",color:'white' }}>Task</th>
              <th style={{ backgroundColor: "black", padding: "8px",color:'white' }}>User</th>
              <th style={{ backgroundColor: "black", padding: "8px",color:'white' }}>Time</th>
              <th style={{ backgroundColor: "black", padding: "8px",color:'white' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{task.id}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{task.taskName}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{task.assignedTo}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{task.estimatedTime}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  <button onClick={() => handleEditTask(task.id)}>Edit</button>
                  <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: "20px", overflowX: "auto" }}>
        <h2>Completed Tasks</h2>
        <table style={{ width: "100%", border: "1px solid #ddd", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ backgroundColor: "black", padding: "8px",color:'white' }}>ID</th>
              <th style={{ backgroundColor: "black", padding: "8px",color:'white' }}>Task</th>
              <th style={{ backgroundColor: "black", padding: "8px",color:'white' }}>User</th>
              <th style={{ backgroundColor: "black", padding: "8px" ,color:'white' }}>Time</th>
            </tr>
          </thead>
          <tbody>
            {completedTasks.map((task) => (
              <tr key={task.id}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{task.id}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{task.taskName}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{task.assignedTo}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{task.estimatedTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
    
      </div>
    </div>
  );
};

export default Admin;
