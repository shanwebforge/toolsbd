'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, CheckCircle2, Circle, LayoutList, ClipboardCheck, Sparkles } from 'lucide-react';

interface Task {
    text: string;
    completed: boolean;
}

export default function TodoAppPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [taskInput, setTaskInput] = useState('');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const storedTasks = localStorage.getItem('todo-tasks');
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    }, []);

    useEffect(() => {
        if (mounted) {
            localStorage.setItem('todo-tasks', JSON.stringify(tasks));
        }
    }, [tasks, mounted]);

    const addTask = () => {
        if (taskInput.trim() !== '') {
            setTasks([{ text: taskInput, completed: false }, ...tasks]);
            setTaskInput('');
        }
    };

    const toggleTask = (index: number) => {
        const newTasks = [...tasks];
        newTasks[index].completed = !newTasks[index].completed;
        setTasks(newTasks);
    };

    const deleteTask = (index: number) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    const completedCount = tasks.filter(t => t.completed).length;
    const progress = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-indigo-50 dark:bg-zinc-950 py-12 px-4">
            <div className="max-w-2xl mx-auto">
                
                {/* Header Section */}
                <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-2xl shadow-purple-500/10 overflow-hidden border border-purple-100 dark:border-zinc-800 mb-8">
                    <div className="bg-gradient-to-br from-purple-600 via-indigo-600 to-indigo-700 p-8 text-white relative">
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md">
                                    <LayoutList className="w-6 h-6" />
                                </div>
                                <h1 className="text-2xl font-black tracking-tight uppercase">Daily Routine</h1>
                            </div>
                            
                            {/* Progress Bar */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-purple-100">
                                    <span>Task Completion</span>
                                    <span>{Math.round(progress)}%</span>
                                </div>
                                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-white transition-all duration-500 ease-out" 
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                        <Sparkles className="absolute top-4 right-4 w-20 h-20 text-white/10" />
                    </div>

                    {/* Input Section */}
                    <div className="p-6 bg-purple-50/50 dark:bg-zinc-800/50 border-b border-purple-100 dark:border-zinc-800">
                        <div className="flex gap-3">
                            <input 
                                type="text" 
                                value={taskInput}
                                onChange={(e) => setTaskInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && addTask()}
                                placeholder="What needs to be done?"
                                className="flex-grow p-4 bg-white dark:bg-zinc-900 border border-purple-200 dark:border-zinc-700 rounded-2xl text-gray-800 dark:text-zinc-100 focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 outline-none transition-all font-medium"
                            />
                            <button 
                                onClick={addTask}
                                className="p-4 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl shadow-lg shadow-purple-500/30 active:scale-95 transition-all"
                            >
                                <Plus className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    {/* Task List */}
                    <div className="p-6 max-h-[500px] overflow-y-auto">
                        {tasks.length > 0 ? (
                            <div className="space-y-3">
                                {tasks.map((task, index) => (
                                    <div 
                                        key={index}
                                        className={`group flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${
                                            task.completed 
                                            ? 'bg-indigo-50/50 border-indigo-100 dark:bg-indigo-900/10 dark:border-indigo-900/20 opacity-75' 
                                            : 'bg-white border-purple-50 dark:bg-zinc-800 dark:border-zinc-700 hover:border-purple-200 shadow-sm'
                                        }`}
                                    >
                                        <div className="flex items-center gap-4 flex-grow cursor-pointer" onClick={() => toggleTask(index)}>
                                            {task.completed ? (
                                                <CheckCircle2 className="w-6 h-6 text-indigo-600" />
                                            ) : (
                                                <Circle className="w-6 h-6 text-purple-300 group-hover:text-purple-500" />
                                            )}
                                            <span className={`font-medium transition-all ${
                                                task.completed 
                                                ? 'line-through text-indigo-400' 
                                                : 'text-gray-700 dark:text-zinc-200'
                                            }`}>
                                                {task.text}
                                            </span>
                                        </div>
                                        <button 
                                            onClick={() => deleteTask(index)}
                                            className="p-2 text-gray-300 hover:text-red-500 dark:text-zinc-600 transition-colors"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <div className="w-20 h-20 bg-purple-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <ClipboardCheck className="w-10 h-10 text-purple-400" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 dark:text-zinc-200">Your list is empty</h3>
                                <p className="text-sm text-gray-400 dark:text-zinc-500">Time to plan your productive day!</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer Stats */}
                <div className="flex justify-between px-6">
                    <p className="text-xs font-black uppercase tracking-widest text-indigo-400">
                        {completedCount} Completed
                    </p>
                    <p className="text-xs font-black uppercase tracking-widest text-purple-400">
                        {tasks.length - completedCount} Remaining
                    </p>
                </div>

            </div>
        </div>
    );
}