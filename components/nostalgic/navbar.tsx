'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { NavbarProps } from '@/types';

export function NostalgicNavbar({ className = '' }: NavbarProps) {
  const navItems = [
    { label: 'Memories', href: '/' },
    { label: 'People', href: '/people' },
    { label: 'Albums', href: '/albums' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 ${className}`}
    >
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-md border-b border-white/20" />

      <div className="relative max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold text-primary"
          >
            10 Years Later
          </motion.div>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-8">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <motion.span
                whileHover={{ scale: 1.1 }}
                className="text-foreground hover:text-accent transition-colors font-medium text-sm"
              >
                {item.label}
              </motion.span>
            </Link>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
