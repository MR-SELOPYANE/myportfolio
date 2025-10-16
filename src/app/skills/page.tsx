'use client';

import { motion } from 'framer-motion';

export default function SkillsPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const skillCategories = [
    {
      title: 'Frontend',
      skills: 'React, Next.js, Svelte, Vue.js, HTML/CSS, Tailwind',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M6 9h12v2H6V9zM10 20l4-16m4 16l4-16"
        />
      ),
    },
    {
      title: 'Full-Stack',
      skills: 'Next.js, SvelteKit, Nuxt.js, API Design',
      icon: (
        <>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M13.828 10.172a2 2 0 00-2.828 0l-6 6a2 2 0 002.828 2.828l6-6a2 2 0 002.828-2.828z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M3 10l9-9m0 0l9 9M9 9V3"
          />
        </>
      ),
    },
    {
      title: 'Backend',
      skills: 'Node.js, .NET, Supabase, Appwrite, REST/GraphQL',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
        />
      ),
    },
    {
      title: 'Database',
      skills: 'PostgreSQL, SQL Server, Oracle, Firebase',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.995 5 5 0 10-9.782 2.097A4.002 4.002 0 003 15z"
        />
      ),
    },
    {
      title: 'Languages',
      skills: 'JavaScript, TypeScript, Python, C#, Java, C, Assembly',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586l5.414 5.414V19a2 2 0 01-2 2z"
        />
      ),
    },
    {
      title: 'Tools & DevOps',
      skills: 'Git, GitHub, Docker, Vercel, Netlify, Linux, VS Code',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M10 20l4-16m4 16l4-16M6 9h12v2H6V9z"
        />
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-12 min-h-screen">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold text-neon-blue text-center mb-4"
      >
        Skills & Expertise
      </motion.h1>

      <p className="text-stars-300 text-center max-w-2xl mx-auto mb-10">
        A curated overview of the technologies I work with — from low-level systems to modern full-stack development.
      </p>

      {/* Unified Square Skills Grid – Horizontal Rows with Spacing */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
                   gap-8 justify-center" // ← increased gap & centered rows
      >
        {skillCategories.map((category, idx) => (
          <motion.div
            key={idx}
            variants={item}
            whileHover={{ y: -6 }}
            className="w-full max-w-[220px] aspect-square flex flex-col justify-between
                       p-5 rounded-2xl bg-space-800/60 border border-space-700/60 
                       backdrop-blur-lg hover:shadow-[0_0_25px_rgba(56,189,248,0.4)]
                       transition-all duration-300"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <svg
                  className="w-7 h-7 text-neon-blue flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {category.icon}
                </svg>
                <h2 className="text-lg font-semibold text-stars-100">
                  {category.title}
                </h2>
              </div>
              <p className="text-stars-200 text-sm leading-relaxed text-left line-clamp-4">
                {category.skills}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA */}
      <div className="text-center pt-8">
        <p className="text-stars-300 italic">
          Curious about a specific project? Visit my{' '}
          <span className="text-neon-green font-semibold">Projects</span> page!
        </p>
      </div>
    </div>
  );
}