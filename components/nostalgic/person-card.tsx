'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { User, PersonCardProps } from '@/types';

export function PersonCard({ user }: PersonCardProps) {
  return (
    <Link href={`/people/${user.id}`}>
      <motion.div
        className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 shadow-xl cursor-pointer"
        style={{ aspectRatio: '1' }}
        whileHover={{ scale: 1.08, rotate: -2 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {/* Image container */}
        <div className="absolute inset-0 overflow-hidden">
          {user.photoNow ? (
            <Image
              src={user.photoNow}
              alt={user.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/40 to-accent/40 flex items-center justify-center">
              <span className="text-4xl">👤</span>
            </div>
          )}
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Name label - always visible at bottom */}
        <motion.div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
          <h3 className="text-lg font-bold text-white">{user.name}</h3>
          {user.nickname && (
            <p className="text-sm text-white/80 italic">"{user.nickname}"</p>
          )}
        </motion.div>

        {/* Info popup on hover */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="absolute inset-0 p-4 flex flex-col justify-center items-center text-center bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <div className="text-white space-y-2">
            {user.zodiac && <p className="text-sm">♈ {user.zodiac}</p>}
            {user.hobby && <p className="text-sm">🎯 {user.hobby}</p>}
            {user.location && <p className="text-sm">📍 {user.location}</p>}
          </div>
        </motion.div>

        {/* Rotation indicator */}
        <div className="absolute top-3 right-3 text-2xl opacity-0 group-hover:opacity-100 transition-opacity">
          ↗
        </div>
      </motion.div>
    </Link>
  );
}
