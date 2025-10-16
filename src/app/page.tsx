import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans min-h-screen p-8 sm:p-20 bg-space-900 text-stars-100">
      <main className="max-w-3xl mx-auto flex flex-col items-center text-center gap-12">
        
        {/* Profile Picture */}
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-neon-blue/50 shadow-[0_0_20px_rgba(56,189,248,0.6)]">
          <Image
            src="/image/KAY11.jpg"
            alt="Kabelo Selopyane"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Name & Title */}
        <div>
          <h1 className="text-4xl font-bold text-neon-blue text-glow">
            HI ! I'M Kabelo Selopyane
          </h1>
          <p className="text-xl text-stars-200 mt-2">
            Fullstack Developer & UI Enthusiast
          </p>
        </div>

        {/* Optional Illustration */}
        <img
          src="/image/KAY11.jpg"
          alt="Kabelo Selopyane"
          className="w-1/3 rounded-lg shadow-[0_0_25px_rgba(56,189,248,0.4)]"
        />

        {/* Bio */}
        <p className="text-stars-200 leading-relaxed max-w-lg">
          I build fast, accessible, and beautiful web experiences using React and Next.js. 
          Passionate about clean code, futuristic UI, and user-centered design.
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-4">
          <a
            href="/projects"
            className="btn-neon"
          >
            View My Skills
          </a>

          <a
            href="/contact"
            className="btn-neon"
          >
            Contact Me
          </a>
        </div>
      </main>
    </div>
  );
}
