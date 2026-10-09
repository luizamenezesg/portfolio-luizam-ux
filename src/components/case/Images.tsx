import React, { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

export type OpenImage = (src: string, alt: string) => void;

/* ── Lightbox ── */

export const Lightbox = ({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) => {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      // Mantém o foco dentro do diálogo: o único elemento focável é o botão de fechar.
      if (e.key === "Tab") {
        e.preventDefault();
        closeRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm p-4 animate-fade-in cursor-zoom-out"
      onClick={onClose}
    >
      <button
        ref={closeRef}
        onClick={onClose}
        className="absolute top-6 right-6 text-foreground/70 hover:text-foreground transition-colors z-50 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Fechar imagem ampliada"
      >
        <X size={28} />
      </button>
      <img
        src={src}
        alt={alt}
        className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};

/**
 * Estado do lightbox de um case: trava a rolagem enquanto está aberto
 * e devolve o foco ao elemento que o abriu ao fechar.
 */
export const useLightbox = () => {
  const [image, setImage] = useState<{ src: string; alt: string } | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const open = useCallback<OpenImage>((src, alt) => {
    openerRef.current = document.activeElement as HTMLElement | null;
    setImage({ src, alt });
  }, []);

  const close = useCallback(() => {
    setImage(null);
    openerRef.current?.focus();
  }, []);

  useEffect(() => {
    document.body.style.overflow = image ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [image]);

  const lightbox = image ? <Lightbox src={image.src} alt={image.alt} onClose={close} /> : null;

  return { open, lightbox };
};

/* ── Clickable images ── */

export const ClickableImage = ({
  src,
  alt,
  className = "",
  onOpen,
  width,
  height,
  eager = false,
}: {
  key?: React.Key;
  src: string;
  alt: string;
  className?: string;
  onOpen: OpenImage;
  width?: number;
  height?: number;
  eager?: boolean;
}) => (
  <img
    src={src}
    alt={alt}
    width={width}
    height={height}
    tabIndex={0}
    role="button"
    aria-label={`${alt} (ampliar imagem)`}
    className={`cursor-zoom-in hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${className}`}
    loading={eager ? "eager" : "lazy"}
    onClick={() => onOpen(src, alt)}
    onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onOpen(src, alt);
      }
    }}
  />
);

export const NarrowImage = ({
  src,
  alt,
  maxWidth,
  onOpen,
  width,
  height,
}: {
  src: string;
  alt: string;
  maxWidth?: string;
  onOpen: OpenImage;
  width?: number;
  height?: number;
}) => (
  <div className="my-8 mx-auto" style={maxWidth ? { maxWidth } : undefined}>
    <ClickableImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      className="w-full rounded-xl border border-border shadow-sm"
      onOpen={onOpen}
    />
  </div>
);

export const ImageGrid = ({
  images,
  onOpen,
}: {
  images: { src: string; alt: string }[];
  onOpen: OpenImage;
}) => (
  <div
    className={`grid gap-4 my-8 ${
      images.length === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-3"
    }`}
  >
    {images.map((img) => (
      <ClickableImage
        key={img.alt}
        src={img.src}
        alt={img.alt}
        className="w-full rounded-xl border border-border shadow-sm"
        onOpen={onOpen}
      />
    ))}
  </div>
);

export const Screenshot = ({
  src,
  alt,
  caption,
  onOpen,
  width,
  height,
}: {
  key?: React.Key;
  src: string;
  alt: string;
  caption: React.ReactNode;
  onOpen: OpenImage;
  width?: number;
  height?: number;
}) => (
  <figure className="my-6">
    <ClickableImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      className="w-full rounded-xl border border-border shadow-sm"
      onOpen={onOpen}
    />
    <figcaption className="font-body text-sm text-muted-foreground mt-3 leading-relaxed">{caption}</figcaption>
  </figure>
);
