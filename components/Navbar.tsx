"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { name: "About", hash: "#about" },
  { name: "Experience", hash: "#experience" },
  { name: "Projects", hash: "#projects" },
  { name: "Research", hash: "#research" },
  // { name: "Skills", hash: "#skills" },
  { name: "Education", hash: "#education" },
  { name: "Contact", hash: "#contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [activeSection, setActiveSection] = useState("");

  // 1. The Scroll Spy: Detects which section is currently on screen
  useEffect(() => {
    if (!isHome) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const hash = `#${entry.target.id}`;
            setActiveSection(hash);
            // Silently updates the URL hash without making the page jump
            window.history.replaceState(null, '', hash);
          }
        });
      },
      // Triggers when a section crosses the middle of the viewport
      { rootMargin: "-50% 0px -50% 0px" } 
    );

    // Tell the observer to watch all our sections
    links.forEach((link) => {
      if ('hash' in link && link.hash) {
        const id = link.hash.substring(1);
        const element = document.getElementById(id);
        if (element) observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [isHome]);

  // 2. The Click Fix: Forces smooth scroll even if URL is already on that hash
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    const element = document.getElementById(hash.substring(1));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, '', hash);
    }
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl z-50 bg-white/80 backdrop-blur-md border border-blue-300 shadow-lg shadow-blue-100/50 rounded-2xl transition-all">
      <div className="px-6 py-3.5 flex justify-between items-center">
        
        <Link href="/" className="text-lg md:text-xl font-bold tracking-tight text-slate-900">
          Abhishek <span className="text-blue-600">Shekhawat</span>
        </Link>

        <ul className="hidden md:flex gap-6 lg:gap-8 text-sm font-medium">
          {links.map((link) => {
            // Standard Page Link (for /projects)
            if ('path' in link && link.path) {
              return (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="text-slate-600 hover:text-blue-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              );
            }

            // Hash Links (with the new click handler and active state)
            const href = isHome ? link.hash! : `/${link.hash}`;
            const isActive = activeSection === link.hash;

            return (
              <li key={link.name}>
                {isHome ? (
                  <a
                    href={href}
                    onClick={(e) => handleScroll(e, link.hash!)}
                    // Changes text to bold blue if it's the active section
                    className={`transition-colors ${isActive ? 'text-blue-600 font-bold' : 'text-slate-600 hover:text-blue-600'}`}
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    href={href}
                    className="text-slate-600 hover:text-blue-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}