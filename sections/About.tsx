import SectionWrapper from "@/components/SectionWrapper";

export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen px-6 py-24 max-w-5xl mx-auto"
    >
      <SectionWrapper>
        <h2 className="text-3xl md:text-4xl font-bold mb-10">
          About Me
        </h2>

        <div className="text-gray-300 text-lg leading-relaxed space-y-6">
          <p>
            I’m a Computer Science postgraduate with a strong focus on backend
            engineering, cloud infrastructure, and secure system design.
          </p>
          <p>
            My work spans API development, AI-assisted platforms, and
            authentication systems such as SSO and passwordless login.
          </p>
          <p>
            I actively explore research topics in identity management,
            Zero Trust security, and continuous authentication mechanisms.
          </p>
        </div>
      </SectionWrapper>
    </section>
  );
}
