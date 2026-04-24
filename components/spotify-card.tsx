'use client';

import { Music } from 'lucide-react';
import { motion } from 'framer-motion';

interface SpotifyCardProps {
  spotifyTrackUrl?: string;
}

export function SpotifyCard({ spotifyTrackUrl }: SpotifyCardProps) {
  if (!spotifyTrackUrl) return null;
  const trackId = spotifyTrackUrl.split('/track/')[1]?.split('?')[0];

  if (!trackId) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="mb-12"
    >
      <div className="flex items-center gap-3 mb-6">
        <Music className="w-6 h-6 text-green-500" />
        <h2 className="text-2xl font-bold text-gray-800">🎵 Spotify Track</h2>
      </div>

      <div className="rounded-2xl overflow-hidden shadow-lg bg-white/60 backdrop-blur-md border border-green-200/50 p-6">
        <iframe
          src={`https://open.spotify.com/embed/track/${trackId}`}
          width="100%"
          height="352"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="rounded-lg"
        />
      </div>
    </motion.div>
  );
}
