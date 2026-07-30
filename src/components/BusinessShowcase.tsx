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
      case 'Palette': return <Palette className="w-6 h-6 text-rose-400" />;
      case 'Printer': return <Printer className="w-6 h-6 text-rose-400" />;
      case 'Box': return <Box className="w-6 h-6 text-rose-400" />;
      case 'Monitor': return <Monitor className="w-6 h-6 text-rose-400" />;
      case 'CreditCard': return <CreditCard className="w-6 h-6 text-rose-400" />;
      default: return <Palette className="w-6 h-6 text-rose-400" />;
    }
  };

  const mapUrl = `https://maps.google.com/?q=${businessData.coordinates.lat},${businessData.coordinates.lng}`;
  const neshanUrl = `https://neshan.org/maps/@${businessData.coordinates.lat},${businessData.coordinates.lng},16z`;
  const baladUrl = `https://balad.ir/location?lat=${businessData.coordinates.lat}&lng=${businessData.coordinates.lng}`;

  return (
    <div className="space-y-6 my-8">
      {/* Services Showcase */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-600"></div>
            <h2 className="text-lg font-bold text-white">خدمات و تخصص‌های دسن گرافیک</h2>
          </div>
          <span className="text-xs text-rose-400 font-semibold px-2.5 py-1 rounded-full bg-rose-950/60 border border-rose-800/40">
            تضمین کیفیت
          </span>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-rose-900 text-white shadow-md border border-rose-700'
                  : 'bg-slate-800/60 text-slate-300 border border-slate-700/60 hover:bg-slate-800'
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
              className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-rose-900/50 transition-colors flex items-start gap-3.5 group"
            >
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 shrink-0 group-hover:bg-rose-950/30 transition-colors">
                {getServiceIcon(service.icon)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="text-sm font-bold text-white group-hover:text-rose-300 transition-colors">
                    {service.title}
                  </h3>
                  {service.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-950 text-rose-300 border border-rose-800/60">
                      {service.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
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
        className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl"
      >
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-5 h-5 text-rose-500" />
          <h2 className="text-lg font-bold text-white">آدرس و موقعیت مکانی دفتر</h2>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mb-4 bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80">
          {businessData.address}
        </p>

        {/* Working Hours */}
        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 mb-4">
          <Clock className="w-5 h-5 text-amber-400 shrink-0" />
          <div className="text-xs">
            <span className="font-bold text-white block">ساعات کاری دفتر:</span>
            <span className="text-slate-400">شنبه تا چهارشنبه: ۰۹:۰۰ الی ۱۹:۰۰ | پنجشنبه: ۰۹:۰۰ الی ۱۴:۰۰</span>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <a
            href={neshanUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Navigation className="w-3.5 h-3.5 text-emerald-400" />
            مسیریابی نشان
          </a>
          <a
            href={baladUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Navigation className="w-3.5 h-3.5 text-sky-400" />
            مسیریابی بلد
          </a>
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="col-span-2 sm:col-span-1 p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5 text-rose-400" />
            گوگل مپس
          </a>
        </div>
      </motion.div>
    </div>
  );
};
