import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SectionLabel } from "./Typography";
import { ClickableImage, type OpenImage } from "./Images";

type Fact = { label: string; value: React.ReactNode };

type Cover = {
  src: string;
  alt: string;
  caption: React.ReactNode;
  width?: number;
  height?: number;
};

/** Topo do case: competências, título, subtítulo, ficha do projeto e imagem de capa. */
export const CaseHero = ({
  label,
  title,
  subtitle,
  facts,
  cover,
  actions,
  onOpen,
}: {
  label: string;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  facts: Fact[];
  /** Sem capa, o hero termina na ficha e nos botões. */
  cover?: Cover;
  /** Botões ao lado da ficha, como o link do MVP. */
  actions?: React.ReactNode;
  onOpen: OpenImage;
}) => (
  <>
    <header className="px-6 md:px-12 lg:px-20 pb-8">
      <div className="max-w-[960px] mx-auto">
        <Link
          to="/"
          state={{ scrollTo: "projetos" }}
          className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-secondary transition-colors mb-10 min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
        >
          <ArrowLeft size={16} />
          Voltar aos projetos
        </Link>
        <SectionLabel>{label}</SectionLabel>
        <h1 className="font-heading text-foreground text-[40px] md:text-[52px] font-bold leading-[1.1] mb-6">
          {title}
        </h1>
        <p className="font-body text-lg text-muted-foreground max-w-[680px] leading-relaxed">{subtitle}</p>

        <dl
          className={`grid grid-cols-2 gap-4 mt-10 ${
            facts.length === 5 ? "md:grid-cols-3 lg:grid-cols-5" : facts.length === 6 ? "md:grid-cols-3" : "md:grid-cols-4"
          }`}
        >
          {facts.map((item) => (
            <div key={item.label} className="border-t-2 border-primary/30 pt-3">
              <dt className="font-body text-[11px] tracking-[0.2em] uppercase text-primary font-semibold">{item.label}</dt>
              <dd className="font-body text-sm text-foreground/85 mt-1 leading-relaxed">{item.value}</dd>
            </div>
          ))}
        </dl>

        {actions && <div className="flex flex-wrap gap-3 mt-8">{actions}</div>}
      </div>
    </header>

    {cover && (
      <div className="px-6 md:px-12 lg:px-20">
        <figure className="max-w-[1100px] mx-auto">
          <ClickableImage
            src={cover.src}
            alt={cover.alt}
            width={cover.width}
            height={cover.height}
            eager
            className="w-full rounded-2xl border border-border shadow-xl mt-6"
            onOpen={onOpen}
          />
          <figcaption className="font-body text-sm text-muted-foreground mt-3 text-center">{cover.caption}</figcaption>
        </figure>
      </div>
    )}
  </>
);

/** Linha de números-chave do case. */
export const KeyNumbers = ({ items, label }: { items: { n: string; t: string }[]; label?: string }) => (
  <div className="mt-6">
    {label && (
      <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground font-semibold mb-3">{label}</p>
    )}
    <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((s) => (
        <li key={s.t} className="rounded-xl bg-accent/60 border border-border p-5">
          <p className="font-heading text-3xl font-bold text-primary leading-none">{s.n}</p>
          <p className="font-body text-sm text-foreground/80 mt-2 leading-snug">{s.t}</p>
        </li>
      ))}
    </ul>
  </div>
);
