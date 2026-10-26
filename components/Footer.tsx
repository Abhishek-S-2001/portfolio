import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#0c0f1d] py-12 relative z-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 text-base font-bold tracking-tight text-white group">
          <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#6366f1] via-[#a855f7] to-[#06b6d4] flex items-center justify-center text-white text-xs font-mono font-bold shadow-md shadow-[#6366f1]/30">
            &lt;AS/&gt;
          </span>
          <span className="font-heading">
            Abhishek<span className="gradient-text font-bold">.dev</span>
          </span>
        </Link>

        {/* Quick Nav Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
          <a href="#home" className="hover:text-white transition-colors">Home</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#projects" className="hover:text-white transition-colors">Projects</a>
          <a href="#experience" className="hover:text-white transition-colors">Experience</a>
          <a href="#skills" className="hover:text-white transition-colors">Skills</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-500 text-center md:text-right">
          © {new Date().getFullYear()} Abhishek Shekhawat. Built with{" "}
          <span className="gradient-text font-semibold">Next.js &amp; Tailwind</span>.
        </p>

      </div>
    </footer>
  );
}
