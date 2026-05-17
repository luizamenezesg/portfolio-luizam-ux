import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Sobre", href: "sobre" },
  { label: "Competências", href: "competencias" },
  { label: "Projetos", href: "projetos" },
  { label: "Contato", href: "contato" }
];


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    
    // Theme detection
    const checkTheme = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const navColors = !isDarkMode 
    ? "bg-[#1A1A1A] text-white border-white/10" 
    : "bg-background/95 text-foreground border-border";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? `${navColors} backdrop-blur-sm border-b shadow-sm`
          : "bg-transparent"
      }`}
    >
      <nav className={`container-wide mx-auto flex items-center justify-between px-6 md:px-12 lg:px-20 h-16 ${!scrolled && !isDarkMode ? "bg-[#1A1A1A] text-white" : ""}`}>
        <Link
          to="/"
          className={`tracking-tight transition-colors font-sans text-left text-2xl md:text-3xl font-light ${!isDarkMode || (!scrolled && !isDarkMode) ? "text-white" : "text-foreground"}`}
          style={{ 
            fontFamily: 'ui-sans-serif, system-ui, sans-serif'
          }}
        >
          LUIZA MENEZES
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                to="/"
                state={{ scrollTo: item.href }}
                onClick={(e) => {
                  if (location.pathname === "/") {
                    e.preventDefault();
                    const el = document.getElementById(item.href);
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className={`font-body text-sm transition-colors hover:text-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded px-1 py-0.5 border-0 cursor-pointer ${!isDarkMode || (!scrolled && !isDarkMode) ? "text-white/90" : "text-foreground/80"}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded ${!isDarkMode || (!scrolled && !isDarkMode) ? "text-white" : "text-foreground"}`}
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}>

          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className={`md:hidden border-b border-border animate-fade-in ${!isDarkMode ? "bg-[#1A1A1A] border-white/10" : "bg-background"}`}>
          <ul className="flex flex-col px-6 py-4 gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  to="/"
                  state={{ scrollTo: item.href }}
                  onClick={(e) => {
                    setIsOpen(false);
                    if (location.pathname === "/") {
                      e.preventDefault();
                      const el = document.getElementById(item.href);
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className={`block w-full text-left py-3 px-2 font-body text-base transition-colors rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-ring min-h-[44px] ${!isDarkMode ? "text-white/90 hover:text-primary" : "text-foreground hover:text-primary"}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
