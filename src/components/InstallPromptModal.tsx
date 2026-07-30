import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, Share, PlusSquare, Smartphone, CheckCircle, ShieldCheck } from 'lucide-react';

interface InstallPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInstallNative: () => void;
  isIOS: boolean;
  isStandalone: boolean;
}

export const InstallPromptModal: React.FC<InstallPromptModalProps> = ({
  isOpen,
  onClose,
  onInstallNative,
  isIOS,
  isStandalone,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-2xl overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 left-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label="بستن"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Logo Badge */}
            <div className="flex items-center gap-3.5 mb-5 pb-4 border-b border-slate-800">
              <div className="w-14 h-14 rounded-2xl bg-slate-950 p-1 border border-rose-800/40 shadow-xl overflow-hidden shrink-0">
                <img src="/logo.png" alt="دسن گرافیک" className="w-full h-full object-cover rounded-xl" />
              </div>
              <div className="text-right">
                <h3 className="text-base font-bold text-white">نصب اپلیکیشن دسن گرافیک</h3>
                <p className="text-xs text-rose-400 font-medium">نسخه پیشرفته وب (Progressive Web App)</p>
              </div>
            </div>

            {isStandalone ? (
              <div className="text-center py-4 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-800">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white">اپلیکیشن نصب شده است!</h4>
                <p className="text-xs text-slate-300">
                  شما در حال استفاده مستقیم از اپلیکیشن دسن گرافیک هستید و تمام قابلیت‌های آفلاین فعال می‌باشد.
                </p>
              </div>
            ) : isIOS ? (
              /* iOS Safari Step-by-Step Installation Guide */
              <div className="space-y-4 text-right">
                <p className="text-xs text-slate-300 leading-relaxed">
                  برای نصب اپلیکیشن دسن گرافیک در آیفون (iOS)، مراحل ۲ گانه زیر را در مرورگر Safari دنبال کنید:
                </p>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-800 text-sky-400 flex items-center justify-center shrink-0">
                      <Share className="w-5 h-5" />
                    </div>
                    <div className="text-xs">
                      <span className="font-bold text-white block">مرحله ۱:</span>
                      <span className="text-slate-400">دکمه <strong className="text-white">Share</strong> (اشتراک‌گذاری) در نوار پایین Safari را لمس کنید.</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-800 text-rose-400 flex items-center justify-center shrink-0">
                      <PlusSquare className="w-5 h-5" />
                    </div>
                    <div className="text-xs">
                      <span className="font-bold text-white block">مرحله ۲:</span>
                      <span className="text-slate-400">گزینه <strong className="text-white">Add to Home Screen</strong> (افزودن به صفحه اصلی) را انتخاب کنید.</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-950/40 border border-rose-900/40 text-[11px] text-rose-300">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>بدون اشغال حافظه گوشی • بروزرسانی خودکار • کارکرد سریع آفلاین</span>
                </div>
              </div>
            ) : (
              /* Android / Desktop Standard Native PWA Prompt */
              <div className="space-y-4 text-right">
                <p className="text-xs text-slate-300 leading-relaxed">
                  با نصب اپلیکیشن دسن گرافیک، کارت ویزیت و راه‌های ارتباطی همیشه حتی بدون اینترنت روی صفحه اصلی گوشی شما در دسترس خواهند بود.
                </p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <Smartphone className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>دسترسی آنی با یک کلیک از روی آیکون دسن گرافیک</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>سازگار با اندروید، ویندوز و مرورگرهای کروم و اج</span>
                  </div>
                </div>

                <button
                  onClick={onInstallNative}
                  className="w-full p-4 rounded-2xl bg-gradient-to-r from-[#9E1B22] via-[#B2222A] to-[#800020] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-rose-950/50 hover:brightness-110 active:scale-98 transition-all cursor-pointer"
                >
                  <Download className="w-5 h-5" />
                  تایید و نصب مستقیم اپلیکیشن
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
