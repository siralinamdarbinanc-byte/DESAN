import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles } from 'lucide-react';
import { BusinessShowcase } from './BusinessShowcase';
import { ExpandableSocials } from './ExpandableSocials';

interface DetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DetailsModal: React.FC<DetailsModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-md p-0 sm:p-4">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            className="relative w-full max-w-lg max-h-[90vh] sm:max-h-[85vh] rounded-t-3xl sm:rounded-3xl bg-white border border-slate-200 shadow-2xl flex flex-col overflow-hidden text-slate-900"
          >
            {/* Header */}
            <div className="sticky top-0 z-20 flex items-center justify-between p-4 sm:p-5 bg-white/95 border-b border-slate-200 backdrop-blur-xl shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-[#9E1B22]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">اطلاعات کامل و خدمات دسن گرافیک</h3>
                  <p className="text-xs text-slate-500">خدمات چاپ، آدرس دفتر، شبکه‌های اجتماعی</p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-rose-50 hover:text-[#9E1B22] transition-colors cursor-pointer"
                aria-label="بستن"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content inside modal */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-right bg-slate-50/50">
              {/* All Social Platforms */}
              <div className="space-y-2">
                <h4 className="text-sm font-black text-[#9E1B22] px-1">شبکه‌های اجتماعی و پیام‌رسان‌ها</h4>
                <ExpandableSocials isOpen={true} />
              </div>

              {/* Services & Location Showcase */}
              <BusinessShowcase />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
