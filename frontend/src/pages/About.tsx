import { useTranslation } from "react-i18next";
import { SITE_CONFIG } from "@/lib/config";

const PROFILE_ITEMS = [
  { icon: "💻", key: "job" },
  { icon: "🏠", key: "from" },
  { icon: "✈️", key: "anotherSky" },
  { icon: "🎺", key: "hobbies" },
] as const;

const TECH_STACK = [
  {
    categoryKey: "languages",
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
    categoryKey: "webFrameworks",
    items: ["Spring Framework", "Rails", "Actix Web", "Nuxt.js/Vue.js", "React"],
  },
  {
    categoryKey: "infrastructure",
    items: ["AWS", "Docker", "Terraform"],
  },
  {
    categoryKey: "otherWebTechnologies",
    items: ["Nginx", "GraphQL", "gRPC", "OpenAPI"],
  },
  {
    categoryKey: "databases",
    items: ["PostgreSQL", "MySQL", "Oracle Database", "MongoDB", "Redis"],
  },
  {
    categoryKey: "tools",
    items: ["Git/GitHub", "GitHub Actions", "Visual Studio Code", "Emacs", "Zsh", "tmux", "Guake", "Arch Linux"],
  },
  {
    categoryKey: "practicesAndMethodologies",
    items: ["TDD/BDD", "DDD", "SOLID", "Clean Architecture", "Onion Architecture"],
  },
] as const;

type HistoryItem = { date: string; event: string };
type ProjectItem = { title: string; descriptions: string[]; role: string; link?: string };

export function About() {
  const { t } = useTranslation();
  const history = t("about.history.items", { returnObjects: true }) as HistoryItem[];
  const projects = t("about.projects.items", { returnObjects: true }) as ProjectItem[];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">{t("about.pageTitle")}</h1>
          <p className="text-xl text-muted-foreground">
            {SITE_CONFIG.nickname}@{SITE_CONFIG.name}
          </p>
        </div>

        {/* Profile Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{t("about.profile.heading")}</h2>
          <div className="space-y-2 text-muted-foreground">
            {PROFILE_ITEMS.map((item) => (
              <p key={item.key}>
                <span className="font-medium">
                  {item.icon} {t(`about.profile.${item.key}.label`)}:
                </span>{" "}
                {t(`about.profile.${item.key}.value`)}{" "}
              </p>
            ))}
          </div>
        </section>

        {/* History */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{t("about.history.heading")}</h2>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th scope="col" className="text-left py-3 px-4 font-semibold">
                    {t("about.history.date")}
                  </th>
                  <th scope="col" className="text-left py-3 px-4 font-semibold">
                    {t("about.history.event")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {history.map((item, index) => (
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
          <h2 className="text-2xl font-semibold mb-4">{t("about.projects.heading")}</h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.title} className="border rounded-lg p-6 bg-card">
                <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-2">
                  {project.descriptions.map((desc, index) => (
                    <div key={index}>{desc}</div>
                  ))}
                </p>
                <p className="text-sm">
                  <span className="font-medium">{t("about.projects.role")}:</span> {project.role}
                </p>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline inline-block mt-2"
                  >
                    {t("about.projects.visitWebsite")}
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{t("about.techStack.heading")}</h2>
          <div className="space-y-6">
            {TECH_STACK.map((group) => (
              <div key={group.categoryKey}>
                <h3 className="text-lg font-semibold mb-3">{t(`about.techStack.categories.${group.categoryKey}`)}</h3>
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
