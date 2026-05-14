import { useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";

interface FigmaEmbedProps {
  title: string;
  protoUrl: string;
}

const getEmbedUrl = (url: string) =>
  url.replace("figma.com/proto/", "figma.com/embed?embed_host=share&url=https://www.figma.com/proto/");

const FigmaEmbed = ({ title, protoUrl }: FigmaEmbedProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { rootMargin: "200px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="mt-6">
      <h4 className="font-heading text-base font-semibold text-foreground mb-3">
        {title}
      </h4>
      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        {visible ? (
          <iframe
            className="w-full min-h-[600px] md:min-h-[600px] min-h-[420px]"
            style={{ aspectRatio: "16/10", height: "auto", minHeight: "420px" }}
            src={getEmbedUrl(protoUrl)}
            allowFullScreen
            loading="lazy"
            aria-label={`Protótipo interativo: ${title}`}
            title={title}
          />
        ) : (
          <div className="w-full flex items-center justify-center bg-muted" style={{ aspectRatio: "16/10", minHeight: "420px" }}>
            <span className="font-body text-sm text-muted-foreground">Carregando protótipo…</span>
          </div>
        )}
      </div>
      <a
        href={protoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 mt-3 font-body text-sm text-primary hover:text-secondary transition-colors min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
        aria-label={`Abrir protótipo "${title}" em nova aba`}
      >
        Abrir protótipo em nova aba
        <ExternalLink size={14} />
      </a>
    </div>
  );
};

export default FigmaEmbed;
