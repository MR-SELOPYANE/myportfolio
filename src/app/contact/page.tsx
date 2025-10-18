'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setIsSuccess(false);

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setIsSuccess(true);
        e.currentTarget.reset();
      } else {
        const data = await response.json();
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Failed to send message. Check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center bg-gradient-to-b from-space-900 via-space-800 to-space-900 overflow-hidden">
      {/* Background animation */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(59,130,246,0.15),transparent_60%)]" />
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-6xl mx-auto p-8 grid md:grid-cols-2 gap-10 items-center"
      >
        {/* Left Panel — Contact Info */}
        <div className="space-y-6">
          <h1 className="text-5xl font-bold text-neon-blue text-glow mb-4">Let’s Connect</h1>
          <p className="text-stars-200 leading-relaxed mb-6">
            I’m always open to new opportunities, collaborations, or tech discussions. Drop me a message — I usually reply within 24 hours 🚀
          </p>

          <div className="grid gap-5">
            {[
              { title: "Email", value: "kabeloselopyane@gmail.com", link: "mailto:kabeloselopyane@gmail.com" },
              { title: "GitHub", value: "@MR-SELOPYANE", link: "https://github.com/MR-SELOPYANE" },
              { title: "LinkedIn", value: "Kabelo Selopyane", link: "https://www.linkedin.com/in/kabelo-selopyane" },
            ].map((contact, i) => (
              <motion.a
                key={contact.title}
                href={contact.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="p-4 rounded-xl border border-neon-blue/20 bg-space-800/60 hover:border-neon-pink/60 shadow-lg hover:shadow-neon-blue/30 transition-all"
              >
                <h3 className="text-cosmic-blue font-semibold mb-1">{contact.title}</h3>
                <p className="text-stars-100">{contact.value}</p>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Right Panel — Contact Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-space-800/70 p-8 rounded-2xl border border-space-600 backdrop-blur-lg shadow-xl shadow-neon-blue/20"
        >
          <h2 className="text-2xl font-semibold text-neon-blue mb-6 text-glow">Send a Message</h2>

          <AnimatePresence>
            {isSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 p-4 bg-green-900/30 border border-green-700 text-green-300 rounded-lg shadow"
              >
                Message sent successfully! 🚀 I’ll get back to you soon.
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <div className="mb-4 p-4 bg-red-900/30 border border-red-700 text-red-300 rounded-lg shadow">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm text-stars-200 mb-1">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full px-4 py-2 bg-space-700 border border-space-600 rounded-lg text-stars-100 focus:outline-none focus:ring-1 focus:ring-neon-blue transition"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm text-stars-200 mb-1">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-2 bg-space-700 border border-space-600 rounded-lg text-stars-100 focus:outline-none focus:ring-1 focus:ring-neon-blue transition"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm text-stars-200 mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full px-4 py-2 bg-space-700 border border-space-600 rounded-lg text-stars-100 focus:outline-none focus:ring-1 focus:ring-neon-blue transition"
              ></textarea>
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`w-full py-3 rounded-xl font-semibold text-space-900 bg-gradient-to-r from-neon-blue to-neon-pink hover:opacity-90 transition-all shadow-lg shadow-neon-blue/40 ${
                isSubmitting ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}
