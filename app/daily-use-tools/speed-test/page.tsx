
"use client";

import { useState, useEffect } from 'react';

const SpeedTestPage = () => {
  const [mainSpeed, setMainSpeed] = useState('--');
  const [downloadSpeed, setDownloadSpeed] = useState('--');
  const [uploadSpeed, setUploadSpeed] = useState('--');
  const [status, setStatus] = useState('Click the button to start testing.');
  const [networkInfo, setNetworkInfo] = useState('Loading network info...');

  useEffect(() => {
    const fetchNetworkInfo = async () => {
      try {
        const res = await fetch("https://geolocation-db.com/json/");
        const data = await res.json();
        setNetworkInfo(`
          <strong>IP:</strong> ${data.IPv4}<br>
          <strong>City:</strong> ${data.city || 'N/A'}<br>
          <strong>State:</strong> ${data.state || 'N/A'}<br>
          <strong>Country:</strong> ${data.country_name}<br>
          <strong>Device:</strong> ${navigator.userAgent}
        `);
      } catch (e) {
        setNetworkInfo(`<span style={{color: '#f87171'}}>Failed to load network info.</span>`);
        console.error("Info error:", e);
      }
    };

    fetchNetworkInfo();
  }, []);

  const startSpeedTest = async () => {
    setStatus("Testing download speed...");
    setMainSpeed("--");
    setDownloadSpeed("--");
    setUploadSpeed("--");

    // Download speed test
    try {
      const start = performance.now();
      const response = await fetch(`https://upload.wikimedia.org/wikipedia/commons/3/3f/Fronalpstock_big.jpg?nocache=${Date.now()}`, {
        method: "GET",
        headers: { 'Range': 'bytes=0-1000000' },
        cache: "no-store"
      });
      const blob = await response.blob();
      const end = performance.now();
      const duration = (end - start) / 1000;
      const bits = blob.size * 8;
      const speedMbps = (bits / duration / 1024 / 1024).toFixed(2);

      setDownloadSpeed(speedMbps);
      setMainSpeed(speedMbps);
    } catch (e) {
      setDownloadSpeed('Failed');
      console.error("Download error:", e);
    }

    setStatus("Testing upload speed...");

    // Upload speed test
    try {
      const data = new Blob([new Uint8Array(1_000_000)]); // 1MB dummy data
      const start = performance.now();
      await fetch("https://api.sofy.ai/api/v1/test/upload", {
        method: "POST",
        body: data,
      });
      const end = performance.now();
      const duration = (end - start) / 1000;
      const bits = data.size * 8;
      const speedMbps = (bits / duration / 1024 / 1024).toFixed(2);

      setUploadSpeed(speedMbps);
    } catch (e) {
      setUploadSpeed('Failed');
      console.error("Upload error:", e);
    }

    setStatus("Test completed.");
  };

  return (
    <div className="file-section">
      <div className="file-container">
        <div className="speed-test">
          <div className="file-header">
            <div className="file-title">
              <h2>Internet Speed Test</h2>
            </div>
            <div className="file-content-text">
              <p>Measures how fast data travels from internet to your device</p>
              <p>Download speed affects streaming, browsing, downloading files</p>
              <p>Upload speed affects video calls, file sharing, online gaming</p>
              <p>Measured in Mbps (Megabits per second)</p>
              <p>For accurate results, close other apps during test</p>
            </div>
          </div>
          <h3>Internet Speed Test</h3>
          <div className="main-speed" id="main-speed">{mainSpeed} {mainSpeed !== '--' && 'Mbps'}</div>
          <div className="sub-speed" id="download">↓ Download: {downloadSpeed} {downloadSpeed !== '--' && 'Mbps'}</div>
          <div className="sub-speed" id="upload">↑ Upload: {uploadSpeed} {uploadSpeed !== '--' && 'Mbps'}</div>

          <button onClick={startSpeedTest}>Start Test</button>
          <div className="status" id="status">{status}</div>

          <div className="info" id="info" dangerouslySetInnerHTML={{ __html: networkInfo }}></div>
        </div>
      </div>
    </div>
  );
};

export default SpeedTestPage;
