'use client';

import { usePathname, useRouter } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About Me', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Skills', href: '/skills' },
    { name: 'Experience', href: '/experience' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleNavClick = (href: string) => {
    router.push(href);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-space-900/80 backdrop-blur-xl border-b border-space-800 shadow-[0_0_20px_rgba(56,189,248,0.15)]">
      <div className="max-w-5xl mx-auto flex justify-center items-center py-5 px-6 space-x-6">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className={`btn-neon ${isActive ? 'btn-neon--active' : ''}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {item.name}
              {/* Glow border span */}
              <span className="glow-border"></span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}