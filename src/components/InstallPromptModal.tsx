import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, Share, PlusSquare, CheckCircle, Smartphone, MoreVertical } from 'lucide-react';

interface InstallPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInstallNative: () => void;
  hasNativePrompt: boolean;
  isIOS: boolean;
  isStandalone: boolean;
}

export const InstallPromptModal: React.FC<InstallPromptModalProps> = ({
  isOpen,
  onClose,
  onInstallNative,
  hasNativePrompt,
  isIOS,
  isStandalone,
}) => {
  const [activeTab, setActiveTab] = useState<'android' | 'ios'>(isIOS ? 'ios' : 'android');

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md rounded-3xl bg-white border border-slate-200 p-5 sm:p-6 shadow-2xl overflow-hidden text-right text-slate-900"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#9E1B22] flex items-center justify-center text-white shadow-md shrink-0">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900">نصب اپلیکیشن روی گوشی</h3>
                  <p className="text-xs text-[#9E1B22] font-bold mt-0.5">استودیو دسن گرافیک</p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-[#9E1B22] flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
                aria-label="بستن"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="mt-4 space-y-4">
              {isStandalone ? (
                <div className="text-center py-6 space-y-3">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-300">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-black text-slate-900">اپلیکیشن نصب شده است</h4>
                  <p className="text-xs text-slate-600">
                    شما در حال استفاده از نسخه مستقیم اپلیکیشن دسن گرافیک هستید.
                  </p>
                </div>
              ) : hasNativePrompt ? (
                <div className="space-y-4 py-2">
                  <p className="text-sm font-bold text-slate-800 leading-relaxed text-center">
                    جهت دسترسی سریع و استفاده آفلاین، اپلیکیشن را روی گوشی خود نصب کنید.
                  </p>
                  <button
                    onClick={onInstallNative}
                    className="w-full py-3.5 px-4 rounded-2xl bg-[#9E1B22] hover:bg-[#84141A] text-white font-black text-base flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all cursor-pointer"
                  >
                    <Download className="w-5 h-5" />
                    تایید و نصب مستقیم اپلیکیشن
                  </button>
                </div>
              ) : (
                /* Simple & Clean Mobile Installation Guide */
                <div className="space-y-4">
                  {/* Selector Tabs */}
                  <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-slate-100 border border-slate-200">
                    <button
                      onClick={() => setActiveTab('android')}
                      className={`py-2 px-3 rounded-xl text-xs font-black transition-all cursor-pointer ${
                        activeTab === 'android'
                          ? 'bg-[#9E1B22] text-white shadow-md'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      اندروید (Chrome)
                    </button>
                    <button
                      onClick={() => setActiveTab('ios')}
                      className={`py-2 px-3 rounded-xl text-xs font-black transition-all cursor-pointer ${
                        activeTab === 'ios'
                          ? 'bg-[#9E1B22] text-white shadow-md'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      آیفون (Safari)
                    </button>
                  </div>

                  {/* Guide Steps */}
                  {activeTab === 'android' ? (
                    <div className="space-y-3 bg-rose-50/60 p-4 rounded-2xl border border-rose-200">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-[#9E1B22] text-white flex items-center justify-center shrink-0 font-bold text-xs shadow-sm">
                          ۱
                        </div>
                        <p className="text-xs sm:text-sm font-bold text-slate-800">
                          منوی سه نقطه (<MoreVertical className="w-4 h-4 inline text-slate-600" />) مرورگر کروم را لمس کنید.
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-[#9E1B22] text-white flex items-center justify-center shrink-0 font-bold text-xs shadow-sm">
                          ۲
                        </div>
                        <p className="text-xs sm:text-sm font-bold text-slate-800">
                          گزینه <span className="text-slate-900 font-black bg-white px-2 py-0.5 rounded border border-slate-300">افزودن به صفحه اصلی</span> یا <span className="text-slate-900 font-black bg-white px-2 py-0.5 rounded border border-slate-300">نصب اپلیکیشن</span> را بزنید.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3 bg-rose-50/60 p-4 rounded-2xl border border-rose-200">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0 font-bold text-xs shadow-sm">
                          ۱
                        </div>
                        <p className="text-xs sm:text-sm font-bold text-slate-800">
                          دکمه <Share className="w-4 h-4 inline text-sky-600" /> (اشتراک‌گذاری) در پایین مرورگر Safari را بزنید.
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-[#9E1B22] text-white flex items-center justify-center shrink-0 font-bold text-xs shadow-sm">
                          ۲
                        </div>
                        <p className="text-xs sm:text-sm font-bold text-slate-800">
                          گزینه <PlusSquare className="w-4 h-4 inline text-[#9E1B22]" /> <span className="text-slate-900 font-black bg-white px-2 py-0.5 rounded border border-slate-300">Add to Home Screen</span> را انتخاب کنید.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
