'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X, Users, Camera } from 'lucide-react';
import Link from 'next/link';
import { NostalgicButton } from '@/components/nostalgic';
import { useState, useEffect, use } from 'react';
import type { Album, Photo, AlbumDetailPageProps } from '@/types';

export default function AlbumDetailPage({ params }: AlbumDetailPageProps) {
  // Me-unwrap params menggunakan React 'use' hook
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [album, setAlbum] = useState<Album | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const response = await fetch(`/api/albums/${id}`);
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setAlbum(data);
      } catch (error) {
        console.error('Failed to fetch album:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlbum();
  }, [id]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-500 animate-pulse">Loading memory lane...</p>
        </div>
      </div>
    );
  }

  if (!album) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600 mb-6">Album was not found.</p>
        <Link href="/albums">
          <NostalgicButton variant="primary" size="md">
            Return to Gallery
          </NostalgicButton>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 md:py-20 px-4 bg-[#faf9f6]">
      {/* Modal - Menggunakan AnimatePresence agar transisinya smooth */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative w-full max-w-5xl aspect-square md:aspect-video"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Full size view"
                fill
                className="object-contain"
                priority
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              >
                <X size={32} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link href="/albums" className="group inline-flex items-center gap-2 text-gray-500 hover:text-black mb-10 transition-all">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Albums</span>
        </Link>

        {/* Header */}
        <header className="mb-12">
          <motion.h1 
            className="text-5xl md:text-7xl font-black mb-4 text-gray-900 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {album.title}
          </motion.h1>
          {album.eventDate && (
            <p className="text-xl text-gray-500">
              {new Date(album.eventDate).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          )}
        </header>

        {/* Story Section */}
        {album.description && (
          <motion.section
            className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-lg text-gray-700 leading-relaxed italic border-l-4 border-gray-200 pl-4">{album.description}</p>
          </motion.section>
        )}

        {/* Participants */}
        <section className="mb-16">
          <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">
            <Users size={16} /> In this album
          </h3>
          <div className="flex flex-wrap gap-3">
            {album.participants?.map((p) => (
              <Link key={p.user?.id || p.id} href={`/people/${p.user?.id || p.id}`}>
                <motion.div
                  className="px-5 py-2 rounded-full bg-white border border-gray-200 shadow-sm hover:border-black transition-colors text-gray-700 cursor-pointer"
                  whileHover={{ y: -2 }}
                >
                  {p.user?.name}
                </motion.div>
              </Link>
            ))}
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="mb-20">
          <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 mb-8">
            <Camera /> Gallery
          </h2>

          <motion.div 
            className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {album.photos?.map((item: any) => {
              const photo: Photo = item.photo || item;
              return (
                <motion.div
                  key={photo.id}
                  variants={itemVariants}
                  className="break-inside-avoid"
                >
                  <div
                    className="group relative rounded-2xl overflow-hidden bg-gray-100 cursor-zoom-in"
                    onClick={() => setSelectedImage(photo.url)}
                  >
                    <Image
                      src={photo.url}
                      alt={photo.caption || 'Album photo'}
                      width={600}
                      height={800}
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    
                    {/* Overlay on Hover */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      {photo.caption && (
                        <p className="text-white text-sm font-medium transform translate-y-2 group-hover:translate-y-0 transition-transform">
                          {photo.caption}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* Footer Action */}
        <footer className="text-center py-10 border-t border-gray-100">
          <NostalgicButton variant="primary" size="md">
            Share a Comment
          </NostalgicButton>
        </footer>
      </div>
    </div>
  );
}