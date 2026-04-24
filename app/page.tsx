'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FloatingParticles, NostalgicButton } from '@/components/nostalgic';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const navigationCards = [
    {
      title: 'Meet the People',
      description: 'See the faces behind the memories',
      href: '/people',
      emoji: '👥',
    },
    {
      title: 'Explore Memories',
      description: 'Browse through our shared moments',
      href: '/albums',
      emoji: '📸',
    },
    {
      title: 'Our Journey',
      description: 'From SMP 2016 to forever friends',
      href: '/timeline',
      emoji: '🌟',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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

  return (
    <div className="relative min-h-screen overflow-hidden">
      <FloatingParticles />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20">
        {/* Floating Polaroids Background */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-20 left-10"
            animate={{ y: [0, -20, 0], rotate: [-5, 0, -5] }}
            transition={{ repeat: Infinity, duration: 6 }}
          >
            <div className="w-32 h-40 bg-white rounded-sm shadow-2xl p-2 border border-gray-100">
              <div className="w-full h-32 bg-purple-300 rounded-sm" />
              <p className="text-xs mt-2 text-gray-600 text-center">summer 2016</p>
            </div>
          </motion.div>

          <motion.div
            className="absolute top-40 right-20"
            animate={{ y: [0, 15, 0], rotate: [8, 5, 8] }}
            transition={{ repeat: Infinity, duration: 5 }}
          >
            <div className="w-32 h-40 bg-white rounded-sm shadow-2xl p-2 border border-gray-100">
              <div className="w-full h-32 bg-pink-300 rounded-sm" />
              <p className="text-xs mt-2 text-gray-600 text-center">2016</p>
            </div>
          </motion.div>

          <motion.div
            className="absolute bottom-32 left-1/3"
            animate={{ y: [0, -15, 0], rotate: [-3, 2, -3] }}
            transition={{ repeat: Infinity, duration: 7 }}
          >
            <div className="w-32 h-40 bg-white rounded-sm shadow-2xl p-2 border border-gray-100">
              <div className="w-full h-32 bg-blue-300 rounded-sm" />
              <p className="text-xs mt-2 text-gray-600 text-center">memories</p>
            </div>
          </motion.div>
        </div>

        {/* Main Content */}
        <motion.div
          className="relative z-10 text-center max-w-3xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <h1 className="text-6xl md:text-7xl font-black mb-4 text-primary leading-tight">
              10 Years Later
            </h1>
          </motion.div>

          <motion.div variants={itemVariants}>
            <p className="text-2xl md:text-3xl text-gray-700 font-semibold mb-6 italic">
              From SMP 2016 to forever friends
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-12">
            <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-xl mx-auto">
              A decade has passed since those middle school days, but the memories remain vivid—
              the inside jokes, the late-night talks, the adventures we shared. This is our digital
              yearbook celebrating a friendship that has only grown stronger.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/people">
              <NostalgicButton size="lg" variant="primary">
                Enter Memories <ArrowRight className="ml-2 inline w-5 h-5" />
              </NostalgicButton>
            </Link>
            <Link href="/albums">
              <NostalgicButton size="lg" variant="secondary">
                View Albums
              </NostalgicButton>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Navigation Cards Section */}
      <section className="relative py-20 px-4">
        <motion.div
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800"
          >
            Explore Our Story
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {navigationCards.map((card) => (
              <Link key={card.href} href={card.href}>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  className="group relative h-full"
                >
                  <div className="relative p-8 h-full rounded-2xl bg-gradient-to-br from-white/80 to-white/50 backdrop-blur-md border-2 border-white/60 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer">
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-primary/10 to-accent/10 transition-opacity duration-300" />

                    {/* Content */}
                    <div className="relative z-10 space-y-4">
                      <div className="text-5xl">{card.emoji}</div>
                      <h3 className="text-2xl font-bold text-gray-800 group-hover:text-primary transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-gray-600 group-hover:text-gray-700">{card.description}</p>
                    </div>

                    {/* Arrow indicator */}
                    <motion.div
                      className="absolute bottom-4 right-4 text-2xl opacity-0 group-hover:opacity-100"
                      whileHover={{ x: 5 }}
                    >
                      →
                    </motion.div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Footer Stats */}
      <section className="relative py-12 px-4 bg-white/40 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid grid-cols-3 gap-4 text-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <p className="text-3xl font-bold text-primary">10+</p>
              <p className="text-gray-600">Years of Friendship</p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <p className="text-3xl font-bold text-accent">∞</p>
              <p className="text-gray-600">Memories</p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <p className="text-3xl font-bold text-primary">👥</p>
              <p className="text-gray-600">Together Forever</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
