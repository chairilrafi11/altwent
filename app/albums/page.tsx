'use client';

import { motion } from 'framer-motion';
import { AlbumCard } from '@/components/nostalgic';
import { useEffect, useState } from 'react';

export default function AlbumsPage() {
  const [albums, setAlbums] = useState<any[]>([]);

  // Mock albums data
  const mockAlbums = [
    {
      id: '1',
      title: 'SMP Days - 2016',
      description: 'Where it all began. Our first moments together as a friend group.',
      eventDate: new Date('2016-06-15'),
      coverImage:
        'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&h=600&fit=crop',
      participantCount: 4,
    },
    {
      id: '2',
      title: 'High School Adventures',
      description: 'The golden years of laughter, growth, and unforgettable moments.',
      eventDate: new Date('2018-09-10'),
      coverImage:
        'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=600&fit=crop',
      participantCount: 4,
    },
    {
      id: '3',
      title: 'College Chaos',
      description: 'Navigating university life together, making new memories in new places.',
      eventDate: new Date('2020-03-20'),
      coverImage:
        'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=600&fit=crop',
      participantCount: 4,
    },
    {
      id: '4',
      title: 'Summer Trip 2022',
      description: 'A week-long adventure to bali. Sun, sea, and sisterhood.',
      eventDate: new Date('2022-07-01'),
      coverImage:
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop',
      participantCount: 4,
    },
    {
      id: '5',
      title: 'Reunion 2024',
      description: 'After years apart, we finally got together again. The connection was instant.',
      eventDate: new Date('2024-12-25'),
      coverImage:
        'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=600&fit=crop',
      participantCount: 4,
    },
    {
      id: '6',
      title: '10 Year Celebration',
      description: 'A decade of friendship worth celebrating. Here\'s to forever.',
      eventDate: new Date('2026-06-15'),
      coverImage:
        'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=600&h=600&fit=crop',
      participantCount: 4,
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
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 100, damping: 20 },
    },
  };

  return (
    <div className="min-h-screen px-4 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl md:text-6xl font-black mb-4 text-primary">
            Our Albums
          </h1>
          <p className="text-xl text-gray-600">
            Memories preserved through the moments we shared
          </p>
        </motion.div>

        {/* Timeline view option text */}
        <motion.div
          className="text-center mb-12 text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          📅 From 2016 to 2026 | Sorted by date
        </motion.div>

        {/* Albums Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {mockAlbums.map((album) => (
            <motion.div key={album.id} variants={itemVariants}>
              <AlbumCard
                id={album.id}
                title={album.title}
                description={album.description}
                coverImage={album.coverImage}
                eventDate={album.eventDate}
                participantCount={album.participantCount}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Coming Soon Info */}
        <motion.div
          className="mt-20 p-8 rounded-2xl bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-md border border-white/40"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-center text-gray-600 text-lg">
            📖 Click on any album to explore the photos and relive those special moments.
            Each album contains stories, comments, and memories from all participants.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
