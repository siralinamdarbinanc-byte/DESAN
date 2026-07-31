import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { QrCode, Share2, Sparkles, Terminal } from 'lucide-react';
import { businessData } from '../data/businessData';

interface HeaderCardProps {
  onOpenQR: () => void;
  onShare: () => void;
}

const typingPhrases = [
  'استودیو طراحی و چاپ دسن گرافیک',
  'ارائه‌دهنده خدمات تخصصی چاپ و برندینگ',
  'DESAN GRAPHIC STUDIO',
];

export const HeaderCard: React.FC<HeaderCardProps> = ({ onOpenQR, onShare }) => {
  // Typewriter state for subtitle
  const [textIndex, setTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = typingPhrases[textIndex];
    let speed = isDeleting ? 30 : 70;

    if (!isDeleting && displayedText === fullText) {
      speed = 2200; // pause on full text
    } else if (isDeleting && displayedText === '') {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % typingPhrases.length);
      speed = 300;
    }

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(fullText.substring(0, displayedText.length + 1));
        if (displayedText.length + 1 === fullText.length) {
          setIsDeleting(true);
        }
      } else {
        setDisplayedText(fullText.substring(0, displayedText.length - 1));
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, textIndex]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-visible rounded-2xl bg-white p-2 sm:p-3 shadow-sm border border-rose-100 text-center"
    >
      {/* Deep Red Background Subtle Accents */}
      <div className="absolute -top-16 -left-16 h-32 w-32 rounded-full bg-rose-100/40 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 h-32 w-32 rounded-full bg-rose-50/60 blur-3xl pointer-events-none" />

      {/* Header Top Action Buttons */}
      <div className="flex items-center justify-end mb-0.5 relative z-10">
        <div className="flex items-center gap-1.5">
          <button
            onClick={onOpenQR}
            id="btn-header-qr"
            className="p-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-[#9E1B22] border border-rose-200/80 transition-all active:scale-95 shadow-xs flex items-center justify-center cursor-pointer"
            title="نمایش QR Code"
            aria-label="کد QR"
          >
            <QrCode className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onShare}
            id="btn-header-share"
            className="p-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all active:scale-95 shadow-xs flex items-center justify-center cursor-pointer"
            title="اشتراک‌گذاری"
            aria-label="اشتراک‌گذاری"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Header Content */}
      <div className="flex flex-col items-center justify-center space-y-1.5 relative z-10 py-0.5">
        {/* Prominent Logo Container */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1, type: 'spring', stiffness: 200 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="relative cursor-pointer"
          onClick={onOpenQR}
        >
          <div className="relative w-32 sm:w-36 h-10 sm:h-12 rounded-xl bg-transparent p-0.5 flex items-center justify-center overflow-hidden transition-all duration-300">
            <img
              src="/logo.png"
              alt="لوگوی دسن گرافیک"
              className="w-full h-full object-contain drop-shadow-xs"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>

        {/* POP-OUT 3D TITLE BOX */}
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ 
            opacity: 1, 
            y: [0, -3, 0],
            scale: [1, 1.01, 1]
          }}
          transition={{
            y: { repeat: Infinity, duration: 3.5, ease: 'easeInOut' },
            scale: { repeat: Infinity, duration: 3.5, ease: 'easeInOut' },
            duration: 0.5
          }}
          className="relative z-20 px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#9E1B22] via-[#B91C24] to-[#9E1B22] text-white border border-rose-200/50 shadow-md shadow-rose-950/20 flex items-center justify-center gap-2 transform hover:scale-105 transition-all cursor-pointer group"
          onClick={onOpenQR}
        >
          <h1 className="text-lg sm:text-xl font-black tracking-tight leading-none text-white drop-shadow-xs">
            {businessData.name}
          </h1>
        </motion.div>

        {/* TYPEWRITER MOTION SUBTITLE */}
        <div className="flex items-center justify-center gap-1.5 bg-slate-100/90 border border-slate-200/90 px-2.5 py-0.5 rounded-lg text-slate-800 text-[11px] sm:text-xs font-bold min-h-[24px] max-w-full overflow-hidden shadow-2xs">
          <Terminal className="w-3 h-3 text-[#9E1B22] shrink-0" />
          <span className="font-bold dir-rtl truncate">
            {displayedText}
          </span>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="inline-block w-1.5 h-3 bg-[#9E1B22] rounded-xs shrink-0"
          />
        </div>
      </div>
    </motion.div>
  );
};



