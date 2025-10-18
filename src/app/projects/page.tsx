'use client';
export const dynamic = 'force-dynamic';

import { useEffect, useMemo, useState } from 'react';
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

  // NEXT_PUBLIC_ env vars are replaced at build time and safe in client
  const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN ?? '';

  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = 'https://api.github.com/users/mr-selopyane/repos?sort=updated&per_page=100';
        const headers: Record<string, string> = {
          Accept: 'application/vnd.github.v3+json',
        };
        if (GITHUB_TOKEN) headers.Authorization = `token ${GITHUB_TOKEN}`;

        console.debug('[ProjectsPage] Fetching repos from', url, 'with token?', !!GITHUB_TOKEN);

        const response = await fetch(url, { headers, cache: 'no-store' });

        console.debug('[ProjectsPage] Response status', response.status);

        // Try to read text first (helps show 403/JSON error messages)
        const text = await response.text();
        let data: any;
        try {
          data = text ? JSON.parse(text) : [];
        } catch (parseErr) {
          // if parsing fails, show raw text
          throw new Error(`Failed to parse GitHub response: ${parseErr} — response: ${text}`);
        }

        if (!response.ok) {
          // GitHub often returns an object with message and documentation_url
          const msg = data && data.message ? `${data.message} (${response.status})` : `HTTP ${response.status}`;
          throw new Error(`GitHub API error: ${msg}`);
        }

        // Validate shape — defensive
        if (!Array.isArray(data)) throw new Error('GitHub returned unexpected data shape.');

        const typed: GitHubRepo[] = data;
        const filteredRepos = typed.filter((repo) => !repo.fork && !repo.name.startsWith('.'));
        console.debug('[ProjectsPage] Filtered repos count', filteredRepos.length);

        setRepos(filteredRepos);
        setFiltered(filteredRepos);
      } catch (err: any) {
        console.error('[ProjectsPage] fetch error', err);
        setError(err?.message ?? String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
    // NOTE: intentionally not depending on GITHUB_TOKEN here to avoid double-runs in dev
    // If you change token at runtime, refresh the page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Unknown';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
      });
    } catch {
      return dateString;
    }
  };

  const languages = useMemo(() => {
    const set = new Set<string>();
    repos.forEach((r) => {
      if (r.language) set.add(r.language);
    });
    return ['All', ...Array.from(set)];
  }, [repos]);

  const handleFilter = (lang: string) => {
    setActiveFilter(lang);
    setFiltered(lang === 'All' ? repos : repos.filter((r) => r.language === lang));
  };

  // Loading state
  if (loading)
    return (
      <div className="max-w-6xl mx-auto p-6 text-center">
        <h1 className="text-4xl font-bold text-neon-blue animate-pulse">Loading Projects...</h1>
        <p className="text-stars-200">Fetching your GitHub repositories...</p>
      </div>
    );

  // Error state
  if (error)
    return (
      <div className="max-w-6xl mx-auto p-6 text-center">
        <h1 className="text-4xl font-bold text-neon-blue mb-6">My Projects</h1>
        <div className="bg-red-900/30 border border-red-700 text-red-300 p-4 rounded shadow-md">
          {error}
        </div>
        <p className="mt-4 text-stars-200">
          Common causes: rate limit (no token) or invalid token. Make sure your GitHub token is set in{' '}
          <code>.env.local</code> as <code>NEXT_PUBLIC_GITHUB_TOKEN</code>, then restart Next.js.
        </p>
      </div>
    );

  // Success
  const featured = filtered.length > 0 ? filtered[0] : null;
  const nonFeatured = filtered.slice(1);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-space-900 via-space-800 to-space-900 opacity-90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.1),transparent_60%)]" />

      <div className="relative z-10 max-w-6xl mx-auto p-6 space-y-10">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-neon-blue mb-2">My Projects</h1>
          <p className="text-stars-200">A cosmic collection of my GitHub work — from AI ideas to full-stack builds.</p>
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

        {/* Filter Buttons */}
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

        {/* Projects Grid */}
        <LayoutGroup>
          <div className="flex overflow-x-auto pb-4 gap-6 hide-scrollbar">
            <AnimatePresence initial={false}>
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
                  <p className="text-sm text-stars-200 line-clamp-3 mb-3">{repo.description || 'No description provided.'}</p>
                  <div className="flex justify-between text-xs text-stars-300 mb-3">
                    <span>⭐ {repo.stargazers_count ?? 0}</span>
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
          </div>
        </LayoutGroup>
      </div>
    </div>
  );
}
