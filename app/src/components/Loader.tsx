import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Loader = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Logo animation
      gsap.fromTo(logoRef.current,
        { scale: 0.5, opacity: 0, rotateY: -180 },
        { scale: 1, opacity: 1, rotateY: 0, duration: 1, ease: 'power3.out' }
      );

      // Progress bar animation
      gsap.fromTo(progressRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 2.5, ease: 'power2.inOut', delay: 0.5 }
      );

      // Text reveal
      gsap.fromTo(textRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.8, ease: 'power3.out' }
      );

      // Glitch effect on logo
      gsap.to(logoRef.current, {
        x: 'random(-3, 3)',
        y: 'random(-3, 3)',
        duration: 0.1,
        repeat: 20,
        yoyo: true,
        ease: 'none',
        delay: 1.5
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255,115,195,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,115,195,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500/20 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Logo */}
      <div 
        ref={logoRef}
        className="relative z-10 perspective-1000"
      >
        <div className="text-6xl md:text-8xl font-display font-black text-white tracking-tighter">
          D SKY<span className="text-pink">.</span>
        </div>
        <div className="text-sm md:text-base font-body text-white/60 tracking-[0.3em] uppercase mt-2 text-center">
          Ventures Pvt Ltd
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-12 w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
        <div 
          ref={progressRef}
          className="h-full bg-gradient-to-r from-pink via-purple-500 to-pink origin-left"
        />
      </div>

      {/* Loading text */}
      <div 
        ref={textRef}
        className="mt-6 text-white/40 text-xs font-body tracking-[0.2em] uppercase"
      >
        Loading Experience
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {[...Array(3)].map((_, i) => (
          <div 
            key={i}
            className="w-2 h-2 bg-pink/60 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
};

export default Loader;
