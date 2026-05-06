export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-6 text-center text-gray-600 relative z-10">
      <p className="text-sm">
        © {new Date().getFullYear()} Abhishek Shekhawat. Built with{" "}
        <span className="text-gradient-fusion font-medium">Next.js & Tailwind</span>.
      </p>
    </footer>
  );
}
