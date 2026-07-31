import React from 'react';
import { motion } from 'motion/react';
import { businessData } from '../data/businessData';

interface SocialPlatform {
  id: string;
  name: string;
  persianName: string;
  icon: string;
  url: string;
  bgColor: string;
  hoverBorder: string;
  badgeBg: string;
  badgeText: string;
}

export const SocialIconsBar: React.FC = () => {
  const socials: SocialPlatform[] = [
    {
      id: 'instagram',
      name: 'Instagram',
      persianName: 'اینستاگرام',
      icon: '/icons/instagram.png',
      url: businessData.instagram,
      bgColor: 'bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600',
      hoverBorder: 'hover:border-rose-400',
      badgeBg: 'bg-rose-100',
      badgeText: 'text-rose-900',
    },
    {
      id: 'telegram',
      name: 'Telegram',
      persianName: 'تلگرام',
      icon: '/icons/telegram.png',
      url: businessData.telegram,
      bgColor: 'bg-sky-500',
      hoverBorder: 'hover:border-sky-400',
      badgeBg: 'bg-sky-100',
      badgeText: 'text-sky-900',
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      persianName: 'واتساپ',
      icon: '/icons/whatsapp.png',
      url: `https://wa.me/98${businessData.whatsapp.substring(1)}`,
      bgColor: 'bg-emerald-500',
      hoverBorder: 'hover:border-emerald-400',
      badgeBg: 'bg-emerald-100',
      badgeText: 'text-emerald-900',
    },
    {
      id: 'bale',
      name: 'Bale',
      persianName: 'بله',
      icon: '/icons/bale.png',
      url: businessData.bale,
      bgColor: 'bg-teal-600',
      hoverBorder: 'hover:border-teal-400',
      badgeBg: 'bg-teal-100',
      badgeText: 'text-teal-900',
    },
    {
      id: 'rubika',
      name: 'Rubika',
      persianName: 'روبیکا',
      icon: '/icons/rubika.png',
      url: businessData.rubika,
      bgColor: 'bg-purple-600',
      hoverBorder: 'hover:border-purple-400',
      badgeBg: 'bg-purple-100',
      badgeText: 'text-purple-900',
    },
    {
      id: 'eitaa',
      name: 'Eitaa',
      persianName: 'ایتا',
      icon: '/icons/eitaa.png',
      url: businessData.eitaa,
      bgColor: 'bg-amber-600',
      hoverBorder: 'hover:border-amber-400',
      badgeBg: 'bg-amber-100',
      badgeText: 'text-amber-900',
    },
  ];

  return (
    <div className="w-full my-1.5 p-2.5 sm:p-3 rounded-2xl bg-white border border-rose-100 shadow-sm">
      <div className="flex items-center justify-between mb-2 px-1">
        <span className="text-xs font-black text-slate-800 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#9E1B22] animate-ping" />
          شبکه‌های اجتماعی و پیام‌رسان‌ها
        </span>
        <span className="text-[10px] font-bold text-[#9E1B22] bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">
          راه ارتباطی مستقیم
        </span>
      </div>

      <div className="grid grid-cols-6 gap-1.5 sm:gap-2">
        {socials.map((social, idx) => (
          <motion.a
            key={social.id}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            id={`social-icon-${social.id}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05, duration: 0.3 }}
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center justify-center p-1.5 rounded-xl bg-slate-50 hover:bg-white border border-slate-200 transition-all shadow-xs group"
            title={`ورود به ${social.persianName}`}
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white p-1 border border-slate-100 shadow-xs flex items-center justify-center relative overflow-hidden group-hover:shadow-md transition-shadow">
              <img
                src={social.icon}
                alt={social.name}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="text-[10px] font-bold text-slate-700 mt-1 truncate max-w-full group-hover:text-[#9E1B22] transition-colors">
              {social.persianName}
            </span>
          </motion.a>
        ))}
      </div>
    </div>
  );
};
