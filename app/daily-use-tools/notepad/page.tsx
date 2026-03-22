'use client';

import { useState, useEffect } from 'react';

const DeleteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export default function NotepadPage() {
    const [notes, setNotes] = useState<string[]>([]);
    const [noteInput, setNoteInput] = useState('');

    useEffect(() => {
        try {
            const savedNotes = localStorage.getItem('notesArray');
            if (savedNotes) {
                setNotes(JSON.parse(savedNotes));
            }
        } catch (error) {
            console.error("Failed to parse notes from localStorage", error);
            setNotes([]);
        }
    }, []);

    useEffect(() => {
        // Avoid writing the initial empty array to localStorage
        if (notes.length > 0) {
            localStorage.setItem('notesArray', JSON.stringify(notes));
        }
    }, [notes]);

    const saveNote = () => {
        const trimmedNote = noteInput.trim();
        if (!trimmedNote) {
            alert('Please write a note before saving.');
            return;
        }
        const updatedNotes = [...notes, trimmedNote];
        setNotes(updatedNotes);
        setNoteInput('');
    };

    const clearInput = () => {
        if (noteInput && confirm('Are you sure you want to clear the current note?')) {
            setNoteInput('');
        }
    };

    const deleteNote = (indexToDelete: number) => {
        if (confirm('Are you sure you want to delete this note?')) {
            const updatedNotes = notes.filter((_, index) => index !== indexToDelete);
            setNotes(updatedNotes);
            // If this was the last note, clear localStorage
            if (updatedNotes.length === 0) {
                localStorage.removeItem('notesArray');
            }
        }
    };

    return (
        <main className="p-4 sm:p-6 md:p-8">
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">📝 Quick Note Taker</h2>
                    <div className="w-24 h-1 bg-blue-500 mt-2"></div>
                </div>

                <div className="text-gray-700 dark:text-gray-300 space-y-2 mb-8">
                    <p>• Instantly create and list your notes.</p>
                    <p>• Create checklists and track your work progress.</p>
                    <p>• Mark and organize important items.</p>
                    <p>• Save notes in different categories.</p>
                    <p>• Easily edit, update, and delete.</p>
                </div>

                <div className="max-w-2xl mx-auto">
                    <h3 className="text-xl font-semibold mb-4 text-left text-gray-800 dark:text-gray-200">Create a New Note</h3>
                    <textarea 
                        id="noteArea"
                        value={noteInput}
                        onChange={(e) => setNoteInput(e.target.value)}
                        placeholder="Write your note here..."
                        className="w-full h-40 p-4 font-mono text-base bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 resize-y"
                    />
                    <div className="mt-4 flex justify-end gap-4">
                        <button 
                            onClick={clearInput}
                            className="py-2 px-5 font-semibold text-white bg-red-500 hover:bg-red-600 rounded-lg shadow-md transition-colors disabled:opacity-50"
                            disabled={!noteInput}
                        >
                            Clear Input
                        </button>
                        <button 
                            onClick={saveNote}
                            className="py-2 px-5 font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow-md transition-colors disabled:opacity-50"
                             disabled={!noteInput.trim()}
                        >
                           Save Note
                        </button>
                    </div>

                    <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
                        <h3 className="text-xl font-semibold mb-4 text-left text-gray-800 dark:text-gray-200">Saved Notes</h3>
                        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                            {notes.length > 0 ? (
                                notes.map((note, index) => (
                                    <div key={index} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow relative text-left">
                                        <p className="whitespace-pre-wrap font-mono text-gray-800 dark:text-gray-200">{note}</p>
                                        <button 
                                            onClick={() => deleteNote(index)}
                                            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                            aria-label="Delete note"
                                        >
                                           <DeleteIcon />
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-gray-500 dark:text-gray-400">No saved notes found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
