import { Brain, Search, Layers, Wrench, Award } from "lucide-react";

const columns = [
  {
    icon: Brain,
    title: "Produto & Estratégia",
    items: [
      "Definição de MVP",
      "Priorização",
      "Proposta de Valor",
      "Validação de Hipóteses",
      "Organização de Processos"
    ]
  },
  {
    icon: Search,
    title: "Pesquisa & Discovery",
    items: [
      "Entrevistas",
      "Testes de Usabilidade",
      "Jornada",
      "Personas",
      "Identificação de Problemas"
    ]
  },
  {
    icon: Layers,
    title: "UX & Interface",
    items: [
      "Arquitetura da Informação",
      "Wireframes",
      "Prototipação (Figma)",
      "Design System",
      "UI Responsiva",
      "Usabilidade"
    ]
  },
  {
    icon: Wrench,
    title: "Ferramentas",
    items: [
      "Figma",
      "FigJam",
      "Miro",
      "Jira",
      "Trello",
      "HTML/CSS básico"
    ]
  }
];

const certifications = [
  { name: "Figma", issuer: "EBAC", year: "2024" },
  { name: "UX Design", issuer: "EBAC", year: "2023" },
  { name: "Design Thinking", issuer: "Conquer", year: "2021" }
];

const SkillsSection = () => {
  return (
    <section id="competencias" className="section-padding">
      <div className="container-wide">
        <h2 className="font-heading text-foreground mb-12 text-left">
          Competências
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {columns.map((col) => (
            <div
              key={col.title}
              className="bg-card border border-border rounded-xl p-8 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center text-primary mb-5">
                <col.icon size={24} />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-4">
                {col.title}
              </h3>
              <ul className="space-y-2.5">
                {col.items.map((item) => (
                  <li
                    key={item}
                    className="font-body text-sm text-foreground/80 flex items-start gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <div className="flex items-center gap-3 mb-8">
            <Award className="text-primary" size={24} />
            <h2 className="font-heading text-foreground text-2xl font-bold">
              Cursos e Certificações
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certifications.map((cert) => (
              <div 
                key={cert.name}
                className="bg-accent/30 border border-border rounded-xl p-6"
              >
                <p className="font-body text-xs tracking-wider uppercase text-primary font-semibold mb-1">
                  {cert.year}
                </p>
                <h4 className="font-heading text-lg font-bold text-foreground">
                  {cert.name}
                </h4>
                <p className="font-body text-sm text-muted-foreground">
                  {cert.issuer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
