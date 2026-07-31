import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { businessData } from '../data/businessData';
import { ExternalLink } from 'lucide-react';

interface ExpandableSocialsProps {
  isOpen: boolean;
}

interface PlatformItem {
  id: string;
  name: string;
  persianName: string;
  handle: string;
  icon: string;
  webUrl: string;
  appScheme?: string;
  color: string;
}

export const ExpandableSocials: React.FC<ExpandableSocialsProps> = ({ isOpen }) => {
  const platforms: PlatformItem[] = [
    {
      id: 'telegram',
      name: 'Telegram',
      persianName: 'پیام‌رسان تلگرام',
      handle: '@Desan_graphic',
      icon: '/icons/telegram.png',
      webUrl: businessData.telegram,
      appScheme: 'tg://resolve?domain=Desan_graphic',
      color: 'bg-sky-50/80 border-sky-200 text-sky-900',
    },
    {
      id: 'instagram',
      name: 'Instagram',
      persianName: 'صفحه اینستاگرام',
      handle: '@desangraphic',
      icon: '/icons/instagram.png',
      webUrl: businessData.instagram,
      appScheme: 'instagram://user?username=desangraphic',
      color: 'bg-fuchsia-50/80 border-fuchsia-200 text-fuchsia-900',
    },
    {
      id: 'bale',
      name: 'Bale',
      persianName: 'پیام‌رسان بله (Bale)',
      handle: 'ble.ir/desangraphic',
      icon: '/icons/bale.png',
      webUrl: businessData.bale,
      appScheme: 'ble://desangraphic',
      color: 'bg-emerald-50/80 border-emerald-200 text-emerald-900',
    },
    {
      id: 'rubika',
      name: 'Rubika',
      persianName: 'کانال روبیکا (Rubika)',
      handle: 'rubika.ir/page/desangraphic',
      icon: '/icons/rubika.png',
      webUrl: businessData.rubika,
      appScheme: 'rubika://page/desangraphic',
      color: 'bg-purple-50/80 border-purple-200 text-purple-900',
    },
    {
      id: 'eitaa',
      name: 'Eitaa',
      persianName: 'کانال ایتا (Eitaa)',
      handle: 'eitaa.com/desangraphic',
      icon: '/icons/eitaa.png',
      webUrl: businessData.eitaa,
      appScheme: 'eitaa://desangraphic',
      color: 'bg-amber-50/80 border-amber-200 text-amber-900',
    },
  ];

  const handleOpenPlatform = (item: PlatformItem) => {
    // Attempt opening app protocol first, fallback to web after timeout
    if (item.appScheme) {
      const start = Date.now();
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = item.appScheme;
      document.body.appendChild(iframe);

      setTimeout(() => {
        document.body.removeChild(iframe);
        if (Date.now() - start < 1500) {
          window.open(item.webUrl, '_blank', 'noopener,noreferrer');
        }
      }, 1000);
    } else {
      window.open(item.webUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0, scale: 0.95 }}
          animate={{ opacity: 1, height: 'auto', scale: 1 }}
          exit={{ opacity: 0, height: 0, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden mb-6"
        >
          <div className="p-4 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 px-1">
              <span className="text-xs font-bold text-slate-700">
                شبکه‌های اجتماعی و پیام‌رسان‌ها
              </span>
              <span className="text-[11px] text-[#9E1B22] font-semibold">
                پاسخگویی آنلاین
              </span>
            </div>

            {platforms.map((platform, idx) => (
              <motion.div
                key={platform.id}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.06 }}
              >
                <button
                  id={`btn-social-${platform.id}`}
                  onClick={() => handleOpenPlatform(platform)}
                  className={`w-full p-3.5 rounded-2xl ${platform.color} border flex items-center justify-between hover:scale-[1.01] transition-all duration-200 cursor-pointer shadow-sm group`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white p-1.5 border border-slate-200 shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                      <img
                        src={platform.icon}
                        alt={platform.name}
                        className="w-full h-full object-contain rounded-md"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-black text-slate-900 block">
                        {platform.persianName}
                      </span>
                      <span className="text-xs text-slate-500 block dir-ltr text-right font-mono">
                        {platform.handle}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 group-hover:text-[#9E1B22] group-hover:border-[#9E1B22] transition-colors shadow-sm">
                    <span>ورود</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#9E1B22]" />
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
