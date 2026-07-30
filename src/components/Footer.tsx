import React from 'react';
import { ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-10 pb-8 text-center text-xs text-slate-500 space-y-3">
      <div className="flex items-center justify-center gap-2 text-slate-400">
        <ShieldCheck className="w-4 h-4 text-emerald-500" />
        <span>کارت ویزیت هوشمند و دیجیتال • نسخه PWA ۳.۰</span>
      </div>

      <p className="text-[11px] text-slate-400">
        تمامی حقوق مادی و معنوی متعلق به <strong className="text-slate-200">دسن گرافیک</strong> می‌باشد.
      </p>

      <div className="flex items-center justify-center gap-1 text-[10px] text-slate-500 pt-1">
        <span>طراحی شده با</span>
        <Heart className="w-3 h-3 text-rose-600 fill-rose-600 inline" />
        <span>برای مجموعه دسن گرافیک</span>
      </div>
    </footer>
  );
};
