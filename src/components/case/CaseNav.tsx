import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

const CASES = [
  { slug: "/projeto/comparacao-precos", title: "Comparação de Preços", subtitle: "Economizando" },
  { slug: "/projeto/gestao-academica", title: "Gestão Acadêmica", subtitle: "Centro de Línguas Fatec" },
  { slug: "/projeto/planejadin", title: "Planejadin", subtitle: "Gestão financeira pessoal" },
];

/** Cards "Case anterior" e "Próximo case" no fim de cada página de case. */
export const CaseNav = ({ current }: { current: string }) => {
  const i = CASES.findIndex((c) => c.slug === current);
  const prev = CASES[(i - 1 + CASES.length) % CASES.length];
  const next = CASES[(i + 1) % CASES.length];

  const cardClass =
    "group flex flex-col gap-1 rounded-xl border border-border bg-card p-5 min-h-[44px] hover:border-secondary/40 hover:shadow-md transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <nav aria-label="Outros cases" className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-16">
      <Link to={prev.slug} className={cardClass}>
        <span className="inline-flex items-center gap-2 font-body text-[11px] tracking-[0.2em] uppercase text-primary font-semibold">
          <ArrowLeft size={14} aria-hidden="true" /> Case anterior
        </span>
        <span className="font-heading text-lg font-semibold text-foreground group-hover:text-secondary transition-colors">
          {prev.title}
        </span>
        <span className="font-body text-sm text-muted-foreground">{prev.subtitle}</span>
      </Link>
      <Link to={next.slug} className={`${cardClass} sm:items-end sm:text-right`}>
        <span className="inline-flex items-center gap-2 font-body text-[11px] tracking-[0.2em] uppercase text-primary font-semibold">
          Próximo case <ArrowRight size={14} aria-hidden="true" />
        </span>
        <span className="font-heading text-lg font-semibold text-foreground group-hover:text-secondary transition-colors">
          {next.title}
        </span>
        <span className="font-body text-sm text-muted-foreground">{next.subtitle}</span>
      </Link>
    </nav>
  );
};
