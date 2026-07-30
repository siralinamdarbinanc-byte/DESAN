import { useState, useEffect } from 'react';
import { HeaderCard } from './components/HeaderCard';
import { QRCodeModal } from './components/QRCodeModal';
import { InstallPromptModal } from './components/InstallPromptModal';
import { NotificationToast } from './components/NotificationToast';
import { DetailsModal } from './components/DetailsModal';
import { BeforeInstallPromptEvent } from './types';
import { shareBusinessCard, downloadVCard } from './utils/vcard';
import { businessData } from './data/businessData';
import {
  Phone,
  Smartphone,
  MessageCircle,
  Download,
  Info,
  Sparkles,
  Share2,
  QrCode,
  Layers,
  MapPin,
} from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState<boolean>(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState<boolean>(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // PWA State
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState<boolean>(false);
  const [isStandalone, setIsStandalone] = useState<boolean>(false);

  useEffect(() => {
    // Check if running as PWA standalone
    const isPWA =
      window.matchMedia('(display-mode: standalone)').matches ||
      (navigator as unknown as { standalone?: boolean }).standalone === true;
    setIsStandalone(isPWA);

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // Listen for beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Register Service Worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/service-worker.js')
          .then((reg) => {
            console.log('[App] ServiceWorker registered:', reg.scope);
          })
          .catch((err) => {
            console.warn('[App] ServiceWorker registration failed:', err);
          });
      });
    }

    // Check URL query parameters
    const params = new URLSearchParams(window.location.search);
    const action = params.get('action');
    if (action === 'call-office') {
      window.location.href = 'tel:02177243982';
    } else if (action === 'whatsapp') {
      window.open('https://wa.me/989031340125', '_blank');
    } else if (action === 'telegram') {
      window.open('https://t.me/Desan_graphic', '_blank');
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleShareCard = async () => {
    const isNativeShared = await shareBusinessCard();
    if (!isNativeShared) {
      showToast('لینک کارت ویزیت در حافظه کپی شد!');
    }
  };

  const handleSaveContact = () => {
    downloadVCard();
    showToast('کارت مخاطب دسن گرافیک دانلود شد!');
  };

  const handleTriggerInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          showToast('از نصب اپلیکیشن دسن گرافیک متشکریم!');
          setDeferredPrompt(null);
        }
        setIsInstallModalOpen(false);
      });
    } else {
      setIsInstallModalOpen(true);
    }
  };

  return (
    <div className="h-[100dvh] w-full bg-slate-950 text-slate-100 flex flex-col justify-between overflow-hidden selection:bg-rose-900 selection:text-white p-3 sm:p-4">
      {/* Background Subtle Gradient Blobs */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-80 bg-gradient-to-b from-rose-950/30 via-slate-950/90 to-transparent pointer-events-none -z-10 blur-3xl" />

      {/* Container - Fits inside Viewport Height */}
      <div className="w-full max-w-md mx-auto flex-1 flex flex-col justify-between py-1 sm:py-2">
        {/* Compact Header Card */}
        <div className="shrink-0">
          <HeaderCard onOpenQR={() => setIsQRModalOpen(true)} onShare={handleShareCard} />
        </div>

        {/* Primary QR Focus: PWA App Installation Highlight Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="my-2 shrink-0"
        >
          <div className="relative p-0.5 rounded-2xl bg-gradient-to-r from-rose-700 via-rose-500 to-amber-500 shadow-xl">
            <button
              onClick={handleTriggerInstall}
              id="btn-install-pwa-primary"
              className="w-full p-3.5 sm:p-4 rounded-[14px] bg-slate-900 hover:bg-slate-800 transition-all flex items-center justify-between text-right cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-rose-600 to-rose-900 flex items-center justify-center text-white shadow-md shrink-0 group-hover:scale-105 transition-transform">
                  <Sparkles className="w-6 h-6 text-amber-300 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-extrabold text-white">نصب اپلیکیشن روی گوشی</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-800">
                      PWA
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5">
                    دسترسی سریع، نمونه کارها، سفارش آنلاین و آفلاین
                  </p>
                </div>
              </div>
              <div className="text-xs font-bold px-3 py-1.5 rounded-xl bg-rose-600 group-hover:bg-rose-500 text-white shrink-0 shadow-md">
                نصب مستقیم
              </div>
            </button>
          </div>
        </motion.div>

        {/* Essential Quick Contact & Location Cards Grid */}
        <div className="space-y-2 shrink-0 my-1">
          {/* Phone Numbers & WhatsApp 2x2 Grid with Larger Numbers */}
          <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
            {/* Call Office */}
            <a
              href={`tel:${businessData.phone}`}
              id="btn-quick-call-office"
              className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-900/90 border border-slate-800 hover:border-rose-600/60 flex items-center gap-3 transition-all active:scale-95 shadow-lg group"
            >
              <div className="w-10 h-10 rounded-xl bg-rose-950/80 border border-rose-800/50 flex items-center justify-center text-rose-400 shrink-0 group-hover:scale-105 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <div className="text-right overflow-hidden">
                <span className="text-xs font-bold block text-slate-300">تلفن دفتر مرکزی</span>
                <span className="text-sm sm:text-base font-black text-white dir-ltr block truncate mt-0.5">
                  ۰۲۱-۷۷۲۴۳۹۸۲
                </span>
              </div>
            </a>

            {/* Call Mobile */}
            <a
              href={`tel:${businessData.mobile}`}
              id="btn-quick-call-mobile"
              className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-900/90 border border-slate-800 hover:border-rose-600/60 flex items-center gap-3 transition-all active:scale-95 shadow-lg group"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700/60 flex items-center justify-center text-rose-400 shrink-0 group-hover:scale-105 transition-transform">
                <Smartphone className="w-5 h-5" />
              </div>
              <div className="text-right overflow-hidden">
                <span className="text-xs font-bold block text-slate-300">موبایل پشتیبانی</span>
                <span className="text-sm sm:text-base font-black text-white dir-ltr block truncate mt-0.5">
                  ۰۹۱۲-۶۸۴۳۴۴۹
                </span>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/98${businessData.whatsapp.substring(1)}`}
              target="_blank"
              rel="noopener noreferrer"
              id="btn-quick-whatsapp"
              className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-900/90 border border-slate-800 hover:border-emerald-600/60 flex items-center gap-3 transition-all active:scale-95 shadow-lg group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-800/50 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-105 transition-transform">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div className="text-right overflow-hidden">
                <span className="text-xs font-bold block text-slate-300">واتساپ سفارشات</span>
                <span className="text-sm sm:text-base font-black text-emerald-400 dir-ltr block truncate mt-0.5">
                  ۰۹۰۳-۱۳۴۰۱۲۵
                </span>
              </div>
            </a>

            {/* Save Contact */}
            <button
              onClick={handleSaveContact}
              id="btn-quick-save-contact"
              className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-900/90 border border-slate-800 hover:border-amber-600/60 flex items-center gap-3 transition-all active:scale-95 shadow-lg text-right cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-950/60 border border-amber-800/40 flex items-center justify-center text-amber-400 shrink-0 group-hover:scale-105 transition-transform">
                <Download className="w-5 h-5" />
              </div>
              <div className="text-right overflow-hidden">
                <span className="text-xs font-bold block text-slate-300">ذخیره مخاطب</span>
                <span className="text-xs sm:text-sm font-extrabold text-amber-300 block truncate mt-0.5">
                  دانلود vCard
                </span>
              </div>
            </button>
          </div>

          {/* Large Prominent Location & Navigation Card */}
          <a
            href={`https://maps.google.com/?q=${businessData.coordinates.lat},${businessData.coordinates.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            id="btn-quick-location-card"
            className="w-full p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-rose-950/30 to-slate-900 border border-rose-900/40 hover:border-rose-600/60 flex items-center justify-between text-right transition-all active:scale-98 shadow-lg group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-rose-600 flex items-center justify-center text-white shrink-0 shadow-md group-hover:scale-105 transition-transform">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-white">آدرس و مسیریابی دفتر</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-800">
                    متروی گلبرگ (جانبازان)
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5 line-clamp-1">
                  {businessData.address}
                </p>
              </div>
            </div>

            <div className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-800 group-hover:bg-rose-700 text-rose-300 group-hover:text-white transition-colors shrink-0 shadow-sm border border-slate-700">
              مسیریابی
            </div>
          </a>
        </div>

        {/* View Details & Services Drawer Trigger */}
        <div className="shrink-0 my-1">
          <button
            onClick={() => setIsDetailsModalOpen(true)}
            id="btn-open-details-modal"
            className="w-full p-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 flex items-center justify-between text-slate-200 transition-all shadow-md cursor-pointer group"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-rose-950/50 border border-rose-800/40 flex items-center justify-center text-rose-400 group-hover:bg-rose-900/50">
                <Layers className="w-4 h-4" />
              </div>
              <div className="text-right">
                <span className="text-xs sm:text-sm font-bold block text-white">
                  مشاهده خدمات کامل، آدرس و شبکه های اجتماعی
                </span>
              </div>
            </div>
            <Info className="w-4 h-4 text-slate-400 group-hover:text-rose-400 transition-colors shrink-0" />
          </button>
        </div>

        {/* Minimal Footer */}
        <div className="shrink-0 pt-2 border-t border-slate-900/80 flex items-center justify-between text-[11px] text-slate-500">
          <button
            onClick={handleShareCard}
            className="flex items-center gap-1 hover:text-slate-300 transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>اشتراک‌گذاری</span>
          </button>

          <span>دسن گرافیک © ۱۴۰۳</span>

          <button
            onClick={() => setIsQRModalOpen(true)}
            className="flex items-center gap-1 hover:text-rose-400 transition-colors cursor-pointer"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>کد QR</span>
          </button>
        </div>
      </div>

      {/* Details & Services Modal */}
      <DetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
      />

      {/* QR Code Modal */}
      <QRCodeModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        onShowToast={showToast}
      />

      {/* PWA Install Prompt Modal */}
      <InstallPromptModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
        onInstallNative={handleTriggerInstall}
        isIOS={isIOS}
        isStandalone={isStandalone}
      />

      {/* Toast Feedback */}
      <NotificationToast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
