'use client';

import { useState, useEffect, FormEvent } from 'react';
import { Plus, Trash2, CheckCircle2, Circle, TrendingUp, Target, Award, ListTodo } from 'lucide-react';

interface Habit {
    id: number;
    text: string;
    done: boolean;
}

export default function HabitTrackerPage() {
    const [habits, setHabits] = useState<Habit[]>([]);
    const [habitInput, setHabitInput] = useState('');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const storedHabits = localStorage.getItem('habits');
        if (storedHabits) {
            setHabits(JSON.parse(storedHabits));
        }
    }, []);

    useEffect(() => {
        if (mounted) {
            localStorage.setItem('habits', JSON.stringify(habits));
        }
    }, [habits, mounted]);

    const addHabit = (e: FormEvent) => {
        e.preventDefault();
        const text = habitInput.trim();
        if (!text) return;
        
        const newHabit: Habit = { id: Date.now(), text, done: false };
        setHabits([newHabit, ...habits]);
        setHabitInput('');
    };

    const toggleHabit = (id: number) => {
        setHabits(habits.map(habit => 
            habit.id === id ? { ...habit, done: !habit.done } : habit
        ));
    };

    const deleteHabit = (id: number) => {
        const updatedHabits = habits.filter(habit => habit.id !== id);
        setHabits(updatedHabits);
        if (updatedHabits.length === 0) localStorage.removeItem('habits');
    };

    const completedCount = habits.filter(h => h.done).length;
    const progressPercentage = habits.length > 0 ? Math.round((completedCount / habits.length) * 100) : 0;

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 py-10 px-4">
            <div className="max-w-2xl mx-auto">
                
                {/* Header & Stats Card */}
                <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-zinc-800 mb-6">
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 sm:p-8 text-white">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
                                    <Target className="w-8 h-8" /> Habit Tracker
                                </h1>
                                <p className="text-indigo-100 text-sm mt-1">Build better routines, one day at a time.</p>
                            </div>
                            <div className="hidden sm:flex items-center justify-center w-16 h-16 rounded-full border-4 border-white/20 relative">
                                <span className="text-sm font-bold">{progressPercentage}%</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-indigo-50/50 dark:bg-zinc-800/50 border-b border-gray-100 dark:border-zinc-800">
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Total</p>
                                <p className="text-xl font-black text-gray-800 dark:text-white">{habits.length}</p>
                            </div>
                            <div className="border-x border-gray-200 dark:border-zinc-700">
                                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Done</p>
                                <p className="text-xl font-black text-green-500">{completedCount}</p>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Goal</p>
                                <p className="text-xl font-black text-indigo-500">{progressPercentage}%</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        <form onSubmit={addHabit} className="flex gap-2">
                            <input 
                                type="text" 
                                value={habitInput}
                                onChange={(e) => setHabitInput(e.target.value)}
                                placeholder="Write a new habit..."
                                className="flex-grow p-4 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-2xl text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                            />
                            <button type="submit" className="p-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-500/20 transition-all active:scale-95">
                                <Plus className="w-6 h-6" />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Habit List */}
                <div className="space-y-3">
                    {habits.length > 0 ? (
                        habits.map(habit => (
                            <div key={habit.id} className={`group flex items-center justify-between p-4 bg-white dark:bg-zinc-900 rounded-2xl border transition-all ${habit.done ? 'border-transparent opacity-60' : 'border-gray-100 dark:border-zinc-800 shadow-sm'}`}>
                                <div className="flex items-center gap-4 flex-grow cursor-pointer" onClick={() => toggleHabit(habit.id)}>
                                    {habit.done ? (
                                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                                    ) : (
                                        <Circle className="w-6 h-6 text-gray-300 dark:text-zinc-600 group-hover:text-indigo-400" />
                                    )}
                                    <span className={`text-base font-medium transition-all ${habit.done ? 'line-through text-gray-400' : 'text-gray-700 dark:text-zinc-200'}`}>
                                        {habit.text}
                                    </span>
                                </div>
                                <button 
                                    onClick={() => deleteHabit(habit.id)}
                                    className="p-2 text-gray-300 hover:text-red-500 dark:text-zinc-600 dark:hover:text-red-400 transition-colors"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-3xl border border-dashed border-gray-200 dark:border-zinc-800">
                            <ListTodo className="w-16 h-16 mx-auto mb-4 text-gray-200 dark:text-zinc-800" />
                            <p className="text-gray-400 dark:text-zinc-500 font-medium">No habits added yet.<br/>Start by adding one above!</p>
                        </div>
                    )}
                </div>

                {/* English Info Section */}
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3 p-4 bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800">
                        <TrendingUp className="w-5 h-5 text-indigo-500 mt-1" />
                        <div>
                            <h4 className="font-bold text-sm dark:text-zinc-200">Track Consistency</h4>
                            <p className="text-xs text-gray-500 dark:text-zinc-500">Regular tracking helps you stay committed to your long-term goals.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800">
                        <Award className="w-5 h-5 text-yellow-500 mt-1" />
                        <div>
                            <h4 className="font-bold text-sm dark:text-zinc-200">Daily Rewards</h4>
                            <p className="text-xs text-gray-500 dark:text-zinc-500">Checking off a task releases dopamine, boosting your mood.</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}