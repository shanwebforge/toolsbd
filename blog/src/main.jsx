import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style.css';
import { auth, db } from "./firebase";
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
