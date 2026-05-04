// File: src/SideQuests.tsx
import { sideQuests } from './sideQuestsData';
import { motion } from 'framer-motion';

type SideQuest = {
  id: string;
  title: string;
  text: string;
  image?: string | string[];
};

export default function SideQuests() {
  return (
    <section style={{ background: '#0a0602', minHeight: '100vh', padding: '64px 24px', color: '#f0e6c8' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '2rem', fontWeight: 900, color: '#f0c860', letterSpacing: '0.06em', marginBottom: 10 }}>
          Side Quests & Odd Jobs
        </h2>
        <div style={{ width: 64, height: 1, background: 'linear-gradient(to right, transparent, rgba(139,105,20,0.6), transparent)', margin: '0 auto' }} />
      </div>

      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {sideQuests.map((quest: SideQuest, _idx: number) => (
          <motion.div
            key={quest.id}
            style={{ background: 'rgba(18, 12, 6, 0.95)', border: '1px solid rgba(139,105,20,0.3)', borderRadius: 16, padding: 24, display: 'flex', flexDirection: 'column', boxShadow: '0 4px 24px rgba(0,0,0,0.5)' }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: _idx * 0.1 }}
          >
            <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.2rem', fontWeight: 700, color: '#f0c860', marginBottom: 8 }}>{quest.title}</h3>
            <p style={{ fontSize: 14, color: 'rgba(240,230,200,0.65)', marginBottom: 16, lineHeight: 1.7, whiteSpace: 'pre-line' }}>{quest.text}</p>

            {quest.image && Array.isArray(quest.image) ? (
              <div className="flex gap-4">
                {quest.image.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`${quest.title} image ${i + 1}`}
                    className="w-1/2 object-cover rounded-lg"
                  />
                ))}
              </div>
            ) : quest.image ? (
              <img
                src={quest.image}
                alt={quest.title}
                className="w-full object-cover rounded-lg"
              />
            ) : null}
          </motion.div>
        ))}
      </div>
    </section>
  );
}