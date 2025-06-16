// File: src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import InteractiveResume from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <InteractiveResume />
  </StrictMode>,
);