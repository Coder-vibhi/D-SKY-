import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import { 
  Code, Smartphone, Palette, Globe, 
  Users, Briefcase, Calculator, Shield,
  ArrowRight, Check, Star
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ServiceCardProps {
  service: {
    id: string;
    icon: LucideIcon;
    title: string;
    description: string;
    features: string[];
    color: string;
    gradient: string;
    image?: string;
  };
  index: number;
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    setTransform({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTransform({ rotateX: 0, rotateY: 0 });
  };

  return (
    <Link to={`/services/${service.id}`}>
      <motion.div
        ref={cardRef}
        className="service-card group relative h-full cursor-pointer"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <div className="relative p-8 bg-white/5 backdrop-blur-sm border border-white/10 h-full overflow-hidden flex flex-col">
          {/* Service Image Background */}
          <div className="absolute inset-0 z-0">
            <img 
              src={service.image || '/images/hero-tech.png'} 
              alt={service.title} 
              className="w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-500"
            />
          </div>

          {/* Gradient background overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 z-10`} />
          
          {/* Glow effect */}
          <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${service.gradient} rounded-full blur-[80px] opacity-0 group-hover:opacity-30 transition-opacity duration-500 z-10`} />

          {/* Icon */}
          <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 relative z-10`}>
            <service.icon className="w-8 h-8 text-white" />
          </div>

          {/* Content */}
          <h3 className="text-2xl font-display font-bold text-white mb-4 relative z-10">
            {service.title}
          </h3>
          <p className="text-white/50 font-body mb-6 relative z-10 flex-grow">
            {service.description}
          </p>

          {/* Features */}
          <ul className="space-y-2 mb-8 relative z-10">
            {service.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-white/40">
                <Check className="w-4 h-4 text-pink" />
                {feature}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="flex items-center gap-2 text-pink relative z-10">
            <span className="text-sm font-body font-medium">Explore</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.services-title',
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.services-title',
            start: 'top 85%',
            once: true
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const services = [
    {
      id: 'web-development',
      icon: Code,
      title: 'Web Development',
      description: 'Custom websites and web applications built with modern technologies for optimal performance and user experience.',
      features: ['React & Next.js', 'Node.js Backend', 'E-commerce Solutions', 'CMS Integration'],
      color: 'from-pink to-rose-500',
      gradient: 'from-pink/50 to-rose-500/50',
      image: '/images/web-dev.png'
    },
    {
      id: 'app-development',
      icon: Smartphone,
      title: 'App Development',
      description: 'Native and cross-platform mobile applications that deliver seamless experiences across all devices.',
      features: ['iOS & Android', 'React Native', 'Flutter', 'App Store Optimization'],
      color: 'from-purple-500 to-violet-500',
      gradient: 'from-purple-500/50 to-violet-500/50',
      image: '/images/app-dev.png'
    },
    {
      id: 'ui-ux-design',
      icon: Palette,
      title: 'UI/UX Design',
      description: 'User-centered design that combines aesthetics with functionality to create engaging digital experiences.',
      features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
      color: 'from-cyan-500 to-blue-500',
      gradient: 'from-cyan-500/50 to-blue-500/50',
      image: '/images/ui-ux.png'
    },
    {
      id: 'digital-marketing',
      icon: Globe,
      title: 'Digital Marketing',
      description: 'Strategic marketing solutions that increase visibility, drive traffic, and convert visitors into customers.',
      features: ['SEO Optimization', 'Social Media', 'Content Strategy', 'PPC Campaigns'],
      color: 'from-emerald-500 to-teal-500',
      gradient: 'from-emerald-500/50 to-teal-500/50',
      image: '/images/digital-marketing.png'
    },
    {
      id: 'staffing',
      icon: Users,
      title: 'IT Staffing',
      description: 'Flexible staffing solutions to help you find the right talent for your technology projects.',
      features: ['Contract Staffing', 'Permanent Placement', 'Team Augmentation', 'Skill Assessment'],
      color: 'from-amber-500 to-orange-500',
      gradient: 'from-amber-500/50 to-orange-500/50',
      image: '/images/hero-tech.png'
    },
    {
      id: 'bpo',
      icon: Briefcase,
      title: 'BPO Services',
      description: 'Business process outsourcing that helps you streamline operations and reduce costs.',
      features: ['Customer Support', 'Data Entry', 'Back Office', 'Technical Support'],
      color: 'from-red-500 to-pink',
      gradient: 'from-red-500/50 to-pink/50',
      image: '/images/hero-tech.png'
    },
    {
      id: 'insurance',
      icon: Shield,
      title: 'Insurance Solutions',
      description: 'Technology solutions tailored for the insurance industry to improve efficiency and customer service.',
      features: ['Policy Management', 'Claims Processing', 'CRM Solutions', 'Data Analytics'],
      color: 'from-indigo-500 to-purple-500',
      gradient: 'from-indigo-500/50 to-purple-500/50',
      image: '/images/hero-tech.png'
    },
    {
      id: 'financial',
      icon: Calculator,
      title: 'Financial Services',
      description: 'Digital transformation solutions for financial institutions to stay competitive in the modern market.',
      features: ['Fintech Solutions', 'Payment Gateways', 'Risk Management', 'Compliance'],
      color: 'from-green-500 to-emerald-500',
      gradient: 'from-green-500/50 to-emerald-500/50',
      image: '/images/hero-tech.png'
    }
  ];

  return (
    <main ref={sectionRef} className="relative pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-950 to-black" />
        
        {/* Animated orbs */}
        <motion.div
          className="absolute top-1/3 left-1/4 w-96 h-96 bg-pink/10 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 100, 0],
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -50, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, delay: 2 }}
        />

        <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 py-20">
          <div className="max-w-4xl">
            <motion.span 
              className="text-pink text-sm font-body tracking-[0.3em] uppercase"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              What We Offer
            </motion.span>
            
            <h1 className="services-title mt-6 text-5xl md:text-7xl lg:text-8xl font-display font-black text-white leading-none tracking-tighter">
              OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink via-purple-500 to-cyan-400">SERVICES</span>
            </h1>
            
            <motion.p 
              className="mt-8 text-xl text-white/60 font-body leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Comprehensive digital solutions tailored to your business needs. 
              From concept to deployment, we&apos;ve got you covered.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative py-24 bg-zinc-950">
        <div className="w-full px-6 md:px-12 lg:px-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
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
                Why Choose Us
              </motion.span>
              
              <motion.h2 
                className="mt-4 text-4xl md:text-5xl font-display font-black text-white mb-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                THE <span className="text-pink">D SKY</span> ADVANTAGE
              </motion.h2>

              <div className="space-y-6">
                {[
                  { icon: Star, title: 'Expert Team', desc: 'Skilled professionals with years of industry experience' },
                  { icon: Check, title: 'Quality Assurance', desc: 'Rigorous testing and quality control processes' },
                  { icon: Shield, title: 'Secure Solutions', desc: 'Enterprise-grade security for all our projects' },
                ].map((featureItem, index) => (
                  <motion.div
                    key={index}
                    className="flex gap-4"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                  >
                    <div className="w-12 h-12 rounded-lg bg-pink/20 flex items-center justify-center flex-shrink-0">
                      <featureItem.icon className="w-6 h-6 text-pink" />
                    </div>
                    <div>
                      <h4 className="text-lg font-display font-bold text-white">{featureItem.title}</h4>
                      <p className="text-white/50 font-body text-sm">{featureItem.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Visual */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="relative aspect-square">
                {/* Central circle */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-48 h-48 rounded-full bg-gradient-to-br from-pink to-purple-500 flex items-center justify-center"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  >
                    <div className="w-40 h-40 rounded-full bg-black flex items-center justify-center">
                      <span className="text-4xl font-display font-black text-white">D<span className="text-pink">.</span></span>
                    </div>
                  </motion.div>
                </div>

                {/* Orbiting elements */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-4 h-4 bg-pink rounded-full"
                    style={{
                      top: '50%',
                      left: '50%',
                    }}
                    animate={{
                      x: Math.cos(i * Math.PI / 3) * 150 - 8,
                      y: Math.sin(i * Math.PI / 3) * 150 - 8,
                    }}
                    transition={{
                      duration: 0,
                    }}
                  />
                ))}

                {/* Glow */}
                <div className="absolute inset-0 bg-pink/20 rounded-full blur-[100px]" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Services;
