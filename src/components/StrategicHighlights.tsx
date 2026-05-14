import React, { useState, useEffect } from "react";
import { History, Zap, X, Calendar, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const experiences = [
  {
    company: "CodeCompany",
    role: "UX/UI Designer (Estágio)",
    period: "Julho 2025 — Presente",
    description: "Atuação estratégica em produtos SaaS complexos, unindo discovery, design e desenvolvimento front-end.",
    highlights: [
      "iTransform: Design do Manager Hub e estruturação de indicadores estratégicos (IAT/IPT).",
      "Storifly: Análise heurística e otimização de fluxos críticos de gestão de marca.",
      "PixTrim: Atuação end-to-end do discovery ao desenvolvimento no código.",
      "Manutenção de Design Systems e colaboração direta com Product Managers."
    ]
  },
  {
    company: "Centro de Línguas — Fatec Santos",
    role: "UX/UI Designer (Voluntário)",
    period: "Dez 2023 — Dez 2024",
    description: "Desenvolvimento de um sistema de gestão acadêmica focado na otimização de processos internos.",
    highlights: [
      "Pesquisa com usuários e priorização de funcionalidades com stakeholders.",
      "Criação de wireframes e protótipos de alta fidelidade para fluxos acadêmicos.",
      "Melhoria na visualização de dados e organização de tarefas institucionais."
    ]
  },
  {
    company: "EcoRodovias",
    role: "Assistente Financeiro Pleno",
    period: "Dez 2017 — Jul 2021",
    description: "Estruturação de processos e análise de dados em ambiente corporativo de alto volume.",
    highlights: [
      "Mapeamento de processos AS-IS e TO-BE para implementação de manuais operacionais.",
      "Análise de dados financeiros e elaboração de relatórios gerenciais.",
      "Validação de melhorias em sistemas internos junto ao time de TI (homologação)."
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
            <p className="font-body text-sm text-muted-foreground group-hover:text-white/80 transition-colors">Estágio em UX/UI, Voluntariado e background financeiro.</p>
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
            <p className="font-body text-sm text-muted-foreground group-hover:text-white/80 transition-colors">O olhar analítico entre Negócio, Design e Código.</p>
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
                  <p className="font-body text-primary font-medium">{exp.company}</p>
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
              Minha experiência no setor financeiro consolidou uma forte <strong>visão analítica</strong> e o rigor necessário para lidar com <strong>fluxos complexos</strong> e <strong>KPIs</strong>. Essa disciplina hoje sustenta minha capacidade de organizar <strong>arquiteturas de informação</strong> e tomar <strong>decisões de design embasadas em dados</strong>.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-bold text-primary">Ponte com Desenvolvimento</h4>
            <p className="font-body text-base text-foreground/85 leading-relaxed">
              Transito entre design e implementação, garantindo que a <strong>proposta de valor</strong> seja viável e fielmente executada. Atuo conectando <strong>estratégia</strong>, <strong>experiência</strong> e <strong>viabilidade técnica</strong>, garantindo a fluidez entre a definição do problema e a <strong>entrega final</strong>.
            </p>
          </div>
        </div>
        <div className="mt-10 p-6 bg-accent/20 rounded-xl border border-border">
          <p className="font-body text-sm text-foreground/80 italic text-center">
            "Desenvolvo soluções centradas no usuário com foco em gerar impacto real no produto e no negócio."
          </p>
        </div>
      </Modal>
    </section>
  );
};

export default StrategicHighlights;
