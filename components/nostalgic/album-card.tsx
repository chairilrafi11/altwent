'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

interface AlbumCardProps {
  id: string;
  title: string;
  description?: string;
  coverImage?: string;
  eventDate?: Date;
  participantCount?: number;
}

export function AlbumCard({
  id,
  title,
  description,
  coverImage,
  eventDate,
  participantCount = 0,
}: AlbumCardProps) {
  return (
    <Link href={`/albums/${id}`}>
      <motion.div
        className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 shadow-lg cursor-pointer"
        style={{ aspectRatio: '3/4' }}
        whileHover={{ scale: 1.05, rotate: 2 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {/* Background image */}
        {coverImage && (
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-all duration-300" />

        {/* Grain texture */}
        <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <filter id="albumGrain">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#albumGrain)" opacity="0.05" />
          </svg>
        </div>

        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{title}</h3>
            
            {description && (
              <p className="text-sm text-gray-200 mb-3 line-clamp-2">{description}</p>
            )}

            <div className="flex items-center justify-between text-xs text-gray-300">
              {eventDate && (
                <span>{format(new Date(eventDate), 'MMM d, yyyy')}</span>
              )}
              {participantCount > 0 && (
                <span>{participantCount} friends</span>
              )}
            </div>
          </motion.div>
        </div>

        {/* Slight rotation indicator */}
        <div className="absolute top-4 right-4 text-3xl opacity-0 group-hover:opacity-100 transition-opacity">
          →
        </div>
      </motion.div>
    </Link>
  );
}
