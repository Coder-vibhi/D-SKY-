import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUp, Linkedin, Twitter, Instagram, Facebook } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Team', href: '/about' },
      { label: 'Careers', href: '#' },
      { label: 'Contact', href: '/contact' },
    ],
    services: [
      { label: 'Web Development', href: '/services/web-development' },
      { label: 'App Development', href: '/services/app-development' },
      { label: 'UI/UX Design', href: '/services/ui-ux-design' },
      { label: 'Digital Marketing', href: '/services/digital-marketing' },
    ],
    resources: [
      { label: 'Portfolio', href: '/portfolio' },
      { label: 'Blog', href: '#' },
      { label: 'Case Studies', href: '/portfolio' },
      { label: 'FAQ', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
  ];

  return (
    <footer className="relative bg-black border-t border-white/5">
      {/* Main Footer */}
      <div className="w-full px-6 md:px-12 lg:px-20 py-20">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block">
              <motion.div 
                className="text-3xl font-display font-black text-white tracking-tighter"
                whileHover={{ scale: 1.05 }}
              >
                D SKY<span className="text-pink">.</span>
              </motion.div>
            </Link>
            <p className="mt-4 text-white/50 font-body max-w-sm leading-relaxed">
              Transforming businesses through innovative digital solutions. 
              We craft exceptional experiences that drive growth.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center hover:bg-pink hover:border-pink transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4 text-white" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-white font-display font-bold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href}
                    className="text-white/50 font-body text-sm hover:text-pink transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-display font-bold mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href}
                    className="text-white/50 font-body text-sm hover:text-pink transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-display font-bold mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href}
                    className="text-white/50 font-body text-sm hover:text-pink transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full px-6 md:px-12 lg:px-20 py-6 border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 font-body text-sm">
            &copy; {new Date().getFullYear()} D Sky Ventures Pvt Ltd. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <Link to="#" className="text-white/40 font-body text-sm hover:text-pink transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="text-white/40 font-body text-sm hover:text-pink transition-colors">
              Terms of Service
            </Link>
          </div>

          {/* Back to top */}
          <motion.button
            onClick={scrollToTop}
            className="w-10 h-10 bg-pink flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5 text-black" />
          </motion.button>
        </div>
      </div>

      {/* Large decorative text */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
        <div className="text-[20vw] font-display font-black text-white/[0.02] leading-none tracking-tighter whitespace-nowrap">
          D SKY VENTURES
        </div>
      </div>
    </footer>
  );
};

export default Footer;
