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

const BG = '#0a0602';
const GOLD = '#f0c860';
const GOLD_DIM = 'rgba(240,200,96,0.5)';
const PARCHMENT = '#f0e6c8';
const PARCHMENT_MID = 'rgba(240,230,200,0.6)';
const PARCHMENT_LOW = 'rgba(240,230,200,0.35)';
const BORDER = 'rgba(139,105,20,0.3)';
const BORDER_BRIGHT = 'rgba(139,105,20,0.55)';
const CARD = 'rgba(18, 12, 6, 0.95)';

export default function InteractiveResume() {
  useEffect(() => {
    document.title = 'Jamal Chishti | Quest Log';
  }, []);

  return (
    <main style={{ background: BG, minHeight: '100vh', color: PARCHMENT, fontFamily: 'sans-serif' }}>

      {/* ── Header ── */}
      <div style={{
        position: 'relative',
        background: 'linear-gradient(160deg, #16100a 0%, #0a0602 60%, #140e08 100%)',
        borderBottom: `1px solid ${BORDER}`,
        minHeight: 280,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '40px 24px',
        overflow: 'hidden',
      }}>
        {/* Decorative corner lines */}
        <div style={{ position: 'absolute', top: 20, left: 20, width: 40, height: 40, borderTop: `1px solid ${BORDER_BRIGHT}`, borderLeft: `1px solid ${BORDER_BRIGHT}` }} />
        <div style={{ position: 'absolute', top: 20, right: 20, width: 40, height: 40, borderTop: `1px solid ${BORDER_BRIGHT}`, borderRight: `1px solid ${BORDER_BRIGHT}` }} />
        <div style={{ position: 'absolute', bottom: 20, left: 20, width: 40, height: 40, borderBottom: `1px solid ${BORDER_BRIGHT}`, borderLeft: `1px solid ${BORDER_BRIGHT}` }} />
        <div style={{ position: 'absolute', bottom: 20, right: 20, width: 40, height: 40, borderBottom: `1px solid ${BORDER_BRIGHT}`, borderRight: `1px solid ${BORDER_BRIGHT}` }} />
        <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: '2.8rem', fontWeight: 900, color: GOLD, textShadow: `0 0 40px rgba(240,200,96,0.3)`, letterSpacing: '0.05em', margin: 0 }}>
          Jamal Chishti
        </h1>
        <div style={{ width: 80, height: 1, background: `linear-gradient(to right, transparent, ${GOLD_DIM}, transparent)`, margin: '10px auto' }} />
        <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.9rem', color: GOLD_DIM, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 16 }}>
          DevOps · QA Engineer · Builder
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {['Toolsmith', 'System Debugger', 'Storyteller'].map(tag => (
            <span key={tag} style={{ padding: '4px 14px', border: `1px solid ${BORDER_BRIGHT}`, borderRadius: 20, fontSize: '0.75rem', color: PARCHMENT_MID, background: 'rgba(139,105,20,0.08)', fontFamily: 'Cinzel, serif', letterSpacing: '0.05em' }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* ── Intro ── */}
      <div style={{ maxWidth: 672, margin: '0 auto', padding: '48px 24px 8px', textAlign: 'center' }}>
        <div style={{ color: PARCHMENT_LOW, fontSize: '0.95rem', lineHeight: 1.7, fontStyle: 'italic' }}>
          Sixteen years of building things, breaking things on purpose, and making sure the right
          things ship. Click any node on the timeline to dig in.
        </div>
      </div>

      {/* ── Timeline ── */}
      <div style={{ padding: '0 24px' }}>
        <CareerTimeline />
      </div>

      {/* ── Skills ── */}
      <div style={{ borderTop: `1px solid ${BORDER}`, marginTop: 16 }}>
        <div style={{ maxWidth: 672, margin: '0 auto', padding: '48px 24px' }}>
          <div style={{ fontFamily: 'Cinzel, serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: GOLD_DIM, marginBottom: 24 }}>
            Tools of the Trade
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {skillGroups.map((group) => (
              <div key={group.label} style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'baseline' }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: GOLD_DIM, width: 96, flexShrink: 0, fontFamily: 'Cinzel, serif' }}>
                  {group.label}
                </span>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {group.skills.map((skill) => (
                    <span key={skill} style={{
                      fontSize: 11, padding: '4px 10px', borderRadius: 20,
                      background: 'rgba(139,105,20,0.08)',
                      border: `1px solid ${BORDER}`,
                      color: PARCHMENT_MID,
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 32, paddingTop: 24, borderTop: `1px solid ${BORDER}` }}>
            <div style={{ fontSize: 13, color: PARCHMENT_LOW }}>
              <span style={{ color: PARCHMENT_MID, fontWeight: 600 }}>Oregon State University</span>
              {' — '}BS in Business Information Systems & Management
            </div>
          </div>
        </div>
      </div>

      {/* ── Rejections ── */}
      <div style={{ borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 672, margin: '0 auto', padding: '48px 24px' }}>
          <div style={{ fontFamily: 'Cinzel, serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: GOLD_DIM, marginBottom: 4 }}>
            Dungeons Not Cleared
          </div>
          <div style={{ fontSize: 11, color: 'rgba(240,230,200,0.2)', marginBottom: 28, fontStyle: 'italic' }}>Did not get the job.</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {rejections.map((r) => (
              <div key={r.company}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                  <span style={{ fontSize: 13, color: PARCHMENT_LOW, textDecoration: 'line-through', textDecorationColor: 'rgba(240,230,200,0.2)' }}>
                    {r.company}
                  </span>
                  {r.era && <span style={{ fontSize: 11, color: 'rgba(240,230,200,0.2)', fontStyle: 'italic' }}>{r.era}</span>}
                </div>
                {r.note && (
                  <div style={{ fontSize: 11, color: 'rgba(240,230,200,0.32)', marginTop: 3, lineHeight: 1.6, maxWidth: 480 }}>
                    {r.note}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer style={{ textAlign: 'center', fontSize: 12, padding: '20px 0 32px', color: 'rgba(240,230,200,0.2)', borderTop: `1px solid ${BORDER}`, fontFamily: 'Cinzel, serif', letterSpacing: '0.1em' }}>
        © {new Date().getFullYear()} Jamal Chishti
      </footer>

    </main>
  );
}
