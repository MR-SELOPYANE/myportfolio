'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics: string[];
  fork?: boolean;
}

export default function ProjectsPage() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [filtered, setFiltered] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(
          'https://api.github.com/users/mr-selopyane/repos?sort=updated&per_page=100'
        );
        if (!response.ok) throw new Error('Failed to fetch repositories');
        const data: GitHubRepo[] = await response.json();
        const filteredRepos = data
          .filter((repo) => !repo.fork)
          .filter((repo) => repo.description || repo.topics.length > 0);
        setRepos(filteredRepos);
        setFiltered(filteredRepos);
      } catch (err) {
        setError('Unable to load projects. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });

  const languages = ['All', ...new Set(repos.map((r) => r.language).filter(Boolean))];

  const handleFilter = (lang: string) => {
    setActiveFilter(lang);
    if (lang === 'All') {
      setFiltered(repos);
    } else {
      setFiltered(repos.filter((r) => r.language === lang));
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6 text-center">
        <h1 className="text-4xl font-bold text-neon-blue animate-pulse">
          Loading Projects...
        </h1>
        <p className="text-stars-200">Fetching your GitHub repositories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6 text-center">
        <h1 className="text-4xl font-bold text-neon-blue text-glow mb-6">My Projects</h1>
        <div className="bg-red-900/30 border border-red-700 text-red-300 p-4 rounded shadow-md">
          {error}
        </div>
      </div>
    );
  }

  const featured = filtered.length > 0 ? filtered[0] : null;
  const nonFeatured = filtered.slice(1);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-space-900 via-space-800 to-space-900 opacity-90 animate-pulse-slow" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.1),transparent_60%)]" />

      <div className="relative z-10 max-w-6xl mx-auto p-6 space-y-10">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-5xl font-bold text-neon-blue mb-2 animate-pulse">My Projects</h1>
          <p className="text-stars-200">
            A cosmic collection of my GitHub work — from AI ideas to full-stack builds.
          </p>
        </div>

        {/* Featured Project */}
        {featured && (
          <motion.div
            layout
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="p-6 glass-panel bg-space-800/70 rounded-2xl border border-neon-blue/30 shadow-lg hover:shadow-neon-blue/20"
          >
            <h2 className="text-2xl font-bold text-neon-blue mb-2">
              🚀 Featured: {featured.name}
            </h2>
            <p className="text-stars-200 mb-4">{featured.description}</p>
            <div className="flex gap-4">
              <a
                href={featured.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-neon-blue rounded-lg text-space-900 font-bold hover:bg-white transition-colors shadow-lg shadow-neon-blue/30"
              >
                View Code
              </a>
              {featured.homepage && (
                <a
                  href={featured.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-space-600 border border-neon-pink text-neon-pink rounded-lg font-bold hover:bg-neon-pink hover:text-space-900 transition-all shadow-lg shadow-neon-pink/10"
                >
                  Live Demo
                </a>
              )}
            </div>
          </motion.div>
        )}

        {/* Filter Chips */}
        <div className="flex flex-wrap justify-center gap-3">
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => handleFilter(lang)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                activeFilter === lang
                  ? 'bg-neon-blue text-space-900 border-neon-blue'
                  : 'border-space-600 text-stars-200 hover:border-neon-blue/50'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>

        {/* 🔁 Horizontal Projects Scroll */}
        <LayoutGroup>
          <motion.div
            layout
            className="flex overflow-x-auto pb-4 gap-6 hide-scrollbar"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            <AnimatePresence mode="popLayout">
              {nonFeatured.map((repo) => (
                <motion.div
                  key={repo.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                  className="glass-panel flex-shrink-0 w-[240px] p-4 rounded-2xl shadow-neon-blue/30 hover:shadow-neon-blue/60 transition-all duration-300"
                >
                  <h3 className="text-lg font-semibold text-neon-blue text-glow mb-2">
                    {repo.name}
                  </h3>
                  <p className="text-sm text-stars-200 line-clamp-3">
                    {repo.description || 'No description provided.'}
                  </p>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-neon mt-4 inline-block"
                  >
                    View on GitHub
                  </a>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
    </div>
  );
}