import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FigmaEmbed from "@/components/FigmaEmbed";

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

const FlowItem = ({ title, flow }: { title: string; flow: string }) => (
  <div className="rounded-xl bg-accent/40 border border-border p-5">
    <p className="font-heading text-sm font-semibold text-foreground mb-1.5">{title}</p>
    <p className="font-body text-sm text-foreground/70">{flow}</p>
  </div>
);

const Project3 = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main className="pt-24">
        {/* ══ Hero ══ */}
        <header className="px-6 md:px-12 lg:px-20 pb-8">
          <div className="max-w-[960px] mx-auto">
            <Link
              to="/#projetos"
              className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-secondary transition-colors mb-10 min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
            >
              <ArrowLeft size={16} />
              Voltar aos projetos
            </Link>
            <SectionLabel>Product Design • Mobile MVP</SectionLabel>
            <h1 className="font-heading text-foreground text-[36px] md:text-[52px] font-bold leading-[1.1] mb-6">
              Planejadin
            </h1>
            <p className="font-body text-lg text-muted-foreground max-w-[640px] leading-relaxed">
              MVP de aplicativo de gestão financeira pessoal estruturado através de benchmarking competitivo e prototipação de alta fidelidade.
            </p>
          </div>
        </header>

        {/* ══ Content ══ */}
        <div className="px-6 md:px-12 lg:px-20 pb-20">
          <div className="max-w-[960px] mx-auto">

            {/* ── Visão Geral ── */}
            <section className="mt-16">
              <SectionLabel>Visão geral</SectionLabel>
              <SectionTitle>Onde tudo começou</SectionTitle>
              <Body>
                <p>
                  O PlanejaDin é um aplicativo de gestão financeira pessoal criado para ajudar usuários a organizarem suas finanças de forma simples, visual e contínua.
                </p>
                <p>
                  O projeto surgiu a partir de um problema comum: mesmo com diversas ferramentas disponíveis, as pessoas <strong>não conseguem manter o hábito de controlar o próprio dinheiro</strong>.
                </p>
              </Body>
            </section>

            <Divider />

            {/* ── Problema ── */}
            <section>
              <SectionTitle>O problema real</SectionTitle>
              <Body>
                <p>
                  Durante a análise inicial e levantamento de requisitos, ficou evidente que o problema não era apenas funcional, era comportamental.
                </p>
              </Body>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-10">
                {[
                  { emoji: "📉", text: "Não mantêm consistência no uso" },
                  { emoji: "👁️", text: "Dificuldade em visualizar a situação financeira" },
                  { emoji: "😓", text: "Sentem que o processo exige esforço constante" },
                  { emoji: "🤷", text: "Não recebem orientação sobre o que fazer com os dados" },
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

            {/* ── Objetivo ── */}
            <section>
              <SectionLabel>Objetivo</SectionLabel>
              <SectionTitle>O que eu queria resolver</SectionTitle>
              <Body>
                <p>Projetar uma solução que:</p>
              </Body>
              <BulletList
                items={[
                  "Simplifique o registro de receitas e despesas",
                  "Torne a informação financeira clara e acessível",
                  "Apoie o usuário na tomada de decisão",
                  "Incentive o uso contínuo",
                ]}
              />
            </section>

            <Divider />

            {/* ── Processo ── */}
            <section>
              <SectionLabel>Processo</SectionLabel>
              <SectionTitle>Entendendo o cenário</SectionTitle>

              <SubTitle>1. Levantamento de requisitos</SubTitle>
              <Body>
                <p>
                  A partir do relatório, foram definidos requisitos essenciais como:
                </p>
              </Body>
              <BulletList
                items={[
                  "Registro de receitas e despesas",
                  "Categorização de gastos",
                  "Geração de relatórios financeiros",
                  "Criação de metas",
                  "Alertas e notificações",
                  "Histórico de transações",
                  "Exportação de dados",
                ]}
              />
              <Insight label="Ponto importante">
                O sistema precisava ir além de registrar dados, ele também deveria orientar o usuário.
              </Insight>

              <SubTitle>2. Análise de mercado (Benchmarking)</SubTitle>
              <Body>
                <p>
                  Foram analisados apps financeiros existentes, observando a estrutura de navegação, complexidade dos fluxos e forma de apresentar dados.
                </p>
              </Body>
              <Insight label="Insight principal">
                Apps com muitas funcionalidades não necessariamente geram mais valor. Clareza e simplicidade são os principais fatores de retenção.
              </Insight>

              <SubTitle>3. Entendimento do usuário</SubTitle>
              <Body>
                <p>
                  Com base no público-alvo definido no relatório (jovens adultos em início de vida financeira, pessoas em descontrole financeiro e usuários com objetivos específicos), foi possível identificar padrões:
                </p>
              </Body>
              <BulletList
                items={[
                  "Preferência por interfaces simples",
                  "Dificuldade em interpretar dados financeiros",
                  "Necessidade de orientação prática",
                ]}
              />
            </section>

            <Divider />

            {/* ── Estratégia de solução ── */}
            <section>
              <SectionLabel>Estratégia</SectionLabel>
              <SectionTitle>Os três pilares da solução</SectionTitle>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-10">
                <NumberedItem
                  number="1"
                  title="Redução de esforço"
                  items={["Registro rápido de transações", "Interface direta e sem excesso de decisões"]}
                />
                <NumberedItem
                  number="2"
                  title="Clareza de informação"
                  items={["Dashboard com visão imediata", "Gráficos simples e objetivos"]}
                />
                <NumberedItem
                  number="3"
                  title="Apoio ao usuário"
                  items={["Assistente virtual (Din) com sugestões financeiras"]}
                />
              </div>
            </section>

            <Divider />

            {/* ── Design da solução ── */}
            <section>
              <SectionLabel>Design</SectionLabel>
              <SectionTitle>Dando forma à experiência</SectionTitle>

              <SubTitle>Estrutura da experiência</SubTitle>
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

              <SubTitle>Decisões-chave</SubTitle>
              <div className="space-y-4 my-8">
                {[
                  { title: "Unificação de relatórios e gráficos", desc: "Redução de redundância e experiência mais fluida" },
                  { title: "Hierarquia clara de informação", desc: "Saldo → ações → histórico" },
                  { title: "Criação da Din (chatbot)", desc: "Transformar dados em orientação e aumentar engajamento" },
                ].map((item, i) => (
                  <div key={item.title} className="flex items-start gap-4 rounded-lg border border-border bg-card p-4">
                    <span className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-heading text-xs font-bold flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-heading text-[15px] font-semibold text-foreground">{item.title}</p>
                      <p className="font-body text-sm text-foreground/75 mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <SubTitle>Funcionalidades principais</SubTitle>
              <BulletList
                items={[
                  "Registro de receitas e despesas",
                  "Categorias personalizadas",
                  "Metas financeiras com progresso",
                  "Relatórios com filtros por período",
                  "Alertas de gastos e vencimentos",
                  "Histórico detalhado",
                  "Exportação de dados",
                  "Chat com assistente virtual",
                ]}
              />
            </section>

            <Divider />

            {/* ── Protótipo e Validação ── */}
            <section>
              <SectionLabel>Protótipo</SectionLabel>
              <SectionTitle>Validação conceitual</SectionTitle>
              <Body>
                <p>
                  O protótipo navegável permitiu testar a navegação entre telas, o fluxo de registro e a compreensão das informações.
                </p>
              </Body>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
                {[
                  { icon: "🔄", text: "Fluxos intuitivos" },
                  { icon: "✨", text: "Facilidade de uso" },
                  { icon: "📊", text: "Boa compreensão dos dados" },
                ].map((item) => (
                  <div key={item.text} className="rounded-xl border border-border bg-card p-5 text-center">
                    <span className="text-2xl block mb-2">{item.icon}</span>
                    <p className="font-body text-sm text-foreground/80 font-medium">{item.text}</p>
                  </div>
                ))}
              </div>

              <FigmaEmbed
                title="Protótipo do Planejadin"
                protoUrl="https://www.figma.com/proto/JftpPpk6ONr3l2XrQVK38H/PlanejaDin?page-id=57%3A8&node-id=57-191&starting-point-node-id=57%3A191&t=XJN1wavmKtSqNHM9-1"
              />
            </section>

            <Divider />

            {/* ── Impacto e Aprendizados ── */}
            <section>
              <SectionLabel>Conclusão</SectionLabel>
              <SectionTitle>O que eu levo deste projeto</SectionTitle>

              <SubTitle>Impacto esperado</SubTitle>
              <BulletList
                items={[
                  "Aumento da frequência de uso",
                  "Melhor controle financeiro",
                  "Maior engajamento com metas",
                  "Redução da frustração do usuário",
                ]}
              />

              <SubTitle>Aprendizados</SubTitle>
              <div className="space-y-6 my-8">
                {[
                  "Simplicidade é uma decisão estratégica",
                  "Informação bem organizada gera confiança",
                  "UX em finanças precisa reduzir ansiedade",
                  "Funcionalidade sem clareza não gera valor",
                ].map((text) => (
                  <div key={text} className="flex items-start gap-4">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p className="font-body text-base text-foreground/85 leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>

              <SubTitle>Próximos passos</SubTitle>
              <BulletList
                items={[
                  "Integração com contas bancárias",
                  "Insights personalizados com IA",
                  "Gamificação de metas",
                  "Personalização baseada em comportamento",
                ]}
              />

              <Insight label="Diferencial">
                O PlanejaDin não é apenas um app de controle financeiro. Ele foi pensado como um sistema de apoio ao comportamento financeiro, ajudando o usuário não só a registrar, mas a entender suas finanças e ser capaz de tomar decisões para ajustá-las.
              </Insight>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Project3;
