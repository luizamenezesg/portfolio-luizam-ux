import React, { useEffect } from "react";
import { ArrowDown, ArrowRight, EyeOff, HelpCircle, Hourglass, MessageCircle, TrendingDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FigmaEmbed from "@/components/FigmaEmbed";
import { Body, BulletList, Divider, Insight, Quote, SectionLabel, SectionTitle, SubTitle } from "@/components/case/Typography";
import { ImageGrid, NarrowImage, Screenshot, useLightbox } from "@/components/case/Images";
import { BeforeAfter, Card, CardText, CardTitle, Chips, ColorSwatch, FlowItem, LinkButton, NumberedItem } from "@/components/case/Cards";
import { CaseHero, KeyNumbers } from "@/components/case/CaseHero";
import { CaseNav } from "@/components/case/CaseNav";
import { FontSpecimen } from "@/components/case/FontSpecimen";
import { Timeline } from "@/components/case/Timeline";

const MVP_URL = "https://cost-powder-53339892.figma.site";
const PROTO_URL = "https://www.figma.com/proto/JftpPpk6ONr3l2XrQVK38H/PlanejaDin?page-id=57%3A8&node-id=57-191&starting-point-node-id=57%3A191&t=XJN1wavmKtSqNHM9-1";
const FICHA_URL = "https://github.com/luizamenezesg/portfolio-luizam-ux/blob/main/docs/planejadin-ficha-tecnica.md";

const PAGE_TITLE = "PlanejaDin — Finanças pessoais | Luiza Menezes";

/*
 * Imagens do case: basta salvar em src/assets com o prefixo planejadin-.
 * Só aparecem as que existirem; a página não quebra se faltar alguma.
 * MVP: planejadin-mvp-{home,registro,metas,financas,alertas,din}.jpg
 * Processo: planejadin-{pesquisa,benchmarking,personas,caso-de-uso,wireframe,prototipo}.png
 */
const IMAGES = import.meta.glob<string>("../assets/planejadin-*.{png,jpg}", { eager: true, import: "default" });
const img = (file: string): string | undefined => IMAGES[`../assets/${file}`];

/* ── blocos exclusivos deste case ── */

const fmtPct = (n: number) => `${n.toLocaleString("pt-BR")}%`;

/** Barras horizontais da pesquisa: rótulo e porcentagem em texto; a barra é só reforço visual. */
const SurveyBars = ({ title, base, items }: { title: string; base: string; items: [string, number][] }) => (
  <figure className="rounded-xl border border-border bg-card p-5">
    <figcaption className="font-heading text-sm font-semibold text-foreground">
      {title} <span className="font-body font-normal text-muted-foreground">({base})</span>
    </figcaption>
    <ul className="mt-4 space-y-3">
      {items.map(([label, value]) => (
        <li key={label}>
          <div className="flex items-baseline justify-between gap-3 font-body text-sm">
            <span className="text-foreground/85">{label}</span>
            <span className="font-semibold text-foreground tabular-nums">{fmtPct(value)}</span>
          </div>
          <div className="mt-1.5 h-2.5 rounded-full bg-muted overflow-hidden" aria-hidden="true">
            <div className="h-full rounded-full bg-primary" style={{ width: `${value}%` }} />
          </div>
        </li>
      ))}
    </ul>
  </figure>
);

const PERSONAS: { name: string; age: number; job: string; quote: React.ReactNode }[] = [
  { name: "Mariana", age: 28, job: "Analista de marketing", quote: "“Sinto que nunca consigo acompanhar o que gasto e como posso economizar para alcançar meus sonhos.”" },
  { name: "Ana", age: 30, job: "Professora", quote: "“Não tenho ideia de como planejar meu futuro financeiro e isso me deixa ansiosa.”" },
  { name: "Carlos", age: 45, job: "Comerciante", quote: "“Minhas finanças são confusas e eu gostaria de entender melhor como posso organizar tudo.”" },
  /* TODO: Luiza preencher as frases de Ricardo, Fernanda e Lucas */
  { name: "Ricardo", age: 35, job: "Engenheiro civil", quote: "[PREENCHER: frase da proto-persona]" },
  { name: "Fernanda", age: 26, job: "Designer gráfica", quote: "[PREENCHER: frase da proto-persona]" },
  { name: "Lucas", age: 20, job: "Estagiário de TI · foco em investimentos", quote: "[PREENCHER: frase da proto-persona]" },
];

const REQUIREMENTS: [string, string, string][] = [
  ["RF01 Cadastro e login", "História de usuário 1", "Cadastro, Login, erro e sucesso"],
  ["RF02 Registrar receitas e despesas", "História 2 e dificuldade “manter registros” (50%)", "Registro de Transação"],
  ["RF03 Categorias personalizadas com limite", "História 3 e “mais controle sobre os dados” (60%)", "Minhas Categorias"],
  ["RF04 Relatórios com gráficos e filtros por período", "História 4", "Minhas Finanças"],
  ["RF05 Metas com prazo e progresso", "“Planejar a economia” (61%) e proto-personas", "Minhas Metas e Definir meta"],
  ["RF06 Alertas de vencimento e de limite", "Benchmarking e “organizar contas” (22%)", "Meus Alertas"],
  ["RF07 Dicas personalizadas", "História 5 e proto-persona Ana", "Dicas com a Din"],
  ["RF08 Histórico com filtros e busca", "Requisitos (IA + equipe)", "Histórico de Transações e Pesquisar"],
  ["RF09 Exportar dados (PDF e Excel)", "Requisitos (IA + equipe)", "Exportar em Minhas Finanças"],
  ["RF10 Ocultar valores", "Regra de privacidade", "Ícone de olho no saldo"],
];

const REQ_CAPTION = "Requisitos funcionais: de onde veio cada um e onde está no MVP";

/** Tabela no desktop; lista de cards no mobile, sem rolagem horizontal. */
const RequirementsTable = () => (
  <>
    <div className="hidden md:block my-8 rounded-xl border border-border overflow-hidden">
      <table className="w-full text-left">
        <caption className="sr-only">{REQ_CAPTION}</caption>
        <thead className="bg-accent/60">
          <tr className="font-body text-[11px] tracking-[0.2em] uppercase text-primary">
            <th scope="col" className="px-5 py-3 font-semibold w-[34%]">Requisito</th>
            <th scope="col" className="px-5 py-3 font-semibold w-[36%]">De onde veio</th>
            <th scope="col" className="px-5 py-3 font-semibold">Onde está no MVP</th>
          </tr>
        </thead>
        <tbody className="bg-card">
          {REQUIREMENTS.map(([req, origin, where]) => (
            <tr key={req} className="border-t border-border align-top">
              <th scope="row" className="px-5 py-3 font-body text-sm font-semibold text-foreground">{req}</th>
              <td className="px-5 py-3 font-body text-sm text-muted-foreground">{origin}</td>
              <td className="px-5 py-3 font-body text-sm text-foreground">
                <span className="inline-flex items-start gap-2">
                  <ArrowRight size={16} className="text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                  {where}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <ul className="md:hidden my-8 space-y-3" aria-label={REQ_CAPTION}>
      {REQUIREMENTS.map(([req, origin, where]) => (
        <li key={req} className="rounded-xl border border-border bg-card px-4 py-3">
          <p className="font-body text-sm font-semibold text-foreground">{req}</p>
          <p className="font-body text-sm text-muted-foreground mt-1">
            <span className="font-medium">De onde veio:</span> {origin}
          </p>
          <p className="font-body text-sm text-foreground mt-1 flex items-start gap-2">
            <ArrowDown size={16} className="text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
            <span><span className="sr-only">Onde está no MVP: </span>{where}</span>
          </p>
        </li>
      ))}
    </ul>
  </>
);

const NAV_TABS: { tab: string; screens: string[] }[] = [
  { tab: "Início", screens: [] },
  { tab: "Pesquisar", screens: [] },
  { tab: "Transações", screens: ["Registro", "Histórico"] },
  { tab: "Meu perfil", screens: ["Metas", "Resumo Financeiro", "Categorias", "Alertas"] },
];

/** Mapa de navegação do app: barra inferior, telas de cada aba e o botão da Din. */
const NavMap = () => (
  <figure className="my-10 rounded-2xl border border-border bg-accent/40 p-4 md:p-6">
    <p className="font-body text-[11px] tracking-[0.2em] uppercase text-primary font-semibold mb-3" aria-hidden="true">
      Barra de navegação inferior
    </p>
    <ul className="grid grid-cols-2 sm:grid-cols-4 gap-3" aria-hidden="true">
      {NAV_TABS.map(({ tab, screens }) => (
        <li key={tab} className="flex flex-col gap-2">
          <span className="rounded-lg bg-primary text-primary-foreground px-3 py-2 font-body text-sm font-semibold text-center">
            {tab}
          </span>
          {screens.length > 0 && (
            <ul className="space-y-1.5">
              {screens.map((s) => (
                <li key={s} className="rounded-md border border-border bg-card px-3 py-1.5 font-body text-sm text-foreground/85 text-center">
                  {s}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
    <p
      className="mt-4 flex items-center gap-2 rounded-lg border-2 border-dashed border-secondary/60 bg-card px-3 py-2 font-body text-sm text-foreground"
      aria-hidden="true"
    >
      <MessageCircle size={18} className="text-secondary flex-shrink-0" />
      <span><strong className="font-semibold">Botão flutuante da Din</strong> · presente em todas as telas</span>
    </p>
    <figcaption className="sr-only">
      Mapa de navegação. A barra inferior tem Início, Pesquisar, Transações e Meu perfil. Transações abre Registro e
      Histórico. Meu perfil abre Metas, Resumo Financeiro, Categorias e Alertas. O botão flutuante da Din aparece em
      todas as telas.
    </figcaption>
  </figure>
);

/** Carrega Nunito e Roboto só nesta página, para o especimen tipográfico. */
const useCaseFonts = () => {
  useEffect(() => {
    const id = "fonts-planejadin";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700&family=Roboto:wght@400&display=swap";
    document.head.appendChild(link);
  }, []);
};

const GridCards = ({ items, as = "h4" }: { items: { t: string; d: React.ReactNode }[]; as?: "h3" | "h4" }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-6">
    {items.map((p) => (
      <Card key={p.t}>
        <CardTitle as={as}>{p.t}</CardTitle>
        <CardText>{p.d}</CardText>
      </Card>
    ))}
  </div>
);

const MVP_SHOTS = [
  {
    file: "planejadin-mvp-registro.jpg",
    alt: "Tela de registro de transação do MVP com abas Receita e Despesa",
    caption: "Registro em uma tela: abas Receita/Despesa, data preenchida como hoje e aviso na hora se a categoria passar do limite.",
  },
  {
    file: "planejadin-mvp-metas.jpg",
    alt: "Tela de metas do MVP com barras de progresso e prazo",
    caption: "Metas com progresso, prazo e quanto guardar por mês para chegar lá.",
  },
  {
    file: "planejadin-mvp-financas.jpg",
    alt: "Tela Minhas Finanças do MVP com gráfico de despesas por categoria",
    caption: "Relatórios por período, gráfico de despesas por categoria, evolução do saldo e exportação em PDF e Excel.",
  },
  {
    file: "planejadin-mvp-alertas.jpg",
    alt: "Tela de alertas do MVP com conta a vencer e limite de categoria",
    caption: "Alertas de conta a vencer, limite de categoria e dica de meta, cada um com uma ação.",
  },
  {
    file: "planejadin-mvp-din.jpg",
    alt: "Conversa com a Din, assistente do MVP, respondendo com dados da usuária",
    caption: "A Din responde com base nos dados da usuária: maior gasto do mês, ritmo das metas, melhor data de vencimento.",
  },
]
  .map((s) => ({ ...s, src: img(s.file) }))
  .filter((s): s is typeof s & { src: string } => Boolean(s.src));

/* ── página ── */

const Project3 = () => {
  const { open: openLightbox, lightbox } = useLightbox();
  useCaseFonts();

  useEffect(() => {
    window.scrollTo(0, 0);
    const previousTitle = document.title;
    document.title = PAGE_TITLE;
    return () => {
      document.title = previousTitle;
    };
  }, []);

  const cover = img("planejadin-mvp-home.jpg");
  const pesquisa = img("planejadin-pesquisa.png");
  const benchmarking = img("planejadin-benchmarking.png");
  const personas = img("planejadin-personas.png");
  const casoDeUso = img("planejadin-caso-de-uso.png");
  const processImages = [
    { src: img("planejadin-wireframe.png"), alt: "Wireframe do PlanejaDin" },
    { src: img("planejadin-prototipo.png"), alt: "Protótipo de alta fidelidade do PlanejaDin" },
  ].filter((i): i is { src: string; alt: string } => Boolean(i.src));

  return (
    <>
      <Navbar />
      {lightbox}

      <main className="pt-24">
        {/* 1. Hero */}
        <CaseHero
          label="UX Research • Product Design • UI Design • MVP"
          title="PlanejaDin: um app que ajuda a manter o hábito de controlar o dinheiro"
          subtitle="Projeto em equipe na Fatec: pesquisa, requisitos e protótipo de um app de finanças pessoais. Em 2026, transformei o protótipo em um MVP funcional, com registro de gastos, metas, alertas, relatórios e uma assistente que transforma dados em orientação."
          facts={[
            /* TODO: Luiza preencher (confirmar se o MVP é individual) */
            { label: "Meu papel", value: "UX/UI Designer · MVP funcional: [CONFIRMAR: projeto individual]" },
            { label: "Quando", value: "Pesquisa e protótipo em 2025 · MVP funcional em 2026" },
            { label: "Contexto", value: "Sistemas para Internet, Fatec Baixada Santista “Rubens Lara”" },
            { label: "Equipe", value: "Projeto acadêmico em grupo" },
            { label: "Plataforma", value: "App mobile (web app mobile-first)" },
            { label: "Ferramentas", value: "Figma · Google Forms · ChatGPT e Claude (requisitos) · Figma Make com IA (MVP)" },
          ]}
          actions={
            <>
              <LinkButton href={MVP_URL} primary>Ver MVP em funcionamento</LinkButton>
              <LinkButton href={PROTO_URL}>Ver protótipo no Figma</LinkButton>
            </>
          }
          cover={
            cover
              ? {
                  src: cover,
                  alt: "Home do MVP do PlanejaDin com saldo, resumo do mês, atalhos e um alerta em destaque",
                  caption: "Home do MVP: saldo, resumo do mês, atalhos e o alerta mais importante.",
                }
              : undefined
          }
          onOpen={openLightbox}
        />

        <div className="px-6 md:px-12 lg:px-20 pb-20">
          <div className="max-w-[960px] mx-auto">

            {/* 2. O case em 30 segundos */}
            <section className="mt-16">
              <SectionLabel>Resumo</SectionLabel>
              <SectionTitle>O case em 30 segundos</SectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardTitle as="h3">Desafio</CardTitle>
                  <CardText>
                    As pessoas até começam a controlar o dinheiro, mas abandonam. Na nossa pesquisa, 55,6% usavam planilha ou anotações e 27,8% não usavam nada. O problema era comportamental, não só de funcionalidade.
                  </CardText>
                </Card>
                <Card>
                  <CardTitle as="h3">Solução</CardTitle>
                  <CardText>
                    Um app com registro rápido de receitas e despesas, metas com progresso, limites por categoria, alertas de vencimento, relatórios simples e a Din, uma assistente que responde com base nos dados do usuário.
                  </CardText>
                </Card>
                <Card>
                  <CardTitle as="h3">Resultado</CardTitle>
                  {/* TODO: Luiza preencher (nº de telas do MVP) */}
                  <CardText>
                    Protótipo navegável testado com 4 fluxos e, em 2026, um MVP funcional com [CONFIRMAR: nº] telas, gerado com IA a partir de um documento de requisitos e regras de negócio.
                  </CardText>
                </Card>
              </div>

              <KeyNumbers
                items={[
                  { n: "18", t: "respostas no questionário" },
                  { n: "72%", t: "têm dificuldade em evitar gastos impulsivos" },
                  { n: "4", t: "fluxos no teste de navegação" },
                  /* TODO: Luiza preencher (o prompt do Figma Make pediu 20, contando acesso, onboarding e 404) */
                  { n: "[CONFIRMAR]", t: "telas funcionais no MVP" },
                ]}
              />

              <SubTitle>Habilidades demonstradas</SubTitle>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardTitle>UX Research</CardTitle>
                  <Chips items={["Questionário com fluxos condicionais", "Análise de dados da pesquisa", "Benchmarking", "Proto-personas", "Histórias de usuário", "Teste de navegação"]} />
                </Card>
                <Card>
                  <CardTitle>Product Design</CardTitle>
                  <Chips items={["Levantamento de requisitos com IA", "Regras de negócio", "Caso de uso (UML)", "Arquitetura por intenção", "Definição de MVP", "Critérios de aceite", "Métricas de sucesso"]} />
                </Card>
                <Card>
                  <CardTitle>UI Design</CardTitle>
                  <Chips items={["Wireframe", "Protótipo de alta fidelidade", "Sistema visual", "UX writing", "Visualização de dados", "Acessibilidade"]} />
                </Card>
              </div>
            </section>

            <Divider />

            {/* 3. Contexto e problema */}
            <section>
              <SectionLabel>Contexto</SectionLabel>
              <SectionTitle>Onde tudo começou</SectionTitle>
              <Body>
                <p>
                  O PlanejaDin é um aplicativo de gestão financeira pessoal criado para ajudar usuários a organizarem suas finanças de forma simples, visual e contínua.
                </p>
                <p>
                  O projeto surgiu a partir de um problema comum: mesmo com diversas ferramentas disponíveis, as pessoas <strong>não conseguem manter o hábito de controlar o próprio dinheiro</strong>.
                </p>
              </Body>

              <SubTitle>O problema real</SubTitle>
              <Body>
                <p>
                  Durante a análise inicial e o levantamento de requisitos, ficou evidente que o problema não era apenas funcional, era comportamental.
                </p>
              </Body>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-10">
                {[
                  { Icon: TrendingDown, text: "Não mantêm consistência no uso" },
                  { Icon: EyeOff, text: "Dificuldade em visualizar a situação financeira" },
                  { Icon: Hourglass, text: "Sentem que o processo exige esforço constante" },
                  { Icon: HelpCircle, text: "Não recebem orientação sobre o que fazer com os dados" },
                ].map(({ Icon, text }) => (
                  <li key={text} className="rounded-xl bg-accent/50 border border-border p-5">
                    <Icon size={24} className="text-primary mb-2" aria-hidden="true" />
                    <p className="font-body text-sm text-foreground/80 font-medium">{text}</p>
                  </li>
                ))}
              </ul>

              <SubTitle>Impacto</SubTitle>
              <BulletList
                items={[
                  "Falta de controle financeiro",
                  "Dificuldade em atingir metas",
                  "Baixa retenção em apps financeiros",
                  "Frustração e abandono da ferramenta",
                ]}
              />

              <Quote>
                O desafio não é permitir que o usuário registre dados. É fazer com que ele continue registrando.
              </Quote>
            </section>

            <Divider />

            {/* 4. Pesquisa */}
            <section>
              <SectionLabel>Pesquisa</SectionLabel>
              <SectionTitle>O que os dados mostraram</SectionTitle>

              <SubTitle>Questionário (18 respostas)</SubTitle>
              <Body>
                <p>
                  Montamos um questionário no Google Forms com caminhos diferentes para quem usa aplicativo, quem usa planilha ou anotações e quem não usa nada. Assim cada grupo respondeu sobre a própria realidade.
                </p>
              </Body>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                <SurveyBars
                  title="O que usam hoje"
                  base="18 respostas"
                  items={[
                    ["Planilha ou anotações", 55.6],
                    ["Nenhuma ferramenta", 27.8],
                    ["Aplicativo", 16.7],
                  ]}
                />
                <SurveyBars
                  title="Por que preferem planilha"
                  base="10 respostas"
                  items={[
                    ["Mais controle sobre os dados", 60],
                    ["Mais simples de usar", 50],
                  ]}
                />
                <div className="md:col-span-2">
                  <SurveyBars
                    title="Maior dificuldade"
                    base="18 respostas, múltipla escolha"
                    items={[
                      ["Evitar gastos impulsivos", 72.2],
                      ["Planejar a economia", 61.1],
                      ["Manter registros atualizados", 50],
                      ["Organizar contas a pagar", 22.2],
                    ]}
                  />
                </div>
              </div>

              <BulletList
                items={[
                  "Metade verifica o saldo toda semana (50%); 27,8% diariamente; 22,2% mensalmente.",
                  "Quem não usa nada citou falta de tempo (40%), não ver necessidade (40%) e achar complicado (20%).",
                  "O que faria a pessoa usar um app: praticidade para registrar em qualquer lugar, registro automático, integração com bancos, ser gratuito e simples.",
                ]}
              />

              <Insight label="O que isso mudou no produto">
                Se a planilha vence por ser simples e dar controle, o app precisava ser ainda mais rápido de usar. Por isso o registro de uma despesa cabe em uma tela, com a data preenchida como hoje, e o usuário cria as próprias categorias.
              </Insight>

              {pesquisa && (
                <figure>
                  <NarrowImage src={pesquisa} alt="Gráficos originais do Google Forms com as respostas do questionário" maxWidth="760px" onOpen={openLightbox} />
                  <figcaption className="font-body text-sm text-muted-foreground -mt-5 mb-8 text-center">Gráficos originais do Google Forms</figcaption>
                </figure>
              )}

              <SubTitle>Benchmarking</SubTitle>
              <Body>
                <p>
                  Analisamos o Organizze e o Mobills. Os dois têm categorias, metas, alertas e gráficos, mas concentram muitas funções e empurram recursos para planos pagos.
                </p>
              </Body>
              <Insight label="Insight principal">
                Apps com muitas funcionalidades não necessariamente geram mais valor. Clareza e simplicidade são os principais fatores de retenção.
              </Insight>
              {benchmarking && (
                <NarrowImage src={benchmarking} alt="Comparação entre Organizze e Mobills feita no benchmarking" onOpen={openLightbox} />
              )}

              <SubTitle>Proto-personas</SubTitle>
              <Body>
                <p>
                  Criamos seis proto-personas para representar perfis diferentes: quem quer guardar para um sonho, quem sente ansiedade com o futuro, quem precisa organizar as contas e quem quer começar a investir.
                </p>
              </Body>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 my-6">
                {PERSONAS.map((p) => (
                  <li key={p.name} className="rounded-xl border border-border bg-card p-4">
                    <p className="font-heading text-sm font-semibold text-foreground">
                      {p.name}, {p.age}
                    </p>
                    <p className="font-body text-xs text-muted-foreground">{p.job}</p>
                    <p className="font-body text-sm text-foreground/80 mt-2 leading-relaxed italic">{p.quote}</p>
                  </li>
                ))}
              </ul>
              {personas && (
                <NarrowImage src={personas} alt="Proto-personas do PlanejaDin criadas pela equipe" onOpen={openLightbox} />
              )}
              {/* TODO: Luiza preencher (confirmar se essa foi a decisão da equipe) */}
              <Insight label="Decisão de escopo">
                Três personas pediam investimentos e integração com bancos. Deixamos isso para depois e priorizamos o que resolvia o hábito: registrar, entender e planejar. [CONFIRMAR: essa foi a decisão da equipe?]
              </Insight>
            </section>

            <Divider />

            {/* 5. Requisitos */}
            <section>
              <SectionLabel>Requisitos</SectionLabel>
              <SectionTitle>Da pesquisa ao produto</SectionTitle>
              <Body>
                <p>
                  Usamos o ChatGPT e o Claude para gerar uma primeira lista de requisitos a partir da descrição do projeto, comparamos as duas respostas e refinamos com a equipe, cruzando com a pesquisa. No MVP, transformei esses requisitos em regras de negócio que o código precisava cumprir.
                </p>
              </Body>
              <Insight label="Como usamos a IA">
                A IA acelerou o rascunho, mas não decidiu. Ela sugeriu itens como sincronização entre dispositivos, backup diário e controle compartilhado para casais; ficaram fora do MVP porque não atacavam o problema principal.
              </Insight>

              <SubTitle>Requisitos funcionais</SubTitle>
              <RequirementsTable />

              <SubTitle>Requisitos não funcionais</SubTitle>
              <BulletList
                items={[
                  "Mobile-first e responsivo",
                  "Interface intuitiva para quem não entende de finanças",
                  "Resposta rápida (feedback imediato e skeletons)",
                  "Privacidade (opção de ocultar valores)",
                  "Acessibilidade (contraste AA, foco visível, alvos de toque de 44px, gráficos com resumo em texto)",
                  "Dados persistidos no navegador",
                  "Código tipado e testado",
                ]}
              />

              <SubTitle>Regras de negócio</SubTitle>
              <GridCards
                items={[
                  { t: "Saldo", d: "Receitas − despesas pagas. O saldo projetado inclui recorrentes e contas a pagar." },
                  { t: "Limite por categoria", d: "Alerta amarelo ao atingir 80% e vermelho ao passar de 100%, um por faixa por mês, para não virar ruído." },
                  { t: "Contas a pagar", d: "Alerta 3 dias antes do vencimento e no dia; “Lembrar depois” adia 1 dia." },
                  { t: "Metas", d: "Valor mensal necessário = (valor-alvo − acumulado) ÷ meses restantes, arredondado para cima." },
                  { t: "Recorrência", d: "Transações “repetir todo mês” geradas automaticamente." },
                  { t: "Relatórios", d: "Comparação com o período anterior de mesmo tamanho." },
                ]}
              />

              {casoDeUso && (
                <>
                  <figure>
                    <NarrowImage src={casoDeUso} alt="Diagrama de caso de uso (UML) do PlanejaDin" maxWidth="760px" onOpen={openLightbox} />
                    <figcaption className="font-body text-sm text-muted-foreground -mt-5 mb-6 text-center">
                      Diagrama de caso de uso (UML) feito pela equipe
                    </figcaption>
                  </figure>
                  <Body>
                    <p>
                      O diagrama ajudou a separar o que é do usuário (registrar, criar metas) do que depende de sistemas externos (preenchimento automático pelo banco), que ficou fora do MVP.
                    </p>
                  </Body>
                </>
              )}
            </section>

            <Divider />

            {/* 6. Estratégia e arquitetura */}
            <section>
              <SectionLabel>Estratégia</SectionLabel>
              <SectionTitle>Os três pilares da solução</SectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-10">
                <NumberedItem as="h3" number="1" title="Redução de esforço" items={["Registro rápido de transações", "Interface direta e sem excesso de decisões"]} />
                <NumberedItem as="h3" number="2" title="Clareza de informação" items={["Dashboard com visão imediata", "Gráficos simples e objetivos"]} />
                <NumberedItem as="h3" number="3" title="Apoio ao usuário" items={["Assistente virtual (Din) com sugestões financeiras"]} />
              </div>

              <SubTitle>Arquitetura por intenção</SubTitle>
              <Body>
                <p>
                  A arquitetura foi pensada com base em <strong>intenção do usuário</strong>, e não em estrutura técnica:
                </p>
              </Body>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
                <FlowItem title="Dashboard" flow="Visão geral" />
                <FlowItem title="Transações" flow="Ação principal" />
                <FlowItem title="Perfil" flow="Controle e personalização" />
              </div>

              <NavMap />

              <Insight label="Decisão de UX">
                A Din fica num botão flutuante em todas as telas, não escondida num menu. Ajuda é mais útil quando aparece no momento da dúvida.
              </Insight>

              <SubTitle>Decisões-chave</SubTitle>
              <ol className="space-y-4 my-8">
                {[
                  { title: "Unificação de relatórios e gráficos", desc: "Redução de redundância e experiência mais fluida" },
                  { title: "Hierarquia clara de informação", desc: "Saldo → ações → histórico" },
                  { title: "Criação da Din (chatbot)", desc: "Transformar dados em orientação e aumentar engajamento" },
                ].map((item, i) => (
                  <li key={item.title} className="flex items-start gap-4 rounded-lg border border-border bg-card p-4">
                    <span className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-heading text-xs font-bold flex-shrink-0 mt-0.5" aria-hidden="true">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-heading text-[15px] font-semibold text-foreground">{item.title}</p>
                      <p className="font-body text-sm text-foreground/75 mt-1">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <Divider />

            {/* 7. Identidade visual */}
            <section>
              <SectionLabel>Identidade visual</SectionLabel>
              <SectionTitle>Cores, tipografia e voz</SectionTitle>

              <SubTitle>Cores</SubTitle>
              <Body>
                <p>
                  Verde para dinheiro, segurança e crescimento; roxo para a Din e para as metas, separando o que é orientação do que é registro. Evitamos o vermelho para todo valor negativo: em finanças, isso aumenta a ansiedade. O vermelho ficou só para erro e limite estourado.
                </p>
              </Body>
              {/* TODO: Luiza preencher (conferir os hex no arquivo Figma) */}
              <p className="font-body text-xs text-muted-foreground mt-4">[CONFIRMAR: códigos hex no arquivo Figma]</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 mb-8">
                <ColorSwatch color="#237A57" name="Verde" description="Ações principais, barra de navegação e receitas" />
                <ColorSwatch color="#6B3FA0" name="Roxo" description="Din, metas e despesas nos gráficos" />
                <ColorSwatch color="#D6EDE3" name="Verde claro" description="Filtros e fundos de alerta" outlined />
                <ColorSwatch color="#D9C8EC" name="Lilás" description="Ícones de categoria e sugestões do chat" outlined />
                <ColorSwatch color="#E5484D" name="Vermelho" description="Erro e limite estourado" />
              </div>

              <SubTitle>Tipografia</SubTitle>
              {/* TODO: Luiza preencher (confirmar Nunito nos títulos) */}
              <Body>
                <p>
                  Nunito [CONFIRMAR] em títulos e valores: arredondada, mais acolhedora para um tema que gera tensão. Roboto em textos e campos.
                </p>
              </Body>
              <FontSpecimen
                fontName="Nunito"
                sample="PlanejaDin"
                description="Roboto em textos e campos, para leitura confortável no celular."
                fontFamily="'Nunito', sans-serif"
                bodyFontFamily="'Roboto', sans-serif"
              />

              <SubTitle>UX writing</SubTitle>
              <Body>
                <p>
                  Tom simples e acolhedor, sem jargão financeiro e sem bronca. Os alertas dizem o que aconteceu e qual é o próximo passo.
                </p>
              </Body>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-6">
                {[
                  "Conta de Luz vence em 3 dias!",
                  "Seu gasto foi de R$ 250,00, o limite era R$ 215,00",
                  "Faltam 30 dias!",
                  "Nenhuma transação este mês. Que tal registrar a primeira?",
                ].map((t) => (
                  <li key={t} className="rounded-xl border border-border bg-card px-4 py-3 font-body text-sm text-foreground/85">
                    “{t}”
                  </li>
                ))}
              </ul>

              <SubTitle>Componentes e padrões</SubTitle>
              <Chips items={["Barra de navegação inferior", "Botão flutuante da Din", "Cards de transação", "Barras de progresso", "Chips de filtro", "Abas Receita/Despesa", "Toasts com “Desfazer”", "Ícones Lucide"]} />
            </section>

            <Divider />

            {/* 8. Wireframe, protótipo e teste */}
            <section>
              <SectionLabel>Protótipo e teste</SectionLabel>
              <SectionTitle>Do wireframe ao protótipo e ao teste</SectionTitle>

              {processImages.length === 2 && <ImageGrid images={processImages} onOpen={openLightbox} />}
              {processImages.length === 1 && <NarrowImage src={processImages[0].src} alt={processImages[0].alt} onOpen={openLightbox} />}

              <SubTitle>Teste de navegação</SubTitle>
              <Body>
                <p>
                  Testamos o protótipo no celular com pessoas com familiaridade básica com apps e interesse em controlar as finanças. Cada uma fez quatro tarefas:
                </p>
              </Body>
              <ol className="grid grid-cols-1 md:grid-cols-2 gap-3 my-6">
                {[
                  "Registrar uma despesa de R$ 55,00 em Alimentação, hoje, no cartão de crédito",
                  "Criar a meta “Viagem”, de R$ 5.000, em 6 meses",
                  "Abrir o Resumo Financeiro e filtrar os últimos 3 meses",
                  "Perguntar à Din como economizar com alimentação",
                ].map((t, i) => (
                  <li key={t} className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3">
                    <span className="font-heading text-sm font-bold text-primary">T{i + 1}</span>
                    <p className="font-body text-sm text-foreground/85">{t}</p>
                  </li>
                ))}
              </ol>
              {/* TODO: Luiza preencher (nº de participantes e observações). Se não houver dados, apagar o [PREENCHER] e manter só a frase do relatório. */}
              <Body>
                <p>[PREENCHER: quantas pessoas participaram e o que observamos]</p>
                <p>
                  Os testes foram iniciais e apontaram a criação e o acompanhamento de metas como o principal ponto a refinar.
                </p>
              </Body>

              <SubTitle>O que ajustamos no MVP</SubTitle>
              <BeforeAfter
                labels={["No protótipo", "No MVP", "Por quê"]}
                rows={[
                  { before: "Pagamento só com Pix e Débito", after: "Pix, Débito, Cartão de crédito, Dinheiro e Boleto", why: "A tarefa do teste pedia cartão de crédito" },
                  { before: "Textos em inglês (“Or Login with”)", after: "Tudo em português (“Ou entre com”)", why: "Consistência e clareza" },
                  { before: "Card de categoria com limite de R$ 500 e alerta com limite de R$ 215", after: "Mesmo dado em todas as telas", why: "Confiança nos números" },
                  { before: "Meta só com nome, valor e data", after: "Meta mostra quanto guardar por mês", why: "Transforma o objetivo em ação" },
                  { before: "Alerta sem saída", after: "“Revisar Gastos” abre o histórico filtrado e “Pagar agora” registra a despesa", why: "Todo alerta leva a uma próxima ação" },
                ]}
              />

              <FigmaEmbed title="Protótipo do PlanejaDin" protoUrl={PROTO_URL} />
            </section>

            <Divider />

            {/* 9. MVP funcional */}
            <section>
              <SectionLabel>Do protótipo ao produto</SectionLabel>
              <SectionTitle>MVP funcional (2026): como funciona por dentro</SectionTitle>
              <Body>
                <p>
                  Em 2026, transformei o protótipo em um produto que funciona de verdade. Escrevi um documento de requisitos para o Figma Make com contexto, identidade visual, 20 telas, regras de negócio, dados de demonstração, arquitetura e critérios de aceite, e usei os quatro fluxos do teste de navegação como critério de pronto. Depois revisei o resultado tela a tela contra esses critérios.
                </p>
              </Body>

              <div className="flex flex-wrap gap-3 mt-6">
                <LinkButton href={MVP_URL} primary>Ver MVP em funcionamento</LinkButton>
              </div>
              <p className="font-body text-sm text-muted-foreground mt-3">
                Para testar: entre com a conta de demonstração, registre uma despesa, crie uma meta, abra Minhas Finanças e pergunte algo à Din.
              </p>

              {MVP_SHOTS.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  {MVP_SHOTS.map((s) => (
                    <Screenshot key={s.file} src={s.src} alt={s.alt} caption={s.caption} onOpen={openLightbox} />
                  ))}
                </div>
              )}

              <SubTitle>Ferramentas e linguagens</SubTitle>
              {/* TODO: Luiza preencher (remover Recharts, Vitest ou Vite se não foram usados) */}
              <Chips items={["Figma Make (IA)", "Prompt engineering", "TypeScript", "React", "React Router", "Tailwind CSS", "Recharts [CONFIRMAR]", "Lucide", "Vitest [CONFIRMAR]", "Vite [CONFIRMAR]"]} />

              <SubTitle>Arquitetura</SubTitle>
              <Body>
                <p>
                  É uma SPA que roda no navegador, sem servidor próprio. Interface, regras de negócio e dados ficam em camadas separadas (padrões Service e Repository). Os dados ficam no localStorage, atrás de funções load() e save(), então dá para trocar por um banco (ex.: Supabase) sem refazer as telas.
                </p>
              </Body>
              <BulletList
                items={[
                  <><code className="font-mono text-sm">types.ts</code>: modelos</>,
                  <><code className="font-mono text-sm">data/seed.ts</code>: dados de demonstração</>,
                  <><code className="font-mono text-sm">services/</code>: saldo, limites e alertas, metas, recorrência, relatórios, exportação, Din</>,
                  <><code className="font-mono text-sm">services/repository.ts</code>: persistência</>,
                  "Estado global com Context API",
                ]}
              />

              <SubTitle>Lógica principal</SubTitle>
              <Body>
                <p>
                  As regras de negócio da seção de requisitos (saldo, limites, vencimentos, metas e recorrência) viraram funções nos serviços. Além delas:
                </p>
              </Body>
              <GridCards
                items={[
                  { t: "Din por regras", d: "Identifica a intenção da pergunta (gastos, metas, vencimento, economia, saldo) e responde com os dados da usuária. A lógica fica isolada para trocar por um modelo de IA no futuro." },
                  { t: "Dados que não envelhecem", d: "Os dados de demonstração são gerados a partir do mês atual, então o MVP faz sentido em qualquer data." },
                  { t: "Exportação", d: "CSV com separador “;” e vírgula decimal (abre direto no Excel em português) e PDF pela impressão do navegador." },
                ]}
              />

              <SubTitle>APIs do navegador</SubTitle>
              {/* TODO: Luiza preencher (confirmar se a Web Speech API foi implementada) */}
              <Body>
                <p>
                  Nenhuma API paga ou com chave. Usa localStorage (persistência), Intl.NumberFormat (R$ 1.818,81), Web Speech API (microfone na Din, quando o navegador suporta) e a impressão do navegador (PDF). [CONFIRMAR: Web Speech foi implementada?]
                </p>
              </Body>

              <SubTitle>Técnicas de UX aplicadas no MVP</SubTitle>
              <Body>
                <p>Heurísticas de Nielsen, cada uma com um exemplo real do MVP:</p>
              </Body>
              <GridCards
                items={[
                  { t: "Visibilidade do status", d: "Skeletons, toasts (“Despesa registrada”), item ativo na barra." },
                  { t: "Correspondência com o mundo real", d: "“Faltam 30 dias!”, “o limite era R$ 215,00”." },
                  { t: "Controle e liberdade", d: "Editar e excluir tudo, “Desfazer” no toast, “Lembrar depois”." },
                  { t: "Prevenção de erros", d: "Confirmação antes de excluir, validação inline, teclado numérico no valor." },
                  { t: "Reconhecimento em vez de memorização", d: "Últimas categorias no topo, filtros lembrados, sugestões na Din." },
                  { t: "Flexibilidade e eficiência", d: "Registrar pela Home, por Transações ou pela Din." },
                  { t: "Recuperação de erros", d: "Estados vazios com próxima ação, erro de login claro, página 404." },
                  { t: "Acessibilidade", d: "Contraste AA, alvos de 44px, aria-label, cor nunca sozinha (sinal +/− junto)." },
                ]}
              />

              <Insight label="O que aprendi levando o protótipo a um produto">
                O Figma aceita qualquer número na tela. O código não: tive que decidir o que acontece quando a meta vence, quando a categoria é excluída e quando o alerta já foi mostrado. Isso me fez pensar em estados e regras que o protótipo escondia.
              </Insight>

              <div className="flex flex-wrap gap-3 mt-8">
                <LinkButton href={MVP_URL} primary>Ver MVP em funcionamento</LinkButton>
                <LinkButton href={FICHA_URL}>Ficha técnica completa</LinkButton>
                <LinkButton href={PROTO_URL}>Ver protótipo no Figma</LinkButton>
              </div>
            </section>

            <Divider />

            {/* 10. Linha do tempo */}
            <section>
              <SectionLabel>Linha do tempo</SectionLabel>
              <SectionTitle>De 2025 a 2026</SectionTitle>
              <Timeline
                as="h3"
                highlightYear="2026"
                items={[
                  {
                    year: "2025",
                    title: "Pesquisa e requisitos",
                    text: "Questionário com 18 pessoas, benchmarking, proto-personas, histórias de usuário, requisitos com apoio de IA e caso de uso.",
                  },
                  {
                    year: "2025",
                    title: "Protótipo e teste",
                    text: "Wireframe, protótipo de alta fidelidade e teste de navegação com 4 fluxos.",
                  },
                  {
                    year: "2026",
                    title: "MVP funcional",
                    text: "Documento de requisitos, prompt engineering no Figma Make e revisão contra critérios de aceite.",
                  },
                ]}
              />
            </section>

            <Divider />

            {/* 11. Impacto esperado e métricas */}
            <section>
              <SectionLabel>Impacto</SectionLabel>
              <SectionTitle>Impacto esperado e como eu mediria</SectionTitle>
              <Body>
                <p>O MVP ainda não foi medido com usuários. Este é o impacto que esperamos:</p>
              </Body>
              <BulletList
                items={[
                  "Aumento da frequência de uso",
                  "Melhor controle financeiro",
                  "Maior engajamento com metas",
                  "Redução da frustração do usuário",
                ]}
              />

              <SubTitle>Como eu mediria</SubTitle>
              <GridCards
                items={[
                  { t: "Hábito", d: "% de usuários que registram transações em pelo menos 3 dias por semana." },
                  { t: "Retenção", d: "Usuários ativos na 4ª semana após o cadastro." },
                  { t: "Esforço", d: "Tempo médio para registrar uma despesa (meta: menos de 20 segundos)." },
                  { t: "Metas", d: "% de metas com aporte no último mês." },
                  { t: "Usabilidade", d: "Taxa de sucesso e nota SUS nos 4 fluxos, comparando protótipo e MVP." },
                ]}
              />
            </section>

            <Divider />

            {/* 12. Aprendizados e próximos passos */}
            <section className="mb-8">
              <SectionLabel>Conclusão</SectionLabel>
              <SectionTitle>Aprendizados e próximos passos</SectionTitle>

              <ul className="space-y-6 my-8">
                {[
                  "Simplicidade é uma decisão estratégica",
                  "Informação bem organizada gera confiança",
                  "UX em finanças precisa reduzir ansiedade",
                  "Funcionalidade sem clareza não gera valor",
                  "Levar o protótipo ao código me obrigou a decidir estados e regras que o Figma escondia",
                ].map((text) => (
                  <li key={text} className="flex items-start gap-4">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" aria-hidden="true" />
                    <p className="font-body text-base text-foreground/85 leading-relaxed">{text}</p>
                  </li>
                ))}
              </ul>

              <SubTitle>Próximos passos</SubTitle>
              <BulletList
                items={[
                  "Repetir o teste de navegação no MVP com 5 pessoas e registrar sucesso e tempo",
                  "Login real e sincronização entre dispositivos (Supabase)",
                  "Integração com bancos (Open Finance), que apareceu na pesquisa",
                  "Din com modelo de IA, mantendo as respostas baseadas nos dados do usuário",
                  "Gamificação de metas",
                ]}
              />

              <Insight label="Diferencial">
                O PlanejaDin não é apenas um app de controle financeiro. Ele foi pensado como um sistema de apoio ao comportamento financeiro, ajudando o usuário não só a registrar, mas a entender suas finanças e ser capaz de tomar decisões para ajustá-las.
              </Insight>
            </section>

            <CaseNav current="/projeto/planejadin" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Project3;
