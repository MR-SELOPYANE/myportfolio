// src/app/components/Sidebar.tsx
import Image from "next/image";

export default function Sidebar() {
  return (
    <div className="w-[250px] h-screen bg-space-900 border-r border-space-700 p-3 flex flex-col overflow-y-auto">
      {/* Profile */}
      <img 
      src="/image/KAY11.jpg"
      alt="kabelo Selopyane"
    style={{width:'50%',height:'auto',display:'block',margin:'0 auto'}}
       />
  <h3 style={{textAlign:'center'}} className="text-4xl font-bold text-neon-blue text-glow">
            MR KE Selopyane
          </h3>
      <h3 className="text-xs font-semibold text-stars-100 mb-3 text-center uppercase tracking-wider">My Activity</h3>

      {/* GitHub Stats - All 3 Cards */}
      <div className="space-y-3 mb-4">
        {/* Main Stats */}
        <div className="bg-space-800 p-3 rounded-lg border border-neon-blue/20 hover:border-neon-blue/50 transition duration-300 hover:scale-[1.01]">
          <img
             src="https://github-readme-streak-stats.herokuapp.com/?user=mr-selopyane&"
            alt="GitHub Stats"
            className="w-full rounded-sm"
            loading="lazy"
          />
        </div>

        {/* Streak */}
        <div className="bg-space-800 p-3 rounded-lg border border-neon-blue/20 hover:border-neon-blue/50 transition duration-300 hover:scale-[1.01]">
          <img
             src="https://github-readme-stats.vercel.app/api?username=mr-selopyane&show_icons=true&locale=en"
            alt="GitHub Streak"
            className="w-full rounded-sm"
            loading="lazy"
          />
        </div>

        {/* Top Languages - Show up to 10 */}
        <div>
          <img
          src="https://github-readme-stats.vercel.app/api/top-langs?username=mr-selopyane&show_icons=true&locale=en&layout=compact&"
          alt="Languages"
          className="w-full rounded-sm"
          loading="lazy"
        />
      </div>
      </div>

      {/* Tech Stack Icons */}
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {[
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg",
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        ].map((src, i) => (
          <div
            key={i}
            className="group relative w-8 h-8 rounded-full bg-space-700 flex items-center justify-center hover:bg-neon-blue/20 transition duration-300"
          >
            <Image
              src={src}
              alt=""
              width={20}
              height={20}
              className="grayscale group-hover:grayscale-0 transition"
            />
          </div>
        ))}
      </div>

      {/* Social Links */}
      <div className="mt-auto flex justify-center gap-3 pt-2">
        <a
          href="https://github.com/MR-SELOPYANE"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="text-gray-300 hover:text-white transition"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.38 7.84 10.9.57.1.78-.25.78-.55v-1.9c-3.19.7-3.86-1.54-3.86-1.54-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.74 2.67 1.24 3.32.95.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.27-5.24-5.66 0-1.25.44-2.28 1.18-3.08-.12-.29-.51-1.44.11-3 0 0 .96-.31 3.13 1.18a10.93 10.93 0 012.85-.38c.97 0 1.95.13 2.85.38 2.17-1.5 3.13-1.18 3.13-1.18.63 1.56.24 2.71.12 3 .74.8 1.18 1.83 1.18 3.08 0 4.4-2.7 5.37-5.26 5.65.41.36.76 1.09.76 2.2v3.26c0 .3.2.65.79.54A10.5 10.5 0 0023.5 12C23.5 5.65 18.35.5 12 .5z"/>
          </svg>
        </a>
        <a
          href="https://www.linkedin.com/in/kabelo-selopyane"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="text-blue-400 hover:text-blue-300 transition"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.452 20.452h-3.728v-5.569c0-1.328-.026-3.036-1.85-3.036-1.85 0-2.134 1.445-2.134 2.939v5.666H9.012V9h3.582v1.561h.05c.498-.945 1.713-1.944 3.527-1.944 3.77 0 4.465 2.482 4.465 5.707v6.128zM5.337 7.433a2.17 2.17 0 110-4.341 2.17 2.17 0 010 4.34zm1.865 13.019H3.472V9h3.73v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.728v20.543C0 23.224.792 24 1.771 24h20.451C23.206 24 24 23.224 24 22.271V1.728C24 .774 23.206 0 22.225 0z"/>
          </svg>
        </a>
      </div>
    </div>
  );
}