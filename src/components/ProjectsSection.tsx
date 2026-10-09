import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const projects = [
{
  slug: "/projeto/comparacao-precos",
  title: "Plataforma de Comparação de Preços",
  subtitle: "UX Research • Product Design • MVP",
  description:
  "Da pesquisa com usuários a um MVP funcional: plataforma que mostra onde cada produto está mais barato perto de você, calcula o preço por kg e organiza listas compartilháveis."
},
{
  slug: "/projeto/gestao-academica",
  title: "Centro de Línguas Fatec — Gestão Acadêmica",
  subtitle: "UX Research • Product Design • UI Design",
  description:
  "Projetei um hub acadêmico que reúne cursos, tarefas, notas, agenda e certificados, tirando o aluno de uma rotina espalhada entre Teams, e-mail e planilhas. Do levantamento de requisitos ao protótipo navegável e MVP funcional, seguindo o guia de estilo do Centro Paula Souza."
},
{
  slug: "/projeto/planejadin",
  title: "Planejadin",
  subtitle: "Product Design • Mobile MVP",
  description:
  "Aplicativo de gestão financeira pessoal estruturado através de benchmarking e prototipação de alta fidelidade, focado em simplificar regras de negócio complexas."
}];


const ProjectsSection = () => {
  return (
    <section id="projetos" className="section-padding bg-card">
      <div className="container-wide">
        <h2 className="font-heading text-foreground mb-12 text-left">
          Projetos
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) =>
          <Link
            key={project.slug}
            to={project.slug}
            className="group block bg-background border border-border rounded-xl p-8 hover:shadow-lg hover:border-secondary/30 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-ring">

              <p className="font-body text-xs tracking-widest uppercase text-primary mb-3">
                {project.subtitle}
              </p>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3 group-hover:text-secondary transition-colors">
                {project.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground mb-6 leading-relaxed">
                {project.description}
              </p>
              <span className="inline-flex items-center gap-2 font-body text-sm font-medium text-primary group-hover:text-secondary group-hover:gap-3 transition-all">
                Ver projeto
                <ArrowRight size={16} />
              </span>
            </Link>
          )}
        </div>
      </div>
    </section>);

};

export default ProjectsSection;
