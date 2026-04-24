'use client';

import { motion } from 'framer-motion';
import { AlbumCard } from '@/components/nostalgic';
import { useEffect, useState } from 'react';

export default function AlbumsPage() {
  const [albums, setAlbums] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch('/api/albums');
        const data = await response.json();
        setAlbums(data);
      } catch (error) {
        console.error('Failed to fetch albums:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlbums();
  }, []);

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
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="mt-4 text-gray-600">Loading albums...</p>
            </div>
          </div>
        ) : albums.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">No albums found</p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {albums.map((album) => (
              <motion.div key={album.id} variants={itemVariants}>
                <AlbumCard
                  id={album.id}
                  title={album.title}
                  description={album.description}
                  coverImage={album.coverImage}
                  eventDate={album.eventDate}
                  participantCount={album.participants?.length || 0}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

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
