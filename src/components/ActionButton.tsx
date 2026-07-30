import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ActionButtonProps {
  id: string;
  label: string;
  subtitle?: string;
  iconSrc?: string;
  lucideIcon?: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'accent' | 'luxury' | 'outline';
  badge?: string;
  href?: string;
  target?: string;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  id,
  label,
  subtitle,
  iconSrc,
  lucideIcon,
  onClick,
  variant = 'secondary',
  badge,
  href,
  target = '_self',
}) => {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { id: Date.now(), x, y };
    setRipples((prev) => [...prev, newRipple]);
  };

  const removeRipple = (idToRemove: number) => {
    setRipples((prev) => prev.filter((r) => r.id !== idToRemove));
  };

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-[#9E1B22] via-[#B2222A] to-[#800020] text-white border border-rose-500/40 shadow-lg shadow-rose-950/40 hover:shadow-rose-900/60 hover:border-rose-400',
    secondary:
      'bg-slate-900/90 text-slate-100 border border-slate-800/80 shadow-md hover:bg-slate-800/90 hover:border-slate-700',
    luxury:
      'bg-gradient-to-r from-slate-900 via-rose-950/60 to-slate-900 text-white border border-rose-800/50 shadow-xl hover:border-rose-500/70',
    accent:
      'bg-slate-800/90 text-rose-300 border border-rose-900/50 shadow-md hover:bg-slate-800 hover:text-white',
    outline:
      'bg-transparent text-slate-200 border border-slate-700/80 hover:bg-slate-900/60 hover:border-slate-500',
  };

  const Content = (
    <>
      {/* Ripple Animation Overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl">
        <AnimatePresence>
          {ripples.map((ripple) => (
            <motion.span
              key={ripple.id}
              initial={{ scale: 0, opacity: 0.6 }}
              animate={{ scale: 4, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              onAnimationComplete={() => removeRipple(ripple.id)}
              style={{
                top: ripple.y - 10,
                left: ripple.x - 10,
                width: 20,
                height: 20,
              }}
              className="absolute bg-white/30 rounded-full"
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Button Inner Content */}
      <div className="flex items-center gap-3.5 relative z-10 w-full">
        {/* Icon Container */}
        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-slate-950/50 border border-white/10 shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-200">
          {iconSrc ? (
            <img
              src={iconSrc}
              alt={label}
              className="w-7 h-7 object-contain rounded-lg"
              referrerPolicy="no-referrer"
            />
          ) : (
            lucideIcon
          )}
        </div>

        {/* Text Container */}
        <div className="flex-1 text-right min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className="text-base font-bold tracking-tight text-slate-100 group-hover:text-white transition-colors truncate">
              {label}
            </span>
            {badge && (
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-rose-900/80 text-rose-200 border border-rose-700/60 shrink-0">
                {badge}
              </span>
            )}
          </div>
          {subtitle && (
            <span className="text-xs text-slate-400 block truncate mt-0.5 dir-ltr text-right">
              {subtitle}
            </span>
          )}
        </div>
      </div>
    </>
  );

  if (href) {
    return (
      <motion.a
        id={id}
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        onPointerDown={handlePointerDown}
        whileHover={{ scale: 1.015, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className={`relative w-full p-3.5 sm:p-4 rounded-2xl flex items-center transition-all duration-200 cursor-pointer overflow-hidden group select-none ${variantStyles[variant]}`}
      >
        {Content}
      </motion.a>
    );
  }

  return (
    <motion.button
      id={id}
      onClick={onClick}
      onPointerDown={handlePointerDown}
      whileHover={{ scale: 1.015, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`relative w-full p-3.5 sm:p-4 rounded-2xl flex items-center transition-all duration-200 cursor-pointer overflow-hidden group select-none ${variantStyles[variant]}`}
    >
      {Content}
    </motion.button>
  );
};
