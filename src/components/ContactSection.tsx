import { Mail, Linkedin, FileText } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contato" className="section-padding bg-card">
      <div className="container-narrow text-center">
        <h2 className="font-heading text-foreground mb-4">Vamos conversar?</h2>
        <p className="font-body text-base text-muted-foreground mb-10 max-w-[560px] mx-auto">
          Estou aberta a oportunidades como UX Designer, contribuindo com visão estratégica, organização e foco em impacto.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://linkedin.com/in/luizamenezesg"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-body font-medium text-sm px-6 py-3 rounded-lg hover:bg-secondary transition-all min-h-[44px] shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <Linkedin size={16} />
            LinkedIn
          </a>
          <a
            href={`${import.meta.env.BASE_URL}cv-luiza-menezes.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-border bg-transparent text-foreground font-body font-medium text-sm px-6 py-3 rounded-lg hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <FileText size={16} />
            Currículo
          </a>
          <a
            href="mailto:contato@luizamenezes.com"
            className="inline-flex items-center gap-2 border border-border bg-transparent text-foreground font-body font-medium text-sm px-6 py-3 rounded-lg hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <Mail size={16} />
            E-mail
          </a>
        </div>
      </div>
    </section>);

};

export default ContactSection;
