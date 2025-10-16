'use client';

import { useState } from "react";

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
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-4xl font-bold text-neon-blue text-center text-glow">
        Contact Me
      </h1>
      <p className="text-stars-200 text-center mb-8">
        I’m open to freelance opportunities, collaborations, or interesting projects. Reach out and I’ll get back to you soon!
      </p>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "Email", value: "kabeloselopyane@gmail.com", link: "mailto:kabeloselopyane@gmail.com" },
          { title: "GitHub", value: "@MR-SELOPYANE", link: "https://github.com/MR-SELOPYANE" },
          { title: "LinkedIn", value: "Kabelo Selopyane", link: "https://www.linkedin.com/in/kabelo-selopyane" },
        ].map((contact) => (
          <a
            key={contact.title}
            href={contact.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-space-800 glass-panel p-5 rounded-xl border border-space-700 shadow-neon-blue/20 hover:scale-105 transform transition-all"
          >
            <h3 className="text-cosmic-blue font-semibold mb-2">{contact.title}</h3>
            <p className="text-stars-100 hover:text-neon-blue transition">{contact.value}</p>
          </a>
        ))}
      </div>

      {/* Contact Form */}
      <div className="bg-space-800 glass-panel p-8 rounded-2xl border border-space-700 shadow-neon-blue/20">
        <h2 className="text-2xl font-semibold text-neon-blue text-glow mb-6">
          Send a Message
        </h2>

        {isSuccess && (
          <div className="mb-4 p-4 bg-green-900/30 border border-green-700 text-green-300 rounded shadow-sm">
            Message sent successfully! I’ll get back to you soon.
          </div>
        )}

        {error && (
          <div className="mb-4 p-4 bg-red-900/30 border border-red-700 text-red-300 rounded shadow-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            { id: "name", label: "Name", type: "text" },
            { id: "email", label: "Email", type: "email" },
          ].map((field) => (
            <div key={field.id}>
              <label htmlFor={field.id} className="block text-sm text-stars-200 mb-1">
                {field.label}
              </label>
              <input
                type={field.type}
                id={field.id}
                name={field.id}
                required
                className="w-full px-4 py-2 bg-space-700 border border-space-600 rounded-lg text-stars-100 focus:outline-none focus:ring-1 focus:ring-neon-blue transition"
              />
            </div>
          ))}

          <div>
            <label htmlFor="message" className="block text-sm text-stars-200 mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="w-full px-4 py-2 bg-space-700 border border-space-600 rounded-lg text-stars-100 focus:outline-none focus:ring-1 focus:ring-neon-blue transition"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-6 rounded-xl font-semibold text-space-900 bg-neon-blue hover:bg-neon-pink text-glow transition-all ${
              isSubmitting ? "opacity-60 cursor-not-allowed" : "shadow-neon-blue/50 hover:scale-105"
            }`}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}
