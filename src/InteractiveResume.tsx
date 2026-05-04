// File: src/InteractiveResume.tsx
import { useEffect } from 'react';
import CareerTimeline from './components/CareerTimeline';

const rejections = [
  {
    company: 'Taco Time',
    note: null,
    era: 'college',
  },
  {
    company: 'Ferguson Plumbing',
    note: null,
    era: null,
  },
  {
    company: 'Sherwin Williams',
    note: 'The interviewer needed to know if I was a business guy or a computer guy. I was both. This was somehow disqualifying.',
    era: null,
  },
  {
    company: 'Corvallis Police Department',
    note: 'Failed the math test. Had passed applied differential equations.',
    era: null,
  },
  {
    company: 'Gilbert, AZ Police Department',
    note: 'Drove from Oregon in a \'91 Ford Probe with no AC in August. 500 applicants. 3 openings. Most were current or former law enforcement.',
    era: null,
  },
  {
    company: 'Target Distribution',
    note: '13 interviews. Hired an MBA. Continued interviewing candidates after the decision had already been made.',
    era: null,
  },
];

const skillGroups = [
  {
    label: 'Testing',
    skills: ['Functional', 'Integration', 'End-to-End', 'Regression', 'API', 'Mobile', 'Performance'],
  },
  {
    label: 'Automation',
    skills: ['Pytest', 'Playwright', 'Selenium', 'Postman', 'BrowserStack', 'Appium'],
  },
  {
    label: 'Infrastructure',
    skills: ['Docker', 'Linux', 'AWS', 'SSH', 'iptables', 'Redis', 'YAML'],
  },
  {
    label: 'Languages',
    skills: ['Python', 'TypeScript', 'JavaScript', 'SQL', 'Bash', 'Java'],
  },
  {
    label: 'Platforms',
    skills: ['iOS', 'macOS', 'iPadOS', 'Android', 'Chrome Extension', 'Windows'],
  },
];

export default function InteractiveResume() {
  useEffect(() => {
    document.title = 'Jamal Chishti | Career';
  }, []);

  return (
    <main className="bg-white text-gray-900 font-sans apple-document">

      {/* ── Header ── */}
      <div className="apple-header">
        <div className="apple-bg-gradient" />
        <div className="apple-mesh-gradient apple-mesh-1" />
        <div className="apple-mesh-gradient apple-mesh-2" />
        <div className="apple-content">
          <div className="apple-title-container">
            <h1 className="apple-name">Jamal Chishti</h1>
            <div className="apple-title-line" />
          </div>
          <p className="apple-subtitle">DevOps & QA Engineer</p>
          <div className="apple-tags">
            <span className="apple-tag">Toolsmith</span>
            <span className="apple-tag">System Debugger</span>
            <span className="apple-tag">Storyteller</span>
          </div>
        </div>
      </div>

      {/* ── Intro ── */}
      <div className="max-w-2xl mx-auto px-6 pt-14 pb-2 text-center">
        <div className="text-gray-500 text-base leading-relaxed">
          Sixteen years of building things, breaking things on purpose, and making sure the right
          things ship. Click any node on the timeline to dig in.
        </div>
      </div>

      {/* ── Timeline ── */}
      <div className="px-6">
        <CareerTimeline />
      </div>

      {/* ── Skills ── */}
      <div className="border-t border-gray-100 mt-4">
        <div className="max-w-2xl mx-auto px-6 py-12">
          <div className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6">
            Tools of the trade
          </div>
          <div className="space-y-4">
            {skillGroups.map((group) => (
              <div key={group.label} className="flex gap-3 flex-wrap items-baseline">
                <span className="text-xs font-semibold text-gray-400 w-24 shrink-0">
                  {group.label}
                </span>
                <div className="flex gap-1.5 flex-wrap">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-2.5 py-1 rounded-full bg-gray-50 border border-gray-200 text-gray-600"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t border-gray-100">
            <div className="text-sm text-gray-500">
              <strong className="text-gray-700">Oregon State University</strong>
              {' — '}BS in Business Information Systems & Management
            </div>
          </div>
        </div>
      </div>

      {/* ── Rejections ── */}
      <div className="border-t border-gray-100">
        <div className="max-w-2xl mx-auto px-6 py-12">
          <div className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
            Also Interviewed At
          </div>
          <div className="text-xs text-gray-300 mb-8">Did not get the job.</div>
          <div className="space-y-5">
            {rejections.map((r) => (
              <div key={r.company}>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm text-gray-400 line-through decoration-gray-300">
                    {r.company}
                  </span>
                  {r.era && (
                    <span className="text-xs text-gray-300 italic">{r.era}</span>
                  )}
                </div>
                {r.note && (
                  <div className="text-xs text-gray-400 mt-0.5 leading-relaxed max-w-md">
                    {r.note}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="text-center text-sm py-6 text-gray-400 border-t border-gray-100">
        © {new Date().getFullYear()} Jamal Chishti
      </footer>

    </main>
  );
}
