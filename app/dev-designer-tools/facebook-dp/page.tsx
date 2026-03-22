
"use client";

import { useState, useRef, useEffect } from 'react';

const FacebookDPMakerPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [frameUrl, setFrameUrl] = useState("https://i.ibb.co/DYFSgJS/sample-frame.png");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const userImage = new Image();
      userImage.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(userImage, 0, 0, canvas.width, canvas.height);

        const frameImage = new Image();
        frameImage.crossOrigin = "anonymous";
        frameImage.onload = () => {
          ctx.drawImage(frameImage, 0, 0, canvas.width, canvas.height);
        };
        frameImage.src = frameUrl;
      };
      userImage.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'facebook-dp.png';
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8 text-center">
      <div className="mb-8">
        <h2 className="text-3xl font-bold">📸 Facebook DP Maker</h2>
        <div className="w-24 h-1 bg-indigo-500 mx-auto mt-2"></div>
        <div className="mt-4 text-gray-600 dark:text-gray-300">
          <p>Create a custom Facebook profile picture with a frame.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md inline-block">
        <div className="mb-4">
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload} 
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
        </div>

        <canvas ref={canvasRef} width="500" height="500" className="w-full max-w-md border rounded-lg bg-gray-200 dark:bg-gray-700"></canvas>

        <button 
          onClick={downloadImage} 
          className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          📥 Download Image
        </button>
      </div>
    </div>
  );
};

export default FacebookDPMakerPage;
