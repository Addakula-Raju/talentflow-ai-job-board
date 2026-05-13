import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App';
import './styles/globals.css';

const saved = JSON.parse(localStorage.getItem('talentflow-ui') || '{}');
const theme = saved?.state?.theme ?? 'dark';
document.documentElement.classList.toggle('dark', theme === 'dark');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3500,
          style: {
            background: 'var(--surface-100)',
            color: 'var(--ink-primary)',
            border: '1px solid var(--surface-300)',
            borderRadius: '12px',
            fontSize: '14px',
            fontFamily: 'Syne, sans-serif',
          },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
);
