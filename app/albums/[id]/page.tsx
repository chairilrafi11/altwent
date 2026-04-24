'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { NostalgicButton } from '@/components/nostalgic';
import { useState, use } from 'react';

interface AlbumDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function AlbumDetailPage({ params }: AlbumDetailPageProps) {
  const { id } = use(params);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Mock album data
  const album = {
    id: id,
    title: 'Summer Trip 2022',
    description:
      'A week-long adventure to Bali with the crew. We laughed until our sides hurt, made memories that will last a lifetime, and strengthened the bonds we already had. The beaches were beautiful, the food was incredible, and the company was perfect.',
    story:
      'It started as a joke—"let\'s go to Bali"—but somehow it became reality. After months of planning, we finally boarded that plane. What followed was chaos, laughter, and pure magic. From sunrise hikes to beach parties, from getting lost in the local markets to trying food we couldn\'t even name, every moment was worth it. We were more than friends on that trip; we were sisters on an adventure we\'ll never forget.',
    eventDate: new Date('2022-07-15'),
    participants: [
      { id: '1', name: 'Chairil' },
      { id: '2', name: 'Rara' },
      { id: '3', name: 'Dita' },
      { id: '4', name: 'Aisya' },
    ],
    photos: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop',
        caption: 'Bali sunset 🌅',
        height: 400,
      },
      {
        id: '2',
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=600&fit=crop',
        caption: 'Beach day vibes 🏖️',
        height: 600,
      },
      {
        id: '3',
        url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=400&fit=crop',
        caption: 'All of us together 👯',
        height: 300,
      },
      {
        id: '4',
        url: 'https://images.unsplash.com/photo-1506704720897-c6b0b8ef6dba?w=500&h=500&fit=crop',
        caption: 'Road trip shenanigans 🚗',
        height: 400,
      },
      {
        id: '5',
        url: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=600&fit=crop',
        caption: 'Temple exploration 🙏',
        height: 600,
      },
      {
        id: '6',
        url: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=600&h=600&fit=crop',
        caption: 'Best friends forever ✨',
        height: 400,
      },
      {
        id: '7',
        url: 'https://images.unsplash.com/photo-1502933691298-84fc14542831?w=400&h=600&fit=crop',
        caption: 'Island hopping ⛵',
        height: 600,
      },
      {
        id: '8',
        url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=600&fit=crop',
        caption: 'Night market vibes 🌃',
        height: 400,
      },
    ],
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 100, damping: 20 },
    },
  };

  return (
    <div className="min-h-screen py-20 px-4">
      {/* Image Modal - Fullscreen */}
      {selectedImage && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            className="relative w-full h-full max-w-4xl max-h-[90vh]"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="Full size"
              fill
              className="object-contain"
              sizes="100vw"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}

      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link href="/albums">
            <div className="inline-flex items-center gap-2 text-purple-600 hover:text-pink-600 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Albums</span>
            </div>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl md:text-6xl font-black mb-2 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">
            {album.title}
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            {album.eventDate.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </motion.div>

        {/* Story Section */}
        <motion.div
          className="p-8 rounded-2xl bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-md border border-white/40 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-lg text-gray-700 leading-relaxed mb-6">{album.story}</p>
          <p className="text-gray-600 leading-relaxed italic">{album.description}</p>
        </motion.div>

        {/* Participants */}
        <motion.div
          className="mb-12 p-6 rounded-xl bg-gradient-to-r from-purple-100/50 to-pink-100/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">👥 Participants</h3>
          <div className="flex flex-wrap gap-3">
            {album.participants.map((participant) => (
              <Link key={participant.id} href={`/people/${participant.id}`}>
                <motion.div
                  className="px-4 py-2 rounded-full bg-white/60 hover:bg-white/80 cursor-pointer transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  {participant.name}
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Masonry Grid */}
        <motion.div
          className="mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8">📸 Gallery</h2>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
            {album.photos.map((photo) => (
              <motion.div
                key={photo.id}
                variants={itemVariants}
                className="break-inside-avoid mb-6"
              >
                <motion.div
                  className="group relative rounded-2xl overflow-hidden shadow-lg cursor-pointer"
                  onClick={() => setSelectedImage(photo.url)}
                  whileHover={{ scale: 1.03 }}
                >
                  <div
                    className="relative bg-gray-200"
                    style={{
                      aspectRatio: '1',
                    }}
                  >
                    <Image
                      src={photo.url}
                      alt={photo.caption}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="text-white text-3xl"
                      >
                        🔍
                      </motion.div>
                    </div>
                  </div>

                  {/* Caption */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-sm font-medium">{photo.caption}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <NostalgicButton variant="primary" size="md">
            Share a Comment
          </NostalgicButton>
        </motion.div>
      </div>
    </div>
  );
}
