import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.98 }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }}
    >
      {/* Transition overlay */}
      <motion.div
        className="fixed inset-0 z-[90] bg-pink pointer-events-none"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1]
        }}
        style={{ transformOrigin: 'top' }}
      />
      
      {/* Secondary overlay */}
      <motion.div
        className="fixed inset-0 z-[89] bg-purple-600 pointer-events-none"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.05
        }}
        style={{ transformOrigin: 'top' }}
      />

      {children}
    </motion.div>
  );
};

export default PageTransition;
