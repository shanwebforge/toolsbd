
"use client";

import { useState } from 'react';

const ResponsiveDesignCheckerPage = () => {
  const [url, setUrl] = useState('https://example.com');
  const [device, setDevice] = useState('100%');
  const [iframeSrc, setIframeSrc] = useState('');

  const loadSite = () => {
    if (!url) {
      alert("Please enter a URL.");
      return;
    }
    const validUrl = url.startsWith("http://") || url.startsWith("https://") ? url : `https://${url}`;
    setIframeSrc(validUrl);
  };

  const devices = {
    mobile: '375px',
    tablet: '768px',
    desktop: '1024px',
    full: '100%',
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">Responsive Design Checker</h2>
            <div className="w-24 h-1 bg-indigo-500 mx-auto mt-2"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Test your website's responsiveness on different screen sizes.</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                <input 
                    type="text" 
                    value={url} 
                    onChange={(e) => setUrl(e.target.value)} 
                    placeholder="Enter website URL (e.g. https://example.com)"
                    className="flex-grow p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                />
                <button 
                    onClick={loadSite} 
                    className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
                >
                    Load Site
                </button>
            </div>

            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 my-6">
                <button onClick={() => setDevice(devices.mobile)} className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">📱 Mobile</button>
                <button onClick={() => setDevice(devices.tablet)} className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">📲 Tablet</button>
                <button onClick={() => setDevice(devices.desktop)} className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">💻 Desktop</button>
                <button onClick={() => setDevice(devices.full)} className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">🖥️ Full Width</button>
            </div>

            <div className="flex justify-center">
                <div style={{ width: device }} className="transition-all duration-300 ease-in-out bg-white dark:bg-gray-900 p-2 rounded-lg shadow-lg">
                    <iframe 
                        src={iframeSrc} 
                        className="w-full h-[600px] border-none rounded-md bg-white"
                    ></iframe>
                </div>
            </div>
        </div>
    </div>
  );
}

export default ResponsiveDesignCheckerPage;
