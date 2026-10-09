import React, { useEffect } from "react";
import { ArrowDown, ArrowRight, CornerDownRight, EyeOff, FolderOpen, ListX, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FigmaEmbed from "@/components/FigmaEmbed";
import { Body, BulletList, Divider, Insight, Quote, SectionLabel, SectionTitle, SubTitle } from "@/components/case/Typography";
import { ClickableImage, NarrowImage, Screenshot, useLightbox, type OpenImage } from "@/components/case/Images";
import { BeforeAfter, Card, CardText, CardTitle, Chips, ColorSwatch, FlowItem, LinkButton, NumberedItem } from "@/components/case/Cards";
import { CaseHero, KeyNumbers } from "@/components/case/CaseHero";
import { CaseNav } from "@/components/case/CaseNav";

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

/* Se ficar vazio, a seção do MVP e o botão do hero não aparecem. */
const MVP_URL = "https://unify-wifi-52683631.figma.site";

/* TODO: Luiza preencher — [PREENCHER] link público do guia de estilo do Centro Paula Souza. */
const CPS_GUIDE_URL = "";

/* Screenshots do MVP: basta salvar gestao-mvp-1.jpg, gestao-mvp-2.jpg e gestao-mvp-3.jpg em src/assets. */
const MVP_SHOTS = Object.entries(
  import.meta.glob<string>("../assets/gestao-mvp-*.jpg", { eager: true, import: "default" })
)
  .sort(([a], [b]) => a.localeCompare(b))
  .slice(0, 3)
  .map(([, src]) => src);

const PROTO_URL =
  "https://www.figma.com/proto/CZnTZSRBKNTum8tegBbUB8/Sistema-Centro-de-Linguas?page-id=0%3A1&node-id=188-4919&viewport=1611%2C-1686%2C0.42&t=8kylNFRgq4ejFzSO-1&scaling=contain&content-scaling=fixed&starting-point-node-id=432%3A55&show-proto-sidebar=1";

const PAGE_TITLE = "Gestão Acadêmica — Centro de Línguas Fatec | Luiza Menezes";

/* Dimensões reais dos arquivos, para o navegador reservar o espaço antes de carregar. */
const SIZE_SCREEN = { width: 1100, height: 747 };
const SIZE_SMALL = { width: 640, height: 435 };
const SIZE_WIREFRAME_SMALL = { width: 608, height: 413 };

/* ── blocos exclusivos deste case ── */

const REQUIREMENTS = [
  ["Inscrição de alunos", "Página pública Inscrições"],
  ["Horário de aula (período)", "Informações do curso e Minha Agenda"],
  ["Dados dos alunos (ciclo, turno etc.)", "Meus Dados (perfil)"],
  ["Visualização dos eventos do Centro de Línguas", "Eventos (próximos e anteriores) e Agenda"],
  ["Sistema de avaliação", "Notas e Faltas"],
  ["Controle de frequência", "Notas e Faltas (presenças, faltas e %)"],
  ["Controle de arquivos (conteúdo)", "Conteúdo ministrado"],
  ["Controle de arquivos (tarefas)", "Tarefas, com envio e dúvida na mesma tela"],
  ["Relatório de desempenho", "Relatório de Desempenho do curso"],
  ["Certificado de conclusão", "Meus Certificados, por idioma"],
  ["Mural de avisos", "Recados na página inicial"],
];

const RequirementsTable = () => (
  <>
    {/* Desktop: tabela */}
    <div className="hidden md:block my-8 rounded-xl border border-border overflow-hidden">
      <table className="w-full text-left">
        <caption className="sr-only">Requisitos levantados e onde cada um foi resolvido no sistema</caption>
        <thead className="bg-accent/60">
          <tr className="font-body text-[11px] tracking-[0.2em] uppercase text-primary">
            <th scope="col" className="px-5 py-3 font-semibold w-[45%]">Requisito levantado</th>
            <th scope="col" className="px-5 py-3 font-semibold">Onde foi resolvido no sistema</th>
          </tr>
        </thead>
        <tbody className="bg-card">
          {REQUIREMENTS.map(([req, where]) => (
            <tr key={req} className="border-t border-border">
              <th scope="row" className="px-5 py-3 font-body text-sm font-normal text-muted-foreground">{req}</th>
              <td className="px-5 py-3 font-body text-sm font-semibold text-foreground">
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

    {/* Mobile: lista de cards */}
    <ul className="md:hidden my-8 space-y-3" aria-label="Requisitos levantados e onde cada um foi resolvido no sistema">
      {REQUIREMENTS.map(([req, where]) => (
        <li key={req} className="rounded-xl border border-border bg-card px-4 py-3">
          <p className="font-body text-sm text-muted-foreground">{req}</p>
          <p className="font-body text-sm font-semibold text-foreground mt-1 flex items-start gap-2">
            <ArrowDown size={16} className="text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
            <span><span className="sr-only">Resolvido em: </span>{where}</span>
          </p>
        </li>
      ))}
    </ul>
  </>
);

const NavPill = ({ children, strong = false }: { children: React.ReactNode; strong?: boolean }) => (
  <li
    className={`rounded-lg px-3 py-2 font-body text-sm text-center ${
      strong ? "bg-primary text-primary-foreground font-semibold" : "bg-card border border-border text-foreground/85"
    }`}
  >
    {children}
  </li>
);

const SubNav = ({ from, title, items }: { from: string; title: string; items: string[] }) => (
  <div className="rounded-xl border border-border bg-card p-4 md:p-5">
    <p className="flex items-center gap-2 font-body text-xs text-muted-foreground">
      <CornerDownRight size={14} className="text-primary" aria-hidden="true" />
      a partir de <strong className="text-foreground font-semibold">{from}</strong>
    </p>
    <p className="font-heading text-sm font-semibold text-foreground mt-2">{title}</p>
    <ul className="mt-3 space-y-1.5">
      {items.map((item) => (
        <li key={item} className="font-body text-sm text-foreground/80 border-l-2 border-primary/40 pl-3">
          {item}
        </li>
      ))}
    </ul>
  </div>
);

/** Mapa do site: navegação global no topo e navegação contextual dentro do curso. */
const SiteMap = () => (
  <figure className="my-10 rounded-2xl border border-border bg-accent/40 p-4 md:p-6">
    <p className="font-body text-[11px] tracking-[0.2em] uppercase text-primary font-semibold mb-3">
      Navegação global (topo de todas as páginas)
    </p>
    <ul className="grid grid-cols-2 sm:grid-cols-4 gap-2">
      <NavPill>Página inicial</NavPill>
      <NavPill strong>Meus cursos</NavPill>
      <NavPill>Eventos</NavPill>
      <NavPill strong>Meu perfil</NavPill>
    </ul>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      <SubNav
        from="Meus cursos"
        title="Dentro do curso: menu lateral contextual"
        items={["Informações do curso", "Conteúdo ministrado", "Tarefas", "Notas e Faltas", "Relatório de Desempenho"]}
      />
      <SubNav
        from="Meu perfil"
        title="Menu do perfil: visão geral do aluno"
        items={["Meus Dados", "Minha Agenda", "Minhas Tarefas", "Notas e Faltas (geral)", "Meus Eventos", "Relatórios de Desempenho", "Meus Certificados"]}
      />
    </div>

    <p className="mt-4 font-body text-xs text-muted-foreground">
      Rodapé fixo: Central de Solicitações · Dúvidas
    </p>
    <figcaption className="sr-only">
      Mapa do site. No topo, a navegação global com Página inicial, Meus cursos, Eventos e Meu perfil. Ao entrar em um
      curso, um menu lateral mostra Informações, Conteúdo, Tarefas, Notas e Faltas e Relatório. O menu do perfil reúne
      dados, agenda, tarefas, notas gerais, eventos, relatórios e certificados.
    </figcaption>
  </figure>
);

const WireframePair = ({
  wireframe,
  screen,
  title,
  children,
  onOpen,
}: {
  wireframe: { src: string; width: number; height: number };
  screen: { src: string; width: number; height: number };
  title: string;
  children: React.ReactNode;
  onOpen: OpenImage;
}) => (
  <figure className="my-10">
    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-3 md:gap-4 items-center">
      <div>
        <p className="font-body text-[11px] tracking-[0.2em] uppercase text-muted-foreground font-semibold mb-2">Wireframe</p>
        <ClickableImage
          src={wireframe.src}
          width={wireframe.width}
          height={wireframe.height}
          alt={`Wireframe em baixa fidelidade: ${title}`}
          className="w-full rounded-xl border border-border shadow-sm"
          onOpen={onOpen}
        />
      </div>
      <ArrowRight className="hidden md:block text-primary" size={22} aria-hidden="true" />
      <ArrowDown className="md:hidden mx-auto text-primary" size={22} aria-hidden="true" />
      <div>
        <p className="font-body text-[11px] tracking-[0.2em] uppercase text-primary font-semibold mb-2">Alta fidelidade</p>
        <ClickableImage
          src={screen.src}
          width={screen.width}
          height={screen.height}
          alt={`Interface em alta fidelidade: ${title}`}
          className="w-full rounded-xl border border-border shadow-sm"
          onOpen={onOpen}
        />
      </div>
    </div>
    <figcaption className="font-body text-sm text-muted-foreground mt-4 leading-relaxed">
      <strong className="text-foreground font-semibold">{title}.</strong> {children}
    </figcaption>
  </figure>
);

const SLAB = { fontFamily: "'Roboto Slab', serif" };
const ROBOTO = { fontFamily: "'Roboto', sans-serif" };

/** Escala do guia do CPS: Roboto Slab para títulos e Roboto para textos. */
const TypeSpecimen = () => (
  <div className="my-8 rounded-xl border border-border bg-card p-6 md:p-8 space-y-6">
    <div>
      <p className="font-body text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-3">Roboto Slab — títulos</p>
      <div className="space-y-3">
        {[
          { label: "H1 — 36px", size: 36, text: "Minha Agenda" },
          { label: "H2 — 24px", size: 24, text: "Próximos Eventos" },
          { label: "H3 — 20px", size: 20, text: "Inglês - Básico 2" },
        ].map((t) => (
          <div key={t.label}>
            <span className="font-body text-xs text-muted-foreground">{t.label}</span>
            <p className="text-foreground leading-tight" style={{ ...SLAB, fontSize: t.size }}>{t.text}</p>
          </div>
        ))}
      </div>
    </div>
    <div className="pt-6 border-t border-border">
      <p className="font-body text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-3">Roboto — texto</p>
      <span className="font-body text-xs text-muted-foreground">Corpo — 16px</span>
      <p className="text-foreground/85" style={{ ...ROBOTO, fontSize: 16 }}>
        Entrega até 15 de fevereiro às 19h. Envie aqui sua atividade.
      </p>
    </div>
  </div>
);

/** Carrega Roboto e Roboto Slab só nesta página, para o especimen tipográfico. */
const useCaseFonts = () => {
  useEffect(() => {
    const id = "fonts-gestao-academica";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Roboto:wght@400&family=Roboto+Slab:wght@400;500&display=swap";
    document.head.appendChild(link);
  }, []);
};

/* ── página ── */

const Project2 = () => {
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

  return (
    <>
      <Navbar />
      {lightbox}

      <main className="pt-24">
        {/* 1. Hero */}
        <CaseHero
          label="UX Research • Product Design • UI Design • Voluntariado"
          title="Centro de Línguas Fatec: um hub acadêmico para o aluno"
          subtitle="A gestão acadêmica do Centro de Línguas da Fatec Baixada Santista estava espalhada entre Teams, e-mail e OneDrive. Projetei um sistema único onde o aluno acompanha cursos, tarefas, notas, agenda e certificados sem depender da secretaria."
          facts={[
            // TODO: Luiza preencher — confirmar se o projeto foi individual ou em equipe
            { label: "Meu papel", value: "UX e Product Designer, trabalho voluntário [CONFIRMAR: projeto individual ou em equipe? com quem?]" },
            // TODO: Luiza preencher — ano do protótipo
            { label: "Quando", value: "[PREENCHER: ano do protótipo] · MVP funcional em 2026" },
            { label: "Para quem", value: "Alunos, professores e coordenação do Centro de Línguas (Centro Paula Souza)" },
            { label: "Plataforma", value: "Sistema web (desktop)" },
            { label: "Ferramentas", value: "Figma e FigJam · Figma Make com IA (MVP)" },
            { label: "Base visual", value: "Guia de estilo do Centro Paula Souza" },
          ]}
          actions={MVP_URL ? <LinkButton href={MVP_URL}>Ver MVP</LinkButton> : undefined}
          cover={{
            src: telaHome,
            ...SIZE_SMALL,
            alt: "Página inicial do aluno no sistema do Centro de Línguas: saudação, atalhos para os cursos de inglês, espanhol e francês, atalhos para agenda, tarefas e eventos, e o menu do perfil aberto com dados, notas, relatórios e certificados.",
            caption: "Home do aluno: cursos, atalhos e recados no mesmo lugar.",
          }}
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
                    Processos manuais e espalhados em várias ferramentas geravam retrabalho, falhas de comunicação e dependência da secretaria até para ações simples. O aluno não tinha onde acompanhar a própria jornada.
                  </CardText>
                </Card>
                <Card>
                  <CardTitle as="h3">O que eu fiz</CardTitle>
                  <CardText>
                    Levantei requisitos com alunos, professores e coordenação, organizei a arquitetura da informação pelas tarefas do aluno (e não pelos departamentos), desenhei os fluxos, os wireframes e a interface, e montei um protótipo navegável.
                  </CardText>
                </Card>
                <Card>
                  <CardTitle as="h3">Resultado</CardTitle>
                  <CardText>
                    Um hub acadêmico com 7 telas principais em alta fidelidade e protótipo navegável no Figma; em 2026, um MVP funcional gerado com IA a partir dos requisitos, publicado em{" "}
                    <a href={MVP_URL} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 hover:text-secondary break-all">
                      unify-wifi-52683631.figma.site
                    </a>
                    .
                  </CardText>
                </Card>
              </div>

              <KeyNumbers
                items={[
                  { n: "11", t: "requisitos mapeados" },
                  { n: "3", t: "perfis envolvidos (alunos, professores, coordenação)" },
                  { n: "4", t: "fluxos principais desenhados" },
                  { n: "7", t: "telas em alta fidelidade" },
                ]}
              />

              <SubTitle>Competências neste case</SubTitle>
              <div className="rounded-xl border border-border bg-card divide-y divide-border">
                {[
                  { label: "UX Research", items: ["Levantamento de requisitos com stakeholders", "Mapeamento de processos atuais", "Identificação de dores"] },
                  { label: "Product Design", items: ["Arquitetura da informação", "Priorização", "Fluxos de navegação", "Definição de MVP", "Métricas de sucesso"] },
                  { label: "UI Design", items: ["Wireframes", "Interface em alta fidelidade", "Sistema visual", "Aplicação de design system institucional", "Protótipo navegável"] },
                ].map((group) => (
                  <div key={group.label} className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-1 md:gap-4 items-start p-5">
                    <h4 className="font-heading text-sm font-semibold text-foreground md:mt-4">{group.label}</h4>
                    <Chips items={group.items} />
                  </div>
                ))}
              </div>
            </section>

            <Divider />

            {/* 3. Contexto e problema */}
            <section>
              <SectionLabel>Contexto</SectionLabel>
              <SectionTitle>O problema real</SectionTitle>
              <Body>
                <p>
                  O Centro de Línguas da Fatec Baixada Santista fazia a gestão acadêmica com Teams, e-mail e OneDrive. Os processos eram manuais e pouco integrados. Isso gerava retrabalho, falhas de comunicação e dificuldade para acompanhar as informações.
                </p>
                <p>
                  Para o aluno, não existia um ambiente onde acompanhar a própria jornada com clareza e autonomia. A experiência era fragmentada para alunos e professores.
                </p>
              </Body>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-10">
                {[
                  { Icon: FolderOpen, text: "Informações dispersas em múltiplas ferramentas" },
                  { Icon: EyeOff, text: "Falta de visibilidade sobre desempenho e atividades" },
                  { Icon: Users, text: "Dependência de professores e secretaria para ações simples" },
                  { Icon: ListX, text: "Falta de padrão na organização da rotina acadêmica" },
                ].map(({ Icon, text }) => (
                  <li key={text} className="rounded-xl bg-accent/50 border border-border p-5">
                    <Icon size={24} className="text-primary mb-3" aria-hidden="true" />
                    <p className="font-body text-sm text-foreground/80 font-medium">{text}</p>
                  </li>
                ))}
              </ul>

              <Quote>O problema não era falta de informação, mas falta de organização.</Quote>
            </section>

            <Divider />

            {/* 4. Pesquisa */}
            <section>
              <SectionLabel>Pesquisa</SectionLabel>
              <SectionTitle>Entendendo o problema na prática</SectionTitle>
              <Body>
                <p>
                  Antes de propor qualquer solução, conversei com alunos, professores e coordenação para entender como cada um lidava com os processos no dia a dia.
                </p>
                {/* TODO: Luiza preencher — método de pesquisa e número de participantes por perfil */}
                <p>[PREENCHER: método — entrevistas, conversas informais, observação? quantas pessoas de cada perfil?]</p>
                <p>Cada necessidade virou um requisito. Na tabela, mostro onde cada um foi resolvido no sistema:</p>
              </Body>

              <RequirementsTable />

              <NarrowImage
                src={requisitosImg}
                width={1100}
                height={455}
                alt="Quadro no FigJam com os requisitos levantados em post-its: inscrição, horários, dados dos alunos, eventos, avaliação, frequência, arquivos, relatório, certificado e mural de avisos."
                maxWidth="640px"
                onOpen={openLightbox}
              />
              <p className="font-body text-sm text-muted-foreground text-center -mt-4">Mapeamento original no FigJam</p>
            </section>

            <Divider />

            {/* 5. Definição */}
            <section>
              <SectionLabel>Definição</SectionLabel>
              <SectionTitle>Arquitetura centrada no aluno</SectionTitle>
              <Body>
                <p>
                  Meu objetivo foi tirar a administração do centro do sistema e colocar o aluno no lugar dela. Projetei um hub acadêmico: um único lugar com cursos, notas, tarefas, agenda e certificados, sem e-mail nem planilha. Para isso, organizei a arquitetura pelas tarefas do aluno, e não pelos departamentos.
                </p>
              </Body>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-10">
                <NumberedItem as="h3" number="1" title="Página inicial" items={["Cursos ativos", "Agenda, tarefas e eventos", "Recados institucionais"]} />
                <NumberedItem as="h3" number="2" title="Jornada acadêmica" items={["Meus cursos", "Conteúdo do curso", "Tarefas", "Notas e faltas", "Relatório de desempenho"]} />
                <NumberedItem as="h3" number="3" title="Gestão pessoal" items={["Perfil do aluno", "Certificados", "Central de solicitações"]} />
              </div>

              <SubTitle>Mapa do site</SubTitle>
              <SiteMap />

              <Insight label="Decisão de UX">
                Separei a navegação global (topo) da navegação contextual (menu lateral dentro do curso). Assim o aluno sempre sabe em que curso está e como voltar.
              </Insight>

              <SubTitle>Fluxos principais</SubTitle>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
                <FlowItem title="Acompanhar desempenho" flow="Curso → Notas / Relatório → Visualização" />
                <FlowItem title="Gerenciar tarefas" flow="Tarefas → Visualização → Status (concluída, pendente)" />
                <FlowItem title="Organizar rotina" flow="Agenda → Visualização de compromissos" />
                <FlowItem title="Acessar certificados" flow="Certificados → Categoria → Visualização" />
              </div>
            </section>

            <Divider />

            {/* 6. Do wireframe à interface */}
            <section>
              <SectionLabel>Design</SectionLabel>
              <SectionTitle>Do wireframe à interface</SectionTitle>
              <Body>
                <p>
                  Validei hierarquia e fluxos em baixa fidelidade antes de aplicar o visual. Na alta fidelidade, mantive a estrutura e ajustei o que o aluno precisava ver primeiro.
                </p>
              </Body>

              {/* TODO: Luiza preencher — confirmar se os motivos das mudanças em cada par estão corretos */}
              <WireframePair
                title="Página inicial do aluno"
                wireframe={{ src: wireframe1, ...SIZE_WIREFRAME_SMALL }}
                screen={{ src: telaHome, ...SIZE_SMALL }}
                onOpen={openLightbox}
              >
                Acrescentei a saudação com o nome do aluno, destaquei o curso ativo e levei as áreas pessoais para o menu do perfil. A home ficou só com o que o aluno usa toda semana.
              </WireframePair>

              <WireframePair
                title="Notas e Faltas"
                wireframe={{ src: wireframe2, ...SIZE_WIREFRAME_SMALL }}
                screen={{ src: telaNotas, ...SIZE_SCREEN }}
                onOpen={openLightbox}
              >
                Mantive a tabela por avaliação e a frequência em porcentagem, e coloquei o total de presenças ao lado das faltas. O aluno lê a própria situação sem fazer conta.
              </WireframePair>

              <WireframePair
                title="Minhas Tarefas"
                wireframe={{ src: wireframe3, ...SIZE_SMALL }}
                screen={{ src: telaTarefas, ...SIZE_SMALL }}
                onOpen={openLightbox}
              >
                O wireframe listava as tarefas por status. Na interface, a tarefa abre dentro do curso com prazo, instruções, envio do arquivo e campo de dúvida na mesma tela, para o aluno não sair para o e-mail ou o Teams.
              </WireframePair>

              <WireframePair
                title="Agenda"
                wireframe={{ src: wireframe4, ...SIZE_SMALL }}
                screen={{ src: telaAgenda, ...SIZE_SCREEN }}
                onOpen={openLightbox}
              >
                Acrescentei as datas no cabeçalho da semana e as listas de próximas tarefas e próximos eventos ao lado do calendário. Aulas, prazos e eventos ficam na mesma visão.
              </WireframePair>

              <SubTitle>Outras telas</SubTitle>
              <Screenshot
                src={telaPrincipal}
                width={1100}
                height={1154}
                alt="Página pública do Centro de Línguas com menu de inscrições, próximos eventos em cards, notícias em carrossel e recados da coordenação."
                caption="Página pública: organizei eventos, notícias e recados em blocos distintos para facilitar a leitura e a priorização das informações."
                onOpen={openLightbox}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Screenshot
                  src={telaEventos}
                  {...SIZE_SCREEN}
                  alt="Página de eventos do Centro de Línguas dividida em próximos eventos, com link de inscrição, e eventos anteriores, em tom esmaecido."
                  caption="Eventos: dividi em “próximos” e “anteriores” para o aluno identificar rápido o que ainda é relevante."
                  onOpen={openLightbox}
                />
                <Screenshot
                  src={telaCertificados}
                  {...SIZE_SCREEN}
                  alt="Página Meus Certificados com um certificado de conclusão em cada coluna: inglês, espanhol e francês."
                  caption="Certificados: organizei por idioma para tornar a navegação mais intuitiva."
                  onOpen={openLightbox}
                />
              </div>
            </section>

            <Divider />

            {/* 7. Decisões de design */}
            <section>
              <SectionLabel>Decisões</SectionLabel>
              <SectionTitle>O que mudou para o aluno</SectionTitle>
              <Body>
                <p>Cada decisão partiu de um processo que o aluno fazia fora do sistema:</p>
              </Body>
              <BeforeAfter
                labels={["Como era", "Como ficou", "Por quê"]}
                rows={[
                  { before: "Tarefas enviadas por e-mail ou Teams", after: "Envio da atividade e dúvida na mesma tela da tarefa", why: "Evita trocar de ferramenta e perder o contexto." },
                  { before: "Notas e frequência em planilhas", after: "Tabela de Notas e Faltas por curso, com presenças e faltas em destaque", why: "O aluno acompanha o próprio desempenho sem pedir à secretaria." },
                  { before: "Eventos divulgados em vários canais", after: "Página de eventos separada em próximos e anteriores, integrada à agenda", why: "O que ainda é relevante aparece primeiro." },
                  { before: "Certificados pedidos à secretaria", after: "Meus Certificados organizados por idioma", why: "Autonomia e menos demanda manual." },
                  { before: "Compromissos espalhados", after: "Uma agenda única com aulas, prazos e eventos", why: "Uma fonte da verdade para a rotina." },
                ]}
              />
            </section>

            <Divider />

            {/* 8. Sistema visual: guia de estilo do Centro Paula Souza */}
            <section>
              <SectionLabel>Sistema visual</SectionLabel>
              <SectionTitle>Consistência com a identidade institucional</SectionTitle>
              <Body>
                <p>
                  O Centro de Línguas pertence ao Centro Paula Souza (CPS). Para o sistema parecer parte do ecossistema institucional, e não um produto à parte, usei o guia de estilo público do CPS como base: cores, tipografia e o uso de cores de feedback para status. Em vez de criar uma identidade nova, adaptei um design system existente às necessidades do aluno.
                </p>
              </Body>

              <Insight label="Decisão de design">
                Seguir o guia do CPS reduz o esforço de aprovação institucional, mantém a confiança do aluno (ele reconhece a marca) e facilita a evolução do sistema por outras equipes.
              </Insight>

              <SubTitle>Cores</SubTitle>
              <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground font-semibold mb-4 mt-6">Principais</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <ColorSwatch color="#B20000" name="Vermelho" description="vermelho-base · curso ativo e linhas sob os títulos" />
                <ColorSwatch color="#7E0000" name="Vermelho-escuro" description="vermelho-escuro-10 · header e menu lateral" />
                <ColorSwatch color="#005C6D" name="Azul" description="azul-base · footer e links" />
                <ColorSwatch color="#004854" name="Títulos" description="primario-titulos-hover · títulos de página" />
              </div>
              <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground font-semibold mb-4">Neutras</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <ColorSwatch color="#F8F8F8" name="Prata" description="prata-base · fundo" outlined />
                <ColorSwatch color="#E6E6E6" name="Cinza" description="hover · cards" outlined />
                <ColorSwatch color="#666666" name="Cinza texto" description="Texto corrido" />
              </div>
              <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground font-semibold mb-4">Auxiliares e feedback (status)</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <ColorSwatch color="#A0C340" name="Verde" description="verde-base · enviar atividade, entregue" />
                <ColorSwatch color="#D32719" name="Cancelado" description="Enviar dúvida, atrasado" />
                {/* TODO: Luiza preencher — confirmar o token e o hex do amarelo de eventos no guia do CPS */}
                <ColorSwatch color="#FFD800" name="Amarelo" description="Eventos na agenda [CONFIRMAR token]" />
              </div>

              <SubTitle>Tipografia</SubTitle>
              <TypeSpecimen />

              <div className="flex flex-wrap gap-3 mt-6">
                {CPS_GUIDE_URL ? (
                  <LinkButton href={CPS_GUIDE_URL}>Ver guia de estilo do CPS</LinkButton>
                ) : (
                  <p className="font-body text-sm text-muted-foreground">[PREENCHER: link do guia de estilo do CPS]</p>
                )}
              </div>
            </section>

            <Divider />

            {/* 9. Protótipo navegável */}
            <section>
              <SectionLabel>Protótipo</SectionLabel>
              <SectionTitle>Protótipo navegável</SectionTitle>
              <Body>
                <p>
                  Sugestão de percurso: entre na home do aluno, abra o curso de Inglês, envie a Atividade 1 e confira Notas e Faltas.
                </p>
              </Body>
              <FigmaEmbed as="h3" title="Protótipo interativo do sistema" protoUrl={PROTO_URL} />
            </section>

            {/* 10. MVP funcional — só aparece quando houver link */}
            {MVP_URL && (
              <>
                <Divider />
                <section>
                  <SectionLabel>Do protótipo ao produto</SectionLabel>
                  <SectionTitle>MVP funcional (2026)</SectionTitle>
                  <Body>
                    <p>
                      Em 2026, transformei o protótipo em um produto funcional. Escrevi um documento de requisitos com regras de negócio (cálculo de média, frequência mínima, status de tarefas, emissão de certificado) e usei prompt engineering no Figma Make para gerar o código. Depois revisei o resultado contra critérios de aceite baseados nos fluxos do aluno.
                    </p>
                  </Body>
                  <div className="flex flex-wrap gap-3 mt-6">
                    <LinkButton href={MVP_URL} primary>Ver MVP em funcionamento</LinkButton>
                  </div>
                  {MVP_SHOTS.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                      {MVP_SHOTS.map((src, i) => (
                        <Screenshot
                          key={src}
                          src={src}
                          // TODO: Luiza preencher — alt e legenda de cada screenshot do MVP
                          alt={`Tela ${i + 1} do MVP funcional do sistema do Centro de Línguas`}
                          caption={`[PREENCHER: legenda da tela ${i + 1} do MVP]`}
                          onOpen={openLightbox}
                        />
                      ))}
                    </div>
                  )}
                  {/* Repete o botão no fim, como no Project1, quando há screenshots entre os dois. */}
                  {MVP_SHOTS.length > 0 && (
                    <div className="flex flex-wrap gap-3 mt-8">
                      <LinkButton href={MVP_URL} primary>Ver MVP em funcionamento</LinkButton>
                    </div>
                  )}
                </section>
              </>
            )}

            <Divider />

            {/* 11. Impacto esperado */}
            <section>
              <SectionLabel>Impacto</SectionLabel>
              <SectionTitle>Impacto esperado e como eu mediria</SectionTitle>
              <Body>
                <p>O sistema ainda não foi medido em uso. O impacto que eu espero:</p>
              </Body>
              <BulletList
                items={[
                  "Mais autonomia do aluno",
                  "Menos dúvidas e menos demanda para a secretaria",
                  "Acompanhamento acadêmico organizado",
                  "Comunicação mais clara",
                ]}
              />

              <SubTitle>Como eu mediria</SubTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { t: "Autonomia", d: "% de alunos que consultam notas e frequência no sistema sem contatar a secretaria." },
                  { t: "Demanda da secretaria", d: "Número de pedidos por e-mail (declarações, certificados, notas) antes e depois." },
                  { t: "Engajamento acadêmico", d: "Taxa de tarefas entregues no prazo." },
                  { t: "Usabilidade", d: "Taxa de sucesso, tempo por tarefa e nota SUS em teste com alunos." },
                ].map((m) => (
                  <Card key={m.t}>
                    <h4 className="font-heading text-sm font-semibold text-foreground">{m.t}</h4>
                    <CardText>{m.d}</CardText>
                  </Card>
                ))}
              </div>
            </section>

            <Divider />

            {/* 12. Aprendizados e próximos passos */}
            <section className="mb-8">
              <SectionLabel>Conclusão</SectionLabel>
              <SectionTitle>O que eu levo deste projeto</SectionTitle>
              <div className="space-y-4">
                {[
                  "A arquitetura da informação impacta a usabilidade mais do que o visual",
                  "Integrar agenda, tarefas e eventos cria mais valor do que ferramentas isoladas",
                  "Pequenas decisões visuais, como cores de status, mudam a compreensão do usuário",
                ].map((text, i) => (
                  <div key={text} className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card">
                    <span className="font-heading text-2xl font-bold text-primary/30 leading-none mt-0.5" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="font-body text-[15px] text-foreground/85 leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>

              <Quote>
                Entender a necessidade real e estruturar a arquitetura da informação mudou a forma como eu projeto qualquer produto digital.
              </Quote>

              <SubTitle>Próximos passos</SubTitle>
              <BulletList
                items={[
                  "Teste de usabilidade com 5 alunos, com tarefas como “descobrir quantas faltas você tem” e “enviar uma atividade”.",
                  "Validar as telas do professor e da secretaria, que o MVP introduz.",
                  "Revisar acessibilidade: contraste do texto branco sobre vinho e petróleo e navegação por teclado.",
                  // TODO: Luiza preencher — confirmar se muitos alunos acessam pelo celular
                  "Versão mobile, já que muitos alunos acessam pelo celular [CONFIRMAR].",
                ]}
              />
            </section>

            <CaseNav current="/projeto/gestao-academica" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Project2;
