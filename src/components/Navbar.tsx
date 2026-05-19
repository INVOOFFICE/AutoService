import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Facebook, Instagram, Clock, MapPin, Phone } from 'lucide-react';
import Container from './Container';

const navLinks = [
  { label: 'Accueil', href: '#hero' },
  { label: 'À Propos', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'FAP', href: '#fap' },
  { label: 'Contact', href: '#appointment' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-white border-b border-fixturbo-border-light hidden lg:block">
        <Container className="h-[50px] flex items-center justify-between text-sm text-fixturbo-text-secondary">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-fixturbo-primary" />
              Lundi - Samedi : 8h30 - 18h30
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-fixturbo-primary" />
              El Menzah, Meknès, Maroc
            </span>
            <span className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-fixturbo-primary" />
              <a href="tel:0609052144" className="hover:text-fixturbo-primary transition-colors">06 09 05 21 44</a>
            </span>
          </div>
        </Container>
      </div>

      {/* Main Nav */}
      <header
        className={`sticky top-0 z-40 bg-white transition-all duration-300 ${
          scrolled ? 'shadow-nav h-[60px]' : 'h-[80px]'
        }`}
      >
        <Container className="h-full flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" onClick={() => handleNavClick('#hero')} className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-fixturbo-primary flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
            </div>
            <span className="text-xl font-bold text-fixturbo-dark">Auto Service El Bakkali</span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="relative text-[15px] font-medium text-fixturbo-dark hover:text-fixturbo-primary transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-fixturbo-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
              </a>
            ))}
          </nav>

          {/* Social Icons - Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            {[Facebook, Instagram].map((Icon, i) => (
              <a
                key={i}
                aria-disabled="true"
                className="w-8 h-8 rounded-full border border-fixturbo-border-light flex items-center justify-center text-fixturbo-text-secondary hover:bg-fixturbo-primary hover:border-fixturbo-primary hover:text-white transition-all duration-300 cursor-default"
              >
                <Icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center text-fixturbo-dark"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </Container>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-50 bg-white lg:hidden"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-6 h-[80px] border-b border-fixturbo-border-light">
                <span className="text-xl font-bold text-fixturbo-dark">Auto Service El Bakkali</span>
                <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                  <X className="w-6 h-6 text-fixturbo-dark" />
                </button>
              </div>
              <nav className="flex flex-col p-6 gap-2">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="text-lg font-medium text-fixturbo-dark hover:text-fixturbo-primary py-3 border-b border-fixturbo-border-light transition-colors"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
