"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "About", hash: "#about" },
  { name: "Skills", hash: "#skills" },
  { name: "Projects", path: "/projects" },
  { name: "Research", hash: "#research" },
  { name: "Contact", hash: "#contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-semibold text-white">
          Abhishek Shekhawat
        </Link>

        {/* Links */}
        <ul className="hidden md:flex gap-8 text-gray-300">
          {links.map((link) => {
            // 1️⃣ Page navigation always wins
            if (link.path) {
              return (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="hover:text-white transition"
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
                  scroll={false}
                  className="hover:text-white transition"
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
