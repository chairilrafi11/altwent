'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FloatingParticles, NostalgicButton } from '@/components/nostalgic';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { NavigationCard } from '@/types';

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const navigationCards: NavigationCard[] = [
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

  const floatingVariants = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
      },
    },
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <FloatingParticles />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20">
        {/* Animated background elements */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          {/* Floating Sparkles */}
          <motion.div
            className="absolute top-1/4 left-10"
            animate={{ 
              y: [0, -20, 0],
              x: [0, 10, 0],
            }}
            transition={{ repeat: Infinity, duration: 5 }}
          >
            <Sparkles className="w-8 h-8 text-primary/30" />
          </motion.div>
          
          <motion.div
            className="absolute bottom-1/3 right-20"
            animate={{ 
              y: [0, 20, 0],
              x: [0, -10, 0],
            }}
            transition={{ repeat: Infinity, duration: 6, delay: 1 }}
          >
            <Heart className="w-6 h-6 text-primary/20" />
          </motion.div>
        </motion.div>

        {/* Floating Polaroids Background */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-20 left-10"
            animate={{ y: [0, -20, 0], rotate: [-5, 0, -5] }}
            transition={{ repeat: Infinity, duration: 6 }}
          >
            <div className="w-32 h-40 bg-white rounded-sm shadow-2xl p-2 border border-gray-100 hover:shadow-3xl">
              <div className="w-full h-32 bg-secondary rounded-sm" />
              <p className="text-xs mt-2 text-gray-600 text-center">summer 2016</p>
            </div>
          </motion.div>

          <motion.div
            className="absolute top-40 right-20"
            animate={{ y: [0, 15, 0], rotate: [8, 5, 8] }}
            transition={{ repeat: Infinity, duration: 5 }}
          >
            <div className="w-32 h-40 bg-white rounded-sm shadow-2xl p-2 border border-gray-100">
              <div className="w-full h-32 bg-secondary rounded-sm" />
              <p className="text-xs mt-2 text-gray-600 text-center">2016</p>
            </div>
          </motion.div>

          <motion.div
            className="absolute bottom-32 left-1/3"
            animate={{ y: [0, -15, 0], rotate: [-3, 2, -3] }}
            transition={{ repeat: Infinity, duration: 7 }}
          >
            <div className="w-32 h-40 bg-white rounded-sm shadow-2xl p-2 border border-gray-100">
              <div className="w-full h-32 bg-secondary rounded-sm" />
              <p className="text-xs mt-2 text-gray-600 text-center">memories</p>
            </div>
          </motion.div>

          {/* Additional floating elements */}
          <motion.div
            className="absolute top-1/2 right-1/4"
            animate={{ y: [0, -25, 0], opacity: [0.5, 0.8, 0.5] }}
            transition={{ repeat: Infinity, duration: 8, delay: 1 }}
          >
            <div className="text-4xl">✨</div>
          </motion.div>

          <motion.div
            className="absolute bottom-1/4 right-1/3"
            animate={{ y: [0, 20, 0], opacity: [0.3, 0.7, 0.3] }}
            transition={{ repeat: Infinity, duration: 6, delay: 2 }}
          >
            <div className="text-3xl">💫</div>
          </motion.div>
        </div>

        {/* Main Content */}
        <motion.div
          className="relative z-10 text-center max-w-3xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            variants={itemVariants}
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 4, delay: 0.5 }}
          >
            <h1 className="text-6xl md:text-7xl font-black mb-4 text-primary leading-tight">
              10 Years Later
            </h1>
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.p 
              className="text-2xl md:text-3xl text-gray-700 font-semibold mb-6 italic"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ repeat: Infinity, duration: 3, delay: 1 }}
            >
              From SMP 2016 to forever friends
            </motion.p>
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
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setHoveredCard('people')}
                onHoverEnd={() => setHoveredCard(null)}
              >
                <NostalgicButton size="lg" variant="primary">
                  <motion.span
                    animate={hoveredCard === 'people' ? { x: [0, 5, 0] } : {}}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                  >
                    Enter Memories <ArrowRight className="ml-2 inline w-5 h-5" />
                  </motion.span>
                </NostalgicButton>
              </motion.div>
            </Link>
            <Link href="/albums">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <NostalgicButton size="lg" variant="secondary">
                  View Albums
                </NostalgicButton>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Navigation Cards Section */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
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
            <motion.span
              animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Explore Our Story
            </motion.span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {navigationCards.map((card, idx) => (
              <Link key={card.href} href={card.href}>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.08, rotate: 3, y: -10 }}
                  onMouseEnter={() => setHoveredCard(card.href)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="group relative h-full cursor-pointer"
                >
                  {/* Animated background glow */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 blur-xl opacity-0 group-hover:opacity-100"
                    animate={hoveredCard === card.href ? { scale: 1.1 } : { scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  <div className="relative p-8 h-full rounded-2xl bg-white/80 backdrop-blur-md border-2 border-white/60 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                    {/* Animated gradient overlay */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-primary/10 to-accent/10 transition-opacity duration-300"
                      animate={hoveredCard === card.href ? { opacity: 1 } : { opacity: 0 }}
                    />

                    {/* Content */}
                    <div className="relative z-10 space-y-4">
                      <motion.div
                        className="text-5xl inline-block"
                        animate={hoveredCard === card.href ? { scale: 1.3, rotate: 20 } : { scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                      >
                        {card.emoji}
                      </motion.div>

                      <h3 className="text-2xl font-bold text-gray-800 group-hover:text-primary transition-colors">
                        {card.title}
                      </h3>

                      <p className="text-gray-600 group-hover:text-gray-700">{card.description}</p>

                      {/* Animated line */}
                      <motion.div
                        className="h-1 w-0 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300"
                        animate={hoveredCard === card.href ? { width: '100%' } : { width: '0%' }}
                      />
                    </div>

                    {/* Animated arrow indicator */}
                    <motion.div
                      className="absolute bottom-4 right-4 text-2xl"
                      animate={hoveredCard === card.href ? { x: [0, 10, 0], opacity: 1 } : { opacity: 0.3 }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
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
      <section className="relative py-12 px-4 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid grid-cols-3 gap-4 text-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.1, y: -10 }}
              className="group p-6 rounded-xl hover:bg-white/40 transition-all"
            >
              <motion.p 
                animate={{ 
                  scale: [0.9, 1, 0.9],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-3xl md:text-4xl font-bold text-primary group-hover:text-accent transition-colors"
              >
                10+
              </motion.p>
              <p className="text-gray-600 mt-2">Years of Friendship</p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.1, y: -10 }}
              className="group p-6 rounded-xl hover:bg-white/40 transition-all"
            >
              <motion.p
                animate={{ 
                  rotate: [0, 10, -10, 0],
                }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="text-3xl md:text-4xl font-bold text-primary group-hover:text-accent transition-colors"
              >
                ∞
              </motion.p>
              <p className="text-gray-600 mt-2">Memories</p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.1, y: -10 }}
              className="group p-6 rounded-xl hover:bg-white/40 transition-all"
            >
              <motion.p
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                className="text-3xl md:text-4xl font-bold text-primary group-hover:text-accent transition-colors"
              >
                👥
              </motion.p>
              <p className="text-gray-600 mt-2">Together Forever</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
