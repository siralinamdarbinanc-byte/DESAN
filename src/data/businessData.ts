import { BusinessContact, ServiceItem } from '../types';

export const businessData: BusinessContact = {
  name: 'دسن گرافیک',
  englishName: 'Desan Graphic',
  tagline: 'مجموعه تخصصی طراحی گرافیک، برندینگ و چاپ لوکس',
  description: 'استودیو طراحی دسن گرافیک با بیش از ۱۰ سال سابقه درخشان در زمینه طراحی هویت بصری، ساخت تیزر، چاپ کاتالوگ و بسته‌بندی‌های لوکس در تهران.',
  phone: '02177243982',
  phoneFormatted: '۰۲۱-۷۷۲۴۳۹۸۲',
  mobile: '09126843449',
  mobileFormatted: '۰۹۱۲-۶۸۴۳۴۴۹',
  whatsapp: '09031340125',
  whatsappFormatted: '۰۹۰۳-۱۳۴۰۱۲۵',
  website: 'https://www.desangraphic.com',
  telegram: 'https://t.me/Desan_graphic',
  instagram: 'https://instagram.com/desangraphic',
  bale: 'https://ble.ir/desangraphic',
  rubika: 'https://rubika.ir/page/desangraphic',
  eitaa: 'https://eitaa.com/desangraphic',
  email: 'info@desangraphic.com',
  address: 'تهران، نارمک، خیابان آیت، نزدیکی ایستگاه متروی گلبرگ (جانبازان)',
  city: 'تهران',
  coordinates: {
    lat: 35.7289,
    lng: 51.4842,
  },
};

export const servicesData: ServiceItem[] = [
  {
    id: 'logo-design',
    title: 'طراحی لوگو و هویت بصری',
    description: 'طراحی تخصصی نشانه، لوگوتایپ و دفترچه راهنمای برند (Brandbook) هوشمند',
    icon: 'Palette',
    category: 'طراحی',
    badge: 'تخصصی',
  },
  {
    id: 'print-luxury',
    title: 'چاپ لوکس و اختصاصی',
    description: 'چاپ کاتالوگ، بروشور، سربرگ، طلاکوب، برجسته‌سازی و یووی موضعی',
    icon: 'Printer',
    category: 'چاپ',
    badge: 'با کیفیت',
  },
  {
    id: 'packaging',
    title: 'طراحی بسته‌بندی و جعبه',
    description: 'طراحی ساختار و گرافیک انواع جعبه‌های صادراتی، هاردباکس و کیفت‌دوزی',
    icon: 'Box',
    category: 'بسته‌بندی',
  },
  {
    id: 'digital-graphic',
    title: 'گرافیک دیجیتال و سوشال',
    description: 'طراحی قالب پست و استوری اینستاگرام، بanners وب و موشن‌گرافیک',
    icon: 'Monitor',
    category: 'دیجیتال',
  },
  {
    id: 'business-card',
    title: 'کارت ویزیت لاکچری و NFC',
    description: 'طراحی و تولید کارت‌های هوشمند NFC، پی‌وی‌سی و لمینت برجسته',
    icon: 'CreditCard',
    category: 'کارت هوشمند',
    badge: 'مدرن',
  },
];
