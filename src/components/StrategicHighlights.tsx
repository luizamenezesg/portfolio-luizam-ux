import React, { useState, useEffect } from "react";
import { History, Zap, X, Calendar, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const experiences = [
  {
    company: "Lunae Estúdio Criativo",
    url: "https://www.lunae.design/",
    role: "Designer Freelancer",
    period: "Jul 2026 — Atual",
    description: "Interfaces e comunicação visual para clientes, com atendimento direto do briefing à entrega.",
    highlights: [
      "eJuice Resellers: criei interfaces com apoio de IA e banners no Photoshop.",
      "Criei peças de social media com identidade visual e consistência de marca.",
      "Atendi clientes diretamente: entendimento da demanda, propostas e ajustes por feedback."
    ]
  },
  {
    company: "CodeCompany",
    role: "UX/UI Designer (Estágio)",
    period: "Jul 2025 — Mai 2026",
    description: "Atuei em três produtos, da pesquisa ao handoff, em squad Scrum com Product Manager.",
    highlights: [
      "PixTrim: atuei de ponta a ponta, da pesquisa ao desenvolvimento no Google AI Studio.",
      "iTransform: desenhei o Manager Hub e organizei os indicadores estratégicos IPT e IAT.",
      "Storifly: mapeei fricções nos fluxos críticos e propus melhorias dentro das regras de negócio.",
      "Mantive o Design System/UI Kit e usei IA em pesquisa, síntese e documentação."
    ]
  },
  {
    company: "Centro de Línguas — Fatec Santos",
    role: "UX/UI Designer (Projeto voluntário)",
    period: "Dez 2023 — Dez 2024",
    description: "Sistema de gestão acadêmica, do discovery ao estudo de caso publicado no Medium.",
    highlights: [
      "Apliquei questionário e entrevistas com usuários na etapa de discovery.",
      "Mapeei jornadas e fluxos e criei wireframes e protótipos no Figma.",
      "Realizei testes de usabilidade e validei as soluções com stakeholders."
    ]
  },
  {
    company: "Ecopátio Logística (Grupo EcoRodovias)",
    role: "Assistente Financeira Pleno",
    period: "Dez 2017 — Jul 2021",
    description: "Comecei como Auxiliar de Faturamento e cresci para Assistente Financeira Pleno.",
    highlights: [
      "Criei e implantei o Manual de Procedimentos do Faturamento: AS-IS, TO-BE e treinamento.",
      "Elaborei relatórios gerenciais e acompanhei indicadores da área.",
      "Levantei necessidades de usuários internos e testei novas funcionalidades em homologação com TI."
    ]
  }
];

const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100] cursor-zoom-out"
          />
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] max-h-[90vh] overflow-y-auto bg-card border border-border shadow-2xl z-[101] rounded-2xl p-6 md:p-10 scrollbar-hide"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-heading text-2xl font-bold text-foreground">{title}</h2>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Fechar"
              >
                <X size={20} />
              </button>
            </div>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const StrategicHighlights = () => {
  const [activeModal, setActiveModal] = useState<"experience" | "differential" | null>(null);

  return (
    <section className="py-12 md:py-20 bg-accent/20">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Experience Button */}
          <button
            onClick={() => setActiveModal("experience")}
            className="group flex flex-col items-center justify-center p-10 bg-card border border-border rounded-2xl hover:border-primary hover:bg-primary hover:shadow-lg transition-all text-center focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-white group-hover:scale-110 transition-all">
              <History size={32} />
            </div>
            <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-white transition-colors">Trajetória Profissional</h3>
            <p className="font-body text-sm text-muted-foreground group-hover:text-white/80 transition-colors">Freelancer, estágio em UX/UI, voluntariado e financeiro.</p>
          </button>

          {/* Differential Button */}
          <button
            onClick={() => setActiveModal("differential")}
            className="group flex flex-col items-center justify-center p-10 bg-card border border-border rounded-2xl hover:border-primary hover:bg-primary hover:shadow-lg transition-all text-center focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-white group-hover:scale-110 transition-all">
              <Zap size={32} />
            </div>
            <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-white transition-colors">Meu Diferencial</h3>
            <p className="font-body text-sm text-muted-foreground group-hover:text-white/80 transition-colors">Rigor de processos, do problema ao código.</p>
          </button>
        </div>
      </div>

      {/* Experience Modal */}
      <Modal
        isOpen={activeModal === "experience"}
        onClose={() => setActiveModal(null)}
        title="Trajetória Profissional"
      >
        <div className="space-y-10">
          {experiences.map((exp, idx) => (
            <div key={idx} className="relative pl-8 border-l-2 border-border pb-2 last:pb-0">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-background" />
              
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                <div>
                  <h3 className="font-heading text-xl font-bold text-foreground">{exp.role}</h3>
                  <p className="font-body text-primary font-medium">
                    {exp.url ? (
                      <a href={exp.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-secondary">
                        {exp.company}
                      </a>
                    ) : (
                      exp.company
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground font-body text-sm">
                  <Calendar size={14} />
                  {exp.period}
                </div>
              </div>

              <p className="font-body text-base text-foreground/80 mb-4">{exp.description}</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                {exp.highlights.map((highlight, hIdx) => (
                  <li key={hIdx} className="font-body text-sm text-muted-foreground flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-1.5 flex-shrink-0" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Modal>

      {/* Differential Modal */}
      <Modal
        isOpen={activeModal === "differential"}
        onClose={() => setActiveModal(null)}
        title="Meu Diferencial"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-bold text-primary">Processos & Rigor</h4>
            <p className="font-body text-base text-foreground/85 leading-relaxed">
              Na Ecopátio, criei e implantei de ponta a ponta o <strong>Manual de Procedimentos do Faturamento</strong>: AS-IS, TO-BE, documentação e treinamento da equipe. Também testei novas funcionalidades com a TI em <strong>homologação</strong> antes da produção. Levo esse rigor para <strong>fluxos e regras de negócio</strong>.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-bold text-primary">Ponte com Desenvolvimento</h4>
            <p className="font-body text-base text-foreground/85 leading-relaxed">
              No iTransform, mantive e padronizei o <strong>Design System/UI Kit</strong>; no Storifly, organizei o Figma para <strong>handoff</strong>. No PixTrim, participei do desenvolvimento no Google AI Studio e vi o <strong>design virar produto</strong>. Acompanho a implementação e falo a língua do time de dev.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-bold text-primary">IA no Processo</h4>
            <p className="font-body text-base text-foreground/85 leading-relaxed">
              Na CodeCompany, usei <strong>IA para apoiar pesquisa, síntese</strong>, hipóteses e documentação. No PixTrim, ela ajudou a levar o design ao código; na Lunae, a criar interfaces para a <strong>eJuice Resellers</strong>. Uso a IA para acelerar etapas, não para substituir a validação.
            </p>
          </div>
        </div>
        <div className="mt-10 p-6 bg-accent/20 rounded-xl border border-border">
          <p className="font-body text-sm text-foreground/80 italic text-center">
            "Organizo o problema, desenho a solução e acompanho até ela virar produto."
          </p>
        </div>
      </Modal>
    </section>
  );
};

export default StrategicHighlights;
