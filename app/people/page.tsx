'use client';

import { motion } from 'framer-motion';
import { PersonCard } from '@/components/nostalgic';
import { useEffect, useState } from 'react';

interface User {
  id: string;
  name: string;
  nickname?: string;
  photoNow?: string;
  photoThen?: string;
  location?: string;
  zodiac?: string;
  hobby?: string;
  bio?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default function PeoplePage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
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

  // Mock data for demonstration
  const mockUsers = [
    {
      id: '1',
      name: 'Chairil',
      nickname: 'The Storyteller',
      photoNow: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      location: 'Jakarta',
      zodiac: '♏',
      hobby: 'Photography',
      bio: 'Capturing moments through a lens',
    },
    {
      id: '2',
      name: 'Rara',
      nickname: 'Forever Cheerful',
      photoNow: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      location: 'Bandung',
      zodiac: '♌',
      hobby: 'Singing',
      bio: 'Spreading joy wherever I go',
    },
    {
      id: '3',
      name: 'Dita',
      nickname: 'The Adventurer',
      photoNow: 'https://images.unsplash.com/photo-1517070213202-1e1b37765cbd?w=400&h=400&fit=crop',
      location: 'Surabaya',
      zodiac: '♐',
      hobby: 'Traveling',
      bio: 'Always seeking new adventures',
    },
    {
      id: '4',
      name: 'Aisya',
      nickname: 'The Artist',
      photoNow: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      location: 'Yogyakarta',
      zodiac: '♎',
      hobby: 'Drawing',
      bio: 'Creating beauty through art',
    },
  ];

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
            Meet the People
          </h1>
          <p className="text-xl text-gray-600">
            The faces behind the memories we cherish
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {mockUsers.map((user, index) => (
            <motion.div key={user.id} variants={itemVariants}>
              <PersonCard user={user} />
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
            💝 More friends coming soon! Each profile will show their then vs now transformation,
            personal stories, and shared memories from 2016 to 2026.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
