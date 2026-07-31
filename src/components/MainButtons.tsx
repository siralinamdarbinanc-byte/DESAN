import React from 'react';
import { motion } from 'motion/react';
import { ActionButton } from './ActionButton';
import { businessData } from '../data/businessData';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface MainButtonsProps {
  onShare: () => void;
  onInstall: () => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onShowToast: (msg: string) => void;
}

export const MainButtons: React.FC<MainButtonsProps> = ({
  onInstall,
  isExpanded,
  onToggleExpand,
}) => {

  return (
    <div className="space-y-4 my-6">

      <ActionButton
        id="btn-call-office"
        label="تماس با دفتر"
        subtitle="برای تماس لمس کنید"
        iconSrc="/icons/phone.png"
        href={`tel:${businessData.phone}`}
        variant="primary"
      />

      <ActionButton
        id="btn-call-mobile"
        label="تماس با پشتیبانی"
        subtitle="برای تماس لمس کنید"
        iconSrc="/icons/phone.png"
        href={`tel:${businessData.mobile}`}
        variant="secondary"
      />

      <ActionButton
        id="btn-whatsapp"
        label="واتساپ سفارشات"
        subtitle="گفتگو مستقیم در واتساپ"
        iconSrc="/icons/whatsapp.png"
        href={`https://wa.me/98${businessData.whatsapp.substring(1)}`}
        target="_blank"
        variant="secondary"
      />

      <ActionButton
        id="btn-website"
        label="وب‌سایت دسن گرافیک"
        subtitle="مشاهده نمونه کارها و خدمات"
        iconSrc="/icons/website.png"
        href={businessData.website}
        target="_blank"
        variant="luxury"
      />

      <ActionButton
        id="btn-install"
        label="نصب اپلیکیشن"
        subtitle="دسترسی سریع روی گوشی"
        iconSrc="/icons/install.png"
        onClick={onInstall}
        variant="luxury"
      />


      <motion.button
        id="btn-more-contacts"
        onClick={onToggleExpand}
        whileTap={{ scale: 0.98 }}
        className="w-full p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between shadow-lg"
      >

        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-xl bg-rose-950/50 flex items-center justify-center text-rose-400">
            {isExpanded ? 
              <ChevronUp className="w-6 h-6"/> :
              <ChevronDown className="w-6 h-6"/>
            }
          </div>

          <div className="text-right">
            <span className="text-base font-black text-white block">
              راه‌های ارتباطی دیگر
            </span>

            <span className="text-xs text-slate-400">
              تلگرام، اینستاگرام، روبیکا، ایتا و بله
            </span>
          </div>

        </div>

        <span className="text-xs px-3 py-2 rounded-xl bg-rose-900 text-white">
          {isExpanded ? 'بستن' : 'مشاهده'}
        </span>

      </motion.button>

    </div>
  );
};
