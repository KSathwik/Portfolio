import { type ReactNode } from "react";

interface TextRevealProps {
  children: ReactNode;
  /** Kept for caller compatibility; text renders immediately. */
  delay?: number;
  className?: string;
  as?: "div" | "p" | "h2" | "h3" | "span";
}

/**
 * Formerly a scroll-triggered reveal. Content now renders plainly so it is
 * visible without script and under reduced motion. The props stay so callers compile.
 */
export function TextReveal({ children, className = "", as = "div" }: TextRevealProps) {
  const Component = as;
  return <Component className={className || undefined}>{children}</Component>;
}

interface StaggerRevealProps {
  children: ReactNode[];
  className?: string;
  /** Kept for caller compatibility; children render immediately. */
  staggerDelay?: number;
  /** Kept for caller compatibility; children render immediately. */
  baseDelay?: number;
}

export function StaggerReveal({ children, className = "" }: StaggerRevealProps) {
  return (
    <div className={className || undefined}>
      {children.map((child, index) => (
        <div key={index}>{child}</div>
      ))}
    </div>
  );
}
