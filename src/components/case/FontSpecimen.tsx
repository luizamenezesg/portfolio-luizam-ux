import React from "react";

/**
 * Especimen tipográfico de um case: pesos da fonte com um texto de exemplo e uma escala.
 * Sem `fontFamily`, usa a fonte do site (classe font-body).
 */
export const FontSpecimen = ({
  fontName,
  sample,
  description,
  fontFamily,
  bodyFontFamily,
}: {
  /** Nome exibido no topo, ex.: "Inter". */
  fontName: string;
  /** Texto de exemplo repetido em cada peso, ex.: o nome do produto. */
  sample: string;
  /** Frase de exemplo da linha "Body". */
  description: string;
  /** CSS font-family da fonte principal (títulos e pesos). */
  fontFamily?: string;
  /** CSS font-family da linha "Body", quando o texto usa outra fonte. */
  bodyFontFamily?: string;
}) => {
  const main: React.CSSProperties | undefined = fontFamily ? { fontFamily } : undefined;
  const body: React.CSSProperties | undefined = bodyFontFamily ? { fontFamily: bodyFontFamily } : main;

  return (
    <div className="my-8 rounded-xl border border-border bg-card p-6 md:p-8 space-y-6">
      <div>
        <p className="font-body text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-3">{fontName} — Font Family</p>
      </div>
      {[
        { weight: "font-light", label: "Light 300", size: "text-3xl md:text-4xl" },
        { weight: "font-normal", label: "Regular 400", size: "text-3xl md:text-4xl" },
        { weight: "font-medium", label: "Medium 500", size: "text-2xl md:text-3xl" },
        { weight: "font-semibold", label: "Semi Bold 600", size: "text-xl md:text-2xl" },
        { weight: "font-bold", label: "Bold 700", size: "text-lg md:text-xl" },
      ].map((spec) => (
        <div key={spec.label} className="flex flex-col gap-1">
          <span className="font-body text-xs text-muted-foreground tracking-wide">{spec.label}</span>
          <p className={`font-body ${spec.weight} ${spec.size} text-foreground leading-tight`} style={main}>
            {sample}
          </p>
        </div>
      ))}
      <div className="pt-4 border-t border-border space-y-2">
        <p className="font-body text-xs text-muted-foreground tracking-wide">Escala tipográfica</p>
        <p className="font-body text-[40px] font-bold text-foreground leading-none" style={main}>Aa</p>
        <p className="font-body text-2xl font-semibold text-foreground/90" style={main}>Heading — 24px Semi Bold</p>
        <p className="font-body text-base text-foreground/85" style={body}>Body — 16px Regular. {description}</p>
        <p className="font-body text-sm text-muted-foreground" style={body}>Caption — 14px Regular</p>
        <p className="font-body text-xs text-muted-foreground" style={body}>Overline — 12px Medium</p>
      </div>
    </div>
  );
};
