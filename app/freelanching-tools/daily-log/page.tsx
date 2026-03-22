'use client';

import { useState, useEffect } from 'react';

interface Task {
  text: string;
  completed: boolean;
}

const DailyTaskLogger = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskInput, setTaskInput] = useState('');

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('dailyTasks') || '[]') as Task[];
    setTasks(savedTasks);
  }, []);

  const saveTasks = (updatedTasks: Task[]) => {
    localStorage.setItem('dailyTasks', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };

  const addTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!taskInput.trim()) {
      alert('টাস্ক খালি রাখা যাবে না।');
      return;
    }
    const newTasks = [...tasks, { text: taskInput.trim(), completed: false }];
    saveTasks(newTasks);
    setTaskInput('');
  };

  const toggleComplete = (index: number) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    saveTasks(newTasks);
  };

  const deleteTask = (index: number) => {
    if (window.confirm('আপনি কি নিশ্চিত টাস্ক মুছতে চান?')) {
      const newTasks = tasks.filter((_, i) => i !== index);
      saveTasks(newTasks);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-lg shadow-lg">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">📝 Daily Task Logger</h2>
        <div className="w-32 h-1 bg-teal-500 mx-auto"></div>
        <div className="text-center mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-400">
          <p>• Log and track your daily activities and tasks</p>
          <p>• Categorize tasks by type, priority, and duration</p>
          <p>• Add time stamps and notes for each completed task</p>
        </div>
      </div>

      <div>
        <form onSubmit={addTask} className="flex gap-2 mb-4">
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="নতুন টাস্ক লিখুন..."
            className="flex-grow p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-teal-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-teal-600 text-white font-semibold rounded-md hover:bg-teal-700 transition-colors"
          >
            Add
          </button>
        </form>

        {tasks.length === 0 ? (
          <p className="text-center text-slate-500 italic mt-8">কোনো টাস্ক নেই। নতুন টাস্ক যোগ করুন।</p>
        ) : (
          <ul className="space-y-2">
            {tasks.map((task, index) => (
              <li
                key={index}
                className={`flex items-center p-3 rounded-md transition-colors ${task.completed ? 'bg-slate-200 dark:bg-slate-700' : 'bg-slate-100 dark:bg-slate-800'}`}>
                <span
                  onClick={() => toggleComplete(index)}
                  className={`flex-grow cursor-pointer ${task.completed ? 'line-through text-slate-500' : ''}`}>
                  {task.text}
                </span>
                <button
                  onClick={() => deleteTask(index)}
                  className="ml-4 text-red-500 hover:text-red-700"
                  title="টাস্ক মুছুন"
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DailyTaskLogger;
