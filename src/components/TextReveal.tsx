import { motion } from 'motion/react';

export function TextReveal({ text, outline = false, delay = 0 }: { text: string, outline?: boolean, delay?: number }) {
  return (
    <span className="inline-flex overflow-hidden align-bottom pb-2 -mb-2">
      <motion.span
        initial={{ y: '110%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
        className={`block ${outline ? 'text-stroke-outline hover:text-black transition-colors duration-500 cursor-default' : 'text-black'}`}
      >
        {text}
      </motion.span>
    </span>
  );
}
