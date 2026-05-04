// File: src/components/MapMarker.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { timelineEntries } from '../timelineData';
import type { JobEntry } from '../timelineData';
import type { MapMarkerData } from '../oregonMapData';

type Props = {
  marker: MapMarkerData;
  isActive: boolean;
  onToggle: () => void;
};

export default function MapMarker({ marker, isActive, onToggle }: Props) {
  const entries = timelineEntries.filter(
    (e): e is JobEntry => e.type === 'job' && marker.entryIds.includes(e.id)
  );

  return (
    <div
      className="absolute"
      style={{ left: marker.x, top: marker.y, transform: 'translate(-50%, -50%)', zIndex: isActive ? 50 : 20 }}
    >
      {/* Pulse ring */}
      {!isActive && (
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 48,
            height: 48,
            top: -8,
            left: -8,
            background: marker.accent,
          }}
          animate={{ scale: [1, 2.2], opacity: [0.35, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeOut', repeatDelay: 0.5 }}
        />
      )}

      {/* Gem button */}
      <motion.button
        onClick={(e) => { e.stopPropagation(); onToggle(); }}
        whileHover={{ scale: 1.25 }}
        whileTap={{ scale: 0.92 }}
        animate={{ scale: isActive ? 1.2 : 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        className="relative focus:outline-none"
        style={{ filter: isActive ? `drop-shadow(0 0 8px ${marker.accent})` : 'none' }}
        aria-label={`Open ${marker.fantasyName}`}
      >
        <svg width="32" height="38" viewBox="0 0 32 38" fill="none">
          {/* Gem outline / shadow */}
          <polygon points="16,36 1,14 8,2 24,2 31,14" fill="rgba(0,0,0,0.25)" transform="translate(1,2)"/>
          {/* Main gem */}
          <polygon points="16,36 1,14 8,2 24,2 31,14" fill={marker.accent}/>
          {/* Upper highlight face */}
          <polygon points="16,2 8,2 1,14 16,18 31,14 24,2" fill="rgba(255,255,255,0.28)"/>
          {/* Left facet */}
          <polygon points="1,14 8,2 16,18" fill="rgba(255,255,255,0.12)"/>
          {/* Shine streak */}
          <polygon points="10,4 14,2 16,8 12,10" fill="rgba(255,255,255,0.45)"/>
        </svg>
      </motion.button>

      {/* Floating detail card */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            key="card"
            className="absolute z-50"
            style={{
              bottom: '110%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 272,
            }}
            initial={{ opacity: 0, y: 10, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.94 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="rounded-2xl overflow-hidden shadow-2xl"
              style={{
                background: 'rgba(12, 8, 4, 0.94)',
                border: `1px solid ${marker.accent}55`,
                backdropFilter: 'blur(12px)',
              }}
            >
              {/* Accent top bar */}
              <div className="h-0.5" style={{ background: `linear-gradient(to right, ${marker.accent}, transparent)` }} />

              <div className="p-4">
                {/* Fantasy name */}
                <div
                  className="text-xs font-semibold uppercase tracking-[0.18em] mb-0.5"
                  style={{ color: marker.accent, fontFamily: 'Cinzel, serif' }}
                >
                  {marker.fantasyName}
                </div>
                <div className="text-[11px] text-gray-600 italic mb-3">{marker.realName}</div>

                {/* Divider */}
                <div className="h-px mb-3" style={{ background: `${marker.accent}30` }} />

                {/* Flavor */}
                <div className="text-xs text-gray-400 leading-relaxed mb-3">{marker.flavor}</div>

                {/* Job entries */}
                {entries.map((entry) => (
                  <div key={entry.id} className="mb-2 last:mb-0 pl-2 border-l" style={{ borderColor: `${marker.accent}50` }}>
                    <div className="text-xs font-semibold text-gray-300">{entry.company}</div>
                    <div className="text-[10px] text-gray-600">{entry.role} · {entry.period}</div>
                  </div>
                ))}

                {/* Link */}
                <Link
                  to="/resume"
                  className="mt-4 inline-flex items-center gap-1 text-[11px] font-semibold transition-opacity hover:opacity-75"
                  style={{ color: marker.accent, fontFamily: 'Cinzel, serif' }}
                >
                  Open Quest Log →
                </Link>
              </div>
            </div>

            {/* Card tail pointing down */}
            <div
              className="mx-auto w-3 h-3 -mt-px rotate-45"
              style={{
                background: 'rgba(12, 8, 4, 0.94)',
                border: `1px solid ${marker.accent}55`,
                borderTop: 'none',
                borderLeft: 'none',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
