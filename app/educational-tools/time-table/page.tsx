
"use client";

import { useState, useEffect } from 'react';

interface ScheduleItem {
  subject: string;
  day: string;
  startTime: string;
  endTime: string;
}

const TimeTablePage = () => {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [subject, setSubject] = useState('');
  const [day, setDay] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  useEffect(() => {
    const savedSchedule = localStorage.getItem('timeTable');
    if (savedSchedule) {
      try {
        const parsedSchedule = JSON.parse(savedSchedule);
        if (Array.isArray(parsedSchedule)) {
          setSchedule(parsedSchedule);
        }
      } catch (error) {
        console.error("Error parsing schedule from localStorage", error);
      }
    }
  }, []);

  useEffect(() => {
    if (schedule.length > 0) {
        localStorage.setItem('timeTable', JSON.stringify(schedule));
    }
  }, [schedule]);

  const addClass = () => {
    if (!subject.trim() || !day || !startTime || !endTime) {
      alert("সব ইনপুট পূরণ করুন");
      return;
    }
    const newClass = { subject, day, startTime, endTime };
    setSchedule([...schedule, newClass]);
    setSubject('');
    setDay('');
    setStartTime('');
    setEndTime('');
  };

  const resetTable = () => {
    if (confirm("আপনি কি নিশ্চিত যে আপনি পুরো টেবিলটি মুছে ফেলতে চান?")) {
        setSchedule([]);
        localStorage.removeItem('timeTable');
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 md:p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">🗓️ টাইম টেবিল জেনারেটর</h2>
        <div className="w-24 h-1 bg-indigo-500 mx-auto mt-2"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-300">আপনার ক্লাস রুটিন তৈরি করুন সহজেই।</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <input type="text" value={subject} onChange={e => setSubject(e.target.value)} placeholder="বিষয় (যেমন: গণিত)" className="p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200" />
          <select value={day} onChange={e => setDay(e.target.value)} className="p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200">
            <option value="">দিন নির্বাচন করুন</option>
            <option value="রবিবার">রবিবার</option>
            <option value="সোমবার">সোমবার</option>
            <option value="মঙ্গলবার">মঙ্গলবার</option>
            <option value="বুধবার">বুধবার</option>
            <option value="বৃহস্পতিবার">বৃহস্পতিবার</option>
            <option value="শুক্রবার">শুক্রবার</option>
            <option value="শনিবার">শনিবার</option>
          </select>
          <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} className="p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200" />
          <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} className="p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200" />
        </div>
        <div className="flex justify-center gap-4">
            <button onClick={addClass} className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition">
              ক্লাস যোগ করুন
            </button>
            <button onClick={resetTable} className="px-8 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition">
              রিসেট
            </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="py-3 px-4 bg-indigo-600 text-white font-bold uppercase text-sm border-b border-gray-200 dark:border-gray-700">দিন</th>
              <th className="py-3 px-4 bg-indigo-600 text-white font-bold uppercase text-sm border-b border-gray-200 dark:border-gray-700">বিষয়</th>
              <th className="py-3 px-4 bg-indigo-600 text-white font-bold uppercase text-sm border-b border-gray-200 dark:border-gray-700">সময়</th>
            </tr>
          </thead>
          <tbody>
            {schedule.length > 0 ? (
              schedule.sort((a, b) => a.startTime.localeCompare(b.startTime)).map((item, index) => (
                <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                  <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-200">{item.day}</td>
                  <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-200">{item.subject}</td>
                  <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-200">{`${item.startTime} - ${item.endTime}`}</td>
                </tr>
              ))
            ) : (
                <tr>
                    <td colSpan={3} className="text-center py-10 text-gray-500">No classes scheduled yet.</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TimeTablePage;
