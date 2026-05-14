import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ProjectLayout = ({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}) => {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        <div className="section-padding pb-8">
          <div className="container-narrow">
            <Link
              to="/#projetos"
              className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-primary transition-colors mb-10 min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
            >
              <ArrowLeft size={16} />
              Voltar aos projetos
            </Link>
            <p className="font-body text-xs tracking-widest uppercase text-primary mb-3">
              {subtitle}
            </p>
            <h1 className="font-heading text-foreground">{title}</h1>
          </div>
        </div>
        <div className="px-6 md:px-12 lg:px-20 pb-20">
          <div className="container-narrow space-y-16">{children}</div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export const ProjectSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section>
    <h2 className="font-heading text-[28px] font-semibold text-foreground mb-5">
      {title}
    </h2>
    {children}
  </section>
);

export const ProjectText = ({ children }: { children: React.ReactNode }) => (
  <div className="font-body text-base text-foreground/85 leading-relaxed space-y-4">
    {children}
  </div>
);

export const ProjectList = ({ items }: { items: string[] }) => (
  <ul className="space-y-2.5 mt-4">
    {items.map((item) => (
      <li
        key={item}
        className="flex items-start gap-3 font-body text-sm text-foreground/85"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
        {item}
      </li>
    ))}
  </ul>
);

export const ProjectSubSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="mt-8">
    <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
      {title}
    </h3>
    {children}
  </div>
);

export const ProjectImage = ({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) => (
  <div className="mt-4 mb-2">
    <img
      src={src}
      alt={alt}
      className={`w-full rounded-xl border border-border shadow-sm ${className ?? ""}`}
      loading="lazy"
    />
  </div>
);

export default ProjectLayout;
