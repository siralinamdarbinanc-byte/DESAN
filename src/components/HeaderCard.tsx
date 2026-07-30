import React from 'react';
import { motion } from 'motion/react';
import { QrCode, Share2, MapPin, CheckCircle2 } from 'lucide-react';
import { businessData } from '../data/businessData';

interface HeaderCardProps {
  onOpenQR: () => void;
  onShare: () => void;
}

export const HeaderCard: React.FC<HeaderCardProps> = ({ onOpenQR, onShare }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/95 via-slate-900 to-slate-950 p-3.5 sm:p-4 shadow-xl border border-rose-900/40 backdrop-blur-xl group"
    >
      {/* Deep Red Background Glow */}
      <div className="absolute -top-16 -left-16 h-40 w-40 rounded-full bg-[#9E1B22]/25 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-[#9E1B22]/15 blur-2xl pointer-events-none" />

      {/* Header Top Controls */}
      <div className="flex items-center justify-between mb-2.5 relative z-10">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-950/70 border border-rose-800/40 text-rose-300 text-[11px] font-medium">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>دفتر فعال • آماده سفارش</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={onOpenQR}
            id="btn-header-qr"
            className="p-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-rose-400 border border-slate-700/60 transition-all active:scale-95 shadow-sm flex items-center justify-center cursor-pointer"
            title="نمایش QR Code"
            aria-label="کد QR"
          >
            <QrCode className="w-4 h-4" />
          </button>

          <button
            onClick={onShare}
            id="btn-header-share"
            className="p-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 border border-slate-700/60 transition-all active:scale-95 shadow-sm flex items-center justify-center cursor-pointer"
            title="اشتراک‌گذاری"
            aria-label="اشتراک‌گذاری"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Branding Line: Logo + Compact Info */}
      <div className="flex items-center gap-3 relative z-10">
        {/* Compact Logo Container */}
        <motion.div
          whileTap={{ scale: 0.96 }}
          className="relative shrink-0 cursor-pointer"
          onClick={onOpenQR}
        >
          <div className="relative w-32 sm:w-36 h-16 sm:h-18 rounded-xl bg-white p-1.5 border border-rose-500/50 shadow-md flex items-center justify-center overflow-hidden">
            <img
              src={import.meta.env.BASE_URL + "logo.png"}
              alt="لوگوی رسمی دسن گرافیک"
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-0.5 rounded-full border-2 border-slate-900 shadow-sm">
            <CheckCircle2 className="w-3 h-3" />
          </div>
        </motion.div>

        {/* Title & Tagline */}
        <div className="text-right flex-1 min-w-0">
          <h1 className="text-lg sm:text-xl font-black text-white truncate">
            {businessData.name}
          </h1>
          <p className="text-[11px] font-bold text-rose-400 tracking-wider uppercase truncate dir-ltr">
            {businessData.englishName}
          </p>
          <p className="text-xs text-slate-300 line-clamp-1 mt-0.5">
            {businessData.tagline}
          </p>
          <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-1">
            <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
            <span className="truncate">متروی گلبرگ (جانبازان)</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

