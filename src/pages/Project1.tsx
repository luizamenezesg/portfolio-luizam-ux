import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ExternalLink, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FigmaEmbed from "@/components/FigmaEmbed";

import iconesNavImg from "@/assets/project1-icones-nav.png";
import iconesUiImg from "@/assets/project1-icones-ui.png";
import priorizacaoImg from "@/assets/project1-priorizacao.png";
import jornadaImg from "@/assets/project1-jornada.png";
import empatiaImg from "@/assets/project1-empatia.png";
import personaImg from "@/assets/project1-persona.png";
import benchmarkingImg from "@/assets/project1-benchmarking.png";
import csdCertezasImg from "@/assets/project1-csd-certezas.png";
import csdSuposicoesImg from "@/assets/project1-csd-suposicoes.png";
import csdDuvidasImg from "@/assets/project1-csd-duvidas.png";
import mvpHomeImg from "@/assets/project1-mvp-home.jpg";
import mvpBuscaImg from "@/assets/project1-mvp-busca.jpg";
import mvpProdutoImg from "@/assets/project1-mvp-produto.jpg";
import mvpCompararImg from "@/assets/project1-mvp-comparar.jpg";
import mvpListaImg from "@/assets/project1-mvp-lista.jpg";
import mvpAvaliacoesImg from "@/assets/project1-mvp-avaliacoes.jpg";

const MVP_URL = "#"; // TODO: link publicado do MVP (Figma Make)
const PROTO_APP_URL =
  "https://www.figma.com/proto/scbZWkNkfk6vhWjP9AqQkt/Projeto-EBAC---Curso-UX-Design?page-id=0%3A1&node-id=83-462&starting-point-node-id=24%3A99&t=wCnw2q0d6kUPJanY-1";
const PROTO_SITE_URL =
  "https://www.figma.com/proto/TvuQdcNCi6VE9JKHAURNbj/Projeto-EBAC---Curso-Figma---Site?page-id=0%3A1&node-id=108-437&starting-point-node-id=108%3A812&scaling=contain&content-scaling=fixed&t=5FP5ezxRQvgzZQR3-1";

const LinkButton = ({ href, children, primary = false }: { href: string; children: React.ReactNode; primary?: boolean }) => (
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
    {children} <ExternalLink size={14} />
  </a>
);

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

/* ── tiny reusable blocks ── */

const Quote = ({ children }: { children: React.ReactNode }) => (
  <blockquote className="my-12 md:my-16 border-l-4 border-primary pl-6 md:pl-8 py-2">
    <p className="font-heading text-xl md:text-2xl font-semibold text-foreground/90 leading-relaxed italic">
      {children}
    </p>
  </blockquote>
);

const Insight = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="rounded-2xl bg-accent/60 border border-border p-6 md:p-8">
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

/* ── Clickable image components ── */

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
    <ClickableImage src={src} alt={alt} className="w-full" onOpen={onOpen} />
  </div>
);

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

const ImageGrid = ({
  images,
  onOpen,
}: {
  images: { src: string; alt: string }[];
  onOpen: (src: string, alt: string) => void;
}) => (
  <div
    className={`grid gap-4 my-8 ${
      images.length === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-3"
    }`}
  >
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

/* ── Font specimen ── */

const FontSpecimen = () => (
  <div className="my-8 rounded-xl border border-border bg-card p-6 md:p-8 space-y-6">
    <div>
      <p className="font-body text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-3">Inter — Font Family</p>
    </div>
    {[
      { weight: "font-light", label: "Light 300", size: "text-3xl md:text-4xl" },
      { weight: "font-normal", label: "Regular 400", size: "text-3xl md:text-4xl" },
      { weight: "font-medium", label: "Medium 500", size: "text-2xl md:text-3xl" },
      { weight: "font-semibold", label: "Semi Bold 600", size: "text-xl md:text-2xl" },
      { weight: "font-bold", label: "Bold 700", size: "text-lg md:text-xl" },
    ].map((spec) => (
      <div key={spec.label} className="flex flex-col gap-1">
        <span className="font-body text-xs text-muted-foreground tracking-wide">{spec.label}</span>
        <p className={`font-body ${spec.weight} ${spec.size} text-foreground leading-tight`}>
          Economizando
        </p>
      </div>
    ))}
    <div className="pt-4 border-t border-border space-y-2">
      <p className="font-body text-xs text-muted-foreground tracking-wide">Escala tipográfica</p>
      <p className="font-body text-[40px] font-bold text-foreground leading-none">Aa</p>
      <p className="font-body text-2xl font-semibold text-foreground/90">Heading — 24px Semi Bold</p>
      <p className="font-body text-base text-foreground/85">Body — 16px Regular. A fonte Inter foi escolhida por sua alta legibilidade e familiaridade.</p>
      <p className="font-body text-sm text-muted-foreground">Caption — 14px Regular</p>
      <p className="font-body text-xs text-muted-foreground">Overline — 12px Medium</p>
    </div>
  </div>
);

/* ── new blocks for the recruiter-oriented case ── */

const Card = ({ children, className = "" }: { key?: React.Key; children: React.ReactNode; className?: string }) => (
  <div className={`rounded-xl border border-border bg-card p-5 ${className}`}>{children}</div>
);

const CardTitle = ({ children }: { children: React.ReactNode }) => (
  <h4 className="font-heading text-sm font-semibold text-foreground">{children}</h4>
);

const CardText = ({ children }: { children: React.ReactNode }) => (
  <p className="font-body text-sm text-muted-foreground mt-1 leading-relaxed">{children}</p>
);

const Chips = ({ items }: { items: string[] }) => (
  <div className="flex flex-wrap gap-2 mt-3">
    {items.map((item) => (
      <span
        key={item}
        className="font-body text-xs text-foreground/80 bg-accent/70 border border-border rounded-full px-3 py-1"
      >
        {item}
      </span>
    ))}
  </div>
);

const Screenshot = ({
  src,
  alt,
  caption,
  onOpen,
}: {
  src: string;
  alt: string;
  caption: string;
  onOpen: (src: string, alt: string) => void;
}) => (
  <figure className="my-6">
    <ClickableImage
      src={src}
      alt={alt}
      className="w-full rounded-xl border border-border shadow-sm"
      onOpen={onOpen}
    />
    <figcaption className="font-body text-sm text-muted-foreground mt-3 leading-relaxed">{caption}</figcaption>
  </figure>
);

const BeforeAfter = ({ rows }: { rows: { before: string; after: string; why: string }[] }) => (
  <div className="my-8 rounded-xl border border-border overflow-hidden">
    <div className="hidden md:grid grid-cols-[1fr_1fr_1.3fr] bg-accent/60 px-5 py-3 font-body text-[11px] tracking-[0.2em] uppercase text-primary font-semibold">
      <span>Antes</span>
      <span>Depois</span>
      <span>Por quê</span>
    </div>
    {rows.map((row) => (
      <div
        key={row.after}
        className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1.3fr] gap-1 md:gap-4 px-5 py-4 border-t border-border first:border-t-0 md:first:border-t bg-card"
      >
        <span className="font-body text-sm text-muted-foreground line-through decoration-muted-foreground/50">{row.before}</span>
        <span className="font-body text-sm font-semibold text-foreground">{row.after}</span>
        <span className="font-body text-sm text-foreground/75">{row.why}</span>
      </div>
    ))}
  </div>
);

/* ── page ── */

const Project1 = () => {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  const openLightbox = (src: string, alt: string) => setLightbox({ src, alt });
  const closeLightbox = () => setLightbox(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightbox) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  return (
    <>
      <Navbar />

      {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={closeLightbox} />}

      <main className="pt-24">
        {/* ── Hero ── */}
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
            <SectionLabel>UX Research • Product Design • UI Design • MVP</SectionLabel>
            <h1 className="font-heading text-foreground text-[40px] md:text-[52px] font-bold leading-[1.1] mb-6">
              Economizando: comparação<br className="hidden md:block" /> de preços de supermercado
            </h1>
            <p className="font-body text-lg text-muted-foreground max-w-[680px] leading-relaxed">
              Da pesquisa com usuários a um MVP funcional: uma plataforma que mostra onde cada produto está mais barato perto de você, calcula o preço por kg ou litro e organiza listas de compras compartilháveis.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
              {[
                { label: "Meu papel", value: "UX Researcher e Product Designer (projeto individual)" },
                { label: "Quando", value: "Pesquisa e protótipos em 2023 · MVP funcional em 2026" },
                { label: "Plataformas", value: "App mobile e site desktop responsivo" },
                { label: "Ferramentas", value: "Figma e FigJam (2023) · Figma Make com IA (2026)" },
              ].map((item) => (
                <div key={item.label} className="border-t-2 border-primary/30 pt-3">
                  <p className="font-body text-[11px] tracking-[0.2em] uppercase text-primary font-semibold">{item.label}</p>
                  <p className="font-body text-sm text-foreground/85 mt-1 leading-relaxed">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mt-8">
              <LinkButton href={MVP_URL} primary>Ver MVP em funcionamento</LinkButton>
              <LinkButton href={PROTO_SITE_URL}>Protótipo site (Figma)</LinkButton>
              <LinkButton href={PROTO_APP_URL}>Protótipo app (Figma)</LinkButton>
            </div>
          </div>
        </header>

        <div className="px-6 md:px-12 lg:px-20">
          <div className="max-w-[1100px] mx-auto">
            <ClickableImage
              src={mvpHomeImg}
              alt="Página inicial do MVP funcional do Economizando"
              className="w-full rounded-2xl border border-border shadow-xl mt-6"
              onOpen={openLightbox}
            />
            <p className="font-body text-sm text-muted-foreground mt-3 text-center">
              MVP funcional (2026). O visual é uma evolução do protótipo original de 2023.
            </p>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="px-6 md:px-12 lg:px-20 pb-20">
          <div className="max-w-[960px] mx-auto">

            {/* ─ Resumo ─ */}
            <section className="mt-16">
              <SectionLabel>Resumo</SectionLabel>
              <SectionTitle>O case em 30 segundos</SectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardTitle>Desafio</CardTitle>
                  <CardText>
                    Comparar preços de supermercado exige abrir várias abas e fazer contas de cabeça. Os apps existentes tinham interfaces confusas, cobertura regional falha e listas engessadas.
                  </CardText>
                </Card>
                <Card>
                  <CardTitle>Solução</CardTitle>
                  <CardText>
                    Uma busca que mostra o mercado mais barato perto do usuário, com o preço por kg ou litro calculado automaticamente, comparação lado a lado e listas que se compartilham pelo WhatsApp.
                  </CardText>
                </Card>
                <Card>
                  <CardTitle>Resultado</CardTitle>
                  <CardText>
                    Protótipos mobile e desktop (2023) refinados a partir de testes com usuários e, em 2026, um MVP funcional com 11 telas, construído com IA a partir dos requisitos da pesquisa.
                  </CardText>
                </Card>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {[
                  { n: "2", t: "personas definidas a partir da pesquisa" },
                  { n: "10", t: "heurísticas avaliadas em um concorrente" },
                  { n: "3 × 4", t: "usuários testados × tarefas no teste" },
                  { n: "11", t: "telas funcionais no MVP" },
                ].map((s) => (
                  <div key={s.t} className="rounded-xl bg-accent/60 border border-border p-5">
                    <p className="font-heading text-3xl font-bold text-primary leading-none">{s.n}</p>
                    <p className="font-body text-sm text-foreground/80 mt-2 leading-snug">{s.t}</p>
                  </div>
                ))}
              </div>

              <SubTitle>Linha do tempo</SubTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl border border-border bg-card p-5 border-l-4 border-l-primary">
                  <p className="font-heading text-2xl font-bold text-primary">2023</p>
                  <CardTitle>Pesquisa, UX e protótipos</CardTitle>
                  <CardText>
                    Projeto da formação em UX Design da EBAC: pesquisa, personas, testes de usabilidade e protótipos de alta fidelidade para app e site, no Figma.
                  </CardText>
                </div>
                <div className="rounded-xl border border-border bg-card p-5 border-l-4 border-l-secondary">
                  <p className="font-heading text-2xl font-bold text-secondary">2026</p>
                  <CardTitle>MVP funcional</CardTitle>
                  <CardText>
                    Três anos depois, retomei o projeto e o transformei em um produto navegável com IA (Figma Make). A pesquisa e os requisitos são os mesmos; o design foi atualizado e é diferente dos protótipos originais.
                  </CardText>
                </div>
              </div>

              <SubTitle>Habilidades demonstradas</SubTitle>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardTitle>UX Research</CardTitle>
                  <Chips items={["Desk research", "Matriz CSD", "Benchmarking", "Questionário", "Personas", "Mapa de empatia", "Jornada", "Análise heurística", "Teste de usabilidade"]} />
                </Card>
                <Card>
                  <CardTitle>Product Design</CardTitle>
                  <Chips items={["Needs statement", "Priorização impacto × esforço", "Definição de MVP", "Requisitos", "Critérios de aceite", "Prototipação com IA"]} />
                </Card>
                <Card>
                  <CardTitle>UI Design</CardTitle>
                  <Chips items={["UX writing", "Design visual", "Tipografia", "Cor", "Iconografia", "Protótipo hi-fi", "Responsivo", "Acessibilidade"]} />
                </Card>
              </div>
            </section>

            <Divider />

            {/* ─ Problema ─ */}
            <section>
              <SectionLabel>Contexto</SectionLabel>
              <SectionTitle>O problema</SectionTitle>
              <Body>
                <p>
                  Com a alta dos preços, comparar valores antes de ir ao mercado virou hábito para muita gente. Mas a tarefa é cansativa: quem busca o melhor custo-benefício abre vários sites, cruza informações por conta própria e ainda precisa calcular qual embalagem compensa mais.
                </p>
              </Body>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-10">
                {[
                  { emoji: "🧠", text: "Sobrecarga cognitiva" },
                  { emoji: "😟", text: "Insegurança na decisão de compra" },
                  { emoji: "⏱️", text: "Perda de tempo em tarefas repetitivas" },
                ].map((item) => (
                  <div key={item.text} className="rounded-xl bg-accent/50 border border-border p-5 text-center">
                    <span className="text-2xl block mb-2">{item.emoji}</span>
                    <p className="font-body text-sm text-foreground/80 font-medium">{item.text}</p>
                  </div>
                ))}
              </div>

              <Quote>
                Como poderíamos ajudar quem faz as compras da casa a descobrir onde cada produto está mais barato, sem abrir dezenas de abas nem fazer contas?
              </Quote>
              <Body>
                <p>
                  A proposta não era só mostrar o menor preço, e sim ajudar a planejar as compras: comparar embalagens de tamanhos diferentes, considerar a distância até o mercado e organizar listas para dividir com a família.
                </p>
              </Body>
            </section>

            <Divider />

            {/* ─ Processo ─ */}
            <section>
              <SectionLabel>Processo</SectionLabel>
              <SectionTitle>Como trabalhei</SectionTitle>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 my-8">
                {[
                  { step: "Descobrir", items: "Desk research, proto-persona, CSD, benchmarking, questionário" },
                  { step: "Definir", items: "Personas, mapas de empatia, jornadas, needs statement" },
                  { step: "Idear", items: "Brainstorming e grid de priorização" },
                  { step: "Prototipar e testar", items: "Baixa fidelidade, análise heurística, teste de usabilidade" },
                  { step: "Entregar", items: "UX writing, visual design, hi-fi e MVP funcional" },
                ].map((s, i) => (
                  <div key={s.step} className="rounded-xl border border-border bg-card p-4">
                    <span className="font-heading text-lg font-bold text-primary/40">{String(i + 1).padStart(2, "0")}</span>
                    <h4 className="font-heading text-sm font-semibold text-foreground mt-1">{s.step}</h4>
                    <p className="font-body text-xs text-muted-foreground mt-1 leading-relaxed">{s.items}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ─ Pesquisa ─ */}
            <section>
              <SectionLabel>Descobrir</SectionLabel>
              <SectionTitle>Entendendo o cenário</SectionTitle>

              <SubTitle>Desk research</SubTitle>
              <BulletList
                items={[
                  "Pesquisar preços online antes de comprar na loja física é um hábito comum do brasileiro, principalmente entre 18 e 34 anos",
                  "Muitas pessoas compartilham promoções com amigos e familiares",
                  "Quem compra online também vai ao mercado conferir ou trocar produtos quando a loja é perto de casa",
                ]}
              />

              <SubTitle>Proto-persona e Matriz CSD</SubTitle>
              <Body>
                <p>
                  Antes de falar com usuários, registrei o que eu já sabia, o que estava supondo e o que precisava descobrir. Isso definiu as perguntas da pesquisa.
                </p>
              </Body>
              <NarrowImage src={personaImg} alt="Proto-persona: Joana Medeiros" maxWidth="720px" onOpen={openLightbox} />
              <ImageGrid
                images={[
                  { src: csdCertezasImg, alt: "Matriz CSD — Certezas" },
                  { src: csdSuposicoesImg, alt: "Matriz CSD — Suposições" },
                  { src: csdDuvidasImg, alt: "Matriz CSD — Dúvidas" },
                ]}
                onOpen={openLightbox}
              />

              <SubTitle>Benchmarking</SubTitle>
              <Body>
                <p>
                  Comparei as funcionalidades dos concorrentes em uma tabela (tem / não tem) e anotei o que cada um fazia bem e onde falhava.
                </p>
              </Body>
              <BulletList
                items={[
                  "Preços desatualizados e cobertura regional falha",
                  "Listas pouco flexíveis e difíceis de editar",
                  "Excesso de informação sem hierarquia clara",
                ]}
              />
              <Insight label="Oportunidade">
                Unir geolocalização, cálculo automático do preço por unidade e listas personalizadas e compartilháveis em uma interface simples.
              </Insight>
              <NarrowImage src={benchmarkingImg} alt="Tabela comparativa de funcionalidades — Benchmarking" onOpen={openLightbox} />

              <SubTitle>Pesquisa com usuários</SubTitle>
              <Body>
                <p>Para validar as suposições, apliquei um questionário online guiado por duas perguntas centrais:</p>
              </Body>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                <Card>
                  <CardText>"Você compara preços de produtos de supermercado antes de realizar uma compra?"</CardText>
                </Card>
                <Card>
                  <CardText>"Qual a fonte de pesquisa que você utiliza para fazer essa comparação?"</CardText>
                </Card>
              </div>
              <Body>
                <p>O que os usuários disseram que esperavam de uma plataforma assim:</p>
              </Body>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-6">
                {[
                  "Fonte de preços confiável e com ofertas atualizadas",
                  "Calculadora automática de preço por unidade",
                  "Filtros por preço, categoria e localização",
                  "Avaliações de outros consumidores",
                  "Histórico de preço para saber se a promoção é real",
                  "Produtos disponíveis por proximidade",
                  "Variedade de produtos",
                  "Interface clara, com o essencial fácil de entender",
                ].map((t) => (
                  <div key={t} className="flex items-start gap-3 rounded-lg border border-border bg-card px-4 py-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-[8px] flex-shrink-0" />
                    <p className="font-body text-sm text-foreground/85">{t}</p>
                  </div>
                ))}
              </div>
            </section>

            <Divider />

            {/* ─ Definir ─ */}
            <section>
              <SectionLabel>Definir</SectionLabel>
              <SectionTitle>Quem é o usuário e do que ele precisa</SectionTitle>

              <SubTitle>Personas, empatia e jornada</SubTitle>
              <Body>
                <p>
                  Agrupei os achados por similaridade e cheguei a duas personas. A principal é uma mulher entre 28 e 34 anos, comprometida, que cuida das compras da casa e busca praticidade e economia. Os mapas de empatia e as jornadas mostraram onde ela sente insegurança e onde desiste.
                </p>
              </Body>
              <ImageGrid
                images={[
                  { src: empatiaImg, alt: "Mapa de empatia" },
                  { src: jornadaImg, alt: "Jornada do usuário" },
                ]}
                onOpen={openLightbox}
              />

              <SubTitle>Needs statement e priorização</SubTitle>
              <Insight label="Estrutura usada">
                "[Persona] precisa de um jeito de [necessidade] para [motivo]". Para cada persona, levantei cinco soluções possíveis e posicionei todas em um grid de impacto × esforço.
              </Insight>
              <Body>
                <p className="mt-6">O que entrou no MVP:</p>
              </Body>
              <BulletList
                items={[
                  "Comparação de preços entre produtos",
                  "Cálculo automático do custo-benefício (preço por unidade)",
                  "Listas de compras múltiplas e compartilháveis",
                  "Avaliação de produtos",
                ]}
              />
              <NarrowImage src={priorizacaoImg} alt="Grid de priorização: Impacto x Esforço" maxWidth="760px" onOpen={openLightbox} />
            </section>

            <Divider />

            {/* ─ Heurística ─ */}
            <section>
              <SectionLabel>Prototipar e testar</SectionLabel>
              <SectionTitle>Aprendendo com os erros do concorrente</SectionTitle>
              <Body>
                <p>
                  Fiz uma análise heurística (10 heurísticas de Nielsen) de um app concorrente. Cada problema encontrado virou uma decisão de design:
                </p>
              </Body>
              <div className="my-8 rounded-xl border border-border overflow-hidden">
                <div className="hidden md:grid grid-cols-2 bg-accent/60 px-5 py-3 font-body text-[11px] tracking-[0.2em] uppercase text-primary font-semibold">
                  <span>No concorrente</span>
                  <span>No Economizando</span>
                </div>
                {[
                  ["Não dá para renomear listas nem criar mais do que três", "Listas ilimitadas, com renomear e duplicar"],
                  ["O link compartilhado pelo WhatsApp não abre a lista", "Link que abre a lista de verdade, com opção de salvar uma cópia"],
                  ["Excluir um item não tem \"desfazer\"", "Confirmação antes de excluir e botão \"Desfazer\""],
                  ["Sem mercados cadastrados na região de Santos-SP", "Base com mercados da Baixada Santista e busca por raio"],
                  ["Botões de duas cores e tamanhos de texto inconsistentes", "Um único estilo para ações principais e hierarquia tipográfica clara"],
                  ["Telas pesadas, letras escuras e pouco espaçamento", "Cards limpos, mais respiro e o preço em destaque"],
                ].map(([a, b]) => (
                  <div key={a} className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-4 px-5 py-4 border-t border-border bg-card">
                    <span className="font-body text-sm text-muted-foreground">{a}</span>
                    <span className="font-body text-sm font-medium text-foreground flex items-start gap-2">
                      <ArrowRight size={16} className="text-primary mt-0.5 flex-shrink-0 hidden md:block" />
                      {b}
                    </span>
                  </div>
                ))}
              </div>

              <SubTitle>Teste de usabilidade</SubTitle>
              <Body>
                <p>
                  Testei o protótipo de baixa fidelidade com três usuários. Cada um realizou quatro tarefas, e registrei conclusão, tempo, erros e uma nota de dificuldade de 1 (fácil) a 5 (muito difícil).
                </p>
              </Body>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-6">
                {[
                  "Adicionar um produto à lista de compras",
                  "Adicionar um produto à lista de comparação",
                  "Avaliar um produto",
                  "Criar mais uma lista de compras",
                ].map((t, i) => (
                  <div key={t} className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3">
                    <span className="font-heading text-sm font-bold text-primary">T{i + 1}</span>
                    <p className="font-body text-sm text-foreground/85">{t}</p>
                  </div>
                ))}
              </div>
              <Body>
                <p>Os testes mostraram que os rótulos geravam dúvida. Ajustei o UX writing e a interface:</p>
              </Body>
              <BeforeAfter
                rows={[
                  { before: "Adicionar à lista", after: "Adicionar à lista de compras", why: "Deixa claro para qual lista o produto vai" },
                  { before: "Avaliação", after: "Ver avaliações", why: "O link leva para a leitura das avaliações, não para avaliar" },
                  { before: "Avaliar só na tela de avaliações", after: "\"Escrever avaliação\" também no detalhe do produto", why: "Encurta o caminho da tarefa 3" },
                  { before: "Adicionar produto", after: "Adicionar mais produtos", why: "Indica que a ação pode ser repetida" },
                  { before: "Nenhuma confirmação", after: "Mensagem de confirmação ao adicionar", why: "Visibilidade do status do sistema" },
                ]}
              />
              <Insight label="Aprendizado">
                Os testes revelaram problemas de clareza que a análise heurística sozinha não teria mostrado. Termos consistentes para a mesma ação reduziram a dúvida em todas as tarefas.
              </Insight>
            </section>

            <Divider />

            {/* ─ Identidade ─ */}
            <section>
              <SectionLabel>Entregar</SectionLabel>
              <SectionTitle>A voz e a cara do produto</SectionTitle>

              <SubTitle>UX writing e princípios de UX</SubTitle>
              <Body>
                <p>
                  Tom de voz <strong>casual e entusiasmado</strong>, pensado para a persona: direto, próximo e com verbos de ação claros. Nas telas, apliquei leis e princípios de UX:
                </p>
              </Body>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-6">
                {[
                  { t: "Lei de Fitts", d: "Botões de ação grandes e fáceis de alcançar" },
                  { t: "Lei de Hick", d: "Poucas opções por tela para decidir mais rápido" },
                  { t: "Lei de Jakob", d: "Padrões de e-commerce que o usuário já conhece" },
                  { t: "Efeito Von Restorff", d: "Selo amarelo destaca o melhor custo-benefício" },
                  { t: "Gestalt", d: "Proximidade e região comum agrupam preço, preço/kg e mercado" },
                  { t: "Pico e final", d: "Confirmações positivas no fim de cada tarefa" },
                ].map((p) => (
                  <Card key={p.t}>
                    <CardTitle>{p.t}</CardTitle>
                    <CardText>{p.d}</CardText>
                  </Card>
                ))}
              </div>

              <SubTitle>Identidade visual</SubTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 mb-8">
                <div className="flex items-center gap-4 p-5 rounded-xl border border-border bg-card">
                  <div className="w-16 h-16 rounded-lg bg-[#162C9A] flex-shrink-0" />
                  <div>
                    <h5 className="font-heading text-base font-semibold text-foreground">Azul #162C9A</h5>
                    <p className="font-body text-sm text-muted-foreground mt-1">Confiança, lealdade e competência: credibilidade para quem compara preços</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-5 rounded-xl border border-border bg-card">
                  <div className="w-16 h-16 rounded-lg bg-[#FFD027] flex-shrink-0" />
                  <div>
                    <h5 className="font-heading text-base font-semibold text-foreground">Amarelo #FFD027</h5>
                    <p className="font-body text-sm text-muted-foreground mt-1">Criatividade, alegria e calor: energia nas ações principais</p>
                  </div>
                </div>
              </div>
              <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground font-semibold mb-4 mt-8">
                Cores complementares
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-4 p-5 rounded-xl border border-border bg-card">
                  <div className="w-16 h-16 rounded-lg bg-[#1FCEF0] flex-shrink-0" />
                  <div>
                    <h5 className="font-heading text-base font-semibold text-foreground">Ciano #1FCEF0</h5>
                    <p className="font-body text-sm text-muted-foreground mt-1">Frescor, modernidade e clareza</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-5 rounded-xl border border-border bg-card">
                  <div className="w-16 h-16 rounded-lg bg-[#EDEAEA] flex-shrink-0" />
                  <div>
                    <h5 className="font-heading text-base font-semibold text-foreground">Cinza claro #EDEAEA</h5>
                    <p className="font-body text-sm text-muted-foreground mt-1">Neutralidade, leveza e equilíbrio</p>
                  </div>
                </div>
              </div>

              <h4 className="font-heading text-lg font-semibold text-foreground mt-10 mb-4">Tipografia</h4>
              <Body>
                <p>
                  Inter: alta legibilidade no celular e no computador, e familiar para quem já usa apps de supermercado e e-commerce, o que reduz a curva de aprendizado.
                </p>
              </Body>
              <FontSpecimen />

              <h4 className="font-heading text-lg font-semibold text-foreground mt-10 mb-4">Ícones</h4>
              <Body>
                <p>Ícones já reconhecidos em interfaces digitais (casa, lupa, lista, perfil, coração, compartilhar), para navegar sem precisar ler.</p>
              </Body>
              <ImageGrid
                images={[
                  { src: iconesNavImg, alt: "Ícones de navegação" },
                  { src: iconesUiImg, alt: "Ícones de interface" },
                ]}
                onOpen={openLightbox}
              />

              <SubTitle>Protótipos navegáveis originais (2023)</SubTitle>
              <Body>
                <p>Os protótipos de alta fidelidade feitos em 2023, para app e site, no design original. Navegue aqui ou abra no Figma:</p>
              </Body>
              <div className="flex flex-wrap gap-3 my-6">
                <LinkButton href={PROTO_APP_URL}>Abrir protótipo do app no Figma</LinkButton>
                <LinkButton href={PROTO_SITE_URL}>Abrir protótipo do site no Figma</LinkButton>
              </div>
              <FigmaEmbed
                title="Protótipo App"
                protoUrl={PROTO_APP_URL}
              />
              <FigmaEmbed
                title="Protótipo Site"
                protoUrl={PROTO_SITE_URL}
              />
            </section>

            <Divider />

            {/* ─ MVP funcional ─ */}
            <section>
              <SectionLabel>Do protótipo ao produto</SectionLabel>
              <SectionTitle>MVP funcional (2026)</SectionTitle>
              <Body>
                <p>
                  Em 2026, retomei o projeto para testar se a solução funcionava de verdade e o transformei em um produto navegável. Escrevi um documento de requisitos a partir da pesquisa e usei prompt engineering no Figma Make (IA) para gerar o código. Depois revisei o resultado contra critérios de aceite baseados nas tarefas do teste de usabilidade.
                </p>
              </Body>

              <Insight label="Design diferente do original">
                O MVP não reproduz os protótipos de 2023 tela a tela. A pesquisa, os fluxos, os requisitos e a identidade (azul #162C9A e amarelo #FFD027) foram mantidos, mas o layout e os componentes foram atualizados para uma interface mais atual e responsiva.
              </Insight>
              <div className="flex flex-wrap gap-3 mt-6">
                <LinkButton href={MVP_URL} primary>Ver MVP em funcionamento</LinkButton>
              </div>

              <Screenshot
                src={mvpBuscaImg}
                alt="Resultado de busca do MVP com filtros e selo de melhor custo-benefício"
                caption="Busca: filtros por categoria, mercado, preço e distância. Os resultados vêm ordenados pelo preço por kg, e o melhor negócio ganha o selo amarelo."
                onOpen={openLightbox}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Screenshot
                  src={mvpProdutoImg}
                  alt="Detalhe do produto com preço por kg e onde comprar"
                  caption="Detalhe: preço total e preço por kg lado a lado, tabela de onde comprar e histórico de 90 dias."
                  onOpen={openLightbox}
                />
                <Screenshot
                  src={mvpCompararImg}
                  alt="Lista de comparação de preços do MVP"
                  caption="Comparação: até 6 produtos ranqueados, com a diferença para o mais vantajoso."
                  onOpen={openLightbox}
                />
                <Screenshot
                  src={mvpListaImg}
                  alt="Lista de compras do MVP com compartilhamento"
                  caption="Lista: checkbox, quantidade, totais, mercado mais barato para a lista inteira e envio pelo WhatsApp."
                  onOpen={openLightbox}
                />
                <Screenshot
                  src={mvpAvaliacoesImg}
                  alt="Tela de avaliações do produto do MVP"
                  caption="Avaliações: estrelas operáveis por teclado, validação do comentário e média recalculada na hora."
                  onOpen={openLightbox}
                />
              </div>

              <SubTitle>Tecnologias e arquitetura</SubTitle>
              <Chips items={["Figma Make (IA)", "React 19", "TypeScript", "React Router", "Tailwind CSS", "Vite", "Vitest", "Lucide"]} />
              <Body>
                <p className="mt-6">
                  É uma SPA que roda no navegador. A interface, as regras de negócio e os dados ficam em camadas separadas (padrões Service e Repository), então os dados simulados podem ser trocados por uma API de preços real sem refazer as telas.
                </p>
              </Body>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-6">
                {[
                  { t: "Preço por unidade", d: "Converte g→kg e ml→L antes de dividir. R$ 10 em 500 g = R$ 20/kg. Coberto por testes automatizados." },
                  { t: "Distância", d: "Fórmula de Haversine entre o usuário e cada mercado, com raio configurável." },
                  { t: "Melhor mercado da lista", d: "Soma a lista em cada mercado e indica onde ela sai mais barata." },
                  { t: "Compartilhar sem servidor", d: "A lista vai codificada na própria URL e abre em modo leitura." },
                ].map((p) => (
                  <Card key={p.t}>
                    <CardTitle>{p.t}</CardTitle>
                    <CardText>{p.d}</CardText>
                  </Card>
                ))}
              </div>
              <Body>
                <p>
                  APIs usadas: apenas as nativas do navegador (geolocalização, localStorage, área de transferência e Intl), além de links diretos para WhatsApp e e-mail. Os dados de 9 mercados reais da Baixada Santista e 41 produtos são simulados.
                </p>
              </Body>

              <div className="flex flex-wrap gap-3 mt-8">
                <LinkButton href={MVP_URL} primary>Ver MVP em funcionamento</LinkButton>
                <LinkButton href="https://github.com/luizamenezesg/portfolio-luizam-ux/blob/main/docs/economizando-ficha-tecnica.md">Ficha técnica completa</LinkButton>
                <LinkButton href="https://medium.com/@luizamenezesg/processo-de-ux-design-para-uma-plataforma-de-compara%C3%A7%C3%A3o-de-pre%C3%A7os-3e089b8edfa2">Estudo de caso no Medium</LinkButton>
              </div>
            </section>

            <Divider />

            {/* ─ Conclusão ─ */}
            <section className="mb-8">
              <SectionLabel>Conclusão</SectionLabel>
              <SectionTitle>O que ficou de aprendizado</SectionTitle>

              <div className="space-y-4">
                {[
                  "Não suponha o que o usuário quer: ouvir e testar mudou o foco do produto",
                  "A priorização por impacto × esforço garantiu um MVP enxuto e com alto valor",
                  "Testes de usabilidade revelaram problemas de clareza que a análise heurística não mostraria",
                  "Problemas do concorrente viraram requisitos explícitos, rastreáveis até a pesquisa",
                  "Levar o protótipo até um MVP funcional me fez pensar em estados, regras e limites que o Figma não exige",
                ].map((text, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card hover:shadow-sm transition-shadow"
                  >
                    <span className="font-heading text-2xl font-bold text-primary/30 leading-none mt-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="font-body text-[15px] text-foreground/85 leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>

              <SubTitle>Próximos passos</SubTitle>
              <BulletList
                items={[
                  "Integrar uma fonte real de preços",
                  "Login e sincronização de listas entre dispositivos",
                  "Validar o MVP em uma nova rodada de testes de usabilidade",
                  "Tela de perfil completa, filtros avançados e soma automática do orçamento",
                ]}
              />
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Project1;
