"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Icon } from "../ui/Icon";

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();
  return (
    <div className="faq">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.q} className="faq-item">
            <button
              type="button"
              className="faq-q"
              aria-expanded={isOpen}
              aria-controls={`${base}-${i}`}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              {it.q}
              <Icon name="plus" />
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={`${base}-${i}`}
                  className="faq-a"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p>{it.a}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
