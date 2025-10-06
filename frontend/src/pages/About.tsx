import { SITE_CONFIG } from "@/lib/config";

const PROFILE = [
  { icon: "💻", item: "Job", value: "Software Developer in Tokyo" },
  { icon: "🏠", item: "From", value: "Kofu, Yamanashi, Japan" },
  { icon: "✈️", item: "Another Sky", value: "Tsukuba, Ibaraki, Japan" },
  { icon: "🎺", item: "Hobbies", value: "French Horn (orchestra), Gaming, Coffee" },
] as const;

const HISTORY = [
  { date: "1994/01", event: "Born" },
  { date: "2017/03", event: "Bachelor’s Degree in University of Tsukuba [mathematics]" },
  { date: "2019/03", event: "Master’s Degree in University of Tsukuba [mathematics education]" },
  { date: "2019/04", event: "Joined SATT, Inc. (Data Analysis -> Web Development -> AI Research -> ...)" },
  { date: "2024/10", event: "[NOW] Transferred to The Division of Technology Strategy (founding member)" },
] as const;

const PROJECTS: ReadonlyArray<{
  title: string;
  descriptions: string[];
  role: string;
  link?: string;
}> = [
  {
    title: "Authentication Platform Development",
    descriptions: ["Developed an OpenID Connect provider for internal web services."],
    role: "Programmer / SE",
  },
  {
    title: "ICT Learning system",
    descriptions: [
      "Developed web-based learning materials for university entrance exams.",
      "As well as a coaching/teaching system for teachers, and management system for staffs.",
    ],
    role: "Tech Lead",
  },
];

const TECH_STACK = [
  {
    category: "Languages",
    items: [
      "Java",
      "Ruby",
      "Python",
      "JavaScript",
      "TypeScript",
      "Go",
      "Rust",
      "Haskell",
      "HTML",
      "CSS",
      "Markdown",
      "LaTeX",
      "HCL",
      "SQL",
    ],
  },
  {
    category: "Web Frameworks",
    items: ["Spring Framework", "Rails", "Actix Web", "Nuxt.js/Vue.js", "React"],
  },
  {
    category: "Infrastructure",
    items: ["AWS", "Docker", "Terraform"],
  },
  {
    category: "Other web technologies",
    items: ["Nginx", "GraphQL", "gRPC", "OpenAPI"],
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "MySQL", "Oracle Database", "MongoDB", "Redis"],
  },
  {
    category: "Tools",
    items: ["Git/GitHub", "GitHub Actions", "Visual Studio Code", "Emacs", "Zsh", "tmux", "Guake", "Arch Linux"],
  },
  {
    category: "Practices & Methodologies",
    items: ["TDD/BDD", "DDD", "SOLID", "Clean Architecture", "Onion Architecture"],
  },
] as const;

export function About() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">About Me</h1>
          <p className="text-xl text-muted-foreground">
            {SITE_CONFIG.nickname}@{SITE_CONFIG.name}
          </p>
        </div>

        {/* Profile Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Profile</h2>
          <div className="space-y-2 text-muted-foreground">
            {PROFILE.map((item) => (
              <p key={item.item}>
                <span className="font-medium">
                  {item.icon} {item.item}:
                </span>{" "}
                {item.value}{" "}
              </p>
            ))}
          </div>
        </section>

        {/* History */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">History</h2>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th scope="col" className="text-left py-3 px-4 font-semibold">
                    Date
                  </th>
                  <th scope="col" className="text-left py-3 px-4 font-semibold">
                    Event
                  </th>
                </tr>
              </thead>
              <tbody>
                {HISTORY.map((item, index) => (
                  <tr key={item.date} className={index % 2 === 0 ? "bg-card" : "bg-muted/50"}>
                    <td className="py-3 px-4 whitespace-nowrap">{item.date}</td>
                    <td className="py-3 px-4">{item.event}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Projects */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Projects & Products at work</h2>
          <div className="space-y-4">
            {PROJECTS.map((project) => (
              <div key={project.title} className="border rounded-lg p-6 bg-card">
                <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-2">
                  {project.descriptions.map((desc, index) => (
                    <div key={index}>{desc}</div>
                  ))}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Role:</span> {project.role}
                </p>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline inline-block mt-2"
                  >
                    Visit Website →
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Tech Stack</h2>
          <div className="space-y-6">
            {TECH_STACK.map((group) => (
              <div key={group.category}>
                <h3 className="text-lg font-semibold mb-3">{group.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-md text-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
