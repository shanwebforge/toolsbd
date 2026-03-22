
"use client";

import { useState } from 'react';

const GpaCgpaCalculatorPage = () => {
  const [subjects, setSubjects] = useState([{ name: '', grade: '5', credits: '3' }]);
  const [result, setResult] = useState('');

  const addSubject = () => {
    setSubjects([...subjects, { name: '', grade: '5', credits: '3' }]);
  };

  const handleSubjectChange = (index: number, field: 'name' | 'grade' | 'credits', value: string) => {
    const newSubjects = [...subjects];
    newSubjects[index][field] = value;
    setSubjects(newSubjects);
  };
  
  const calculateGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    subjects.forEach(subject => {
      const grade = parseFloat(subject.grade);
      const credits = parseFloat(subject.credits);
      if (!isNaN(grade) && !isNaN(credits) && credits > 0) {
        totalPoints += grade * credits;
        totalCredits += credits;
      }
    });

    const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;
    setResult(`আপনার GPA/CGPA: ${gpa}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">📊 GPA / CGPA ক্যালকুলেটর</h2>
            <div className="w-24 h-1 bg-indigo-500 mx-auto mt-2"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">আপনার কোর্স এবং গ্রেড প্রবেশ করে GPA/CGPA গণনা করুন।</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div id="subjectContainer" className="space-y-4">
                {subjects.map((subject, index) => (
                    <div key={index} className="flex flex-col sm:flex-row gap-4">
                        <input 
                            type="text" 
                            placeholder="বিষয়ের নাম"
                            className="flex-grow p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                            value={subject.name}
                            onChange={(e) => handleSubjectChange(index, 'name', e.target.value)}
                        />
                        <input 
                            type="number" 
                            placeholder="ক্রেডিট"
                            className="w-full sm:w-24 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                            value={subject.credits}
                            onChange={(e) => handleSubjectChange(index, 'credits', e.target.value)}
                        />
                        <select 
                            className="w-full sm:w-48 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                            value={subject.grade}
                            onChange={(e) => handleSubjectChange(index, 'grade', e.target.value)}
                        >
                            <option value="4.0">A+ (4.00)</option>
                            <option value="3.75">A (3.75)</option>
                            <option value="3.50">A- (3.50)</option>
                            <option value="3.25">B+ (3.25)</option>
                            <option value="3.00">B (3.00)</option>
                            <option value="2.75">B- (2.75)</option>
                            <option value="2.50">C+ (2.50)</option>
                            <option value="2.25">C (2.25)</option>
                            <option value="2.00">D (2.00)</option>
                            <option value="0.00">F (0.00)</option>
                        </select>
                    </div>
                ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <button 
                    onClick={addSubject} 
                    className="w-full py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition"
                >
                    আরেকটি বিষয় যোগ করুন
                </button>
                <button 
                    onClick={calculateGPA} 
                    className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
                >
                    হিসাব করুন
                </button>
            </div>

            {result && 
                <div className="mt-8 text-center text-xl font-semibold p-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-gray-200">
                    {result}
                </div>
            }
        </div>
    </div>
  );
}

export default GpaCgpaCalculatorPage;
