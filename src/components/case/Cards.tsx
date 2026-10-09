import React from "react";
import { ExternalLink } from "lucide-react";

type HeadingTag = "h3" | "h4";

export const Card = ({ children, className = "" }: { key?: React.Key; children: React.ReactNode; className?: string }) => (
  <div className={`rounded-xl border border-border bg-card p-5 ${className}`}>{children}</div>
);

export const CardTitle = ({ children, as: Tag = "h4" }: { children: React.ReactNode; as?: HeadingTag }) => (
  <Tag className="font-heading text-sm font-semibold text-foreground">{children}</Tag>
);

export const CardText = ({ children }: { children: React.ReactNode }) => (
  <p className="font-body text-sm text-muted-foreground mt-1 leading-relaxed">{children}</p>
);

export const Chips = ({ items }: { items: string[] }) => (
  <ul className="flex flex-wrap gap-2 mt-3">
    {items.map((item) => (
      <li
        key={item}
        className="font-body text-xs text-foreground/80 bg-accent/70 border border-border rounded-full px-3 py-1"
      >
        {item}
      </li>
    ))}
  </ul>
);

export const LinkButton = ({ href, children, primary = false }: { href: string; children: React.ReactNode; primary?: boolean }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-body text-sm font-medium transition-colors min-h-[44px] ${
      primary
        ? "bg-primary text-primary-foreground hover:bg-primary/90"
        : "border border-border bg-card text-foreground hover:border-primary hover:text-primary"
    }`}
  >
    {children} <ExternalLink size={14} aria-hidden="true" />
  </a>
);

export const NumberedItem = ({
  number,
  title,
  items,
  as: Tag = "h4",
}: {
  number: string;
  title: string;
  items: string[];
  as?: HeadingTag;
}) => (
  <div className="rounded-xl border border-border bg-card p-6 space-y-3">
    <div className="flex items-center gap-3">
      <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-heading text-sm font-bold flex-shrink-0">
        {number}
      </span>
      <Tag className="font-heading text-base font-semibold text-foreground">{title}</Tag>
    </div>
    <ul className="space-y-1.5 pl-11">
      {items.map((item) => (
        <li key={item} className="font-body text-sm text-foreground/75 leading-relaxed">{item}</li>
      ))}
    </ul>
  </div>
);

export const FlowItem = ({ title, flow }: { title: string; flow: string }) => (
  <div className="rounded-xl bg-accent/40 border border-border p-5">
    <p className="font-heading text-sm font-semibold text-foreground mb-1.5">{title}</p>
    <p className="font-body text-sm text-foreground/70">{flow}</p>
  </div>
);

export const BeforeAfter = ({
  rows,
  labels = ["Antes", "Depois", "Por quê"],
}: {
  rows: { before: string; after: string; why: string }[];
  labels?: [string, string, string];
}) => (
  <div className="my-8 rounded-xl border border-border overflow-hidden">
    <div className="hidden md:grid grid-cols-[1fr_1fr_1.3fr] bg-accent/60 px-5 py-3 font-body text-[11px] tracking-[0.2em] uppercase text-primary font-semibold">
      <span>{labels[0]}</span>
      <span>{labels[1]}</span>
      <span>{labels[2]}</span>
    </div>
    {rows.map((row) => (
      <div
        key={row.after}
        className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1.3fr] gap-1 md:gap-4 px-5 py-4 border-t border-border first:border-t-0 md:first:border-t bg-card"
      >
        <span className="font-body text-sm text-muted-foreground line-through decoration-muted-foreground/50">
          <span className="sr-only">{labels[0]}: </span>
          {row.before}
        </span>
        <span className="font-body text-sm font-semibold text-foreground">
          <span className="sr-only">{labels[1]}: </span>
          {row.after}
        </span>
        <span className="font-body text-sm text-foreground/75">
          <span className="sr-only">{labels[2]}: </span>
          {row.why}
        </span>
      </div>
    ))}
  </div>
);

export const ColorSwatch = ({
  color,
  name,
  description,
  outlined = false,
}: {
  key?: React.Key;
  color: string;
  name: string;
  description: string;
  /** Contorno para cores muito claras, que somem sobre o card. */
  outlined?: boolean;
}) => (
  <div className="flex items-center gap-4 p-5 rounded-xl border border-border bg-card">
    <div
      className={`w-16 h-16 rounded-lg flex-shrink-0 ${outlined ? "border border-border" : ""}`}
      style={{ backgroundColor: color }}
      aria-hidden="true"
    />
    <div>
      <h4 className="font-heading text-base font-semibold text-foreground">
        {name} {color.toUpperCase()}
      </h4>
      <p className="font-body text-sm text-muted-foreground mt-1">{description}</p>
    </div>
  </div>
);
