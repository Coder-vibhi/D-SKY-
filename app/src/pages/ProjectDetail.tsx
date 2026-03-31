import { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowLeft, ExternalLink, Zap,
  Target, Calendar, Users
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projectData: Record<string, {
  title: string;
  category: string;
  description: string;
  longDescription: string;
  challenge: string;
  solution: string;
  results: string[];
  technologies: string[];
  timeline: string;
  team: string;
  client: string;
  color: string;
  gradient: string;
}> = {
  'ecommerce-platform': {
    title: 'LuxEcommerce',
    category: 'Web Development',
    description: 'A premium e-commerce platform with advanced AI-powered product recommendations.',
    longDescription: 'LuxEcommerce is a cutting-edge e-commerce platform designed for luxury brands. The platform combines elegant design with powerful functionality, offering a seamless shopping experience that rivals the biggest names in online retail.',
    challenge: 'The client needed a sophisticated e-commerce solution that could handle high-end product catalogs while providing personalized shopping experiences. They wanted to stand out in the competitive luxury market with unique features and exceptional performance.',
    solution: 'We built a custom e-commerce platform using React and Node.js, integrated with AI-powered recommendation engines. The solution includes advanced search, virtual try-on features, and a seamless checkout process optimized for conversions.',
    results: [
      '40% increase in conversion rates',
      '60% reduction in cart abandonment',
      '3x increase in average order value',
      '99.9% uptime achieved',
      'Sub-second page load times'
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'Redis', 'AWS', 'Stripe API', 'TensorFlow.js'],
    timeline: '6 months',
    team: '8 members',
    client: 'Luxury Retail Brand',
    color: 'from-pink to-rose-500',
    gradient: 'from-pink/50 to-rose-500/50'
  },
  'fintech-app': {
    title: 'FinFlow',
    category: 'App Development',
    description: 'Mobile banking application with real-time transactions and budget tracking.',
    longDescription: 'FinFlow is a comprehensive mobile banking solution that empowers users to take control of their finances. The app combines intuitive design with powerful features, making personal finance management accessible to everyone.',
    challenge: 'Creating a secure, user-friendly mobile banking experience that could compete with established financial institutions while maintaining the highest security standards and regulatory compliance.',
    solution: 'We developed a React Native application with end-to-end encryption, biometric authentication, and real-time transaction processing. The app integrates with multiple banking APIs and includes advanced budgeting tools.',
    results: [
      '100,000+ downloads in first month',
      '4.8 star app store rating',
      '50% user retention rate',
      'Zero security incidents',
      'Featured in App Store'
    ],
    technologies: ['React Native', 'Firebase', 'Plaid API', 'Node.js', 'PostgreSQL', 'AWS'],
    timeline: '8 months',
    team: '6 members',
    client: 'Fintech Startup',
    color: 'from-purple-500 to-violet-500',
    gradient: 'from-purple-500/50 to-violet-500/50'
  },
  'healthcare-portal': {
    title: 'MediConnect',
    category: 'Web Development',
    description: 'Healthcare patient portal with appointment scheduling and telemedicine.',
    longDescription: 'MediConnect revolutionizes patient care by providing a comprehensive digital health platform. Patients can schedule appointments, consult with doctors via video, and access their health records securely from anywhere.',
    challenge: 'Building a HIPAA-compliant healthcare platform that could integrate with existing hospital systems while providing an intuitive experience for patients of all ages and technical abilities.',
    solution: 'We created a Next.js application with end-to-end encryption, HIPAA-compliant infrastructure, and seamless EHR integration. The platform includes video conferencing, appointment management, and secure messaging.',
    results: [
      '70% reduction in no-shows',
      '50% faster appointment booking',
      '90% patient satisfaction rate',
      'Full HIPAA compliance achieved',
      'Integration with 5 major EHR systems'
    ],
    technologies: ['Next.js', 'TypeScript', 'WebRTC', 'AWS HIPAA', 'HL7 FHIR', 'MongoDB'],
    timeline: '10 months',
    team: '10 members',
    client: 'Healthcare Network',
    color: 'from-cyan-500 to-blue-500',
    gradient: 'from-cyan-500/50 to-blue-500/50'
  },
  'brand-identity': {
    title: 'Nova Brand',
    category: 'UI/UX Design',
    description: 'Complete brand identity and design system for a tech startup.',
    longDescription: 'Nova Brand represents a complete digital transformation for an emerging tech startup. We developed a cohesive brand identity that communicates innovation, trust, and forward-thinking values across all touchpoints.',
    challenge: 'Creating a distinctive brand identity that would stand out in the crowded tech market while remaining versatile enough to work across digital and print media.',
    solution: 'We conducted extensive market research and developed a comprehensive brand strategy including logo design, color palette, typography, and a scalable design system for all digital products.',
    results: [
      '300% increase in brand recognition',
      'Featured in design publications',
      'Consistent brand across 20+ touchpoints',
      '50% reduction in design iteration time',
      'Won 2 design awards'
    ],
    technologies: ['Figma', 'Adobe Creative Suite', 'Framer', 'Principle', 'Abstract'],
    timeline: '4 months',
    team: '4 members',
    client: 'Tech Startup',
    color: 'from-emerald-500 to-teal-500',
    gradient: 'from-emerald-500/50 to-teal-500/50'
  },
  'real-estate-platform': {
    title: 'EstatePro',
    category: 'Web Development',
    description: 'Real estate platform with virtual tours and property management.',
    longDescription: 'EstatePro transforms the real estate experience with immersive virtual tours, advanced property search, and comprehensive management tools for agents and property managers.',
    challenge: 'Creating a platform that could handle high-resolution media, 3D tours, and complex search filters while maintaining fast performance and excellent user experience.',
    solution: 'We built a Vue.js application with Three.js for 3D tours, integrated mapping APIs, and implemented advanced caching strategies for optimal performance.',
    results: [
      '200% increase in property inquiries',
      '45% faster property searches',
      '80% reduction in physical viewings needed',
      '5-star user rating',
      'Featured in TechCrunch'
    ],
    technologies: ['Vue.js', 'Three.js', 'Google Maps API', 'Node.js', 'Elasticsearch', 'AWS CloudFront'],
    timeline: '7 months',
    team: '7 members',
    client: 'Real Estate Agency',
    color: 'from-amber-500 to-orange-500',
    gradient: 'from-amber-500/50 to-orange-500/50'
  },
  'social-platform': {
    title: 'ConnectHub',
    category: 'App Development',
    description: 'Social networking app with real-time messaging and content sharing.',
    longDescription: 'ConnectHub is a next-generation social platform that brings communities together through real-time interactions, content sharing, and meaningful connections.',
    challenge: 'Building a scalable social platform that could handle millions of users, real-time messaging, and content delivery while maintaining excellent performance and user engagement.',
    solution: 'We developed a Flutter application with WebSocket for real-time features, implemented a microservices architecture, and used AWS for scalable infrastructure.',
    results: [
      '1M+ users in 6 months',
      '50M+ messages sent daily',
      '4.7 star app store rating',
      '99.99% uptime',
      'Top 10 in Social category'
    ],
    technologies: ['Flutter', 'WebSocket', 'AWS', 'Redis', 'PostgreSQL', 'Firebase'],
    timeline: '9 months',
    team: '9 members',
    client: 'Social Media Startup',
    color: 'from-red-500 to-pink',
    gradient: 'from-red-500/50 to-pink/50'
  }
};

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const sectionRef = useRef<HTMLDivElement>(null);

  const project = projectId ? projectData[projectId] : null;

  useEffect(() => {
    if (!project) return;
    
    const ctx = gsap.context(() => {
      gsap.fromTo('.detail-section',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.detail-section',
            start: 'top 80%',
            once: true
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold text-white mb-4">Project Not Found</h1>
          <Link to="/portfolio" className="text-pink hover:underline">
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main ref={sectionRef} className="relative pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20`} />
        <div className="absolute inset-0 bg-black/80" />
        
        {/* Animated elements */}
        <motion.div
          className={`absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-[150px] bg-gradient-to-br ${project.color} opacity-20`}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />

        <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 py-20">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/portfolio" className="inline-flex items-center gap-2 text-white/60 hover:text-pink transition-colors mb-8">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-body">Back to Portfolio</span>
            </Link>
          </motion.div>

          <div className="max-w-4xl">
            {/* Category */}
            <motion.span 
              className={`inline-block px-4 py-2 text-sm font-body bg-gradient-to-r ${project.color} text-white rounded-full mb-6`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {project.category}
            </motion.span>
            
            <h1 className="mt-4 text-5xl md:text-7xl lg:text-8xl font-display font-black text-white leading-none tracking-tighter">
              {project.title.toUpperCase()}
            </h1>
            
            <motion.p 
              className="mt-8 text-xl text-white/60 font-body leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {project.description}
            </motion.p>

            {/* Quick stats */}
            <motion.div
              className="mt-10 flex flex-wrap gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-pink" />
                <span className="text-white/60 font-body">{project.timeline}</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-pink" />
                <span className="text-white/60 font-body">{project.team}</span>
              </div>
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-pink" />
                <span className="text-white/60 font-body">{project.client}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Image */}
      <section className="relative py-0">
        <div className={`w-full h-[50vh] bg-gradient-to-br ${project.gradient} opacity-30`} />
      </section>

      {/* Overview Section */}
      <section className="relative py-24 bg-zinc-950">
        <div className="w-full px-6 md:px-12 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left - Description */}
            <div className="detail-section">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
                PROJECT <span className="text-pink">OVERVIEW</span>
              </h2>
              <p className="text-white/60 font-body leading-relaxed mb-8">
                {project.longDescription}
              </p>

              <h3 className="text-xl font-display font-bold text-white mb-4">The Challenge</h3>
              <p className="text-white/60 font-body leading-relaxed mb-8">
                {project.challenge}
              </p>

              <h3 className="text-xl font-display font-bold text-white mb-4">Our Solution</h3>
              <p className="text-white/60 font-body leading-relaxed">
                {project.solution}
              </p>
            </div>

            {/* Right - Technologies */}
            <div className="detail-section">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
                TECHNOLOGY <span className="text-pink">STACK</span>
              </h2>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech, index) => (
                  <motion.span
                    key={index}
                    className="px-4 py-2 bg-white/5 border border-white/10 text-white/70 font-body text-sm"
                    whileHover={{ borderColor: 'rgba(255,115,195,0.5)', scale: 1.05 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="relative py-24 bg-black">
        <div className="w-full px-6 md:px-12 lg:px-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.span 
              className="text-pink text-sm font-body tracking-[0.3em] uppercase"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Results
            </motion.span>
            <motion.h2 
              className="mt-4 text-4xl md:text-5xl font-display font-black text-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              PROJECT <span className="text-pink">OUTCOMES</span>
            </motion.h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.results.map((result, index) => (
              <motion.div
                key={index}
                className="p-6 bg-white/5 border border-white/10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ borderColor: 'rgba(255,115,195,0.5)' }}
              >
                <div className="w-12 h-12 rounded-lg bg-pink/20 flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-pink" />
                </div>
                <p className="text-white/70 font-body">{result}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-10`} />
        <div className="relative z-10 w-full px-6 md:px-12 lg:px-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              className="text-4xl md:text-5xl font-display font-black text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              LIKE WHAT YOU <span className="text-pink">SEE?</span>
            </motion.h2>
            <motion.p 
              className="text-lg text-white/60 font-body mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Let&apos;s discuss how we can create something amazing for your business.
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
                  <ExternalLink className="w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProjectDetail;
