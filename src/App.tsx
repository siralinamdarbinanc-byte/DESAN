import { useState, useEffect } from 'react';
import { HeaderCard } from './components/HeaderCard';
import { SocialIconsBar } from './components/SocialIconsBar';
import { QRCodeModal } from './components/QRCodeModal';
import { InstallPromptModal } from './components/InstallPromptModal';
import { LocationModal } from './components/LocationModal';
import { NotificationToast } from './components/NotificationToast';
import { DetailsModal } from './components/DetailsModal';
import { BeforeInstallPromptEvent } from './types';
import { shareBusinessCard, downloadVCard } from './utils/vcard';
import { businessData } from './data/businessData';
import {
  Phone,
  Smartphone,
  MessageCircle,
  Globe,
  Download,
  Info,
  Sparkles,
  Layers,
  MapPin,
  Send,
} from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState<boolean>(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState<boolean>(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState<boolean>(false);
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
    <div className="h-screen sm:h-[100dvh] max-h-[100dvh] w-full bg-slate-50 text-slate-900 flex flex-col justify-between overflow-hidden selection:bg-[#9E1B22] selection:text-white p-2 sm:p-3">
      {/* Background Subtle Red Gradient Blobs */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-72 bg-gradient-to-b from-rose-100/60 via-rose-50/20 to-transparent pointer-events-none -z-10 blur-3xl" />

      {/* Container - Fits inside Viewport Height */}
      <div className="w-full max-w-md mx-auto flex-1 flex flex-col justify-between py-0.5 h-full">
        {/* Compact Header Card */}
        <div className="shrink-0">
          <HeaderCard onOpenQR={() => setIsQRModalOpen(true)} onShare={handleShareCard} />
        </div>

        {/* Social Media Icons Bar */}
        <div className="shrink-0">
          <SocialIconsBar />
        </div>

        {/* PWA App Installation Highlight Card - Clean & Compact */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="my-0.5 shrink-0"
        >
          <button
            onClick={handleTriggerInstall}
            id="btn-install-pwa-primary"
            className="w-full p-2 rounded-xl bg-white border border-rose-200 hover:border-[#9E1B22] transition-all flex items-center justify-between text-right cursor-pointer group shadow-2xs hover:shadow-xs"
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#9E1B22] flex items-center justify-center text-white shadow-2xs shrink-0 group-hover:scale-105 transition-transform">
                <Smartphone className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <span className="text-xs font-black text-slate-900 block truncate">
                  نصب اپلیکیشن روی گوشی
                </span>
                <p className="text-[10px] text-slate-600 truncate">
                  دسترسی سریع و بدون نیاز به اینترنت
                </p>
              </div>
            </div>
            <div className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-rose-50 group-hover:bg-[#9E1B22] text-[#9E1B22] group-hover:text-white transition-colors shrink-0 border border-rose-200">
              نصب اپ
            </div>
          </button>
        </motion.div>

        {/* Essential Quick Contact, Website & Location Cards Grid */}
        <div className="space-y-1 shrink-0 my-0.5">
          {/* Main Grid: Office, Mobile, WhatsApp, Telegram */}
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
            {/* Call Office */}
            <a
              href={`tel:${businessData.phone}`}
              id="btn-quick-call-office"
              className="p-2 sm:p-2.5 rounded-xl bg-white border border-slate-200 hover:border-[#9E1B22] flex flex-col items-center justify-center text-center gap-1.5 transition-all active:scale-95 shadow-2xs hover:shadow-xs group cursor-pointer"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#9E1B22] flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform shadow-xs shadow-rose-900/20">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
                تماس دفتر
              </span>
            </a>

            {/* Call Mobile */}
            <a
              href={`tel:${businessData.mobile}`}
              id="btn-quick-call-mobile"
              className="p-2 sm:p-2.5 rounded-xl bg-white border border-slate-200 hover:border-[#9E1B22] flex flex-col items-center justify-center text-center gap-1.5 transition-all active:scale-95 shadow-2xs hover:shadow-xs group cursor-pointer"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                <Smartphone className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
                تماس همراه
              </span>
            </a>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/98${businessData.whatsapp.substring(1)}`}
              target="_blank"
              rel="noopener noreferrer"
              id="btn-quick-whatsapp"
              className="p-2 sm:p-2.5 rounded-xl bg-white border border-slate-200 hover:border-emerald-600 flex flex-col items-center justify-center text-center gap-1.5 transition-all active:scale-95 shadow-2xs hover:shadow-xs group cursor-pointer"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform shadow-xs shadow-emerald-900/20">
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
                واتساپ سفارشات
              </span>
            </a>

            {/* Telegram */}
            <a
              href={businessData.telegram}
              target="_blank"
              rel="noopener noreferrer"
              id="btn-quick-telegram"
              className="p-2 sm:p-2.5 rounded-xl bg-white border border-slate-200 hover:border-sky-500 flex flex-col items-center justify-center text-center gap-1.5 transition-all active:scale-95 shadow-2xs hover:shadow-xs group cursor-pointer"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-sky-500 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform shadow-xs shadow-sky-900/20">
                <Send className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5" />
              </div>
              <span className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
                تلگرام سفارشات
              </span>
            </a>

            {/* Website Card - Full Width Banner */}
            <a
              href={businessData.website}
              target="_blank"
              rel="noopener noreferrer"
              id="btn-quick-website"
              className="col-span-2 p-2 sm:p-2.5 rounded-xl bg-white border border-slate-200 hover:border-[#9E1B22] flex items-center justify-between text-right transition-all active:scale-98 shadow-2xs hover:shadow-xs group cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#9E1B22] flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform shadow-xs shadow-rose-900/20">
                  <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-black text-slate-900 block leading-tight">
                    وبسایت رسمی دسن گرافیک
                  </span>
                  <p className="text-[10px] text-slate-500 font-mono mt-0.5 dir-ltr text-right">
                    www.desangraphic.com
                  </p>
                </div>
              </div>
              <div className="text-[10px] sm:text-xs font-bold px-2 py-1 rounded-lg bg-rose-50 group-hover:bg-[#9E1B22] text-[#9E1B22] group-hover:text-white transition-colors shrink-0 border border-rose-200">
                ورود به سایت
              </div>
            </a>
          </div>

          {/* Location & Routing Card */}
          <button
            onClick={() => setIsLocationModalOpen(true)}
            id="btn-quick-location-card"
            className="w-full p-2 sm:p-2.5 rounded-xl bg-gradient-to-r from-[#9E1B22] via-[#84141A] to-[#9E1B22] border border-rose-800 flex items-center gap-2.5 text-right transition-all active:scale-98 shadow-sm shadow-rose-900/20 hover:shadow-md group cursor-pointer"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center text-white shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="text-xs sm:text-sm font-black text-white leading-tight">
              آدرس و مسیریابی دفتر
            </span>
          </button>
        </div>

        {/* View Details & Services Drawer Trigger */}
        <div className="shrink-0 my-0.5">
          <motion.button
            onClick={() => setIsDetailsModalOpen(true)}
            id="btn-open-details-modal"
            animate={{ scale: [1, 1.01, 1] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
            className="w-full p-2 sm:p-2.5 rounded-xl bg-gradient-to-r from-rose-50 via-amber-50 to-rose-100 hover:from-rose-100 hover:to-amber-100 border border-rose-300 hover:border-[#9E1B22] flex items-center justify-between text-right transition-all shadow-xs hover:shadow-sm cursor-pointer group relative overflow-hidden"
          >
            <div className="flex items-center gap-2 relative z-10">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#9E1B22] text-white flex items-center justify-center shadow-xs group-hover:rotate-12 transition-transform duration-300">
                <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-black bg-gradient-to-r from-[#9E1B22] via-rose-700 to-amber-900 bg-clip-text text-transparent">
                    مشاهده خدمات کامل، آدرس و شبکه‌های اجتماعی
                  </span>
                </div>
                <p className="text-[9px] sm:text-[10px] font-bold text-rose-800/80 mt-0.5">
                  چاپ، طراحی، هدایای تبلیغاتی و اینستاگرام
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-lg bg-[#9E1B22] text-white group-hover:bg-[#84141A] transition-all shrink-0 shadow-2xs relative z-10">
              <span>اطلاعات</span>
              <Layers className="w-3 h-3" />
            </div>
          </motion.button>
        </div>
      </div>

      {/* Details & Services Modal */}
      <DetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
      />

      {/* Location & Navigation Modal */}
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onShowToast={showToast}
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
        hasNativePrompt={!!deferredPrompt}
        isIOS={isIOS}
        isStandalone={isStandalone}
      />

      {/* Toast Feedback */}
      <NotificationToast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
