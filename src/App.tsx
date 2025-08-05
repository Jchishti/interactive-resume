// File: src/App.tsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StoryScroll from './StoryScroll';
import SideQuests from './SideQuestsPage';
import InteractiveResume from './InteractiveResume';
import AnimatedStripes from './AnimatedStripes';

function Home() {
  return (
    <>
      <AnimatedStripes />
      <div className="h-screen flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-5xl font-bold mb-4">Welcome to My Interactive Resume</h1>
        <p className="text-lg text-gray-700 max-w-xl mb-10">
          Explore my professional journey, side quests, and the tools I've built along the way.
        </p>
        <div className="flex gap-4">
          <Link to="/resume" className="btn btn-cyan">
            Resume
          </Link>
          <Link to="/story" className="btn btn-magenta">
            Life Story
          </Link>
          <Link to="/sidequests" className="btn btn-yellow">
            Side Quests
          </Link>
        </div>
      </div>
    </>
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