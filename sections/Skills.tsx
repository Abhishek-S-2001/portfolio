import { skills } from "@/data/skills";

export default function Skills() {
  return (
    <section
      id="skills"
      className="min-h-screen px-6 py-24 max-w-7xl mx-auto"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-12">
        Skills
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {skills.map((skill) => (
          <div
            key={skill.category}
            className="border border-gray-800 rounded-2xl p-6 hover:border-blue-500 transition"
          >
            <h3 className="text-xl font-semibold mb-4">
              {skill.category}
            </h3>

            <div className="flex flex-wrap gap-3">
              {skill.items.map((item) => (
                <span
                  key={item}
                  className="px-4 py-2 text-sm bg-gray-800 rounded-xl text-gray-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
