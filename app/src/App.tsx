import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Components
import Loader from './components/Loader';
import Navigation from './components/Navigation';
import CustomCursor from './components/CustomCursor';
import PageTransition from './components/PageTransition';
import ScrollProgress from './components/ScrollProgress';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import ServiceDetail from './pages/ServiceDetail';
import ProjectDetail from './pages/ProjectDetail';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Simulate initial load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="relative bg-black min-h-screen overflow-x-hidden">
      {/* Grain overlay */}
      <div className="grain-overlay" />
      
      {/* Scroll Progress */}
      <ScrollProgress />
      
      {/* Custom cursor */}
      <CustomCursor />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main content with page transitions */}
      <AnimatePresence mode="wait">
        <PageTransition key={location.pathname}>
          <Routes location={location}>
            <Route path="/" element={<><Home /><Footer /></>} />
            <Route path="/about" element={<><About /><Footer /></>} />
            <Route path="/services" element={<><Services /><Footer /></>} />
            <Route path="/services/:serviceId" element={<><ServiceDetail /><Footer /></>} />
            <Route path="/portfolio" element={<><Portfolio /><Footer /></>} />
            <Route path="/portfolio/:projectId" element={<><ProjectDetail /><Footer /></>} />
            <Route path="/contact" element={<><Contact /><Footer /></>} />
          </Routes>
        </PageTransition>
      </AnimatePresence>
    </div>
  );
}

export default App;
