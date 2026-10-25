"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { name: "About", hash: "#about" },
  { name: "Experience", hash: "#experience" },
  { name: "Projects", hash: "#projects" },
  { name: "Certifications", hash: "#certifications" },
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
            setActiveSection(`#${entry.target.id}`);
            // NOTE: intentionally NOT calling history.replaceState here —
            // updating the URL hash triggers a browser anchor-jump which
            // looks like a scroll snap. The active nav highlight still works.
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
    <nav className="fixed top-5 left-1/2 -translate-x-1/2 w-[92%] max-w-6xl z-50 bg-[#12161f]/80 backdrop-blur-xl border border-white/[0.08] shadow-2xl shadow-black/40 rounded-2xl transition-all print:hidden">
      <div className="px-5 md:px-6 py-3 flex justify-between items-center">

        {/* IMSEC-style Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 text-base md:text-lg font-bold tracking-tight text-white group">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6366f1] via-[#a855f7] to-[#06b6d4] flex items-center justify-center text-white text-xs font-mono font-bold shadow-md shadow-[#6366f1]/30 group-hover:scale-105 transition-transform">
            &lt;AS/&gt;
          </span>
          <span className="font-heading">
            Abhishek<span className="gradient-text font-bold">.dev</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex gap-6 xl:gap-7 text-sm font-medium items-center">
          {links.map((link) => {
            if ('path' in link && link.path) {
              return (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="text-gray-400 hover:text-white transition-colors relative py-1"
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
                    className={`relative py-1 text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-white font-semibold'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#06b6d4] rounded-full" />
                    )}
                  </a>
                ) : (
                  <Link
                    href={href}
                    className="text-gray-400 hover:text-white transition-colors py-1"
                  >
                    {link.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        {/* Right CTA + Theme Toggle + Mobile Toggle */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <ThemeToggle />

          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs md:text-sm font-semibold text-white bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#06b6d4] shadow-md shadow-[#6366f1]/25 hover:shadow-lg hover:shadow-[#6366f1]/40 hover:-translate-y-0.5 transition-all"
          >
            <span>Hire Me</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors"
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
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-white/[0.06] px-6 py-4">
          <ul className="space-y-3 mb-4">
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
                        isActive ? 'text-white font-semibold' : 'text-gray-400 hover:text-white'
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

          <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
            <span className="text-sm font-medium text-gray-400">Appearance</span>
            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  );
}