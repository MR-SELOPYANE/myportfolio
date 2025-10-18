'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

export default function RootClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-[250px] flex-shrink-0">
        <Sidebar />
      </aside>

      {/* Mobile Sidebar (Animated) */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 80 }}
            className="fixed inset-y-0 left-0 z-50 w-64 bg-space-900/95 backdrop-blur-xl border-r border-space-700 shadow-[0_0_25px_rgba(56,189,248,0.25)] md:hidden"
          >
            <Sidebar />
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 text-neon-blue hover:text-neon-pink transition text-xl"
            >
              ✕
            </button>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="sticky top-0 z-40 bg-space-900/80 backdrop-blur-lg border-b border-space-700">
          <Navbar onMenuClick={() => setSidebarOpen(true)} />
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto glass-panel backdrop-blur-xl border border-space-700 rounded-2xl shadow-[0_0_30px_rgba(56,189,248,0.15)] animate-float">
            <div className="p-6 md:p-10">{children}</div>
          </div>
        </main>

        {/* Footer */}
        <footer className="p-4 text-center text-stars-300 text-sm bg-space-800/40 backdrop-blur-md border-t border-space-700 mt-auto">
          © {new Date().getFullYear()}{" "}
          <span className="text-neon-blue text-glow font-semibold">KE Selopyane</span>. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
