'use client';

import { useState, useEffect } from 'react';
import { 
  ClipboardList, Plus, Trash2, CheckCircle2, 
  Circle, layout, ShieldCheck, Zap, BarChart3 
} from 'lucide-react';

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

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskInput.trim()) return;
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
    const newTasks = tasks.filter((_, i) => i !== index);
    saveTasks(newTasks);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 font-sans text-slate-900 dark:text-slate-100 selection:bg-purple-100">
      
      {/* --- MAIN TASK CARD --- */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm overflow-hidden mb-6">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-purple-50/30 dark:bg-purple-950/10 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ClipboardList size={18} className="text-purple-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-700 dark:text-purple-400">Activity Terminal</span>
          </div>
          <div className="text-[9px] font-bold px-2 py-0.5 rounded border border-purple-200 dark:border-purple-800 text-purple-600 uppercase tracking-tighter">
            {tasks.filter(t => t.completed).length}/{tasks.length} Completed
          </div>
        </div>

        <div className="p-6">
          <form onSubmit={addTask} className="flex gap-2 mb-6">
            <input
              type="text"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              placeholder="Log a new task or activity..."
              className="flex-grow p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold outline-none focus:border-purple-500 transition-all"
            />
            <button
              type="submit"
              className="px-6 bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center justify-center transition-all active:scale-95 shadow-lg shadow-purple-500/20"
            >
              <Plus size={18} strokeWidth={3} />
            </button>
          </form>

          <div className="space-y-2 min-h-[150px]">
            {tasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 opacity-30">
                <layout size={30} className="mb-2" />
                <p className="text-[9px] font-black uppercase tracking-widest">No Active Logs Found</p>
              </div>
            ) : (
              tasks.map((task, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                    task.completed 
                    ? 'bg-slate-50/50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800' 
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 shadow-sm'
                  }`}
                >
                  <button onClick={() => toggleComplete(index)} className="shrink-0">
                    {task.completed ? (
                      <CheckCircle2 size={18} className="text-emerald-500" />
                    ) : (
                      <Circle size={18} className="text-slate-300 hover:text-purple-500 transition-colors" />
                    )}
                  </button>
                  <span className={`flex-grow text-xs font-semibold transition-all ${task.completed ? 'line-through text-slate-400' : 'text-slate-700 dark:text-slate-200'}`}>
                    {task.text}
                  </span>
                  <button
                    onClick={() => deleteTask(index)}
                    className="p-1.5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-md transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* --- PROFESSIONAL DETAILS GRID --- (EGLO EBAR THIK ASE) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-5 flex flex-col gap-3">
            <div className="w-10 h-10 bg-purple-50 dark:bg-purple-900/20 text-purple-600 rounded-lg flex items-center justify-center">
                <ShieldCheck size={20} />
            </div>
            <div>
                <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-1">Local Sovereignty</h4>
                <p className="text-[12px] text-slate-400 leading-snug font-medium">Session data remains on your machine. No external cloud sync for total privacy.</p>
            </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-5 flex flex-col gap-3">
            <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 rounded-lg flex items-center justify-center">
                <Zap size={20} />
            </div>
            <div>
                <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-1">High Accuracy</h4>
                <p className="text-[12px] text-slate-400 leading-snug font-medium">Efficient state management ensures real-time updates without affecting browser performance.</p>
            </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-5 flex flex-col gap-3">
            <div className="w-10 h-10 bg-purple-50 dark:bg-purple-900/20 text-purple-600 rounded-lg flex items-center justify-center">
                <BarChart3 size={20} />
            </div>
            <div>
                <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-1">Activity Audit</h4>
                <p className="text-[12px] text-slate-400 leading-snug font-medium">Maintain a clear history of your daily accomplishments for better project visibility.</p>
            </div>
        </div>
      </div>

      {/* --- CLEAN FOOTER (NO EXTRA TEXT) --- */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800"></div>
    </div>
  );
};

export default DailyTaskLogger;