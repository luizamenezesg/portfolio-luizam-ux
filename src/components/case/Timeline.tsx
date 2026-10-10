import React from "react";

export type TimelineItem = { year: string; title: string; text: React.ReactNode };

/** Linha do tempo vertical de um case. Os itens do `highlightYear` ganham a cor secundária. */
export const Timeline = ({
  items,
  highlightYear,
  as: Tag = "h4",
}: {
  items: TimelineItem[];
  highlightYear?: string;
  /** Nível do título de cada item, para respeitar a hierarquia da página. */
  as?: "h3" | "h4";
}) => (
  <ol className="relative border-l-2 border-primary/30 ml-3 mt-10 space-y-10">
    {items.map((item) => {
      const highlight = item.year === highlightYear;
      return (
        <li key={item.title} className="ml-8">
          <span
            className={`absolute -left-[9px] mt-1.5 w-4 h-4 rounded-full border-4 border-background ${
              highlight ? "bg-secondary" : "bg-primary"
            }`}
          />
          <p className={`font-heading text-sm font-bold ${highlight ? "text-secondary" : "text-primary"}`}>
            {item.year}
          </p>
          <Tag className="font-heading text-lg font-semibold text-foreground mt-1">{item.title}</Tag>
          <p className="font-body text-[15px] text-foreground/80 leading-relaxed mt-1">{item.text}</p>
        </li>
      );
    })}
  </ol>
);
