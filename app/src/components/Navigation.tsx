import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Contact', href: '/contact' },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-black/80 backdrop-blur-xl border-b border-white/5' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="w-full px-6 md:px-12 lg:px-20">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="relative group">
              <motion.div 
                className="text-2xl font-display font-black text-white tracking-tighter"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                D SKY<span className="text-pink group-hover:animate-pulse">.</span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="relative group"
                >
                  <motion.span
                    className={`text-sm font-body font-medium tracking-wide transition-colors ${
                      location.pathname === link.href 
                        ? 'text-pink' 
                        : 'text-white/70 hover:text-white'
                    }`}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                  >
                    {link.label}
                  </motion.span>
                  
                  {/* Hover underline */}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-pink transition-all duration-300 group-hover:w-full" />
                  
                  {/* Active indicator */}
                  {location.pathname === link.href && (
                    <motion.span 
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-pink"
                      layoutId="activeNav"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <Link to="/contact" className="hidden md:block">
              <motion.button
                className="px-6 py-3 bg-pink text-black font-display font-bold text-sm tracking-wide hover:bg-white transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                GET STARTED
              </motion.button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black md:hidden"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.href}
                    className={`text-3xl font-display font-bold ${
                      location.pathname === link.href ? 'text-pink' : 'text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ delay: 0.5 }}
              >
                <Link to="/contact">
                  <button className="mt-8 px-8 py-4 bg-pink text-black font-display font-bold">
                    GET STARTED
                  </button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
