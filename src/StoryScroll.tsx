import { storyChapters } from './storyData';
import { motion } from 'framer-motion';

type Chapter = {
  id: string;
  title: string;
  text: string;
  image?: string | string[];
};

export default function StoryScroll() {
  return (
    <main style={{ background: '#0a0602', color: '#f0e6c8', fontFamily: 'Georgia, serif' }}>
      {storyChapters.map((chapter: Chapter) => (
        <section
          key={chapter.id}
          className="min-h-screen flex flex-col items-center justify-center text-center px-6 md:px-20"
          style={{ borderBottom: '1px solid rgba(139,105,20,0.15)' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            style={{ maxWidth: 720 }}
          >
            <h2
              style={{
                fontFamily: 'Cinzel, serif',
                fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                fontWeight: 900,
                color: '#f0c860',
                textShadow: '0 0 30px rgba(240,200,96,0.25)',
                letterSpacing: '0.06em',
                marginBottom: 14,
              }}
            >
              {chapter.title}
            </h2>
            {/* Ornamental rule */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 24 }}>
              <div style={{ width: 48, height: 1, background: 'linear-gradient(to left, rgba(139,105,20,0.6), transparent)' }} />
              <svg width="10" height="10" viewBox="0 0 10 10"><polygon points="5,0 10,5 5,10 0,5" fill="rgba(240,200,96,0.5)"/></svg>
              <div style={{ width: 48, height: 1, background: 'linear-gradient(to right, rgba(139,105,20,0.6), transparent)' }} />
            </div>
            <p
              style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', lineHeight: 1.85, marginBottom: 24, whiteSpace: 'pre-line', color: 'rgba(240,230,200,0.82)' }}
            >
              {chapter.text}
            </p>
            {chapter.image && (
              <img
                src={Array.isArray(chapter.image) ? chapter.image[0] : chapter.image}
                alt={chapter.title}
                style={{ maxHeight: 400, objectFit: 'cover', borderRadius: 12, border: '1px solid rgba(139,105,20,0.4)', boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }}
              />
            )}
          </motion.div>
        </section>
      ))}
    </main>
  );
}
