// File: src/App.tsx
import * as React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StoryScroll from './StoryScroll';
import SideQuests from './SideQuestsPage';
import InteractiveResume from './InteractiveResume';

function Home() {
  return (
    <div className="h-screen flex flex-col justify-center items-center text-center px-6">
      <h1 className="text-5xl font-bold mb-4">Welcome to My Interactive Resume</h1>
      <p className="text-lg text-gray-700 max-w-xl mb-10">
        Explore my professional journey, side quests, and the tools I’ve built along the way.
      </p>
      <div className="flex gap-4">
        <Link to="/resume" className="px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-700">
          Resume
        </Link>
        <Link to="/story" className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-600">
          Life Story
        </Link>
        <Link to="/sidequests" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500">
          Side Quests
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resume" element={<InteractiveResume />} />
        <Route path="/story" element={<StoryScroll />} />
        <Route path="/sidequests" element={<SideQuests />} />
      </Routes>
    </Router>
  );
}