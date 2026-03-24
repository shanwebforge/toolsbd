'use client';

import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Plus, 
  Trash2, 
  ExternalLink, 
  Rocket, 
  Github, 
  Globe,
  Briefcase,
  X,
  CheckCircle2
} from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'Active' | 'Completed' | 'On-Hold';
  progress: number;
}

export default function LocalProjectManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [prog, setProg] = useState(0);
  const [status, setStatus] = useState<'Active' | 'Completed' | 'On-Hold'>('Active');

  // Load from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('shan_projects');
    if (saved) setProjects(JSON.parse(saved));
  }, []);

  // Save to LocalStorage
  const saveToLocal = (updatedProjects: Project[]) => {
    setProjects(updatedProjects);
    localStorage.setItem('shan_projects', JSON.stringify(updatedProjects));
  };

  const addProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !desc) return;

    const newProject: Project = {
      id: Date.now().toString(),
      name,
      description: desc,
      progress: prog,
      status
    };

    saveToLocal([newProject, ...projects]);
    setIsModalOpen(false);
    // Reset Form
    setName(''); setDesc(''); setProg(0); setStatus('Active');
  };

  const deleteProject = (id: string) => {
    const filtered = projects.filter(p => p.id !== id);
    saveToLocal(filtered);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 py-10 px-4 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Area */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-600 rounded-lg shadow-lg shadow-purple-500/20 mb-3">
              <Briefcase className="w-4 h-4 text-white" />
              <span className="text-[10px] font-bold text-white uppercase tracking-widest">Local Console</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white uppercase">
              Project <span className="text-purple-600">Manager</span>
            </h1>
          </div>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-5 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold uppercase tracking-widest transition-all shadow-md active:scale-95"
          >
            <Plus className="w-4 h-4" /> Add Project
          </button>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length === 0 ? (
            <div className="col-span-full border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-lg p-20 text-center">
              <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">No projects found. Add your first one!</p>
            </div>
          ) : (
            projects.map((project) => (
              <div key={project.id} className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-slate-200 dark:border-zinc-800 flex flex-col group transition-all hover:border-purple-200">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-md border ${
                      project.status === 'Active' ? 'text-indigo-600 border-indigo-100 bg-indigo-50' : 
                      project.status === 'Completed' ? 'text-emerald-600 border-emerald-100 bg-emerald-50' : 
                      'text-amber-600 border-amber-100 bg-amber-50'
                    }`}>
                      {project.status}
                    </span>
                    <button 
                      onClick={() => deleteProject(project.id)}
                      className="text-slate-300 hover:text-rose-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <h3 className="text-base font-bold text-slate-800 dark:text-white mb-2">{project.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed line-clamp-2">{project.description}</p>
                </div>

                <div className="px-6 py-4 bg-slate-50/50 dark:bg-zinc-800/30 border-y border-slate-100 dark:border-zinc-800">
                  <div className="flex justify-between text-[10px] font-bold mb-2">
                    <span className="text-slate-400 uppercase tracking-widest">Progress</span>
                    <span className="text-purple-600">{project.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-600 transition-all duration-500" style={{ width: `${project.progress}%` }} />
                  </div>
                </div>

                <div className="p-4 mt-auto flex justify-end gap-2">
                   <button className="p-2 text-slate-400 hover:text-purple-600 transition-colors"><Github className="w-4 h-4" /></button>
                   <button className="p-2 text-slate-400 hover:text-purple-600 transition-colors"><Globe className="w-4 h-4" /></button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-lg shadow-2xl border border-slate-200 dark:border-zinc-800 overflow-hidden">
              <div className="p-6 border-b border-slate-100 dark:border-zinc-800 flex justify-between items-center bg-slate-50 dark:bg-zinc-800/50">
                <h2 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-widest">Add New Project</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
              </div>
              <form onSubmit={addProject} className="p-6 space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Project Name</label>
                  <input required value={name} onChange={e => setName(e.target.value)} className="w-full p-2.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-xs outline-none focus:border-purple-500 transition-all" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Description</label>
                  <textarea required value={desc} onChange={e => setDesc(e.target.value)} className="w-full p-2.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-xs outline-none focus:border-purple-500 transition-all h-20" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Status</label>
                    <select value={status} onChange={e => setStatus(e.target.value as any)} className="w-full p-2.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-xs outline-none appearance-none">
                      <option value="Active">Active</option>
                      <option value="Completed">Completed</option>
                      <option value="On-Hold">On-Hold</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Progress %</label>
                    <input type="number" min="0" max="100" value={prog} onChange={e => setProg(Number(e.target.value))} className="w-full p-2.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-xs outline-none" />
                  </div>
                </div>
                <button type="submit" className="w-full py-3 bg-purple-600 text-white rounded-lg text-[11px] font-bold uppercase tracking-widest mt-4 shadow-lg shadow-purple-500/20 active:scale-95 transition-all">
                  Create Project
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}