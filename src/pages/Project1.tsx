import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, X } from "lucide-react";
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
              to="/#projetos"
              className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-secondary transition-colors mb-10 min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
            >
              <ArrowLeft size={16} />
              Voltar aos projetos
            </Link>
            <SectionLabel>UX Research • Interfaces Responsivas</SectionLabel>
            <h1 className="font-heading text-foreground text-[40px] md:text-[52px] font-bold leading-[1.1] mb-6">
              Plataforma de<br />Comparação de Preços
            </h1>
            <p className="font-body text-lg text-muted-foreground max-w-[600px] leading-relaxed">
              Desenvolvimento de solução focada em eficiência e redução de carga cognitiva através de pesquisa qualitativa e testes de usabilidade.
            </p>
          </div>
        </header>

        {/* ── Content ── */}
        <div className="px-6 md:px-12 lg:px-20 pb-20">
          <div className="max-w-[960px] mx-auto">

            {/* ─ Contexto ─ */}
            <section className="mt-16">
              <SectionLabel>Contexto</SectionLabel>
              <Body>
                <p>
                  Atualmente, o custo de vida no Brasil tem sido um desafio para o orçamento dos brasileiros. Fazer compras no mercado, além de ser uma tarefa rotineira, é também um exercício de estratégia financeira.
                </p>
                <p>
                  Este projeto foi desenvolvido para simular uma plataforma digital de comparação de preços voltada para consumidores que buscam economia e praticidade no dia a dia.
                </p>
                <p>
                  O desafio envolveu desde a identificação do problema até a entrega de protótipos validados, passando por etapas de pesquisa, teste de usabilidade, estratégia e design.
                </p>
              </Body>
            </section>

            <Divider />

            {/* ─ Problema ─ */}
            <section>
              <SectionTitle>O problema</SectionTitle>
              <Body>
                <p>
                  Consumidores frequentemente enfrentam dificuldade para comparar preços de produtos entre estabelecimentos, o que resulta em mas decisões de compra.
                </p>
                <p>
                  Quem deseja encontrar o melhor custo-benefício enfrenta uma jornada fragmentada: acessam diversos sites, abrem múltiplas abas e precisam cruzar informações por conta própria.
                </p>
              </Body>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-10">
                {[
                  { emoji: "🧠", text: "Sobrecarga cognitiva" },
                  { emoji: "😟", text: "Insegurança na decisão de compra" },
                  { emoji: "⏱️", text: "Perda de tempo em tarefas repetitivas" },
                ].map((item) => (
                  <div
                    key={item.text}
                    className="rounded-xl bg-accent/50 border border-border p-5 text-center"
                  >
                    <span className="text-2xl block mb-2">{item.emoji}</span>
                    <p className="font-body text-sm text-foreground/80 font-medium">{item.text}</p>
                  </div>
                ))}
              </div>

              <Body>
                <p>
                  Em uma pesquisa rápida pela internet, encontrei soluções digitais que listam preços, porém apresentavam interfaces confusas, limitadas e com dados desatualizados. Muitas soluções focam apenas no preço, sem considerar fatores como frete, avaliações e confiabilidade da loja.
                </p>
              </Body>
            </section>

            {/* ─ Objetivo ─ */}
            <Quote>
              Reduzir o esforço manual de pesquisa e transformar esse processo em uma experiência simples, centralizada e confiável.
            </Quote>

            <Body>
              <p>
                A proposta não era apenas mostrar o valor mais baixo, mas auxiliar o usuário a planejar suas compras de forma inteligente, otimizando o orçamento mensal e o tempo de deslocamento.
              </p>
            </Body>

            <Divider />

            {/* ─ Processo ─ */}
            <section>
              <SectionLabel>Processo</SectionLabel>
              <SectionTitle>Entendendo o cenário</SectionTitle>

              <SubTitle>Pesquisa e Insights</SubTitle>
              <Body>
                <p>
                  A fase de pesquisa envolveu análise de mercado, pesquisa com usuários e levantamento de dados secundários para compreender o cenário de comparação de preços no Brasil.
                </p>
              </Body>
              <BulletList
                items={[
                  "As pessoas costumam abrir várias abas simultaneamente e comparar preços manualmente",
                  "Muitas pessoas compartilham promoções entre amigos e familiares",
                  "A pesquisa de preços online antes de comprar em lojas físicas é um hábito comum, com maior incidência entre consumidores de 18 a 34 anos",
                ]}
              />

              <SubTitle>Quem é o usuário?</SubTitle>
              <Body>
                <p>
                  Com base nos dados iniciais, construí uma proto-persona para representar o perfil de uso, comportamento e motivações:
                </p>
              </Body>
              <Insight label="Proto-persona">
                Jovem de 33 anos, que mora sozinha, pesquisa preços em supermercados próximos, fica ligada em promoções e compra em atacado de sites onde o frete é grátis.
              </Insight>
              <NarrowImage src={personaImg} alt="Proto-persona: Joana Medeiros" maxWidth="720px" onOpen={openLightbox} />

              <SubTitle>Organizando o conhecimento — Matriz CSD</SubTitle>
              <Body>
                <p>
                  Usei a Matriz CSD (Certezas, Suposições e Dúvidas) para organizar a pesquisa, identificar lacunas de conhecimento e validar hipóteses.
                </p>
              </Body>
              <ImageGrid
                images={[
                  { src: csdCertezasImg, alt: "Matriz CSD — Certezas" },
                  { src: csdSuposicoesImg, alt: "Matriz CSD — Suposições" },
                  { src: csdDuvidasImg, alt: "Matriz CSD — Dúvidas" },
                ]}
                onOpen={openLightbox}
              />

              <SubTitle>Olhando para o mercado</SubTitle>
              <Body>
                <p>
                  Foram analisados concorrentes diretos e indiretos, identificando padrões de interface, funcionalidades comuns e oportunidades de diferenciação.
                </p>
              </Body>
              <BulletList
                items={[
                  "Falta de atualização em tempo real",
                  "Interfaces pouco intuitivas que não ajudavam na criação de listas dinâmicas",
                  "Excesso de informação sem hierarquia clara",
                ]}
              />
              <Insight label="Diferencial identificado">
                O diferencial do Economizando seria a geolocalização aliada à construção de listas personalizadas e compartilháveis.
              </Insight>
              <NarrowImage src={benchmarkingImg} alt="Tabela comparativa de funcionalidades — Benchmarking" onOpen={openLightbox} />

              <Divider />

              <SubTitle>Ouvindo os usuários</SubTitle>
              <Body>
                <p>
                  Entrevistas qualitativas foram realizadas para entender comportamentos, necessidades e pontos de dor reais dos consumidores.
                </p>
                <p>Montei um questionário online para entender:</p>
              </Body>
              <BulletList
                items={[
                  "Qual era o perfil exato da Persona",
                  "Quais eram as funcionalidades essenciais para uma plataforma de comparação de preços",
                  "Quais eram as dores dos usuários ao pesquisar preços e tomar decisões de compra",
                ]}
              />

              <SubTitle>Mapas de Empatia e Jornada</SubTitle>
              <Body>
                <p>Os mapas de empatia e jornada permitiram visualizar:</p>
              </Body>
              <BulletList
                items={[
                  "O que o usuário pensa e sente durante a busca",
                  "Seus pontos de dor ao longo da jornada",
                  "Momentos de indecisão e abandono",
                ]}
              />
              <Body>
                <p>Isso trouxe mais clareza sobre onde a experiência precisava melhorar.</p>
              </Body>
              <ImageGrid
                images={[
                  { src: empatiaImg, alt: "Mapa de empatia" },
                  { src: jornadaImg, alt: "Jornada do usuário" },
                ]}
                onOpen={openLightbox}
              />

              <Divider />

              <SubTitle>O que construir primeiro?</SubTitle>
              <Body>
                <p>
                  As funcionalidades foram priorizadas com uma matriz de impacto versus esforço, garantindo que o MVP contemplasse as features de maior valor com menor complexidade técnica.
                </p>
              </Body>
              <BulletList
                items={[
                  "Simplificação da comparação entre produtos",
                  "Lista compartilhada",
                  "Avaliação dos produtos",
                  "Cálculo automático de custo-benefício dos produtos",
                ]}
              />
              <NarrowImage src={priorizacaoImg} alt="Grid de priorização: Impacto x Esforço" maxWidth="760px" onOpen={openLightbox} />
            </section>

            {/* ─ Design ─ */}
            <section>
              <SectionLabel>Design</SectionLabel>
              <SectionTitle>Dando forma à solução</SectionTitle>

              <SubTitle>Protótipos de baixa fidelidade</SubTitle>
              <Body>
                <p>
                  Wireframes foram criados para validar estruturas de layout, testar ideias com rapidez e ajustar fluxos de interação antes dos detalhes visuais.
                </p>
              </Body>

              <SubTitle>Testes de usabilidade</SubTitle>
              <Body>
                <p>
                  Testes foram conduzidos com usuários reais para validar hipóteses de design, identificar pontos de fricção e analisar oportunidades de melhoria.
                </p>
              </Body>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
                {[
                  { title: "Métricas", items: ["Conclusão da tarefa", "Erros relatados", "Descrição do erro"] },
                  { title: "Análise complementar", items: ["Feedback espontâneo", "Observação comportamental", "Ajustes aplicáveis"] },
                  { title: "Conclusões", items: ["Comparações visuais são valorizadas", "Informações organizadas evitam sobrecarga", "Clareza influencia na decisão"] },
                ].map((col) => (
                  <div key={col.title} className="rounded-xl bg-accent/40 border border-border p-5">
                    <h4 className="font-heading text-sm font-semibold text-foreground mb-3">{col.title}</h4>
                    <ul className="space-y-2">
                      {col.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 font-body text-sm text-foreground/80">
                          <span className="w-1 h-1 rounded-full bg-primary mt-[7px] flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <Divider />

              {/* Protótipos */}
              <SubTitle>Protótipos navegáveis</SubTitle>
              <Body>
                <p>Explore os protótipos interativos diretamente abaixo:</p>
              </Body>
              <FigmaEmbed
                title="Protótipo App"
                protoUrl="https://www.figma.com/proto/scbZWkNkfk6vhWjP9AqQkt/Projeto-EBAC---Curso-UX-Design?page-id=0%3A1&node-id=83-462&starting-point-node-id=24%3A99&t=wCnw2q0d6kUPJanY-1"
              />
              <FigmaEmbed
                title="Protótipo Site"
                protoUrl="https://www.figma.com/proto/TvuQdcNCi6VE9JKHAURNbj/Projeto-EBAC---Curso-Figma---Site?page-id=0%3A1&node-id=108-437&starting-point-node-id=108%3A812&scaling=contain&content-scaling=fixed&t=5FP5ezxRQvgzZQR3-1"
              />
            </section>

            <Divider />

            {/* ─ Identidade ─ */}
            <section>
              <SectionLabel>Identidade</SectionLabel>
              <SectionTitle>A voz e a cara do produto</SectionTitle>

              <SubTitle>UX Writing</SubTitle>
              <Body>
                <p>
                  O UX Writing foi pensado para ser claro, direto e funcional, evitando termos técnicos ou ambíguos. A persona foi essencial para definir o tom de voz ideal.
                </p>
              </Body>
              <Insight label="Tom de voz">
                "Casual" e "Entusiasmado" para uma comunicação acessível, empática, direta e motivadora.
              </Insight>

              <SubTitle>Identidade Visual</SubTitle>
              <Body>
                <p>
                  Paleta de cores, tipografia e iconografia seguiram princípios de simplicidade e confiabilidade, transmitindo credibilidade ao usuário.
                </p>
              </Body>

              {/* Ícones */}
              <h4 className="font-heading text-lg font-semibold text-foreground mt-10 mb-4">Ícones</h4>
              <Body>
                <p>
                  Optei por ícones já reconhecidos em interfaces digitais para garantir navegação intuitiva e baixa carga cognitiva.
                </p>
              </Body>
              <ImageGrid
                images={[
                  { src: iconesNavImg, alt: "Ícones de navegação" },
                  { src: iconesUiImg, alt: "Ícones de interface" },
                ]}
                onOpen={openLightbox}
              />

              {/* Paleta de cores */}
              <h4 className="font-heading text-lg font-semibold text-foreground mt-10 mb-4">Paleta de cores</h4>
              <Body>
                <p>
                  De acordo com o manual de psicologia das cores, as que foram escolhidas foram:
                </p>
              </Body>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 mb-8">
                <div className="flex items-center gap-4 p-5 rounded-xl border border-border bg-card">
                  <div className="w-16 h-16 rounded-lg bg-[#162C9A] flex-shrink-0" />
                  <div>
                    <h5 className="font-heading text-base font-semibold text-foreground">Azul #162C9A</h5>
                    <p className="font-body text-sm text-muted-foreground mt-1">Confiança, Lealdade, Competência</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-5 rounded-xl border border-border bg-card">
                  <div className="w-16 h-16 rounded-lg bg-[#FFD027] flex-shrink-0" />
                  <div>
                    <h5 className="font-heading text-base font-semibold text-foreground">Amarelo #FFD027</h5>
                    <p className="font-body text-sm text-muted-foreground mt-1">Criatividade, Alegria, Calor</p>
                  </div>
                </div>
              </div>

              <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground font-semibold mb-4 mt-8">
                CORES COMPLEMENTARES
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-4 p-5 rounded-xl border border-border bg-card">
                  <div className="w-16 h-16 rounded-lg bg-[#1FCEF0] flex-shrink-0" />
                  <div>
                    <h5 className="font-heading text-base font-semibold text-foreground">Ciano #1FCEF0</h5>
                    <p className="font-body text-sm text-muted-foreground mt-1">Frescor, Modernidade, Clareza</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-5 rounded-xl border border-border bg-card">
                  <div className="w-16 h-16 rounded-lg bg-[#EDEAEA] flex-shrink-0" />
                  <div>
                    <h5 className="font-heading text-base font-semibold text-foreground">Cinza claro #EDEAEA</h5>
                    <p className="font-body text-sm text-muted-foreground mt-1">Neutralidade, Leveza, Equilíbrio</p>
                  </div>
                </div>
              </div>

              {/* Tipografia */}
              <h4 className="font-heading text-lg font-semibold text-foreground mt-10 mb-4">Tipografia</h4>
              <Body>
                <p>
                  A fonte Inter foi escolhida por ser moderna, funcional, com alta legibilidade e familiar ao usuário para reduzir a curva de aprendizado.
                </p>
              </Body>
              <FontSpecimen />
            </section>

            <Divider />

            {/* ─ Resultados ─ */}
            <section className="mb-8">
              <SectionLabel>Conclusão</SectionLabel>
              <SectionTitle>O que ficou de aprendizado</SectionTitle>

              <div className="space-y-4">
                {[
                  "A pesquisa com usuários foi essencial para redirecionar o foco do produto",
                  "A priorização de funcionalidades permitiu um MVP com alto potencial de valor",
                  "Testes de usabilidade revelaram pontos de fricção que não seriam identificados apenas por análise heurística",
                  "Cada decisão de design foi documentada com justificativas baseadas em dados de pesquisa, heurísticas de usabilidade e restrições técnicas",
                  "Documentar decisões de design facilita o alinhamento com stakeholders e acelera iterações futuras",
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
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Project1;
