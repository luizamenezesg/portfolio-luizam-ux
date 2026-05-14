import { Target, Search, PenTool, TrendingUp, Code } from "lucide-react";

const atuacao = [
  { icon: Target, text: "Mapeamento de problemas e fluxos" },
  { icon: Search, text: "Pesquisa e estruturação de insights" },
  { icon: PenTool, text: "Prototipação de soluções escaláveis" },
  { icon: TrendingUp, text: "Decisões embasadas em dados" },
  { icon: Code, text: "Colaboração técnica com desenvolvimento" }
];


const AboutSection = () => {
  return (
    <section id="sobre" className="section-padding bg-card">
      <div className="container-wide">
        <h2 className="font-heading text-foreground mb-8 text-left">Sobre mim</h2>

        <div className="space-y-4 font-body text-base text-foreground/85 leading-relaxed">
          <p>
            Sou <strong>UX Designer</strong> focado em <strong>Design de Produto e Estratégia</strong>, desenvolvendo soluções digitais que equilibram <strong>necessidades do usuário</strong>, <strong>viabilidade técnica</strong> e <strong>objetivos de negócio</strong>.
          </p>
          <p>
            Com experiência em <strong>produtos B2C</strong>, acompanho o ciclo desde o <strong>discovery estratégico</strong> até a <strong>implementação técnica em front-end</strong>. Minha atuação envolve a estruturação de <strong>jornadas do usuário</strong>, gestão de <strong>Design Systems</strong> e aplicação de <strong>análises heurísticas</strong>, sempre focando em otimizar fluxos para reduzir fricção e gerar impacto real no produto.
          </p>
          <p>
            Minha trajetória de 7 anos no setor administrativo-financeiro consolidou uma forte <strong>visão analítica</strong>. A expertise em mapear <strong>processos (AS-IS e TO-BE)</strong> e estruturar manuais de procedimentos é o que hoje sustenta minha capacidade de organizar <strong>arquiteturas de informação</strong> e tomar <strong>decisões baseadas em dados</strong>.
          </p>
          <p>
            Busco oportunidades para aplicar meu perfil híbrido em <strong>pesquisa, design, estratégia e código</strong>, criando soluções que sejam funcionais, escaláveis e resolvam problemas reais.
          </p>
        </div>

        <div className="mt-14">
          <h3 className="font-heading text-foreground mb-6">Como atuo</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {atuacao.map((item) =>
            <li
              key={item.text}
              className="flex items-center gap-3 font-body text-base text-foreground/85">

                <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent flex items-center justify-center text-primary">
                  <item.icon size={20} />
                </span>
                {item.text}
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>);

};

export default AboutSection;
