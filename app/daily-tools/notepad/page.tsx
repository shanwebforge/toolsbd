'use client';

import { useState, useEffect } from 'react';
import { StickyNote, Plus, Trash2, Eraser, Clock, Search, BookOpen } from 'lucide-react';

interface Note {
    id: number;
    content: string;
    date: string;
}

export default function NotepadPage() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [noteInput, setNoteInput] = useState('');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const savedNotes = localStorage.getItem('notesArray');
        if (savedNotes) {
            try {
                setNotes(JSON.parse(savedNotes));
            } catch (e) {
                console.error("Failed to load notes");
            }
        }
    }, []);

    useEffect(() => {
        if (mounted && notes.length > 0) {
            localStorage.setItem('notesArray', JSON.stringify(notes));
        } else if (mounted && notes.length === 0) {
            localStorage.removeItem('notesArray');
        }
    }, [notes, mounted]);

    const saveNote = () => {
        const trimmedNote = noteInput.trim();
        if (!trimmedNote) return;

        const newNote: Note = {
            id: Date.now(),
            content: trimmedNote,
            date: new Date().toLocaleString('en-US', { 
                month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
            })
        };

        setNotes([newNote, ...notes]);
        setNoteInput('');
    };

    const deleteNote = (id: number) => {
        setNotes(notes.filter(note => note.id !== id));
    };

    const clearInput = () => {
        if (noteInput) setNoteInput('');
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 py-10 px-4">
            <div className="max-w-5xl mx-auto">
                
                {/* Header Section */}
                <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-zinc-800 mb-8">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 sm:p-8 text-white">
                        <div className="flex items-center gap-3">
                            <StickyNote className="w-8 h-8" />
                            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Quick Notes</h1>
                        </div>
                        <p className="text-emerald-100 text-sm mt-1">Capture your thoughts instantly. Saved locally in your browser.</p>
                    </div>

                    <div className="p-6">
                        <div className="relative group">
                            <textarea 
                                value={noteInput}
                                onChange={(e) => setNoteInput(e.target.value)}
                                placeholder="Type your thoughts here..."
                                className="w-full h-44 p-5 text-lg bg-gray-50 dark:bg-zinc-800 border-2 border-transparent focus:border-emerald-500/30 rounded-2xl text-gray-800 dark:text-zinc-200 focus:ring-4 focus:ring-emerald-500/5 transition-all outline-none resize-none"
                            />
                            <div className="absolute bottom-4 right-4 flex gap-2">
                                <button 
                                    onClick={clearInput}
                                    disabled={!noteInput}
                                    className="p-3 bg-white dark:bg-zinc-700 text-gray-400 hover:text-red-500 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-600 transition-all active:scale-95 disabled:opacity-0"
                                >
                                    <Eraser className="w-5 h-5" />
                                </button>
                                <button 
                                    onClick={saveNote}
                                    disabled={!noteInput.trim()}
                                    className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2"
                                >
                                    <Plus className="w-5 h-5" /> Save Note
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Notes Display Section */}
                <div className="mb-6 flex items-center justify-between px-2">
                    <h2 className="text-sm font-black uppercase tracking-widest text-gray-400 dark:text-zinc-600 flex items-center gap-2">
                        <BookOpen className="w-4 h-4" /> Your Collection ({notes.length})
                    </h2>
                </div>

                {notes.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {notes.map((note) => (
                            <div 
                                key={note.id} 
                                className="group bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:shadow-emerald-500/5 transition-all relative overflow-hidden flex flex-col min-h-[180px]"
                            >
                                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-all" />
                                
                                <p className="text-gray-700 dark:text-zinc-300 whitespace-pre-wrap leading-relaxed flex-grow font-medium">
                                    {note.content}
                                </p>

                                <div className="mt-4 pt-4 border-t border-gray-50 dark:border-zinc-800 flex justify-between items-center">
                                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 dark:text-zinc-500 uppercase">
                                        <Clock className="w-3 h-3" /> {note.date}
                                    </span>
                                    <button 
                                        onClick={() => deleteNote(note.id)}
                                        className="p-2 text-gray-300 hover:text-red-500 dark:text-zinc-700 dark:hover:text-red-400 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-white dark:bg-zinc-900 rounded-[2rem] border-2 border-dashed border-gray-100 dark:border-zinc-800">
                        <div className="bg-gray-50 dark:bg-zinc-800/50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-gray-300 dark:text-zinc-700" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-zinc-200">No notes found</h3>
                        <p className="text-gray-400 dark:text-zinc-500 mt-2">Your saved notes will appear here.</p>
                    </div>
                )}

                {/* Footer Info */}
                <div className="mt-12 text-center">
                    <p className="text-xs text-gray-400 dark:text-zinc-600 max-w-md mx-auto leading-relaxed">
                        Tip: Notes are stored in your device's LocalStorage. Clearing your browser cache or switching devices will reset your notes.
                    </p>
                </div>

            </div>
        </div>
    );
}