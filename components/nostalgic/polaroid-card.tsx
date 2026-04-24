'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface PolaroidCardProps {
  image: string;
  caption?: string;
  rotation?: number;
  alt?: string;
  onClick?: () => void;
  hoverImage?: string;
  layoutId?: string;
}

export function PolaroidCard({
  image,
  caption,
  rotation = 0,
  alt = 'Memory photo',
  onClick,
  hoverImage,
  layoutId,
}: PolaroidCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layoutId={layoutId}
      onClick={onClick}
      className="cursor-pointer"
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div
        className="relative bg-white p-3 shadow-2xl rounded-sm"
        style={{
          transform: `rotate(${rotation}deg)`,
          width: '240px',
          aspectRatio: '3/4',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Grain overlay */}
        <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <filter id="grain">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise" />
              <feColorMatrix in="noise" type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#grain)" opacity="0.05" />
          </svg>
        </div>

        {/* Image container */}
        <div className="relative w-full h-4/5 overflow-hidden rounded-sm bg-gray-200">
          <motion.div
            animate={{ opacity: isHovered && hoverImage ? 0 : 1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src={image}
              alt={alt}
              fill
              className="object-cover"
              sizes="240px"
            />
          </motion.div>

          {hoverImage && (
            <motion.div
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Image
                src={hoverImage}
                alt="now"
                fill
                className="object-cover"
                sizes="240px"
              />
            </motion.div>
          )}
        </div>

        {/* Caption area (polaroid bottom) */}
        {caption && (
          <div className="mt-3 h-1/5 px-1">
            <p className="text-xs text-gray-700 font-marker italic truncate">{caption}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
