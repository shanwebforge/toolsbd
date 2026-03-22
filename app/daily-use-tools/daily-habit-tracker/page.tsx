'use client';

import { useState, useEffect, FormEvent } from 'react';

interface Habit {
    id: number;
    text: string;
    done: boolean;
}

// Trash Icon Component for the delete button
const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

export default function HabitTrackerPage() {
    const [habits, setHabits] = useState<Habit[]>([]);
    const [habitInput, setHabitInput] = useState('');

    useEffect(() => {
        const storedHabits = localStorage.getItem('habits');
        if (storedHabits) {
            setHabits(JSON.parse(storedHabits));
        }
    }, []);

    useEffect(() => {
        if (habits.length > 0) { 
            localStorage.setItem('habits', JSON.stringify(habits));
        }
    }, [habits]);

    const addHabit = (e: FormEvent) => {
        e.preventDefault();
        const text = habitInput.trim();
        if (!text) {
            alert("Habit cannot be empty.");
            return;
        }
        const newHabit: Habit = { id: Date.now(), text, done: false };
        setHabits([...habits, newHabit]);
        setHabitInput('');
    };

    const toggleHabit = (id: number) => {
        setHabits(habits.map(habit => 
            habit.id === id ? { ...habit, done: !habit.done } : habit
        ));
    };

    const deleteHabit = (id: number) => {
        if (confirm("Are you sure you want to delete this habit?")) {
            const updatedHabits = habits.filter(habit => habit.id !== id);
            setHabits(updatedHabits);
            // If this was the last habit, clear localStorage
            if (updatedHabits.length === 0) {
                localStorage.removeItem('habits');
            }
        }
    };

    const completedCount = habits.filter(h => h.done).length;

    return (
        <main className="p-4 sm:p-6 md:p-8">
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">📈 Daily Habit Tracker</h2>
                    <div className="w-24 h-1 bg-blue-500 mt-2"></div>
                </div>

                <div className="text-gray-700 dark:text-gray-300 space-y-2 mb-6">
                    <p>• Track your daily habits and build routines effectively</p>
                    <p>• Monitor progress with visual charts and statistics</p>
                    <p>• Set reminders for important habits and activities</p>
                    <p>• Analyze your consistency with streak counters</p>
                    <p>• Export data for personal review and analysis</p>
                    <p>• Set goals and track achievement percentages</p>
                </div>

                <div className="max-w-2xl mx-auto">
                    <h3 className="text-xl font-semibold mb-4 text-center text-gray-800 dark:text-gray-200">Add a New Habit</h3>
                    <form onSubmit={addHabit} className="flex flex-col sm:flex-row gap-3 mb-6">
                        <input 
                            type="text" 
                            value={habitInput}
                            onChange={(e) => setHabitInput(e.target.value)}
                            placeholder="e.g., Read a book for 15 minutes"
                            className="flex-grow p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                        />
                        <button type="submit" className="py-3 px-6 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            Add Habit
                        </button>
                    </form>

                    <div className="space-y-3">
                        {habits.map(habit => (
                            <div key={habit.id} className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow">
                                <div className="flex items-center">
                                    <input 
                                        type="checkbox" 
                                        checked={habit.done}
                                        onChange={() => toggleHabit(habit.id)}
                                        className="h-5 w-5 rounded text-blue-500 focus:ring-blue-500 border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:checked:bg-blue-500"
                                    />
                                    <span className={`ml-4 text-lg ${habit.done ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-gray-200'}`}>
                                        {habit.text}
                                    </span>
                                </div>
                                <button onClick={() => deleteHabit(habit.id)} className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-colors">
                                    <TrashIcon />
                                </button>
                            </div>
                        ))}
                    </div>
                    
                    {habits.length > 0 && (
                        <div className="mt-6 text-center text-lg font-semibold text-gray-700 dark:text-gray-300">
                            Total Habits: {habits.length}, Completed: {completedCount}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
