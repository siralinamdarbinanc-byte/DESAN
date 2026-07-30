import React from 'react';
import { motion } from 'motion/react';
import { ActionButton } from './ActionButton';
import { businessData } from '../data/businessData';
import { downloadVCard } from '../utils/vcard';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface MainButtonsProps {
  onShare: () => void;
  onInstall: () => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onShowToast: (msg: string) => void;
}

export const MainButtons: React.FC<MainButtonsProps> = ({
  onShare,
  onInstall,
  isExpanded,
  onToggleExpand,
  onShowToast,
}) => {
  const handleSaveContact = () => {
    downloadVCard();
    onShowToast('کارت مخاطب دsn گرافیک با موفقیت دانلود شد!');
  };

  return (
    <div className="space-y-3.5 my-6">
      {/* 1. Call Office */}
      <ActionButton
        id="btn-call-office"
        label="تماس با دفتر مرکزی"
        subtitle={businessData.phoneFormatted}
        iconSrc="/icons/phone.png"
        href={`tel:${businessData.phone}`}
        variant="primary"
        badge="دفتر"
      />

      {/* 2. Call Mobile */}
      <ActionButton
        id="btn-call-mobile"
        label="تماس با موبایل پشتیبانی"
        subtitle={businessData.mobileFormatted}
        iconSrc="/icons/phone.png"
        href={`tel:${businessData.mobile}`}
        variant="secondary"
        badge="پشتیبانی"
      />

      {/* 3. Open WhatsApp */}
      <ActionButton
        id="btn-open-whatsapp"
        label="ارتباط مستقیم در واتساپ"
        subtitle={businessData.whatsappFormatted}
        iconSrc="/icons/whatsapp.png"
        href={`https://wa.me/98${businessData.whatsapp.substring(1)}`}
        target="_blank"
        variant="secondary"
        badge="چت سریع"
      />

      {/* 4. Open Telegram */}
      <ActionButton
        id="btn-open-telegram"
        label="کانال رسمی تلگرام"
        subtitle="@Desan_graphic"
        iconSrc="/icons/telegram.png"
        href={businessData.telegram}
        target="_blank"
        variant="secondary"
      />

      {/* 5. Open Instagram */}
      <ActionButton
        id="btn-open-instagram"
        label="صفحه اینستاگرام دسن گرافیک"
        subtitle="@desangraphic"
        iconSrc="/icons/instagram.png"
        href={businessData.instagram}
        target="_blank"
        variant="secondary"
        badge="نمونه کارها"
      />

      {/* 6. Visit Website */}
      <ActionButton
        id="btn-visit-website"
        label="مشاهده وب‌سایت دسن گرافیک"
        subtitle="www.desangraphic.com"
        iconSrc="/icons/website.png"
        href={businessData.website}
        target="_blank"
        variant="luxury"
      />

      {/* Grid of Action Buttons: Save Contact, Share Card, Install App */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        {/* 7. Save Contact */}
        <ActionButton
          id="btn-save-contact"
          label="ذخیره در مخاطبین"
          subtitle="دانلود فایل vCard"
          iconSrc="/icons/contact.png"
          onClick={handleSaveContact}
          variant="primary"
        />

        {/* 8. Share Card */}
        <ActionButton
          id="btn-share-card"
          label="اشتراک‌گذاری کارت"
          subtitle="ارسال لینک به دوستان"
          iconSrc="/icons/share.png"
          onClick={onShare}
          variant="accent"
        />
      </div>

      {/* 9. Install App */}
      <ActionButton
        id="btn-install-app"
        label="نصب اپلیکیشن دسن گرافیک (PWA)"
        subtitle="دسترسی سریع و آفلاین بدون نیاز به اپ استور"
        iconSrc="/icons/install.png"
        onClick={onInstall}
        variant="luxury"
        badge="رایگان"
      />

      {/* 10. More Contact Methods Trigger */}
      <motion.button
        id="btn-more-contacts"
        onClick={onToggleExpand}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="w-full p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 flex items-center justify-between text-slate-200 transition-all duration-200 shadow-lg cursor-pointer mt-4 group"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-950/40 border border-rose-800/40 flex items-center justify-center text-rose-400 group-hover:bg-rose-900/40 transition-colors">
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
          <div className="text-right">
            <span className="text-sm font-bold block text-white">
              سایر راه‌های ارتباطی و پیام‌رسان‌ها
            </span>
            <span className="text-xs text-slate-400 block">
              ایتا، روبیکا، بله، تلگرام و اینستاگرام
            </span>
          </div>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-rose-300 border border-slate-700">
          {isExpanded ? 'بستن' : 'مشاهده همه'}
        </span>
      </motion.button>
    </div>
  );
};
