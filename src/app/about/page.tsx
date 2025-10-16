'use client';

import { useEffect, useState } from 'react';

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Hero Header */}
      <h1 
        className={`text-4xl md:text-5xl font-extrabold text-neon-blue mb-8 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        About Me
      </h1>

      {/* Main Content Panel — NO BORDERS, ADD PADDING ON SIDES */}
      <div 
        className={`bg-space-800/50 backdrop-blur-xl rounded-xl p-8 shadow-[0_0_30px_rgba(56,189,248,0.2)] transition-all duration-700 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <div className="space-y-6 text-stars-200 leading-relaxed">

          {/* Paragraph 1 */}
          <p className="text-lg">
            I'm a second-year Computer Science student at the{' '}
            <strong className="text-neon-green font-semibold tracking-wide">
              University of Tshwane (Tshwane University of Technology)
            </strong>
            , deeply passionate about technology, innovation, and the endless possibilities of code.
          </p>

          {/* Paragraph 2 */}
          <p className="text-lg">
            From building my first “Hello World” program to exploring modern frameworks like{' '}
            <span className="text-neon-blue font-medium">React</span> and{' '}
            <span className="text-neon-green font-medium">Next.js</span>, I’ve been driven by curiosity and a desire to understand how things work under the hood.
          </p>

          {/* Paragraph 3 */}
          <p className="text-lg">
            Beyond academics, I believe in the power of community. I’m always eager to learn from others, share knowledge, and contribute to{' '}
            <span className="text-neon-blue font-medium">open-source</span> or local tech initiatives that empower fellow learners.
          </p>

          {/* Paragraph 4 */}
          <p className="text-lg">
            When I’m not coding or studying, you’ll likely find me unwinding with a good game on my laptop — whether it’s solving puzzles, exploring vast open worlds, or competing in strategy battles. Gaming fuels my creativity and reminds me that technology can be both powerful and fun.
          </p>

          {/* Quote */}
          <blockquote className="mt-8 p-6 border-l-4 border-neon-blue bg-space-900/30 rounded-r-lg italic text-stars-100 text-lg transition-all hover:bg-space-900/50">
            “I don’t just want to use technology — I want to shape it, improve it, and make it accessible to everyone.”
          </blockquote>

        </div>
      </div>

      {/* Back to Home Button */}
      <div className="mt-10 flex justify-center">
        <button 
          onClick={() => window.location.href = '/'}
          className="btn-neon"
          >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M11.5 15a.5.5 0 0 0 .5-.5V2.5a.5.5 0 0 0-.5-.5H11v1h-5V2.5a.5.5 0 0 0-.5-.5H5a.5.5 0 0 0-.5.5v12a.5.5 0 0 0 .5.5h.5v-1h5v1z"/>
          </svg>
          Back to Home
        </button>
      </div>

      {/* Optional: Floating Accent Element */}
      <div className="mt-12 flex justify-center">
        <div className="w-12 h-12 rounded-full bg-neon-blue/20 animate-pulse"></div>
      </div>
    </div>
  );
}