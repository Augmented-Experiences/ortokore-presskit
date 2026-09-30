"use client";

import { useState } from "react";
import { cn } from "cn";

type SafeImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  missingLabel: string;
  className?: string;
  priority?: boolean;
  fallbackSrc?: string;
};

export function SafeImage({
  src,
  alt,
  width,
  height,
  missingLabel,
  className,
  priority = false,
  fallbackSrc,
}: SafeImageProps) {
  const [current, setCurrent] = useState(src);
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "flex items-center justify-center border border-dashed border-white/40 bg-black px-4 text-center text-xs tracking-[0.14em] text-neutral-400 uppercase",
          className,
        )}
        style={{ aspectRatio: `${width} / ${height}`, minHeight: "8rem" }}
      >
        {missingLabel}
      </div>
    );
  }

  return (
    // The press files must keep their real pixels. next/image would recompress them.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={current}
      alt={alt}
      width={width}
      height={height}
      fetchPriority={priority ? "high" : "auto"}
      className={cn("h-auto max-w-full object-contain", className)}
      onError={() => {
        if (fallbackSrc && current !== fallbackSrc) {
          setCurrent(fallbackSrc);
          return;
        }
        setFailed(true);
      }}
    />
  );
}
