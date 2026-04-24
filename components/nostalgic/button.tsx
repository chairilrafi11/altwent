'use client';

import { motion, MotionProps } from 'framer-motion';
import React from 'react';

interface NostalgicButtonProps extends React.PropsWithChildren {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const variantStyles = {
  primary:
    'bg-primary text-primary-foreground hover:shadow-lg',
  secondary:
    'bg-white/80 backdrop-blur-sm text-foreground border-2 border-primary hover:border-accent',
  ghost: 'bg-transparent text-foreground hover:bg-white/30',
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export const NostalgicButton = React.forwardRef<
  HTMLButtonElement,
  NostalgicButtonProps
>(
  (
    {
      variant = 'primary',
      size = 'md',
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        className={`
          rounded-full font-semibold transition-all duration-300
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${className}
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

NostalgicButton.displayName = 'NostalgicButton';
