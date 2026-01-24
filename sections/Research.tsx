const researchItems = [
  {
    title: "Enhancing User Authentication with Single Sign-On and Passkey Integration",
    description:
      "A study on combining SSO frameworks with passwordless authentication to improve security and user experience in modern applications.",
    topics: ["SSO", "Passkeys", "OIDC", "Zero Trust"],
    status: "Ongoing (M.Tech Research)",
  },
  {
    title: "Behavioral Biometric Authentication Using Keystroke Dynamics",
    description:
      "Research focused on detecting anomalous typing behavior using keystroke timing features for continuous user authentication.",
    topics: ["Keystroke Dynamics", "Anomaly Detection", "ML", "Security"],
    status: "Implemented & Experimented",
  },
  {
    title: "Study of Identity Federation Protocols",
    description:
      "Comparative analysis of identity federation mechanisms including SAML, OAuth 2.0, OIDC, Kerberos, and WS-Federation.",
    topics: ["SAML", "OAuth 2.0", "OIDC", "Identity Federation"],
    status: "NTCC Self-Research",
  },
];

export default function Research() {
  return (
    <section
      id="research"
      className="min-h-screen px-6 py-24 max-w-7xl mx-auto"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-12">
        Research & Academic Work
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {researchItems.map((item) => (
          <div
            key={item.title}
            className="border border-gray-800 rounded-2xl p-6 hover:border-blue-500 transition"
          >
            <h3 className="text-xl font-semibold mb-3">
              {item.title}
            </h3>

            <p className="text-gray-400 mb-4">
              {item.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {item.topics.map((topic) => (
                <span
                  key={topic}
                  className="text-xs px-3 py-1 bg-gray-800 rounded-full"
                >
                  {topic}
                </span>
              ))}
            </div>

            <span className="text-sm text-blue-400">
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
