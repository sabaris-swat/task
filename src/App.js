import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Admin from './admin';
import User from './user';
import LoginForm from './loginform';
import Nomatchfound from './nomatchfound';


const ProtectedRoute = ({ element, isAuthenticated, redirectTo }) => {
  return isAuthenticated ? element : <Navigate to={redirectTo} replace />;
};

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const addTask = (newTask) => {
    let assignedTask = { ...newTask, assignedTo: 'User A' };
    setTasks([...tasks, assignedTask]);
  };

  const handleTaskStatus = (taskId, status) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, status } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <Routes>
      
      <Route
        path="/"
        element={<LoginForm setIsLoggedIn={setIsLoggedIn} />}
      />
      
    
      <Route
        path="/admin"
        element={
          <ProtectedRoute
            isAuthenticated={isLoggedIn}
            redirectTo="/"
            element={<Admin tasks={tasks} addTask={addTask} />}
          />
        }
      />
    
      
      <Route
        path="/user"
        element={<Navigate to="/user/1" replace />} 
      />
      <Route
        path="/user/1"
        element={
          <ProtectedRoute
            isAuthenticated={isLoggedIn}
            redirectTo="/"
            element={<User tasks={tasks} userId={1} handleTaskStatus={handleTaskStatus} />}
          />
        }
      />
      <Route
        path="/user/2"
        element={
          <ProtectedRoute
            isAuthenticated={isLoggedIn}
            redirectTo="/"
            element={<User tasks={tasks} userId={2} handleTaskStatus={handleTaskStatus} />}
          />
        }
      />
      <Route
        path="/user/3"
        element={
          <ProtectedRoute
            isAuthenticated={isLoggedIn}
            redirectTo="/"
            element={<User tasks={tasks} userId={3} handleTaskStatus={handleTaskStatus} />}
          />
        }
      />
      <Route path='*' element={<Nomatchfound/>} />
    </Routes>
  );
};

export default App;
