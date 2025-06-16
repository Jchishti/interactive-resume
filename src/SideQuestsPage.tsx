// File: src/SideQuests.tsx
import * as React from 'react';
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
    <section className="bg-slate-50 py-16 px-6 md:px-20">
      <h2 className="text-4xl font-bold text-center mb-12">Side Quests & Odd Jobs</h2>

      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {sideQuests.map((quest: SideQuest, _idx: number) => (
          <motion.div
            key={quest.id}
            className="bg-white rounded-xl shadow p-6 flex flex-col"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: _idx * 0.1 }}
          >
            <h3 className="text-2xl font-semibold mb-2">{quest.title}</h3>
            <p className="text-gray-700 mb-4 whitespace-pre-line">{quest.text}</p>

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