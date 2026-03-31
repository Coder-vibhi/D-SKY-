import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Globe, Code } from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';
import FloatingOrbs from '../components/FloatingOrbs';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo('.hero-title-line',
        { y: 100, opacity: 0, rotateX: -90 },
        { 
          y: 0, 
          opacity: 1, 
          rotateX: 0,
          duration: 1.2, 
          stagger: 0.2,
          ease: 'power3.out',
          delay: 0.5
        }
      );

      gsap.fromTo('.hero-subtitle',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 1 }
      );

      gsap.fromTo('.hero-cta',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 1.2 }
      );

      // Stats counter animation
      const statTriggers = ScrollTrigger.batch('.stat-number', {
        onEnter: (elements) => {
          elements.forEach((el) => {
            const target = parseInt(el.getAttribute('data-target') || '0');
            gsap.fromTo(el,
              { innerText: 0 },
              {
                innerText: target,
                duration: 2,
                snap: { innerText: 1 },
                ease: 'power2.out'
              }
            );
          });
        },
        once: true
      });

      // Service cards animation
      gsap.fromTo('.service-card',
        { y: 80, opacity: 0, rotateY: -15 },
        {
          y: 0,
          opacity: 1,
          rotateY: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: servicesRef.current,
            start: 'top 80%',
            once: true
          }
        }
      );

      return () => {
        statTriggers.forEach(t => t.kill());
      };
    });

    return () => ctx.revert();
  }, []);

  const stats = [
    { value: 150, suffix: '+', label: 'Projects Delivered' },
    { value: 50, suffix: '+', label: 'Happy Clients' },
    { value: 8, suffix: '+', label: 'Years Experience' },
    { value: 25, suffix: '+', label: 'Team Members' },
  ];

  const services = [
    {
      icon: Code,
      title: 'Web Development',
      description: 'Custom websites and web applications built with cutting-edge technologies.',
      color: 'from-pink to-rose-500'
    },
    {
      icon: Zap,
      title: 'App Development',
      description: 'Native and cross-platform mobile apps for iOS and Android.',
      color: 'from-purple-500 to-violet-500'
    },
    {
      icon: Sparkles,
      title: 'UI/UX Design',
      description: 'Stunning user interfaces and experiences that captivate users.',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      icon: Globe,
      title: 'Digital Marketing',
      description: 'Strategic digital marketing solutions to grow your brand.',
      color: 'from-emerald-500 to-teal-500'
    }
  ];

  return (
    <main className="relative">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* 3D Particle Background */}
        <ParticleBackground />
        <FloatingOrbs />

        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero-tech.png" 
            alt="Tech Background" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px'
          }} />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 pt-20">
          <div className="max-w-6xl mx-auto">
            {/* Badge */}
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="w-2 h-2 bg-pink rounded-full animate-pulse" />
              <span className="text-sm text-white/70 font-body">Innovating Tomorrow&apos;s Technology</span>
            </motion.div>

            {/* Main Title */}
            <div className="perspective-1000">
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-black text-white leading-none tracking-tighter">
                <div className="hero-title-line overflow-hidden">
                  <span className="block">WE BUILD</span>
                </div>
                <div className="hero-title-line overflow-hidden">
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink via-purple-500 to-cyan-400">
                    DIGITAL
                  </span>
                </div>
                <div className="hero-title-line overflow-hidden">
                  <span className="block">REALITY</span>
                </div>
              </h1>
            </div>

            {/* Subtitle */}
            <p className="hero-subtitle mt-8 text-lg md:text-xl text-white/60 max-w-xl font-body leading-relaxed">
              D Sky Ventures Pvt Ltd transforms visionary ideas into powerful digital solutions. 
              We craft exceptional experiences that drive business growth.
            </p>

            {/* CTA Buttons */}
            <div className="hero-cta flex flex-wrap gap-4 mt-10">
              <Link to="/contact">
                <motion.button
                  className="group px-8 py-4 bg-pink text-black font-display font-bold tracking-wide flex items-center gap-3"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  START PROJECT
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              <Link to="/portfolio">
                <motion.button
                  className="px-8 py-4 border border-white/30 text-white font-display font-bold tracking-wide hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  VIEW WORK
                </motion.button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs text-white/40 tracking-widest uppercase">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-pink to-transparent" />
        </motion.div>
      </section>

      {/* Stats Section */}
      <section 
        ref={statsRef}
        className="relative py-24 bg-gradient-to-b from-black to-zinc-950"
      >
        <div className="w-full px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl md:text-6xl font-display font-black text-white">
                  <span className="stat-number" data-target={stat.value}>0</span>
                  <span className="text-pink">{stat.suffix}</span>
                </div>
                <div className="mt-2 text-sm text-white/50 font-body uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section 
        ref={servicesRef}
        className="relative py-32 bg-zinc-950"
      >
        <div className="w-full px-6 md:px-12 lg:px-20">
          {/* Section Header */}
          <div className="max-w-3xl mb-16">
            <motion.span 
              className="text-pink text-sm font-body tracking-[0.3em] uppercase"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Our Services
            </motion.span>
            <motion.h2 
              className="mt-4 text-4xl md:text-6xl font-display font-black text-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              WHAT WE <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink to-purple-500">DO BEST</span>
            </motion.h2>
          </div>

          {/* Service Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Link key={index} to="/services">
                <motion.div
                  className="service-card group relative p-8 bg-white/5 backdrop-blur-sm border border-white/10 h-full cursor-pointer"
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Gradient border on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6`}>
                    <service.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-display font-bold text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-white/50 font-body text-sm leading-relaxed">
                    {service.description}
                  </p>

                  {/* Arrow */}
                  <div className="mt-6 flex items-center gap-2 text-pink opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm font-body">Learn More</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        ref={ctaRef}
        className="relative py-32 overflow-hidden"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink/20 via-purple-500/10 to-cyan-500/20" />
        
        {/* Animated shapes */}
        <motion.div
          className="absolute top-1/2 left-1/4 w-64 h-64 bg-pink/20 rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <div className="relative z-10 w-full px-6 md:px-12 lg:px-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              READY TO <span className="text-pink">TRANSFORM</span> YOUR BUSINESS?
            </motion.h2>
            <motion.p 
              className="text-lg text-white/60 font-body mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Let&apos;s collaborate to bring your vision to life. Our team of experts is ready to create something extraordinary for you.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link to="/contact">
                <motion.button
                  className="px-10 py-5 bg-pink text-black font-display font-bold text-lg tracking-wide"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  LET&apos;S TALK
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
