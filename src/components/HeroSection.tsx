import { ArrowDown, FileText, Linkedin } from "lucide-react";
import portraitImg from "@/assets/luiza-portrait-1.png";

const HeroSection = () => {
  const scrollToProjects = () => {
    const el = document.getElementById("projetos");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center section-padding pt-28 md:pt-32 overflow-hidden">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Portrait — left on desktop, top on mobile */}
          <div className="relative flex justify-center md:justify-start order-1 md:order-1">
            <div className="relative w-[280px] sm:w-[320px] md:w-[380px] lg:w-[420px]">
              {/* Subtle accent shape behind portrait */}
              <div
                className="absolute -bottom-6 -right-6 w-[70%] h-[70%] rounded-2xl opacity-[0.07]"
                style={{ backgroundColor: "hsl(var(--primary))" }}
                aria-hidden="true" />

              <div className="relative overflow-hidden rounded-2xl shadow-[0_20px_60px_-15px_rgba(58,48,118,0.2)] bg-accent/40">
                <img
                  src={portraitImg}
                  alt="Luiza Menezes – UX Designer com visão estratégica de produto"
                  className="w-full h-auto object-cover grayscale contrast-[1.1] brightness-[1.05]"
                  style={{
                    mixBlendMode: "luminosity"
                  }}
                  loading="eager" />

                {/* Duotone overlay */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-2xl"
                  style={{
                    background: "linear-gradient(180deg, hsla(252,42%,33%,0.08) 0%, hsla(252,42%,33%,0.14) 100%)",
                    mixBlendMode: "multiply"
                  }}
                  aria-hidden="true" />

              </div>
            </div>
          </div>

          {/* Text content — right on desktop, below on mobile */}
          <div className="order-2 md:order-2 text-center md:text-left">
            <p className="font-body text-xs tracking-[0.25em] uppercase text-muted-foreground mb-4 animate-fade-in">
              UX Designer
            </p>

            <h1
              className="font-heading text-foreground mb-5 animate-fade-in-up leading-[1.1]"
              style={{
                fontSize: "clamp(36px, 5vw, 56px)",
                fontWeight: 700,
                animationDelay: "0.1s",
                letterSpacing: "-0.02em"
              }}>

              Luiza Menezes
            </h1>

            <p
              className="font-heading text-primary mb-3 animate-fade-in-up"
              style={{
                fontSize: "clamp(18px, 2.2vw, 22px)",
                fontWeight: 500,
                lineHeight: 1.5,
                animationDelay: "0.2s"
              }}>

              UX Designer com visão de Produto e foco em experiência do usuário.
            </p>

            <p
              className="font-body text-base text-muted-foreground max-w-[520px] mx-auto md:mx-0 mb-10 animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}>

              Transformo problemas em soluções através de Design Thinking, análises heurísticas, mapeamento de processos e arquitetura da informação.
            </p>

            <div
              className="flex flex-wrap items-center justify-center md:justify-start gap-3 animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}>

              <button
                onClick={scrollToProjects}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-body font-medium text-sm px-6 py-3 rounded-lg shadow-[0_4px_14px_-3px_hsla(252,42%,33%,0.35)] hover:bg-secondary transition-all duration-200 min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">

                Ver projetos
                <ArrowDown size={16} />
              </button>

              <a
                href={`${import.meta.env.BASE_URL}curriculo.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-primary text-primary font-body font-medium text-sm px-6 py-3 rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-200 min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border-solid">

                Currículo
                <FileText size={16} />
              </a>

              <a
                href="https://linkedin.com/in/luizamenezesg"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-primary text-primary font-body font-medium text-sm px-6 py-3 rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-200 min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border-solid">

                <Linkedin size={16} />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default HeroSection;
