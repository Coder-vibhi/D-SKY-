import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ExternalLink, Filter } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  color: string;
  tags: string[];
}

const projects: Project[] = [
  {
    id: 'ecommerce-platform',
    title: 'LuxEcommerce',
    category: 'Web Development',
    description: 'A premium e-commerce platform with advanced AI-powered product recommendations and seamless checkout experience.',
    image: '/images/project-1.jpg',
    color: 'from-pink to-rose-500',
    tags: ['React', 'Node.js', 'MongoDB', 'AI']
  },
  {
    id: 'fintech-app',
    title: 'FinFlow',
    category: 'App Development',
    description: 'Mobile banking application with real-time transactions, budget tracking, and investment management features.',
    image: '/images/project-2.jpg',
    color: 'from-purple-500 to-violet-500',
    tags: ['React Native', 'Firebase', 'Plaid API']
  },
  {
    id: 'healthcare-portal',
    title: 'MediConnect',
    category: 'Web Development',
    description: 'Healthcare patient portal with appointment scheduling, telemedicine, and electronic health records integration.',
    image: '/images/project-3.jpg',
    color: 'from-cyan-500 to-blue-500',
    tags: ['Next.js', 'TypeScript', 'HIPAA Compliant']
  },
  {
    id: 'brand-identity',
    title: 'Nova Brand',
    category: 'UI/UX Design',
    description: 'Complete brand identity and design system for a tech startup, including logo, website, and marketing materials.',
    image: '/images/project-4.jpg',
    color: 'from-emerald-500 to-teal-500',
    tags: ['Figma', 'Brand Strategy', 'Design System']
  },
  {
    id: 'real-estate-platform',
    title: 'EstatePro',
    category: 'Web Development',
    description: 'Real estate platform with virtual tours, property management, and advanced search capabilities.',
    image: '/images/project-5.jpg',
    color: 'from-amber-500 to-orange-500',
    tags: ['Vue.js', 'Three.js', 'Maps API']
  },
  {
    id: 'social-platform',
    title: 'ConnectHub',
    category: 'App Development',
    description: 'Social networking app with real-time messaging, content sharing, and community building features.',
    image: '/images/project-6.jpg',
    color: 'from-red-500 to-pink',
    tags: ['Flutter', 'WebSocket', 'AWS']
  }
];

const categories = ['All', 'Web Development', 'App Development', 'UI/UX Design'];

const Portfolio = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.portfolio-title',
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.portfolio-title',
            start: 'top 85%',
            once: true
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
              Our Work
            </motion.span>
            
            <h1 className="portfolio-title mt-6 text-5xl md:text-7xl lg:text-8xl font-display font-black text-white leading-none tracking-tighter">
              FEATURED <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink via-purple-500 to-cyan-400">PROJECTS</span>
            </h1>
            
            <motion.p 
              className="mt-8 text-xl text-white/60 font-body leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Explore our portfolio of innovative digital solutions that have helped businesses 
              transform and succeed in the digital landscape.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="relative py-8 bg-zinc-950 border-b border-white/5">
        <div className="w-full px-6 md:px-12 lg:px-20">
          <div className="flex flex-wrap items-center gap-4">
            <Filter className="w-5 h-5 text-pink" />
            {categories.map((category) => (
              <motion.button
                key={category}
                className={`px-6 py-2 font-body text-sm tracking-wide transition-all ${
                  activeCategory === category
                    ? 'bg-pink text-black'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                }`}
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="relative py-24 bg-zinc-950">
        <div className="w-full px-6 md:px-12 lg:px-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {filteredProjects.map((project, index) => (
                <Link key={project.id} to={`/portfolio/${project.id}`}>
                  <motion.div
                    className="group relative overflow-hidden cursor-pointer"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    {/* Image Container */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900">
                      {/* Project Image */}
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Placeholder gradient overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 group-hover:opacity-10 transition-opacity`} />
                      
                      {/* Project number */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="text-6xl font-display font-black text-white/10">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>

                      {/* Hover overlay */}
                      <motion.div
                        className="absolute inset-0 bg-black/80 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          className="w-16 h-16 rounded-full bg-pink flex items-center justify-center"
                          initial={{ scale: 0 }}
                          animate={{ scale: hoveredProject === project.id ? 1 : 0 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                        >
                          <ExternalLink className="w-6 h-6 text-black" />
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="p-6 bg-white/5 border border-white/10 border-t-0">
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`px-3 py-1 text-xs font-body bg-gradient-to-r ${project.color} text-white rounded-full`}>
                          {project.category}
                        </span>
                      </div>
                      
                      <h3 className="text-2xl font-display font-bold text-white mb-2 group-hover:text-pink transition-colors">
                        {project.title}
                      </h3>
                      
                      <p className="text-white/50 font-body text-sm mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, i) => (
                          <span key={i} className="text-xs text-white/30 font-body">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-24 bg-black">
        <div className="w-full px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '150+', label: 'Projects Delivered' },
              { value: '98%', label: 'Client Satisfaction' },
              { value: '50+', label: 'Happy Clients' },
              { value: '8+', label: 'Years Experience' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl md:text-6xl font-display font-black text-pink mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-white/50 font-body uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink/20 via-purple-500/10 to-cyan-500/20" />
        
        <div className="relative z-10 w-full px-6 md:px-12 lg:px-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              className="text-4xl md:text-5xl font-display font-black text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              HAVE A PROJECT IN <span className="text-pink">MIND?</span>
            </motion.h2>
            <motion.p 
              className="text-lg text-white/60 font-body mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Let&apos;s collaborate to bring your vision to life. We&apos;re ready to create something extraordinary for you.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link to="/contact">
                <motion.button
                  className="px-10 py-5 bg-pink text-black font-display font-bold text-lg tracking-wide flex items-center gap-3"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  START A PROJECT
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Portfolio;
