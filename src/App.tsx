// File: src/App.tsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StoryScroll from './StoryScroll';
import SideQuests from './SideQuestsPage';
import InteractiveResume from './InteractiveResume';
import OregonMap from './components/OregonMap';

function Home() {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Full-screen draggable map */}
      <OregonMap />

      {/* Floating identity tag — top left */}
      <div
        className="absolute top-6 left-6 z-40 pointer-events-none"
        style={{ fontFamily: 'Cinzel, serif' }}
      >
        <div className="text-2xl font-bold tracking-wide" style={{ color: '#3d2b1f', textShadow: '0 1px 4px rgba(255,245,220,0.8)' }}>
          Jamal Chishti
        </div>
        <div className="text-xs tracking-widest uppercase mt-0.5" style={{ color: '#7a5c2e', textShadow: '0 1px 3px rgba(255,245,220,0.6)' }}>
          DevOps · QA · Builder
        </div>
      </div>

      {/* Floating quest log nav — bottom right */}
      <div
        className="absolute bottom-6 right-6 z-40 flex flex-col gap-2"
        style={{ fontFamily: 'Cinzel, serif' }}
      >
        <Link
          to="/resume"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105 active:scale-95"
          style={{
            background: 'rgba(12, 8, 4, 0.88)',
            border: '1px solid #8b6914',
            color: '#f0c860',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 0 16px rgba(139,105,20,0.25)',
          }}
        >
          <span>&#9776;</span> Quest Log
        </Link>
        <Link
          to="/story"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105 active:scale-95"
          style={{
            background: 'rgba(12, 8, 4, 0.88)',
            border: '1px solid #5c8b60',
            color: '#80c884',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 0 16px rgba(92,139,96,0.2)',
          }}
        >
          <span>✨</span> The Chronicles
        </Link>
        <Link
          to="/sidequests"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105 active:scale-95"
          style={{
            background: 'rgba(12, 8, 4, 0.88)',
            border: '1px solid #7a4a2a',
            color: '#d4884a',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 0 16px rgba(122,74,42,0.2)',
          }}
        >
          <span>⚔️</span> Side Quests
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router basename={import.meta.env.BASE_URL.replace(/\/$/, '') || '/'}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resume" element={<InteractiveResume />} />
        <Route path="/story" element={<StoryScroll />} />
        <Route path="/sidequests" element={<SideQuests />} />
      </Routes>
    </Router>
  );
}