import React from "react";

export const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="font-body text-xs tracking-[0.25em] uppercase text-primary font-semibold mb-3">
    {children}
  </p>
);

export const SectionTitle = ({ children, id }: { children: React.ReactNode; id?: string }) => (
  <h2 id={id} className="font-heading text-[28px] md:text-[36px] font-bold text-foreground leading-tight mb-6">
    {children}
  </h2>
);

export const SubTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="font-heading text-xl md:text-2xl font-semibold text-foreground mb-4 mt-10">
    {children}
  </h3>
);

export const Body = ({ children }: { children: React.ReactNode }) => (
  <div className="font-body text-base text-foreground/85 leading-[1.8] space-y-5">
    {children}
  </div>
);

export const BulletList = ({ items }: { items: React.ReactNode[] }) => (
  <ul className="space-y-3 my-5">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-3 font-body text-[15px] text-foreground/85 leading-relaxed">
        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-[9px] flex-shrink-0" aria-hidden="true" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

export const Divider = () => (
  <div className="flex items-center justify-center my-16 md:my-20" aria-hidden="true">
    <div className="w-12 h-[2px] bg-primary/30 rounded-full" />
  </div>
);

export const Quote = ({ children }: { children: React.ReactNode }) => (
  <blockquote className="my-12 md:my-16 border-l-4 border-primary pl-6 md:pl-8 py-2">
    <p className="font-heading text-xl md:text-2xl font-semibold text-foreground/90 leading-relaxed italic">
      {children}
    </p>
  </blockquote>
);

export const Insight = ({
  label,
  children,
  className = "my-8",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`rounded-2xl bg-accent/60 border border-border p-6 md:p-8 ${className}`}>
    <span className="font-body text-[11px] tracking-[0.2em] uppercase text-primary font-semibold">
      {label}
    </span>
    <p className="font-body text-base text-foreground/85 leading-relaxed mt-2">{children}</p>
  </div>
);
