"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { name: "About", hash: "#about" },
  { name: "Experience", hash: "#experience" },
  { name: "Projects", hash: "#projects" },
  { name: "Research", hash: "#research" },
  { name: "Skills", hash: "#skills" },
  { name: "Education", hash: "#education" },
  { name: "Contact", hash: "#contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Scroll Spy
  useEffect(() => {
    if (!isHome) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const hash = `#${entry.target.id}`;
            setActiveSection(hash);
            window.history.replaceState(null, '', hash);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    links.forEach((link) => {
      if ('hash' in link && link.hash) {
        const id = link.hash.substring(1);
        const element = document.getElementById(id);
        if (element) observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [isHome]);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const element = document.getElementById(hash.substring(1));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, '', hash);
    }
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/[0.06] shadow-lg shadow-black/30 rounded-2xl transition-all print:hidden">
      <div className="px-6 py-3.5 flex justify-between items-center">

        <Link href="/" className="text-lg md:text-xl font-bold tracking-tight text-white">
          Abhishek <span className="text-gradient-fusion">Shekhawat</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex gap-6 lg:gap-8 text-sm font-medium">
          {links.map((link) => {
            if ('path' in link && link.path) {
              return (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              );
            }

            const href = isHome ? link.hash! : `/${link.hash}`;
            const isActive = activeSection === link.hash;

            return (
              <li key={link.name}>
                {isHome ? (
                  <a
                    href={href}
                    onClick={(e) => handleScroll(e, link.hash!)}
                    className={`transition-colors ${
                      isActive
                        ? 'text-white font-bold'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    href={href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/[0.06] px-6 py-4">
          <ul className="space-y-3">
            {links.map((link) => {
              const href = isHome ? link.hash! : `/${link.hash}`;
              const isActive = activeSection === link.hash;
              return (
                <li key={link.name}>
                  {isHome ? (
                    <a
                      href={href}
                      onClick={(e) => handleScroll(e, link.hash!)}
                      className={`block text-sm font-medium transition-colors ${
                        isActive ? 'text-white' : 'text-gray-400'
                      }`}
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      href={href}
                      className="block text-sm font-medium text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
}