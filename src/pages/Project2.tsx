import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FigmaEmbed from "@/components/FigmaEmbed";
import requisitosImg from "@/assets/requisitos-fatec.png";
import wireframe1 from "@/assets/wireframe-fatec-1.png";
import wireframe2 from "@/assets/wireframe-fatec-2.png";
import wireframe3 from "@/assets/wireframe-fatec-3.png";
import wireframe4 from "@/assets/wireframe-fatec-4.png";
import telaPrincipal from "@/assets/tela-principal.png";
import telaEventos from "@/assets/tela-eventos.png";
import telaAgenda from "@/assets/tela-agenda.png";
import telaNotas from "@/assets/tela-notas.png";
import telaHome from "@/assets/tela-home.png";
import telaCertificados from "@/assets/tela-certificados.png";
import telaTarefas from "@/assets/tela-tarefas.png";

/* ── Lightbox ── */
const Lightbox = ({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm p-4 animate-fade-in cursor-zoom-out"
    onClick={onClose}
  >
    <button
      onClick={onClose}
      className="absolute top-6 right-6 text-foreground/70 hover:text-foreground transition-colors z-50"
      aria-label="Fechar"
    >
      <X size={28} />
    </button>
    <img
      src={src}
      alt={alt}
      className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    />
  </div>
);

/* ── Reusable blocks ── */

const Quote = ({ children }: { children: React.ReactNode }) => (
  <blockquote className="my-12 md:my-16 border-l-4 border-primary pl-6 md:pl-8 py-2">
    <p className="font-heading text-xl md:text-2xl font-semibold text-foreground/90 leading-relaxed italic">
      {children}
    </p>
  </blockquote>
);

const Insight = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="rounded-2xl bg-accent/60 border border-border p-6 md:p-8 my-8">
    <span className="font-body text-[11px] tracking-[0.2em] uppercase text-primary font-semibold">
      {label}
    </span>
    <p className="font-body text-base text-foreground/85 leading-relaxed mt-2">{children}</p>
  </div>
);

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="font-body text-xs tracking-[0.25em] uppercase text-primary font-semibold mb-3">
    {children}
  </p>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-heading text-[28px] md:text-[36px] font-bold text-foreground leading-tight mb-6">
    {children}
  </h2>
);

const SubTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="font-heading text-xl md:text-2xl font-semibold text-foreground mb-4 mt-10">
    {children}
  </h3>
);

const Body = ({ children }: { children: React.ReactNode }) => (
  <div className="font-body text-base text-foreground/85 leading-[1.8] space-y-5">
    {children}
  </div>
);

const BulletList = ({ items }: { items: string[] }) => (
  <ul className="space-y-3 my-5">
    {items.map((item) => (
      <li key={item} className="flex items-start gap-3 font-body text-[15px] text-foreground/85 leading-relaxed">
        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-[9px] flex-shrink-0" />
        {item}
      </li>
    ))}
  </ul>
);

const Divider = () => (
  <div className="flex items-center justify-center my-16 md:my-20">
    <div className="w-12 h-[2px] bg-primary/30 rounded-full" />
  </div>
);

const ClickableImage = ({
  src,
  alt,
  className = "",
  onOpen,
}: {
  key?: React.Key;
  src: string;
  alt: string;
  className?: string;
  onOpen: (src: string, alt: string) => void;
}) => (
  <img
    src={src}
    alt={alt}
    className={`cursor-zoom-in hover:opacity-90 transition-opacity ${className}`}
    loading="lazy"
    onClick={() => onOpen(src, alt)}
  />
);

const ImageGrid = ({
  images,
  onOpen,
  cols = 0,
}: {
  images: { src: string; alt: string }[];
  onOpen: (src: string, alt: string) => void;
  cols?: number;
}) => {
  const colClass = cols === 2
    ? "grid-cols-1 md:grid-cols-2"
    : images.length === 2
      ? "grid-cols-1 md:grid-cols-2"
      : "grid-cols-1 md:grid-cols-3";
  return (
    <div className={`grid gap-4 my-8 ${colClass}`}>
      {images.map((img) => (
        <ClickableImage
          key={img.alt}
          src={img.src}
          alt={img.alt}
          className="w-full rounded-xl border border-border shadow-sm"
          onOpen={onOpen}
        />
      ))}
    </div>
  );
};

const NarrowImage = ({
  src,
  alt,
  maxWidth,
  onOpen,
}: {
  src: string;
  alt: string;
  maxWidth?: string;
  onOpen: (src: string, alt: string) => void;
}) => (
  <div className="my-8 mx-auto" style={maxWidth ? { maxWidth } : undefined}>
    <ClickableImage
      src={src}
      alt={alt}
      className="w-full rounded-xl border border-border shadow-sm"
      onOpen={onOpen}
    />
  </div>
);

const FullWidthImage = ({
  src,
  alt,
  onOpen,
}: {
  src: string;
  alt: string;
  onOpen: (src: string, alt: string) => void;
}) => (
  <div className="my-12 md:my-16 -mx-6 md:-mx-12 lg:-mx-20">
    <ClickableImage src={src} alt={alt} className="w-full rounded-xl" onOpen={onOpen} />
  </div>
);

/* ── Image placeholder for sections awaiting assets ── */
const ImagePlaceholder = ({ label, count = 1, layout = "grid" }: { label: string; count?: number; layout?: "grid" | "full" | "narrow" }) => {
  if (layout === "full") {
    return (
      <div className="my-12 md:my-16 -mx-6 md:-mx-12 lg:-mx-20 rounded-xl border-2 border-dashed border-border bg-muted/30 flex items-center justify-center min-h-[280px]">
        <p className="font-body text-sm text-muted-foreground">{label}</p>
      </div>
    );
  }
  if (layout === "narrow") {
    return (
      <div className="my-8 mx-auto max-w-[720px] rounded-xl border-2 border-dashed border-border bg-muted/30 flex items-center justify-center min-h-[200px]">
        <p className="font-body text-sm text-muted-foreground">{label}</p>
      </div>
    );
  }
  return (
    <div className={`grid gap-4 my-8 ${count >= 3 ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1 md:grid-cols-2"}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-xl border-2 border-dashed border-border bg-muted/30 flex items-center justify-center min-h-[180px]">
          <p className="font-body text-xs text-muted-foreground">{label} {count > 1 ? `(${i + 1})` : ""}</p>
        </div>
      ))}
    </div>
  );
};

/* ── Numbered item ── */
const NumberedItem = ({ number, title, items }: { number: string; title: string; items: string[] }) => (
  <div className="rounded-xl border border-border bg-card p-6 space-y-3">
    <div className="flex items-center gap-3">
      <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-heading text-sm font-bold flex-shrink-0">
        {number}
      </span>
      <h4 className="font-heading text-base font-semibold text-foreground">{title}</h4>
    </div>
    <ul className="space-y-1.5 pl-11">
      {items.map((item) => (
        <li key={item} className="font-body text-sm text-foreground/75 leading-relaxed">{item}</li>
      ))}
    </ul>
  </div>
);

/* ── Flow item ── */
const FlowItem = ({ title, flow }: { title: string; flow: string }) => (
  <div className="rounded-xl bg-accent/40 border border-border p-5">
    <p className="font-heading text-sm font-semibold text-foreground mb-1.5">{title}</p>
    <p className="font-body text-sm text-foreground/70">{flow}</p>
  </div>
);

/* ══════════════════════ PAGE ══════════════════════ */

const Project2 = () => {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const openLightbox = (src: string, alt: string) => setLightbox({ src, alt });
  const closeLightbox = () => setLightbox(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);
  useEffect(() => {
    document.body.style.overflow = lightbox ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  return (
    <>
      <Navbar />
      {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={closeLightbox} />}

      <main className="pt-24">
        {/* ══ Hero ══ */}
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
            <SectionLabel>UX & Estratégia de Produto • Voluntariado</SectionLabel>
            <h1 className="font-heading text-foreground text-[36px] md:text-[52px] font-bold leading-[1.1] mb-6">
              Sistema de Gestão<br />Acadêmica
            </h1>
            <p className="font-body text-lg text-muted-foreground max-w-[640px] leading-relaxed">
              Otimização da experiência acadêmica do Centro de Línguas da Fatec,
              transformando processos manuais em uma jornada digital estruturada para o Centro Paula Souza.
            </p>
          </div>
        </header>

        {/* ══ Content ══ */}
        <div className="px-6 md:px-12 lg:px-20 pb-20">
          <div className="max-w-[960px] mx-auto">

            {/* ── Contexto ── */}
            <section className="mt-16">
              <SectionLabel>Contexto</SectionLabel>
              <SectionTitle>Onde tudo começou</SectionTitle>
              <Body>
                <p>
                  O Centro de Línguas da Fatec Baixada Santista precisava estruturar melhor sua gestão acadêmica. Grande parte dos processos eram feitos de forma manual ou pouco integrada (usando Teams, e-mail e OneDrive) o que gerava retrabalho, falhas de comunicação e dificuldade no acompanhamento das informações.
                </p>
                <p>
                  Além disso, não existia um ambiente digital que permitisse ao aluno acompanhar sua jornada de forma clara e autônoma.
                </p>
              </Body>
            </section>

            <Divider />

            {/* ── Problema ── */}
            <section>
              <SectionTitle>O problema real</SectionTitle>
              <Body>
                <p>
                  A experiência acadêmica era fragmentada e pouco eficiente, tanto para professores quanto para alunos.
                </p>
              </Body>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-10">
                {[
                  { emoji: "📂", text: "Informações dispersas em múltiplas ferramentas" },
                  { emoji: "👁️", text: "Falta de visibilidade sobre desempenho e atividades" },
                  { emoji: "🤝", text: "Dependência de professores e secretaria para ações simples" },
                  { emoji: "📋", text: "Falta de padrão na organização da rotina acadêmica" },
                ].map((item) => (
                  <div
                    key={item.text}
                    className="rounded-xl bg-accent/50 border border-border p-5"
                  >
                    <span className="text-2xl block mb-2">{item.emoji}</span>
                    <p className="font-body text-sm text-foreground/80 font-medium">{item.text}</p>
                  </div>
                ))}
              </div>

              <Quote>
                O problema não era falta de informação, mas falta de organização.
              </Quote>
            </section>

            {/* ── Entendendo o problema na prática ── */}
            <section>
              <SectionLabel>Investigação</SectionLabel>
              <SectionTitle>Entendendo o problema na prática</SectionTitle>
              <Body>
                <p>
                  Antes de propor qualquer solução, precisei entender como alunos, professores e coordenação lidavam com os processos existentes no dia a dia.
                </p>
              </Body>

              <ClickableImage
                src={requisitosImg}
                alt="Levantamento de requisitos — cards com funcionalidades mapeadas"
                className="w-full rounded-xl border border-border shadow-sm"
                onOpen={(s, a) => openLightbox(s, a)}
              />
            </section>

            <Divider />

            {/* ── Objetivo ── */}
            <section>
              <SectionLabel>Objetivo</SectionLabel>
              <SectionTitle>O que eu queria resolver</SectionTitle>
              <Body>
                <p>Projetar um sistema centrado no aluno que:</p>
              </Body>
              <BulletList
                items={[
                  "Centralizasse todas as informações acadêmicas em um único lugar",
                  "Facilitasse o acompanhamento da jornada de aprendizado",
                  "Reduzisse a dependência de processos manuais",
                  "Melhorasse a organização e autonomia do aluno",
                ]}
              />

              <Quote>
                O foco deixou de ser a administração e passou a ser o aluno.
              </Quote>
            </section>

            <Divider />

            {/* ── Minha atuação ── */}
            <section>
              <SectionLabel>Minha atuação</SectionLabel>
              <SectionTitle>Do problema ao protótipo</SectionTitle>
              <Body>
                <p>
                  Atuei na estruturação completa da experiência, cobrindo todas as etapas do processo de design:
                </p>
              </Body>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 my-8">
                {[
                  "Definição de requisitos",
                  "Arquitetura da informação",
                  "Fluxos de navegação",
                  "Wireframes",
                  "Interface no Figma",
                  "Protótipo navegável",
                ].map((item) => (
                  <div key={item} className="rounded-lg bg-[#EDEAEA]/50 border border-border px-4 py-3 text-center">
                    <p className="font-body text-sm text-foreground/80 font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <Divider />

            {/* ── Solução ── */}
            <section>
              <SectionLabel>Solução</SectionLabel>
              <SectionTitle>Um hub acadêmico para o aluno</SectionTitle>
              <Body>
                <p>
                  A solução proposta foi um sistema digital que funcionasse como um <strong>hub acadêmico</strong>, reunindo tudo o que o aluno precisa em um único ambiente, de forma clara e acessível.
                </p>
              </Body>

              <Insight label="Conceito central">
                Um único lugar onde o aluno encontra cursos, notas, tarefas, agenda, certificados e solicitações, sem precisar recorrer a e-mails ou planilhas.
              </Insight>
            </section>

            <Divider />

            {/* ── Estrutura do sistema ── */}
            <section>
              <SectionLabel>Arquitetura</SectionLabel>
              <SectionTitle>Como organizei o sistema para o aluno</SectionTitle>
              <Body>
                <p>
                  A arquitetura foi estruturada a partir da lógica mental do aluno. Em vez de organizar por departamentos, organizei por tarefas e necessidades reais:
                </p>
              </Body>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-10">
                <NumberedItem
                  number="1"
                  title="Página inicial"
                  items={["Cursos ativos", "Agenda, tarefas e eventos", "Recados institucionais"]}
                />
                <NumberedItem
                  number="2"
                  title="Jornada acadêmica"
                  items={["Meus cursos", "Conteúdo do curso", "Tarefas", "Notas e faltas", "Relatório de desempenho"]}
                />
                <NumberedItem
                  number="3"
                  title="Gestão pessoal"
                  items={["Perfil do aluno", "Certificados", "Central de solicitações"]}
                />
              </div>

              <SubTitle>Como o aluno navega pelo sistema</SubTitle>
              <Body>
                <p>
                  Os fluxos foram desenhados para cobrir a jornada do aluno dentro do sistema, priorizando clareza e autonomia:
                </p>
              </Body>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
                <FlowItem title="Acompanhar desempenho" flow="Curso → Notas / Relatório → Visualização" />
                <FlowItem title="Gerenciar tarefas" flow="Tarefas → Visualização → Status (concluída, pendente)" />
                <FlowItem title="Organizar rotina" flow="Agenda → Visualização de compromissos" />
                <FlowItem title="Acessar certificados" flow="Certificados → Categoria → Visualização" />
              </div>

              <Insight label="Decisão de UX">
                Reduzir etapas e tornar ações evidentes. O aluno não deveria ter dúvidas sobre o próximo passo em nenhum momento.
              </Insight>
            </section>

            <Divider />

            {/* ── Wireframes ── */}
            <section>
              <SectionLabel>Wireframes</SectionLabel>
              <SectionTitle>Estruturando a solução</SectionTitle>
              <Body>
                <p>
                  Wireframes foram desenvolvidos para validar a estrutura e os fluxos antes de aplicar o design visual. O foco nessa etapa foi:
                </p>
              </Body>
              <BulletList
                items={[
                  "Definir hierarquia das informações",
                  "Garantir clareza nas ações principais",
                  "Testar organização dos blocos (página inicial, menu lateral, cards)",
                  "Manter consistência nos elementos visuais",
                ]}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <ClickableImage src={wireframe1} alt="Wireframe — Página inicial" onOpen={(s, a) => openLightbox(s, a)} className="rounded-xl border border-border shadow-sm" />
                <ClickableImage src={wireframe2} alt="Wireframe — Notas e Faltas" onOpen={(s, a) => openLightbox(s, a)} className="rounded-xl border border-border shadow-sm" />
                <ClickableImage src={wireframe3} alt="Wireframe — Minhas Tarefas" onOpen={(s, a) => openLightbox(s, a)} className="rounded-xl border border-border shadow-sm" />
                <ClickableImage src={wireframe4} alt="Wireframe — Agenda" onOpen={(s, a) => openLightbox(s, a)} className="rounded-xl border border-border shadow-sm" />
              </div>
            </section>

            <Divider />

            {/* ── Interface ── */}
            <section>
              <SectionLabel>Interface</SectionLabel>
              <SectionTitle>Dando forma à experiência</SectionTitle>
              <Body>
                <p>
                  A interface foi construída com foco em navegação intuitiva, consistência visual e escaneabilidade. Os padrões utilizados foram:
                </p>
              </Body>
              <BulletList
                items={[
                  "Cards para organização de conteúdo",
                  "Menu superior para navegação global",
                  "Menu lateral contextual dentro dos cursos",
                  "Destaque visual para ações e status (cores e botões)",
                ]}
              />

              <Insight label="Decisão de UX">
                Usar elementos familiares (como cards e menus laterais) para reduzir a curva de aprendizado e tornar o sistema acessível desde o primeiro uso.
              </Insight>

              {/* ── Showcase — storytelling layout ── */}
              <div className="my-12 space-y-16">

                {/* 🟢 1. Hero — Padrão 1: container com legenda abaixo */}
                <div className="bg-[hsl(0_0%_93%)] rounded-2xl p-4 md:p-6 shadow-sm">
                  <ClickableImage
                    src={telaPrincipal}
                    alt="Tela principal do sistema"
                    className="w-full rounded-xl shadow-md"
                    onOpen={(s, a) => openLightbox(s, a)}
                  />
                  <p className="font-body text-[13px] font-medium text-muted-foreground mt-4 leading-relaxed max-w-[720px]">
                    Dividi eventos em "próximos" e "anteriores" para ajudar o aluno a identificar rapidamente o que ainda é relevante.
                  </p>
                </div>

                {/* 🟡 2. Dashboard — Padrão 3: legenda ao lado */}
                <div className="max-w-[920px] mx-auto flex flex-col md:flex-row gap-6 items-center">
                  <div className="flex-1 min-w-0">
                    <div className="bg-[hsl(0_0%_93%)] rounded-2xl p-3 md:p-5 shadow-sm">
                      <ClickableImage
                        src={telaHome}
                        alt="Dashboard — Olá, Joana + atalhos"
                        className="w-full rounded-xl"
                        onOpen={(s, a) => openLightbox(s, a)}
                      />
                    </div>
                  </div>
                  <div className="md:w-[220px] flex-shrink-0">
                    <p className="font-body text-[13px] font-medium text-muted-foreground leading-relaxed">
                      Centralizei as principais funcionalidades na home para reduzir navegação e aumentar a autonomia do aluno.
                    </p>
                  </div>
                </div>

                {/* 🟡 3. Tarefas — Padrão 2: faixa integrada */}
                <div className="max-w-[820px] mx-auto rounded-2xl overflow-hidden shadow-sm">
                  <div className="bg-[hsl(0_0%_93%)] p-3 md:p-5">
                    <ClickableImage
                      src={telaTarefas}
                      alt="Tela de tarefas"
                      className="w-full rounded-xl"
                      onOpen={(s, a) => openLightbox(s, a)}
                    />
                  </div>
                  <div className="bg-[hsl(0_0%_90%)] px-5 py-3.5">
                    <p className="font-body text-[13px] font-medium text-muted-foreground leading-relaxed">
                      Estruturei a tarefa com instruções, envio e dúvidas no mesmo fluxo para evitar interrupções na navegação.
                    </p>
                  </div>
                </div>

                {/* 🔹 4. Duas colunas — Padrão 1: container com legenda abaixo */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-[hsl(0_0%_93%)] rounded-2xl p-3 md:p-4 shadow-sm">
                    <ClickableImage
                      src={telaAgenda}
                      alt="Tela de agenda"
                      className="w-full rounded-xl"
                      onOpen={(s, a) => openLightbox(s, a)}
                    />
                    <p className="font-body text-[13px] font-medium text-muted-foreground mt-3 leading-relaxed">
                      Centralizei os compromissos em uma única agenda para evitar a dependência de múltiplas ferramentas.
                    </p>
                  </div>
                  <div className="bg-[hsl(0_0%_93%)] rounded-2xl p-3 md:p-4 shadow-sm">
                    <ClickableImage
                      src={telaNotas}
                      alt="Tela de notas e faltas"
                      className="w-full rounded-xl"
                      onOpen={(s, a) => openLightbox(s, a)}
                    />
                    <p className="font-body text-[13px] font-medium text-muted-foreground mt-3 leading-relaxed">
                      Apresentei o desempenho de forma simples e estruturada para facilitar a leitura e acompanhamento.
                    </p>
                  </div>
                </div>

                {/* 🔹 5. Certificados — Padrão 3: legenda ao lado */}
                <div className="max-w-[780px] mx-auto flex flex-col md:flex-row-reverse gap-6 items-center">
                  <div className="flex-1 min-w-0">
                    <div className="bg-[hsl(0_0%_93%)] rounded-2xl p-3 md:p-5 shadow-sm">
                      <ClickableImage
                        src={telaCertificados}
                        alt="Tela de certificados"
                        className="w-full rounded-xl"
                        onOpen={(s, a) => openLightbox(s, a)}
                      />
                    </div>
                  </div>
                  <div className="md:w-[200px] flex-shrink-0">
                    <p className="font-body text-[13px] font-medium text-muted-foreground leading-relaxed">
                      Organizei os certificados por categoria para tornar a navegação mais intuitiva.
                    </p>
                  </div>
                </div>

                {/* 🔹 6. Eventos — Padrão 2: faixa integrada */}
                <div className="max-w-[880px] rounded-2xl overflow-hidden shadow-sm">
                  <div className="bg-[hsl(0_0%_93%)] p-3 md:p-5">
                    <ClickableImage
                      src={telaEventos}
                      alt="Tela de eventos — página inicial"
                      className="w-full rounded-xl"
                      onOpen={(s, a) => openLightbox(s, a)}
                    />
                  </div>
                  <div className="bg-[hsl(0_0%_90%)] px-5 py-3.5">
                    <p className="font-body text-[13px] font-medium text-muted-foreground leading-relaxed">
                      Organizei eventos, notícias e recados em blocos distintos para facilitar a leitura e priorização das informações.
                    </p>
                  </div>
                </div>

              </div>
            </section>

            <Divider />

            {/* ── Protótipo ── */}
            <section>
              <SectionLabel>Protótipo</SectionLabel>
              <SectionTitle>Transformando em experiência real</SectionTitle>
              <Body>
                <p>
                  Foi desenvolvido um protótipo interativo para simular a experiência real do aluno. Ele permitiu validar a navegação entre páginas, testar a compreensão dos fluxos e identificar pontos de melhoria antes de qualquer implementação.
                </p>
              </Body>


              <FigmaEmbed
                title="Protótipo interativo do sistema"
                protoUrl="https://www.figma.com/proto/CZnTZSRBKNTum8tegBbUB8/Sistema-Centro-de-Linguas?page-id=0%3A1&node-id=188-4919&viewport=1611%2C-1686%2C0.42&t=8kylNFRgq4ejFzSO-1&scaling=contain&content-scaling=fixed&starting-point-node-id=432%3A55&show-proto-sidebar=1"
              />
            </section>

            <Divider />

            {/* ── Decisões estratégicas ── */}
            <section>
              <SectionLabel>Decisões</SectionLabel>
              <SectionTitle>Escolhas que moldaram o produto</SectionTitle>
              <Body>
                <p>
                  Algumas decisões foram fundamentais para a construção da solução:
                </p>
              </Body>

              <div className="space-y-4 my-8">
                {[
                  "Centralizar a experiência no aluno",
                  "Transformar a home em um hub central com visão consolidada",
                  "Integrar agenda, tarefas e eventos no mesmo ambiente",
                  "Usar feedback visual (cores e status) para orientar ações",
                  "Separar navegação global e navegação contextual",
                  "Estruturar fluxos com o mínimo de etapas possível",
                ].map((item, i) => (
                  <div key={item} className="flex items-start gap-4 rounded-lg border border-border bg-card p-4">
                    <span className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-heading text-xs font-bold flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <p className="font-body text-[15px] text-foreground/85 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <Divider />

            {/* ── Impacto ── */}
            <section>
              <SectionLabel>Impacto</SectionLabel>
              <SectionTitle>O que essa solução pode mudar</SectionTitle>
              <Body>
                <p>A solução tem potencial para transformar a rotina acadêmica em diversas frentes:</p>
              </Body>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-10">
                {[
                  { icon: "🚀", text: "Aumentar a autonomia do aluno" },
                  { icon: "💬", text: "Reduzir dúvidas e dependência da secretaria" },
                  { icon: "📊", text: "Melhorar a organização e acompanhamento acadêmico" },
                  { icon: "🔍", text: "Tornar a comunicação mais clara e acessível" },
                ].map((item) => (
                  <div key={item.text} className="rounded-xl border border-border bg-card p-5">
                    <span className="text-2xl block mb-2">{item.icon}</span>
                    <p className="font-body text-sm text-foreground/80 font-medium">{item.text}</p>
                  </div>
                ))}
              </div>
            </section>

            <Divider />

            {/* ── Aprendizados ── */}
            <section>
              <SectionLabel>Aprendizados</SectionLabel>
              <SectionTitle>O que eu levo deste projeto</SectionTitle>

              <div className="space-y-6 my-8">
                {[
                  "A arquitetura da informação impacta diretamente a usabilidade (mais do que o visual)",
                  "Integrar funcionalidades (agenda + tarefas + eventos) cria mais valor do que ferramentas isoladas",
                  "Pequenas decisões visuais (como cores e status) têm grande impacto na compreensão do usuário",
                ].map((text) => (
                  <div key={text} className="flex items-start gap-4">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p className="font-body text-base text-foreground/85 leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>

              <Quote>
                A importância de pesquisar e compreender a real necessidade do usuário, aliada à estruturação da arquitetura da informação, mudou a forma de projetar o Sistema do Centro de Línguas e, consequentemente, de qualquer produto digital.
              </Quote>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Project2;
