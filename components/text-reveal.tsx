"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface TextRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "p" | "h2" | "h3" | "span";
}

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function TextReveal({
  children,
  delay = 0,
  className = "",
  as = "div",
}: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const Component = motion[as] as typeof motion.div;

  return (
    <Component
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className={className}
    >
      {children}
    </Component>
  );
}

interface StaggerRevealProps {
  children: ReactNode[];
  className?: string;
  staggerDelay?: number;
  baseDelay?: number;
}

export function StaggerReveal({
  children,
  className = "",
  staggerDelay = 0.1,
  baseDelay = 0,
}: StaggerRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className={className}>
      {children.map((child, index) => (
        <motion.div
          key={index}
          variants={variants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{
            duration: 0.5,
            delay: baseDelay + index * staggerDelay,
            ease: [0.25, 0.4, 0.25, 1],
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
