import { motion } from 'framer-motion';

const FloatingOrbs = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large pink orb */}
      <motion.div
        className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,115,195,0.15) 0%, transparent 70%)',
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Purple orb */}
      <motion.div
        className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, -50, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      {/* Cyan orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)',
        }}
        animate={{
          x: [0, 60, 0],
          y: [0, -40, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 4,
        }}
      />

      {/* Small floating orbs */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 rounded-full bg-pink/30"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + (i % 3) * 20}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingOrbs;
