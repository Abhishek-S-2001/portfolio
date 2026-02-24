"use client";

const researchItems = [
  {
    title: "Preventing Unattended Session Misuse in SSO Using Continuous Monitoring",
    description:
      "Research focused on detecting anomalous typing behavior using keystroke timing features for continuous user authentication in SSO environments.",
    topics: ["Keystroke Dynamics", "Anomaly Detection", "SSO", "Security"],
    status: "Research Paper | Conference 2025",
  },
  {
    title: "Enhancing User Authentication With Single Sign-On and Passkey Integration",
    description:
      "A study on combining SSO frameworks with passwordless authentication to improve security and user experience in modern applications.",
    topics: ["SSO", "Passkeys", "OIDC", "Zero Trust"],
    status: "Research Paper | Conference 2025",
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
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-slate-900">
        Research & Academic Work
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {researchItems.map((item) => (
          <div
            key={item.title}
            className="border border-slate-200 bg-white rounded-2xl p-6 hover:border-blue-400 transition-colors shadow-sm hover:shadow-md flex flex-col"
          >
            <h3 className="text-xl font-semibold mb-3 text-slate-900">
              {item.title}
            </h3>

            <p className="text-slate-600 mb-5 text-sm leading-relaxed">
              {item.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6 mt-auto">
              {item.topics.map((topic) => (
                <span
                  key={topic}
                  className="text-xs px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-100 font-medium"
                >
                  {topic}
                </span>
              ))}
            </div>

            <div className="border-t border-slate-100 pt-4">
              <span className="text-sm font-semibold text-blue-600">
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}