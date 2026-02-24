export default function Contact() {
  return (
    <section
      id="contact"
      className="min-h-screen px-6 py-24 max-w-5xl mx-auto"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-10">
        Contact
      </h2>

      <p className="text-gray-400 text-lg mb-8 max-w-2xl">
        I’m always open to discussing backend engineering roles, research
        collaborations, or interesting system design problems.
        Feel free to reach out.
      </p>

      <div className="space-y-4 text-lg">
        <p>
          📧 Email:{" "}
          <a
            href="mailto:abhishek.shekhawat.1920@gmail.com"
            className="text-blue-400 hover:underline"
          >
            abhishek.shekhawat.1920@gmail.com
          </a>
        </p>

        <p>
          💼 LinkedIn:{" "}
          <a
            href="https://linkedin.com/in/abhishek-shekhawat"
            target="_blank"
            className="text-blue-400 hover:underline"
          >
            linkedin.com/in/abhishek-shekhawat
          </a>
        </p>

        <p>
          💻 GitHub:{" "}
          <a
            href="https://github.com/Abhishek-S-2001"
            target="_blank"
            className="text-blue-400 hover:underline"
          >
            github.com/Abhishek-S-2001
          </a>
        </p>
      </div>
    </section>
  );
}
