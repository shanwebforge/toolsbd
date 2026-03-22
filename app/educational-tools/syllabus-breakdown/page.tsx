
"use client";

import { useState, useEffect } from 'react';

interface Topic {
  text: string;
  done: boolean;
}

interface Chapter {
  name: string;
  topics: Topic[];
}

interface Subject {
  subject: string;
  chapters: Chapter[];
}

const SyllabusBreakdownPage = () => {
  const [data, setData] = useState<Subject[]>([]);
  const [subject, setSubject] = useState('');
  const [chapter, setChapter] = useState('');
  const [topic, setTopic] = useState('');

  useEffect(() => {
    const savedData = localStorage.getItem('syllabusData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        if (Array.isArray(parsedData)) {
          setData(parsedData);
        }
      } catch (error) {
        console.error("Error parsing syllabus data from localStorage", error);
      }
    }
  }, []);

  useEffect(() => {
    if (data.length > 0) {
        localStorage.setItem('syllabusData', JSON.stringify(data));
    }
  }, [data]);

  const addTopic = () => {
    if (!subject.trim() || !chapter.trim() || !topic.trim()) {
      alert("সব ঘর পূরণ করুন।");
      return;
    }

    const newData = [...data];
    let subj = newData.find(s => s.subject === subject.trim());

    if (!subj) {
      subj = { subject: subject.trim(), chapters: [] };
      newData.unshift(subj);
    }

    let chap = subj.chapters.find(c => c.name === chapter.trim());

    if (!chap) {
      chap = { name: chapter.trim(), topics: [] };
      subj.chapters.unshift(chap);
    }

    chap.topics.unshift({ text: topic.trim(), done: false });
    setData(newData);
    setTopic('');
  };

  const toggleDone = (subjectIdx: number, chapterIdx: number, topicIdx: number) => {
    const newData = [...data];
    newData[subjectIdx].chapters[chapterIdx].topics[topicIdx].done = !newData[subjectIdx].chapters[chapterIdx].topics[topicIdx].done;
    setData(newData);
  };

  const deleteTopic = (subjectIdx: number, chapterIdx: number, topicIdx: number) => {
    if (confirm("এই টপিক মুছতে চান?")) {
      const newData = [...data];
      newData[subjectIdx].chapters[chapterIdx].topics.splice(topicIdx, 1);
      // Cleanup empty chapters and subjects
      if (newData[subjectIdx].chapters[chapterIdx].topics.length === 0) {
        newData[subjectIdx].chapters.splice(chapterIdx, 1);
      }
      if (newData[subjectIdx].chapters.length === 0) {
        newData.splice(subjectIdx, 1);
      }
      setData(newData);
    }
  };

  const totalTopics = data.reduce((acc, subj) => acc + subj.chapters.reduce((acc2, chap) => acc2 + chap.topics.length, 0), 0);
  const completedTopics = data.reduce((acc, subj) => acc + subj.chapters.reduce((acc2, chap) => acc2 + chap.topics.filter(t => t.done).length, 0), 0);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">📚 সিলেবাস ব্রেকডাউন</h2>
        <div className="w-24 h-1 bg-indigo-500 mx-auto mt-2"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-300">আপনার সিলেবাসকে অধ্যায় ও টপিক অনুযায়ী সাজান।</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input type="text" value={subject} onChange={e => setSubject(e.target.value)} placeholder="বিষয় (যেমনঃ গণিত)" className="p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200" />
          <input type="text" value={chapter} onChange={e => setChapter(e.target.value)} placeholder="অধ্যায়ের নাম (যেমনঃ অধ্যায় ১)" className="p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200" />
          <input type="text" value={topic} onChange={e => setTopic(e.target.value)} placeholder="টপিক (যেমনঃ ভগ্নাংশ যোগ)" className="p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200" />
        </div>
        <button onClick={addTopic} className="w-full px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition">
          Add Topic
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="text-center font-bold text-xl mb-4 text-gray-800 dark:text-gray-200">Total Topics: {totalTopics}, Completed: {completedTopics}</div>
        
        {data.map((subj, subjIdx) => (
          <div key={subjIdx} className="mb-6">
            <h3 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-3 border-b-2 border-indigo-500 pb-2">{subj.subject}</h3>
            {subj.chapters.map((chap, chapIdx) => (
              <div key={chapIdx} className="ml-4 mb-4">
                <h4 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">{chap.name}</h4>
                {chap.topics.map((topic, topicIdx) => (
                  <div key={topicIdx} className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700 rounded-md mb-2">
                    <div className="flex items-center">
                      <input type="checkbox" checked={topic.done} onChange={() => toggleDone(subjIdx, chapIdx, topicIdx)} className="mr-3 h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                      <span className={`${topic.done ? 'line-through text-gray-500' : 'text-gray-900 dark:text-gray-200'}`}>{topic.text}</span>
                    </div>
                    <button onClick={() => deleteTopic(subjIdx, chapIdx, topicIdx)} className="text-red-500 hover:text-red-700 font-bold">🗑️</button>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SyllabusBreakdownPage;
