import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Target, Eye, Award, Users, Lightbulb, Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo('.about-title',
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-title',
            start: 'top 85%',
            once: true
          }
        }
      );

      // Content reveal
      gsap.fromTo('.about-content',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-content',
            start: 'top 80%',
            once: true
          }
        }
      );

      // Value cards
      gsap.fromTo('.value-card',
        { y: 80, opacity: 0, rotateX: 45 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.values-grid',
            start: 'top 80%',
            once: true
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To empower businesses with innovative technology solutions that drive growth, efficiency, and competitive advantage in the digital era.',
      color: 'from-pink to-rose-500'
    },
    {
      icon: Eye,
      title: 'Our Vision',
      description: 'To be the leading technology partner for businesses worldwide, known for delivering exceptional digital experiences and transformative solutions.',
      color: 'from-purple-500 to-violet-500'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We constantly push boundaries, embracing emerging technologies and creative approaches to solve complex challenges.',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We maintain the highest standards in everything we do, from code quality to client communication and project delivery.',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We believe in the power of teamwork, working closely with our clients to understand their needs and achieve shared goals.',
      color: 'from-amber-500 to-orange-500'
    },
    {
      icon: Rocket,
      title: 'Results-Driven',
      description: 'We focus on delivering measurable outcomes that positively impact our clients\' bottom line and business objectives.',
      color: 'from-red-500 to-pink'
    }
  ];

  const team = [
    { name: 'Rajesh Kumar', role: 'CEO & Founder', initials: 'RK' },
    { name: 'Priya Sharma', role: 'CTO', initials: 'PS' },
    { name: 'Amit Patel', role: 'Head of Design', initials: 'AP' },
    { name: 'Sneha Gupta', role: 'Project Manager', initials: 'SG' },
  ];

  return (
    <main ref={sectionRef} className="relative pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-black to-zinc-900" />
        
        {/* Animated orbs */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-pink/10 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />

        <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 py-20">
          <div className="max-w-5xl">
            <motion.span 
              className="text-pink text-sm font-body tracking-[0.3em] uppercase"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              About Us
            </motion.span>
            
            <h1 className="about-title mt-6 text-5xl md:text-7xl lg:text-8xl font-display font-black text-white leading-none tracking-tighter">
              WE ARE <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink via-purple-500 to-cyan-400">D SKY</span>
            </h1>
            
            <div className="about-content mt-8 max-w-2xl">
              <p className="text-xl text-white/70 font-body leading-relaxed">
                A team of passionate technologists, designers, and innovators dedicated to 
                transforming businesses through cutting-edge digital solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="relative py-24 bg-black">
        <div className="w-full px-6 md:px-12 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              <motion.span 
                className="text-pink text-sm font-body tracking-[0.3em] uppercase"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                Our Story
              </motion.span>
              
              <motion.h2 
                className="mt-4 text-4xl md:text-5xl font-display font-black text-white mb-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                BUILDING THE <span className="text-pink">FUTURE</span>
              </motion.h2>

              <div className="space-y-6 text-white/60 font-body leading-relaxed">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  Founded in 2016, D Sky Ventures Pvt Ltd began with a simple mission: to help 
                  businesses navigate the complex digital landscape and emerge as leaders in their industries.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  What started as a small team of three passionate developers has grown into a 
                  full-service digital agency with over 25 talented professionals. We&apos;ve delivered 
                  150+ projects across diverse industries, from startups to Fortune 500 companies.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  Our approach combines technical excellence with creative innovation. We don&apos;t just 
                  build websites and applications—we craft digital experiences that engage users, 
                  drive conversions, and create lasting brand impressions.
                </motion.p>
              </div>
            </div>

            {/* Right Side - Image and Stats Overlay */}
            <div className="relative">
              <motion.div
                className="relative aspect-square overflow-hidden mb-8"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                <img 
                  src="/images/team-work.png" 
                  alt="Our Team" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              </motion.div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '8+', label: 'Years' },
                  { value: '150+', label: 'Projects' },
                  { value: '50+', label: 'Clients' },
                  { value: '25+', label: 'Experts' },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="text-3xl font-display font-black text-pink mb-1">
                      {stat.value}
                    </div>
                    <div className="text-[10px] text-white/50 font-body uppercase tracking-widest">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative py-24 bg-zinc-950">
        <div className="w-full px-6 md:px-12 lg:px-20">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.span 
              className="text-pink text-sm font-body tracking-[0.3em] uppercase"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Our Values
            </motion.span>
            <motion.h2 
              className="mt-4 text-4xl md:text-6xl font-display font-black text-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              WHAT DRIVES <span className="text-pink">US</span>
            </motion.h2>
          </div>

          {/* Values Grid */}
          <div className="values-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="value-card group relative p-8 bg-white/5 backdrop-blur-sm border border-white/10 perspective-1000"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                {/* Icon */}
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${value.color} flex items-center justify-center mb-6`}>
                  <value.icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-display font-bold text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-white/50 font-body text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative py-24 bg-black">
        <div className="w-full px-6 md:px-12 lg:px-20">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.span 
              className="text-pink text-sm font-body tracking-[0.3em] uppercase"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Our Team
            </motion.span>
            <motion.h2 
              className="mt-4 text-4xl md:text-6xl font-display font-black text-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              MEET THE <span className="text-pink">LEADERS</span>
            </motion.h2>
          </div>

          {/* Team Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="group text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Avatar */}
                <div className="relative mx-auto w-32 h-32 mb-6">
                  <motion.div 
                    className="w-full h-full rounded-full bg-gradient-to-br from-pink to-purple-500 flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-2xl font-display font-bold text-white">
                      {member.initials}
                    </span>
                  </motion.div>
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-full bg-pink/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Info */}
                <h3 className="text-lg font-display font-bold text-white">
                  {member.name}
                </h3>
                <p className="text-pink text-sm font-body">
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
