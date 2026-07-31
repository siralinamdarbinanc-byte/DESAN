import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, X, Copy, Check, Navigation, ExternalLink } from 'lucide-react';
import { businessData } from '../data/businessData';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  const googleMapsUrl = businessData.locationLinks?.google || 'https://maps.app.goo.gl/6Gpd5cVk8zjhRAnN9';
  const neshanUrl = businessData.locationLinks?.neshan || 'https://nshn.ir/9b_bv_GcNxRmDZ';
  const baladUrl = businessData.locationLinks?.balad || 'https://balad.ir/location?latitude=35.733097&longitude=51.483793&zoom=16.500000';
  const wazeUrl = businessData.locationLinks?.waze || 'https://waze.com/ul?ll=35.733097,51.483793&navigate=yes';

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(businessData.address);
      setCopied(true);
      onShowToast('آدرس متنی دفتر کپی شد');
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error('Failed to copy address:', e);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-2xl z-10 text-right overflow-hidden text-slate-900"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#9E1B22] flex items-center justify-center text-white shadow-md">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900">آدرس و مسیریابی دفتر</h3>
                  <p className="text-xs text-[#9E1B22] font-bold mt-0.5">استودیو طراحی دسن گرافیک</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-[#9E1B22] flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Written Address Box - Large legible text for seniors */}
            <div className="mt-5 p-4 sm:p-5 rounded-2xl bg-rose-50/70 border border-rose-200 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black text-[#9E1B22] flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#9E1B22]" />
                  آدرس دقیق نوشتاری:
                </span>
                <button
                  onClick={handleCopyAddress}
                  className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl bg-[#9E1B22] hover:bg-[#84141A] text-white transition-all active:scale-95 cursor-pointer shadow-sm"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-300" />
                      <span className="text-white">کپی شد!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>کپی آدرس</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-base sm:text-lg font-black text-slate-900 leading-relaxed mt-1">
                {businessData.address}
              </p>

              <div className="mt-3 pt-3 border-t border-rose-200/80 flex items-center gap-2 text-xs font-bold text-slate-700">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></div>
                <span>دسترسی آسان: متروی گلبرگ (جانبازان) - خط ۲ مترو تهران</span>
              </div>
            </div>

            {/* Navigators Selection */}
            <div className="mt-5">
              <span className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5 mb-3">
                <Navigation className="w-4 h-4 text-[#9E1B22]" />
                انتخاب مسیریاب جهت شروع حرکت:
              </span>

              <div className="grid grid-cols-2 gap-2.5">
                {/* Google Maps */}
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-500 hover:bg-blue-50/30 flex items-center justify-between transition-all active:scale-95 group cursor-pointer shadow-sm"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 shrink-0">
                      <MapPin className="w-4 h-4 text-blue-700" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                      گوگل مپس
                    </span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors shrink-0" />
                </a>

                {/* Neshan */}
                <a
                  href={neshanUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/30 flex items-center justify-between transition-all active:scale-95 group cursor-pointer shadow-sm"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
                      <MapPin className="w-4 h-4 text-emerald-700" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      مسیریاب نشان
                    </span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors shrink-0" />
                </a>

                {/* Balad */}
                <a
                  href={baladUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-500 hover:bg-amber-50/30 flex items-center justify-between transition-all active:scale-95 group cursor-pointer shadow-sm"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-800 shrink-0">
                      <MapPin className="w-4 h-4 text-amber-800" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                      مسیریاب بلد
                    </span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition-colors shrink-0" />
                </a>

                {/* Waze */}
                <a
                  href={wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-cyan-500 hover:bg-cyan-50/30 flex items-center justify-between transition-all active:scale-95 group cursor-pointer shadow-sm"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-cyan-100 border border-cyan-200 flex items-center justify-center text-cyan-800 shrink-0">
                      <MapPin className="w-4 h-4 text-cyan-800" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-cyan-800 transition-colors">
                      مسیریاب ویز
                    </span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-cyan-600 transition-colors shrink-0" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
