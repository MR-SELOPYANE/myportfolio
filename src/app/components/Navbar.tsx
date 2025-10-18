'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onMenuClick?: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About Me', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Skills', href: '/skills' },
    { name: 'Experience', href: '/experience' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    router.push(href);
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`sticky top-0 z-50 w-full border-b backdrop-blur-xl transition-all duration-300 ${
        scrolled
          ? 'bg-space-900/95 border-space-700 shadow-[0_0_25px_rgba(56,189,248,0.2)]'
          : 'bg-space-900/70 border-space-800 shadow-none'
      }`}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center py-4 px-6">
        {/* Brand / Logo */}
        <div
          onClick={() => router.push('/')}
          className="text-neon-blue text-xl md:text-2xl font-bold tracking-wide cursor-pointer hover:text-neon-pink transition-all text-glow"
        >
          K.E. Selopyane
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`relative text-sm font-medium transition-all duration-300 ${
                  isActive ? 'text-neon-pink' : 'text-stars-200 hover:text-neon-blue'
                }`}
              >
                {item.name}
                {isActive && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 bottom-[-6px] h-[2px] w-full bg-neon-pink rounded-full shadow-[0_0_8px_rgba(236,72,153,0.8)]"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={onMenuClick}
          className="md:hidden text-neon-blue p-2 rounded hover:bg-space-800/70 transition-all"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </motion.nav>
  );
}
