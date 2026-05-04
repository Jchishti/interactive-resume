// File: src/components/CareerTimeline.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { timelineEntries } from '../timelineData';
import type { JobEntry, ProjectEntry, SectionDivider } from '../timelineData';

// ─── Logo with initials fallback ────────────────────────────────────────────

function CompanyLogo({
  logoUrl,
  company,
  accent,
}: {
  logoUrl?: string;
  company: string;
  accent: string;
}) {
  const [error, setError] = useState(false);
  const initials = company
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  if (logoUrl && !error) {
    return (
      <img
        src={logoUrl}
        alt={company}
        className="w-6 h-6 object-contain"
        onError={() => setError(true)}
      />
    );
  }

  return (
    <span className="text-[11px] font-bold leading-none" style={{ color: accent }}>
      {initials}
    </span>
  );
}

// ─── Animated chevron ────────────────────────────────────────────────────────

function Chevron({ isOpen }: { isOpen: boolean }) {
  return (
    <motion.svg
      className="inline-block ml-1.5 shrink-0"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      animate={{ rotate: isOpen ? 180 : 0 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
    >
      <path
        d="M2 4L6 8L10 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}

// ─── Section divider ────────────────────────────────────────

function DividerNode({ entry }: { entry: SectionDivider }) {
  return (
    <div className="relative pl-16 mt-8 mb-6">
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(139,105,20,0.6))' }} />
        <span style={{ fontFamily: 'Cinzel, serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(139,105,20,0.7)', whiteSpace: 'nowrap' }}>
          {entry.label}
        </span>
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(139,105,20,0.6))' }} />
      </div>
    </div>
  );
}

// ─── Job node ───────────────────────────────────────────────

function JobNode({
  entry,
  isActive,
  onToggle,
}: {
  entry: JobEntry;
  isActive: boolean;
  onToggle: () => void;
}) {
  const dim = entry.dim ?? false;
  const nodeBg = 'rgba(18, 12, 6, 0.95)';
  const inactiveBorder = dim ? 'rgba(139,105,20,0.2)' : 'rgba(139,105,20,0.4)';
  return (
    <div className={`relative ${dim ? 'pl-16 mb-8' : 'pl-20 mb-12'}`}>
      <motion.button
        onClick={onToggle}
        className={`absolute ${dim ? 'left-3 top-1 w-10 h-10' : 'left-2 top-0 w-12 h-12'} rounded-full flex items-center justify-center focus:outline-none`}
        style={{
          background: nodeBg,
          border: `2px solid ${isActive ? entry.accent : inactiveBorder}`,
          opacity: dim ? 0.75 : 1,
          boxShadow: isActive ? `0 0 12px ${entry.accent}50` : 'none',
        }}
        animate={{ borderColor: isActive ? entry.accent : inactiveBorder }}
        transition={{ duration: 0.2 }}
        whileHover={{ scale: dim ? 1.04 : 1.06 }}
        whileTap={{ scale: 0.97 }}
        aria-expanded={isActive}
        aria-label={`${isActive ? 'Collapse' : 'Expand'} ${entry.company}`}
      >
        <CompanyLogo logoUrl={entry.logoUrl} company={entry.company} accent={entry.accent} />
      </motion.button>

      {/* Clickable header */}
      <button onClick={onToggle} className="w-full text-left group">
        <div className="flex items-center gap-2 flex-wrap leading-none">
          <span
            className="font-semibold group-hover:opacity-70 transition-opacity"
            style={{
              fontFamily: dim ? 'inherit' : 'Cinzel, serif',
              fontSize: dim ? 14 : 16,
              color: dim ? 'rgba(240,230,200,0.5)' : '#f0e6c8',
            }}
          >
            {entry.company}
          </span>
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: dim ? 'rgba(240,230,200,0.25)' : 'rgba(240,230,200,0.35)' }}>
            {entry.period}
          </span>
          <span style={{ color: dim ? 'rgba(240,230,200,0.25)' : 'rgba(240,230,200,0.4)' }}>
            <Chevron isOpen={isActive} />
          </span>
        </div>
        <div style={{ fontSize: dim ? 11 : 13, color: dim ? 'rgba(240,230,200,0.35)' : 'rgba(240,230,200,0.55)', marginTop: 4 }}>
          {entry.role}
        </div>
      </button>

      {/* Expandable detail panel */}
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            key="job-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div
              className="mt-4 rounded-2xl overflow-hidden"
              style={{ background: 'rgba(15, 10, 4, 0.97)', border: `1px solid ${entry.accent}40`, boxShadow: `0 4px 24px rgba(0,0,0,0.6), 0 0 0 1px ${entry.accent}10` }}
            >
              <div className="h-0.5" style={{ background: `linear-gradient(to right, ${entry.accent}, transparent)` }} />
              <div className="p-5">
                {entry.note && (
                  <div style={{ fontSize: 11, color: 'rgba(240,230,200,0.35)', fontStyle: 'italic', marginBottom: 10 }}>{entry.note}</div>
                )}
                {entry.highlight && (
                  <div
                    className="mb-4 flex gap-2 items-start rounded-xl px-4 py-2.5"
                    style={{ background: `${entry.accent}14`, border: `1px solid ${entry.accent}25` }}
                  >
                    <span className="shrink-0" style={{ color: entry.accent, fontSize: 12 }}>◆</span>
                    <span style={{ color: entry.accent, fontSize: 13, fontWeight: 600 }}>{entry.highlight}</span>
                  </div>
                )}
                <ul className="space-y-2.5">
                  {entry.bullets.map((bullet, i) => (
                    <li key={i} className="flex gap-2.5 leading-relaxed" style={{ fontSize: 13 }}>
                      <span style={{ color: `${entry.accent}60`, flexShrink: 0, marginTop: 2 }}>—</span>
                      <span style={{ color: 'rgba(240,230,200,0.7)' }}>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Project / branch node ────────────────────────────────────────────────────

function ProjectNode({
  entry,
  isActive,
  onToggle,
}: {
  entry: ProjectEntry;
  isActive: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="relative pl-24 mb-10">
      {/* Branch line from main rail (32px) to node center (64px) */}
      <div
        className="absolute left-8 top-6 w-8 h-px"
        style={{ background: `${entry.accent}50` }}
      />

      {/* Branch node — center at left: 48px + 16px radius = 64px */}
      <motion.button
        onClick={onToggle}
        className="absolute left-12 top-2 w-8 h-8 rounded-full flex items-center justify-center focus:outline-none focus-visible:ring-2"
        style={{
          background: isActive ? entry.accent : `${entry.accent}1a`,
          border: `2px solid ${entry.accent}70`,
        }}
        animate={{ background: isActive ? entry.accent : `${entry.accent}1a` }}
        transition={{ duration: 0.2 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-expanded={isActive}
        aria-label={`${isActive ? 'Collapse' : 'Expand'} ${entry.title}`}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle
            cx="7"
            cy="7"
            r="5"
            stroke={isActive ? 'white' : entry.accent}
            strokeWidth="1.5"
          />
          <circle cx="7" cy="7" r="2" fill={isActive ? 'white' : entry.accent} />
        </svg>
      </motion.button>

      {/* Clickable header */}
      <button onClick={onToggle} className="w-full text-left group">
        <div className="flex items-center gap-2 flex-wrap leading-none">
          <span className="text-base font-semibold" style={{ color: entry.accent }}>
            {entry.title}
          </span>
          <div className="flex gap-1 flex-wrap">
            {entry.platforms.map((p) => (
              <span
                key={p}
                className="text-[11px] font-medium px-1.5 py-0.5 rounded-full"
                style={{ background: `${entry.accent}18`, color: entry.accent }}
              >
                {p}
              </span>
            ))}
          </div>
          <span style={{ color: entry.accent }}>
            <Chevron isOpen={isActive} />
          </span>
        </div>
        <div style={{ fontSize: 11, color: 'rgba(240,230,200,0.4)', fontStyle: 'italic', marginTop: 4 }}>{entry.tagline}</div>
      </button>

      {/* Expandable story panel */}
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            key="project-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div
              className="mt-4 rounded-2xl overflow-hidden"
              style={{ background: 'rgba(15, 10, 4, 0.97)', border: `1px solid ${entry.accent}40`, boxShadow: `0 4px 24px rgba(0,0,0,0.6)` }}
            >
              <div
                className="h-0.5"
                style={{ background: `linear-gradient(to right, ${entry.accent}, transparent)` }}
              />
              <div className="p-5">
                <div style={{ fontSize: 13, color: 'rgba(240,230,200,0.7)', lineHeight: 1.7 }}>{entry.story}</div>
                {entry.links && entry.links.length > 0 && (
                  <div className="mt-4 flex gap-2 flex-wrap">
                    {entry.links.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-medium px-3 py-1.5 rounded-full transition-opacity hover:opacity-80"
                        style={{
                          background: `${entry.accent}18`,
                          color: entry.accent,
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {link.label} ↗
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Timeline container ───────────────────────────────────────────────────────

export default function CareerTimeline() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="relative">
        {/* Vertical rail — centered at left-8 = 32px */}
        <div
          className="absolute left-8 top-0 bottom-0 w-px pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, transparent 0%, rgba(139,105,20,0.45) 6%, rgba(139,105,20,0.45) 94%, transparent 100%)',
          }}
        />

        {timelineEntries.map((entry) => {
          if (entry.type === 'divider') {
            return <DividerNode key={entry.id} entry={entry} />;
          }
          if (entry.type === 'job') {
            return (
              <JobNode
                key={entry.id}
                entry={entry}
                isActive={activeId === entry.id}
                onToggle={() => toggle(entry.id)}
              />
            );
          }
          return (
            <ProjectNode
              key={entry.id}
              entry={entry}
              isActive={activeId === entry.id}
              onToggle={() => toggle(entry.id)}
            />
          );
        })}
      </div>
    </div>
  );
}
