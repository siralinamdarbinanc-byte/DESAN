import React, { useState } from 'react';
import { motion } from 'motion/react';
import { servicesData, businessData } from '../data/businessData';
import { MapPin, Clock, Palette, Printer, Box, Monitor, CreditCard, Navigation, ExternalLink } from 'lucide-react';

export const BusinessShowcase: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('همه');

  const categories = ['همه', 'طراحی', 'چاپ', 'بسته‌بندی', 'دیجیتال'];

  const filteredServices = activeCategory === 'همه'
    ? servicesData
    : servicesData.filter(s => s.category === activeCategory);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Palette': return <Palette className="w-6 h-6 text-[#9E1B22]" />;
      case 'Printer': return <Printer className="w-6 h-6 text-[#9E1B22]" />;
      case 'Box': return <Box className="w-6 h-6 text-[#9E1B22]" />;
      case 'Monitor': return <Monitor className="w-6 h-6 text-[#9E1B22]" />;
      case 'CreditCard': return <CreditCard className="w-6 h-6 text-[#9E1B22]" />;
      default: return <Palette className="w-6 h-6 text-[#9E1B22]" />;
    }
  };

  const mapUrl = businessData.locationLinks?.google || 'https://maps.app.goo.gl/6Gpd5cVk8zjhRAnN9';
  const neshanUrl = businessData.locationLinks?.neshan || 'https://nshn.ir/9b_bv_GcNxRmDZ';
  const baladUrl = businessData.locationLinks?.balad || 'https://balad.ir/location?latitude=35.733097&longitude=51.483793&zoom=16.500000';

  return (
    <div className="space-y-6 my-4">
      {/* Services Showcase */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-xl"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#9E1B22]"></div>
            <h2 className="text-lg font-black text-slate-900">خدمات و تخصص‌های دسن گرافیک</h2>
          </div>
          <span className="text-xs text-[#9E1B22] font-extrabold px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200">
            تضمین کیفیت
          </span>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#9E1B22] text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-rose-50 hover:text-[#9E1B22]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 gap-3">
          {filteredServices.map((service) => (
            <motion.div
              key={service.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-rose-300 hover:bg-rose-50/30 transition-colors flex items-start gap-3.5 group"
            >
              <div className="p-3 rounded-xl bg-white border border-rose-100 shrink-0 group-hover:border-[#9E1B22] transition-colors shadow-sm">
                {getServiceIcon(service.icon)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="text-sm font-black text-slate-900 group-hover:text-[#9E1B22] transition-colors">
                    {service.title}
                  </h3>
                  {service.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-100 text-[#9E1B22] border border-rose-200">
                      {service.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Address & Working Hours Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-xl"
      >
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-5 h-5 text-[#9E1B22]" />
          <h2 className="text-lg font-black text-slate-900">آدرس و موقعیت مکانی دفتر</h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-bold mb-4 bg-rose-50/70 p-3.5 rounded-2xl border border-rose-200">
          {businessData.address}
        </p>

        {/* Working Hours */}
        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 mb-4">
          <Clock className="w-5 h-5 text-amber-600 shrink-0" />
          <div className="text-xs">
            <span className="font-black text-slate-900 block">ساعات کاری دفتر:</span>
            <span className="text-slate-600 font-medium">شنبه تا چهارشنبه: ۰۹:۰۰ الی ۱۹:۰۰ | پنجشنبه: ۰۹:۰۰ الی ۱۴:۰۰</span>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <a
            href={neshanUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-xs font-bold text-slate-800 hover:text-emerald-700 flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
          >
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            مسیریابی نشان
          </a>
          <a
            href={baladUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-sky-50 border border-slate-200 hover:border-sky-300 text-xs font-bold text-slate-800 hover:text-sky-700 flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
          >
            <MapPin className="w-3.5 h-3.5 text-sky-600" />
            مسیریابی بلد
          </a>
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="col-span-2 sm:col-span-1 p-2.5 rounded-xl bg-slate-100 hover:bg-rose-50 border border-slate-200 hover:border-rose-300 text-xs font-bold text-slate-800 hover:text-[#9E1B22] flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
          >
            <MapPin className="w-3.5 h-3.5 text-[#9E1B22]" />
            گوگل مپس
          </a>
        </div>
      </motion.div>
    </div>
  );
};
