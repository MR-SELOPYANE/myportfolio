'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Github, Linkedin } from 'lucide-react';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea height based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${Math.min(scrollHeight, 150)}px`; // max ~6 lines
    }
  }, [message]);

  const contacts = [
    {
      title: 'Email',
      value: 'kabeloselopyane@gmail.com',
      link: 'mailto:kabeloselopyane@gmail.com',
      icon: <Mail className="text-neon-blue" size={22} />,
    },
    {
      title: 'GitHub',
      value: '@MR-SELOPYANE',
      link: 'https://github.com/MR-SELOPYANE',
      icon: <Github className="text-neon-blue" size={22} />,
    },
    {
      title: 'LinkedIn',
      value: 'Kabelo Selopyane',
      link: 'https://www.linkedin.com/in/kabelo-selopyane',
      icon: <Linkedin className="text-neon-blue" size={22} />,
    },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setIsSuccess(false);

    const formData = new FormData(e.currentTarget);
    // Ensure message is included (in case controlled input misses it)
    formData.set('message', message);

    try {
      // ⚠️ Replace YOUR_FORM_ID with your real Formspree ID
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        setIsSuccess(true);
        setMessage('');
        e.currentTarget.reset();
      } else {
        const data = await response.json();
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Failed to send message. Check your internet connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Optional: Parallax background (lightweight)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const moveX = (clientX - window.innerWidth / 2) / 30;
      const moveY = (clientY - window.innerHeight / 2) / 30;
      const radials = containerRef.current.querySelectorAll('.dynamic-glow');
      radials.forEach((el, i) => {
        (el as HTMLElement).style.transform = `translate(${moveX * (i + 1)}px, ${moveY * (i + 1)}px)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const MAX_CHARS = 500;
  const charCount = message.length;
  const isNearLimit = charCount > MAX_CHARS * 0.9; // >450

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-space-900 via-space-800 to-space-900"
    >
      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-stars-200 rounded-full opacity-50"
          animate={{
            y: [0, -15, 0],
            x: [0, Math.sin(i) * 8, 0],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.3,
          }}
          style={{
            top: `${15 + (i * 7) % 75}%`,
            left: `${10 + (i * 12) % 85}%`,
          }}
        />
      ))}

      <div className="dynamic-glow absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_60%)]" />
      <div className="dynamic-glow absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(236,72,153,0.12),transparent_60%)]" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-6xl mx-auto p-6 md:p-12"
      >
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-extrabold text-neon-blue text-glow mb-4"
          >
            Let’s Connect
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-stars-200 text-lg max-w-2xl mx-auto"
          >
            Got an idea? A collab? Or just want to say hi? Send a signal—I reply within 24 hours 🛰️
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Cards */}
          <div className="space-y-5">
            {contacts.map((contact) => (
              <motion.div
                key={contact.title}
                onMouseEnter={() => setHoveredCard(contact.title)}
                onMouseLeave={() => setHoveredCard(null)}
                whileHover={{ y: -6 }}
                className="relative"
              >
                <motion.a
                  href={contact.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 rounded-2xl border border-neon-blue/20 bg-space-800/50 backdrop-blur-sm shadow-lg w-full"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-space-700/60 border border-space-600">
                    {contact.icon}
                  </div>
                  <div>
                    <h3 className="text-cosmic-blue font-semibold">{contact.title}</h3>
                    <p className="text-stars-100 text-sm">{contact.value}</p>
                  </div>
                </motion.a>

                <AnimatePresence>
                  {hoveredCard === contact.title && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-space-900 px-3 py-1.5 rounded-lg text-xs text-stars-200 border border-neon-blue/30 whitespace-nowrap"
                    >
                      Open {contact.title}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="relative bg-space-800/60 p-8 rounded-2xl border border-space-700 backdrop-blur-lg shadow-xl"
          >
            <div className="absolute inset-0 rounded-2xl border border-neon-blue/10 animate-pulse" />

            <h2 className="text-2xl font-bold text-neon-blue mb-6 text-center font-mono tracking-wider">
              SEND A SIGNAL
            </h2>

            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="mb-5 p-4 bg-emerald-900/30 border border-emerald-700 text-emerald-300 rounded-xl text-center"
                >
                  🚀 Signal received! I’ll decode your message soon.
                </motion.div>
              )}
            </AnimatePresence>

            {error && (
              <div className="mb-5 p-4 bg-rose-900/30 border border-rose-700 text-rose-300 rounded-xl text-center">
                ❌ {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm text-stars-200 mb-1 ml-1">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-space-700/70 border border-space-600 rounded-xl text-stars-100 focus:outline-none focus:ring-2 focus:ring-neon-blue/60 transition placeholder:text-stars-400"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm text-stars-200 mb-1 ml-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-3 bg-space-700/70 border border-space-600 rounded-xl text-stars-100 focus:outline-none focus:ring-2 focus:ring-neon-blue/60 transition placeholder:text-stars-400"
                  placeholder="your@email.com"
                />
              </div>

              {/* ✨ Enhanced Message Console */}
              <div>
                <label htmlFor="message" className="block text-sm text-stars-200 mb-1 ml-1">
                  Message
                </label>
                <div className="relative">
                  <textarea
                    ref={textareaRef}
                    id="message"
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value.slice(0, MAX_CHARS))}
                    placeholder="> Type your message here..."
                    required
                    className="w-full px-4 py-3 bg-space-700/70 border border-space-600 rounded-xl text-stars-100 focus:outline-none focus:ring-2 focus:ring-neon-blue/60 transition placeholder:text-stars-400 font-mono resize-none"
                    rows={3}
                    maxLength={MAX_CHARS}
                  />
                </div>
                <div className={`flex justify-between text-xs mt-1 ${isNearLimit ? 'text-neon-pink' : 'text-stars-300'}`}>
                  <span>{charCount}/{MAX_CHARS}</span>
                  <span>{isNearLimit ? '⚠️ Signal overload!' : ''}</span>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting || !message.trim()}
                whileHover={{ scale: isSubmitting ? 1 : 1.03 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3.5 rounded-xl font-bold text-space-900 bg-gradient-to-r from-neon-blue to-neon-pink shadow-lg ${
                  isSubmitting || !message.trim()
                    ? 'opacity-60 cursor-not-allowed'
                    : 'hover:opacity-90'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-space-900 border-t-transparent rounded-full"
                    />
                    Transmitting...
                  </span>
                ) : (
                  'Send Signal 📡'
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}