'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { NostalgicButton } from '@/components/nostalgic';
import type { TimelineEvent } from '@/types';

export default function TimelinePage() {
  const timelineEvents: TimelineEvent[] = [
    {
      year: 2016,
      title: 'The Beginning',
      description: 'We met at SMP and became inseparable',
      emoji: '🎓',
    },
    {
      year: 2017,
      title: 'Growing Stronger',
      description: 'First year of real friendship bonds forming',
      emoji: '💪',
    },
    {
      year: 2018,
      title: 'High School Days',
      description: 'The golden years of teenage adventures',
      emoji: '🎉',
    },
    {
      year: 2019,
      title: 'Senior Year',
      description: 'Making the most of our last year together',
      emoji: '📚',
    },
    {
      year: 2020,
      title: 'University & New Paths',
      description: 'Separated by distance but not by heart',
      emoji: '🎓',
    },
    {
      year: 2021,
      title: 'Staying Connected',
      description: 'Video calls and late night chats',
      emoji: '💬',
    },
    {
      year: 2022,
      title: 'Bali Adventure',
      description: 'Epic summer trip with the whole crew',
      emoji: '✈️',
    },
    {
      year: 2023,
      title: 'Growing Up',
      description: 'New jobs, new challenges, same friends',
      emoji: '🚀',
    },
    {
      year: 2024,
      title: 'Reunion',
      description: 'Finally back together in one place',
      emoji: '🎊',
    },
    {
      year: 2025,
      title: 'Stronger Than Ever',
      description: 'Reflecting on our incredible journey',
      emoji: '❤️',
    },
    {
      year: 2026,
      title: '10 Years Later',
      description: 'A decade of memories, laughter & love',
      emoji: '🌟',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 100, damping: 20 },
    },
  };

  return (
    <div className="min-h-screen px-4 py-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl md:text-6xl font-black mb-4 text-primary">
            Our Journey
          </h1>
          <p className="text-xl text-gray-600">
            A decade of friendship captured in time
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-primary transform -translate-x-1/2" />

          {/* Timeline items */}
          <div className="space-y-12">
            {timelineEvents.map((event, idx) => (
              <motion.div
                key={event.year}
                variants={itemVariants}
                className={`flex gap-8 ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                {/* Content */}
                <div className="flex-1">
                  <motion.div
                    className="p-6 rounded-2xl bg-secondary border border-border hover:shadow-lg transition-shadow"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">{event.emoji}</span>
                      <h3 className="text-2xl font-bold text-foreground">{event.year}</h3>
                    </div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">
                      {event.title}
                    </h4>
                    <p className="text-muted-foreground text-sm">{event.description}</p>
                  </motion.div>
                </div>

                {/* Timeline dot */}
                <div className="flex justify-center">
                  <motion.div
                    className="w-6 h-6 rounded-full bg-primary border-4 border-background shadow-md"
                    whileHover={{ scale: 1.3 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                </div>

                {/* Spacer */}
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to action */}
        <motion.div
          className="mt-20 text-center p-8 rounded-2xl bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-md border border-white/40"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            What a Journey! 🌈
          </h2>
          <p className="text-gray-600 mb-6">
            From 2016 to 2026, we've grown, laughed, cried, and loved together. Here's to 10 more years!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/people">
              <NostalgicButton variant="primary" size="md">
                Meet the People
              </NostalgicButton>
            </Link>
            <Link href="/albums">
              <NostalgicButton variant="secondary" size="md">
                View Albums
              </NostalgicButton>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
