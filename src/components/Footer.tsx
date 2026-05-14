import { useState, useEffect } from "react";

const Footer = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  const footerStyles = !isDarkMode 
    ? "bg-[#1A1A1A] text-white border-white/10" 
    : "bg-background border-t border-border";

  return (
    <footer className={`py-12 px-6 transition-colors duration-300 ${footerStyles}`}>
      <div className="container-wide mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <p className={`font-body text-sm ${!isDarkMode ? "text-white/80" : "text-muted-foreground"}`}>
            © {new Date().getFullYear()} Luiza Menezes. Todos os direitos reservados.
          </p>
          <p className={`font-body text-xs ${!isDarkMode ? "text-white/40" : "text-muted-foreground/60"}`}>
            Feito com foco em acessibilidade e clareza.
          </p>
        </div>
        
        <div className="flex items-center gap-6">
          {/* Add social links or other bottom nav if needed, keeping it minimal for now */}
          <span className={`h-px w-12 ${!isDarkMode ? "bg-white/10" : "bg-border"}`} />
          <p className={`font-heading text-xs tracking-widest uppercase ${!isDarkMode ? "text-white/30" : "text-muted-foreground/30"}`}>
            UX Designer
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
