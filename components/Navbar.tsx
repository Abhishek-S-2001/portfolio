"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "About", hash: "#about-content" },
  { name: "Experience", hash: "#experience" }, // Added
  { name: "Education", hash: "#education" },   // Added
  { name: "Skills", hash: "#skills" },
  { name: "Projects", hash: "/projects" },     // Updated to hash so it scrolls
  { name: "Research", hash: "#research" },
  { name: "Contact", hash: "#contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    // The Floating Card Container
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl z-50 bg-white/80 backdrop-blur-md border border-blue-300 shadow-lg shadow-blue-100/50 rounded-2xl transition-all">
      <div className="px-6 py-3.5 flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/" className="text-lg md:text-xl font-bold tracking-tight text-slate-900">
          Abhishek <span className="text-blue-600">Shekhawat</span>
        </Link>

        {/* Links */}
        <ul className="hidden md:flex gap-6 lg:gap-8 text-sm font-medium text-slate-600">
          {links.map((link) => {
            // 1️⃣ Page navigation always wins (Left your path logic intact just in case)
            if ('path' in link && link.path) {
              return (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              );
            }

            // 2️⃣ Hash navigation
            const href = isHome
              ? link.hash!
              : `/${link.hash}`;

            return (
              <li key={link.name}>
                <Link
                  href={href}
                  scroll={true}
                  className="hover:text-blue-600 transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}