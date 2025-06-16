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
    <main className="bg-black text-white font-serif">
      {storyChapters.map((chapter: Chapter) => (
        <section
          key={chapter.id}
          className="min-h-screen flex flex-col items-center justify-center text-center px-6 md:px-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">{chapter.title}</h2>
            <p className="text-lg md:text-xl max-w-3xl leading-relaxed mb-6 whitespace-pre-line">
              {chapter.text}
            </p>
            {chapter.image && (
              <img
                src={Array.isArray(chapter.image) ? chapter.image[0] : chapter.image}
                alt={chapter.title}
                className="max-h-[400px] object-cover rounded-xl shadow-lg border border-white"
              />
            )}
          </motion.div>
        </section>
      ))}
    </main>
  );
}