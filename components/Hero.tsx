export default function Hero() {
  return (
    <section className="min-h-screen pt-24 flex flex-col justify-center items-center text-center px-6">
      <h1 className="text-4xl md:text-6xl font-bold">
        Hi, I’m <span className="text-blue-500">Abhishek</span>
      </h1>

      <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-2xl">
        Backend & Cloud Engineer focused on secure systems, AI agents,
        and scalable architectures.
      </p>

      <div className="mt-8 flex gap-4">
        <a
          href="#projects"
          className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
        >
          View Projects
        </a>

        <a
          href="/resume.pdf"
          className="px-6 py-3 border border-gray-600 rounded-xl hover:bg-gray-800 transition"
        >
          Resume
        </a>
      </div>
    </section>
  );
}
