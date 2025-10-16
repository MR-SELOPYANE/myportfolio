'use client';
export const dynamic = 'force-dynamic';

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
  topics?: string[];
  fork?: boolean;
}

export default function ProjectsPage() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [filtered, setFiltered] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  // ✅ Must be NEXT_PUBLIC_ to be available in browser
  const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

  useEffect(() => {
    // 🔍 Debug: Check if token is available
    console.log('[ProjectsPage] GitHub token available?', !!GITHUB_TOKEN);

    const fetchRepos = async () => {
      try {
        const url = 'https://api.github.com/users/mr-selopyane/repos?sort=updated&per_page=100';
        const headers = GITHUB_TOKEN
          ? { Authorization: `token ${GITHUB_TOKEN}` }
          : {};

        console.log('[ProjectsPage] Fetching from:', url);
        const response = await fetch(url, { headers });

        console.log('[ProjectsPage] GitHub API status:', response.status);

        if (!response.ok) {
          const errorMsg = await response.text();
          console.error('[ProjectsPage] GitHub API error:', errorMsg);
          throw new Error(`Failed to fetch repos (HTTP ${response.status})`);
        }

        const data: GitHubRepo[] = await response.json();
        console.log('[ProjectsPage] Total repos fetched:', data.length);

        // ✅ Keep non-fork repos — even if no description (more inclusive)
        const filteredRepos = data.filter(repo => !repo.fork && !repo.name.startsWith('.'));

        console.log('[ProjectsPage] Non-fork repos after filter:', filteredRepos.length);

        setRepos(filteredRepos);
        setFiltered(filteredRepos);
      } catch (err: any) {
        const message = err.message || 'Unknown error';
        setError(`Unable to load projects: ${message}`);
        console.error('[ProjectsPage] Fetch failed:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [GITHUB_TOKEN]);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });

  const languages = [
    'All',
    ...new Set(repos.map((r) => r.language).filter((l): l is string => Boolean(l))),
  ];

  const handleFilter = (lang: string) => {
    setActiveFilter(lang);
    setFiltered(lang === 'All' ? repos : repos.filter((r) => r.language === lang));
  };

  // 🟡 Loading state
  if (loading)
    return (
      <div className="max-w-6xl mx-auto p-6 text-center">
        <h1 className="text-4xl font-bold text-neon-blue animate-pulse">
          Loading Projects...
        </h1>
        <p className="text-stars-200">Fetching your GitHub repositories...</p>
      </div>
    );

  // 🔴 Error state
  if (error)
    return (
      <div className="max-w-6xl mx-auto p-6 text-center">
        <h1 className="text-4xl font-bold text-neon-blue mb-6">My Projects</h1>
        <div className="bg-red-900/30 border border-red-700 text-red-300 p-4 rounded shadow-md">
          {error}
        </div>
        <p className="mt-4 text-stars-200">
          Make sure your GitHub token is set in <code>.env.local</code> as{' '}
          <code>NEXT_PUBLIC_GITHUB_TOKEN</code>.
        </p>
      </div>
    );

  // 🟢 Success state
  const featured = filtered.length > 0 ? filtered[0] : null;
  const nonFeatured = filtered.slice(1);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-space-900 via-space-800 to-space-900 opacity-90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.1),transparent_60%)]" />

      <div className="relative z-10 max-w-6xl mx-auto p-6 space-y-10">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-neon-blue mb-2">My Projects</h1>
          <p className="text-stars-200">
            A cosmic collection of my GitHub work — from AI ideas to full-stack builds.
          </p>
        </div>

        {featured && (
          <motion.div
            layout
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="p-6 glass-panel bg-space-800/70 rounded-2xl border border-neon-blue/30 shadow-lg"
          >
            <h2 className="text-2xl font-bold text-neon-blue mb-2">🚀 Featured: {featured.name}</h2>
            <p className="text-stars-200 mb-4">{featured.description || 'No description.'}</p>
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
                  className="px-4 py-2 bg-space-600 border border-neon-pink text-neon-pink rounded-lg font-bold hover:bg-neon-pink hover:text-space-900 transition-all"
                >
                  Live Demo
                </a>
              )}
            </div>
          </motion.div>
        )}

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

        <LayoutGroup>
          <motion.div className="flex overflow-x-auto pb-4 gap-6 hide-scrollbar">
            <AnimatePresence> {/* ✅ Removed invalid mode="popLayout" */}
              {nonFeatured.map((repo) => (
                <motion.div
                  key={repo.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                  className="glass-panel flex-shrink-0 w-[260px] p-5 rounded-2xl bg-space-800/60 border border-neon-blue/20"
                >
                  <h3 className="text-lg font-semibold text-neon-blue mb-2 truncate">{repo.name}</h3>
                  <p className="text-sm text-stars-200 line-clamp-3 mb-3">
                    {repo.description || 'No description provided.'}
                  </p>
                  <div className="flex justify-between text-xs text-stars-300 mb-3">
                    <span>⭐ {repo.stargazers_count}</span>
                    <span>{formatDate(repo.updated_at)}</span>
                  </div>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block text-center bg-neon-blue text-space-900 font-bold py-2 rounded-lg hover:bg-white transition-colors"
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