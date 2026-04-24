'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { NostalgicButton } from '@/components/nostalgic';
import { SpotifyCard } from '@/components/spotify-card';
import { ArrowLeft, Heart, MapPin, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useState, use, useEffect } from 'react';
import type { ProfilePageProps, UserWithRelations } from '@/types';

export default function ProfilePage({ params }: ProfilePageProps) {
  const { id } = use(params);
  const [likes, setLikes] = useState(0);
  const [profile, setProfile] = useState<UserWithRelations | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/users/${id}`);
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 20 },
    },
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600 mb-6">Profile not found.</p>
        <Link href="/people">
          <NostalgicButton variant="primary" size="md">
            Back to People
          </NostalgicButton>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link href="/people">
            <div className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to People</span>
            </div>
          </Link>
        </motion.div>

        {/* Hero Section with Then vs Now */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-12"
        >
          {/* Name Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-black mb-2 text-primary">
              {profile.name}
            </h1>
            <p className="text-2xl text-accent italic font-semibold">" { profile.nickname}"</p>
          </motion.div>

          {/* Then vs Now Photos */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
          >
            {/* Then */}
            {profile.photoThen && (
              <div className="group relative rounded-2xl overflow-hidden shadow-xl">
                <div className="aspect-square relative">
                  <Image
                    src={profile.photoThen}
                    alt="Then - 2016"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-sm font-semibold">2016</p>
                    <p className="text-xs opacity-80">The Beginning</p>
                  </div>
                </div>
              </div>
            )}

            {/* Now */}
            {profile.photoNow && (
              <div className="group relative rounded-2xl overflow-hidden shadow-xl">
                <div className="aspect-square relative">
                  <Image
                    src={profile.photoNow}
                    alt="Now - 2026"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-sm font-semibold">2026</p>
                    <p className="text-xs opacity-80">Still Growing</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Info Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5">
              <p className="text-xs text-primary font-semibold mb-1">Zodiac</p>
              <p className="text-lg font-bold text-primary">{profile.zodiac}</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5">
              <p className="text-xs text-accent font-semibold mb-1">Hobby</p>
              <p className="text-lg font-bold text-accent">{profile.hobby}</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5">
              <p className="text-xs text-foreground/70 font-semibold mb-1">Fave Food</p>
              <p className="text-lg font-bold text-foreground">{profile.favoriteFood}</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-accent/5 to-primary/5">
              <div className="flex items-center gap-1 mb-1">
                <MapPin className="w-3 h-3 text-accent" />
                <p className="text-xs text-accent font-semibold">Location</p>
              </div>
              <p className="text-sm font-bold text-foreground">{profile.location}</p>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            variants={itemVariants}
            className="p-6 rounded-2xl bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-md border border-white/40 mb-12"
          >
            <p className="text-gray-700 text-lg leading-relaxed italic">"{profile.bio}"</p>
          </motion.div>

          {/* Personal Quote */}
          <motion.div
            variants={itemVariants}
            className="p-8 rounded-2xl bg-primary/5 border-2 border-primary/20 mb-12 relative"
          >
            <Sparkles className="absolute top-4 right-4 w-6 h-6 text-accent opacity-50" />
            <p className="text-center text-lg md:text-xl text-foreground font-semibold leading-relaxed">
              {profile.personalQuote || 'A cherished friend in our memories'}
            </p>
          </motion.div>

          {/* Spotify Track */}
          <SpotifyCard spotifyTrackUrl={profile.spotifyTrackUrl} />

          {/* Photo Gallery */}
          {profile.photos && profile.photos.length > 0 && (
            <motion.div variants={itemVariants} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">📸 Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {profile.photos.map((photo, idx) => (
                  <motion.div
                    key={photo.id}
                    className="relative aspect-square rounded-xl overflow-hidden shadow-lg group cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Image
                      src={photo.url}
                      alt={photo.caption || `Photo ${idx}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    {photo.caption && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                        {photo.caption}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              onClick={() => setLikes(likes + 1)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-red-100 to-pink-100 hover:from-red-200 hover:to-pink-200 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart className="w-5 h-5 text-red-500" fill="currentColor" />
              <span className="font-semibold text-red-600">{likes}</span>
            </motion.button>
            <NostalgicButton variant="primary" size="md">
              Send a Message
            </NostalgicButton>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}