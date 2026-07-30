# دسن گرافیک | کارت ویزیت دیجیتال و هوشمند PWA

![Desan Graphic Banner](logo.png)

کارت ویزیت دیجیتال و پیشرفته (Progressive Web App) **دسن گرافیک** - مجموعه تخصصی طراحی گرافیک، برندینگ و چاپ لوکس.

---

## 🌟 قابلیت‌های اصلی (Features)

- 📱 **اپلیکیشن کامل PWA:** قابلیت نصب مستقیم روی آیفون (iOS)، اندروید، دسکتاپ و تمام مرورگرها (Chrome, Safari, Edge, Firefox).
- 📶 **کارکرد ۱۰۰٪ آفلاین:** پیش‌ذخیره‌سازی کامل آیکون‌ها، شماره‌ها و اطلاعات تماس با Service Worker پیشرفته و صفحه آفلاین اختصاصی.
- 🎨 **طراحی مدرن و لاکچری:** تم اختصاصی قرمز یاقوتی (`#9E1B22`)، شیشه‌ای (Glassmorphism)، انیمیشن‌های باکیفیت و بازخورد لمسی Ripple Effect.
- 📞 **دکمه‌های تعاملی و سریع:**
  - تماس مستقیم با دفتر مرکزی (`۰۲۱-۷۷۲۴۳۹۸۲`)
  - تماس مستقیم با موبایل پشتیبانی (`۰۹۱۲-۶۸۴۳۴۴۹`)
  - چت مستقیم در واتساپ (`۰۹۰۳-۱۳۴۰۱۲۵`)
  - کانال رسمی تلگرام (`@Desan_graphic`)
  - صفحه اینستاگرام دسن گرافیک (`@desangraphic`)
  - وب‌سایت رسمی (`www.desangraphic.com`)
  - دانلود مستقیم مخاطب (`contact.vcf`)
  - اشتراک‌گذاری تعاملی کارت ویزیت (Web Share API)
  - نصب مستقیم اپلیکیشن PWA
  - پنل آکاردئونی پیام‌رسان‌های ایرانی و خارجی (تلگرام، اینستاگرام، بله، روبیکا، ایتا)
- 📇 **فایل vCard خودکار:** ساخت و دانلود فایل `contact.vcf` با فیلدهای کامل استاندارد vCard 3.0.
- 🔍 **اسکن QR Code اختصاصی:** قابلیت نمایش و دانلود تصویر کد QR جهت اشتراک‌گذاری حضوری و NFC.
- 🗺️ **مسیریابی هوشمند:** لینک مستقیم مسیریابی در نشان، بلد و گوگل مپس به همراه آدرس دفتر (تهران، هفت حوض).
- 🏷️ **سئوی کامل و استانداردهای وب:** متاتگ‌های Open Graph، کارت توییتر، JSON-LD Schema (LocalBusiness) و فونت وزیرمتن.

---

## 📁 ساختار فایل‌های پروژه (Project Structure)

```text
├── index.html            # فایل اصلی کارت ویزیت دیجیتال با متاتگ‌ها و اسکیما
├── manifest.json         # فایل مانیفست PWA با مشخصات، آیکون‌ها و میانبرها
├── service-worker.js     # سرویس ورکر آفلاین با استراتژی Stale-While-Revalidate
├── offline.html          # صفحه اختصاصی حالت آفلاین
├── contact.vcf           # فایل vCard استاندارد اطلاعات مخاطب
├── style.css             # استایل‌های استاندارد و مستقیم
├── app.js                # اسکریپت راه‌اندازی و ثبت PWA
├── logo.png              # لوگوی رسمی دسن گرافیک
├── favicon.png           # فاوآیکون مرورگر
├── icon-192.png          # آیکون PWA اندازه 192x192
├── icon-512.png          # آیکون PWA اندازه 512x512
├── maskable-icon-512.png # آیکون ماسک‌پذیر اندروید
├── apple-touch-icon.png  # آیکون اختصاصی iOS Safari
├── icons/                # پوشه آیکون‌های رسمی پیام‌رسان‌ها (SVG + PNG)
│   ├── whatsapp.png/.svg
│   ├── telegram.png/.svg
│   ├── instagram.png/.svg
│   ├── bale.png/.svg
│   ├── rubika.png/.svg
│   ├── eitaa.png/.svg
│   ├── phone.png/.svg
│   ├── website.png/.svg
│   ├── contact.png/.svg
│   ├── location.png/.svg
│   ├── email.png/.svg
│   ├── share.png/.svg
│   ├── download.png/.svg
│   ├── home.png/.svg
│   └── install.png/.svg
└── src/                  # سورس کد پیشرفته React + Tailwind + Motion
```

---

## 🚀 راهنمای آپلود مستقیم در GitHub Pages

این پروژه به‌صورت ۱۰۰٪ خودکفا (Standalone) ساخته شده و بدون نیاز به سرور جانبی بلافاصله روی GitHub Pages کار می‌کند:

1. تمام فایل‌های این مخزن را در مخزن جدید خود در GitHub آپلود یا push کنید.
2. در تنظیمات گیت‌هاب repository به مسیر **Settings -> Pages** بروید.
3. شاخه (Branch) را روی `main` یا `master` و پوشه را روی `/ (root)` قرار دهید و دکمه **Save** را بزنید.
4. آدرس دامین گیت‌هاب شما (مثلاً `https://username.github.io/repository-name`) فعال شده و کارت ویزیت PWA شما آماده استفاده می‌باشد!

---

## 📞 اطلاعات تماس دسن گرافیک

- **تلفن دفتر:** 02177243982
- **موبایل:** 09126843449
- **واتساپ:** 09031340125
- **وب‌سایت:** [www.desangraphic.com](https://www.desangraphic.com)
- **تلگرام:** [t.me/Desan_graphic](https://t.me/Desan_graphic)
- **اینستاگرام:** [instagram.com/desangraphic](https://instagram.com/desangraphic)
- **بله:** [ble.ir/desangraphic](https://ble.ir/desangraphic)
- **روبیکا:** [rubika.ir/page/desangraphic](https://rubika.ir/page/desangraphic)
- **ایتا:** [eitaa.com/eitaa/desangraphic](https://eitaa.com/desangraphic)
- **آدرس:** تهران، نارمک، خیابان آیت، نرسیده به میدان هفت حوض، پلاک ۱۲۴
