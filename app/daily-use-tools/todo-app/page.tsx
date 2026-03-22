
"use client";

import { useState, useEffect } from 'react';

interface Task {
  text: string;
  completed: boolean;
}

const TodoAppPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskInput, setTaskInput] = useState('');

  useEffect(() => {
    const storedTasks = localStorage.getItem('todo-tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todo-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (taskInput.trim() !== '') {
      setTasks([...tasks, { text: taskInput, completed: false }]);
      setTaskInput('');
    }
  };

  const toggleTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const deleteTask = (index: number) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div className="file-section">
      <div className="file-container">
        <div className="file-header">
          <div className="file-title">
            <h2>📋 To-Do List</h2>
            <div className="title-underline"></div>
          </div>
          <div className="file-content-text">
            <p>• Create and manage your daily tasks efficiently</p>
            <p>• Set priorities and deadlines for important tasks</p>
            <p>• Organize tasks into different categories or projects</p>
            <p>• Mark completed tasks and track your productivity</p>
            <p>• Add notes and details to each task item</p>
            <p>• Set reminders for time-sensitive tasks</p>
          </div>
        </div>

        <div className="todocontainer">
          <h3>To-Do List</h3>
          <div className="input-section">
            <input type="text" id="task-input" placeholder="Enter a task..." value={taskInput} onChange={(e) => setTaskInput(e.target.value)} />
            <button id="add-btn" onClick={addTask}>Add Task</button>
          </div>
          <ul id="task-list">
            {tasks.map((task, index) => (
              <li key={index} className={`task-item ${task.completed ? 'completed' : ''}`}>
                <span>{task.text}</span>
                <div className="task-actions">
                  <button className="done-btn" onClick={() => toggleTask(index)}>✓</button>
                  <button onClick={() => deleteTask(index)}>🗑️</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoAppPage;
