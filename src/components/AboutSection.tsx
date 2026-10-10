import { Target, Search, PenTool, TrendingUp, Code } from "lucide-react";

const atuacao = [
  { icon: Target, text: "Definição do problema e dos fluxos" },
  { icon: Search, text: "Pesquisa e entrevistas com usuários" },
  { icon: PenTool, text: "Wireframes e protótipos no Figma" },
  { icon: TrendingUp, text: "Testes de usabilidade e iteração" },
  { icon: Code, text: "Handoff organizado para o dev" }
];


const AboutSection = () => {
  return (
    <section id="sobre" className="section-padding bg-card">
      <div className="container-wide">
        <h2 className="font-heading text-foreground mb-8 text-left">Sobre mim</h2>

        <div className="space-y-4 font-body text-base text-foreground/85 leading-relaxed">
          <p>
            Sou <strong>UX/UI Designer</strong> em Santos/SP e busco vaga como <strong>UX/UI ou Product Designer</strong>. Hoje atuo como designer freelancer no <a href="https://www.lunae.design/" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 hover:text-secondary">Lunae Estúdio Criativo</a> e concluí Sistemas para Internet na Fatec Baixada Santista em 2026.
          </p>
          <p>
            Na <strong>CodeCompany</strong>, atuei em três produtos, entre eles uma <strong>plataforma B2B</strong>: pesquisa, personas, fluxos, protótipos no Figma e manutenção do <strong>Design System</strong>. Acompanho a implementação e criei o <strong>PixTrim</strong> (ferramenta de recorte de backgrounds) <strong>do Figma ao código</strong> com apoio de IA.
          </p>
          <p>
            Antes do UX, tive experiência administrativa e quase 4 anos no <strong>financeiro</strong> da Ecopátio Logística (Grupo EcoRodovias), onde criei o <strong>Manual de Procedimentos do Faturamento</strong> (AS-IS e TO-BE). Essa experiência me possibilitou entender <strong>fluxos, regras de negócio</strong> e documentação para handoff.
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
