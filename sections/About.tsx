 export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen px-6 py-24 max-w-5xl mx-auto"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-10">
        About Me
      </h2>

      <div className="text-gray-300 text-lg leading-relaxed space-y-6">
        <p>
          I’m a Computer Science postgraduate with a strong focus on backend
          engineering, cloud infrastructure, and secure system design.
          I enjoy building systems that are scalable, reliable, and
          security-aware by design.
        </p>

        <p>
          My work spans API development, AI-assisted platforms, and
          authentication systems such as SSO and passwordless login.
          I’ve built real-world projects involving AI agents, behavioral
          biometrics, and multi-service architectures.
        </p>

        <p>
          Alongside development, I actively explore research topics in
          identity management, Zero Trust security, and continuous
          authentication mechanisms, aiming to bridge theory with
          production-grade systems.
        </p>
      </div>
    </section>
  );
}
