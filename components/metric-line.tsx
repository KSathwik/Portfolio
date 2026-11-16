import { Fragment } from "react";

/* Figures inside a metric sentence (350+, 77.4%, 45%, 10,000+, <120ms) are set in mono; the sentence stays as written. */
const FIGURE = /(<?\d[\d,.]*(?:%\+?|\+|ms|x)?)/g;

export function MetricLine({ text }: { text: string }) {
  const parts = text.split(FIGURE);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="font-mono font-medium text-signal">
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </>
  );
}
