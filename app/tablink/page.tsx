
"use client";
import { useState, FormEvent } from 'react';

const TablinkPage = () => {
  const [formData, setFormData] = useState(
    Array.from({ length: 4 }, () => Array.from({ length: 10 }, () => ''))
  );
  const [jsonOutput, setJsonOutput] = useState('');

  const handleInputChange = (rowIndex: number, colIndex: number, value: string) => {
    const newFormData = [...formData];
    newFormData[rowIndex][colIndex] = value;
    setFormData(newFormData);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = formData.map(row => {
      const rowData: { [key: string]: string } = {};
      row.forEach((cell, index) => {
        rowData[`col${index + 1}`] = cell;
      });
      return rowData;
    });
    setJsonOutput(JSON.stringify({ rows: data }, null, 2));
  };

  const clearForm = () => {
    setFormData(Array.from({ length: 4 }, () => Array.from({ length: 10 }, () => '')));
    setJsonOutput('');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-3">10 Column × 4 Row - Data Entry Table</h1>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
        <form onSubmit={handleFormSubmit}>
          <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  {Array.from({ length: 11 }, (_, i) => (
                    <th key={i} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {i === 0 ? '#' : `Column ${i}`}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                {formData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{rowIndex + 1}</td>
                    {row.map((cell, colIndex) => (
                      <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="text"
                          value={cell}
                          onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                          className="w-full p-2 bg-transparent border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center gap-2 mt-3">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">Save / Export JSON</button>
            <button type="button" onClick={clearForm} className="bg-transparent text-blue-600 border border-blue-200 dark:border-blue-800 px-4 py-2 rounded-lg">Clear all</button>
          </div>

          {jsonOutput && (
            <pre className="bg-gray-900 text-white p-4 rounded-lg mt-3 overflow-x-auto">{jsonOutput}</pre>
          )}
        </form>
      </div>
    </div>
  );
};

export default TablinkPage;
