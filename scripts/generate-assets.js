import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicDir = path.resolve(process.cwd(), 'public');
const publicIconsDir = path.resolve(publicDir, 'icons');
const rootIconsDir = path.resolve(process.cwd(), 'icons');
const srcAssetsDir = path.resolve(process.cwd(), 'src/assets/images');

// Ensure directories exist
[publicDir, publicIconsDir, rootIconsDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Find the generated logo file
const generatedFiles = fs.readdirSync(srcAssetsDir);
const logoFile = generatedFiles.find(f => f.startsWith('desan_logo'));
const logoPath = logoFile ? path.join(srcAssetsDir, logoFile) : null;

console.log('Logo file:', logoPath);

// SVG templates for all required icons
const svgIcons = {
  whatsapp: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    <rect width="512" height="512" rx="128" fill="#25D366"/>
    <path fill="#FFFFFF" d="M256.1 96c-88.4 0-160 71.6-160 160 0 28.2 7.3 55.7 21.2 80L96 416l81.8-21.3c23.6 12.8 50.3 19.6 78.3 19.6 88.4 0 160-71.6 160-160S344.5 96 256.1 96zm93.4 225.8c-3.9 11-22.6 20.2-31.5 21.4-8.9 1.2-20.5 5.2-69.2-14.9-58.7-24.2-96.6-83.8-99.5-87.7-2.9-3.9-23.9-31.8-23.9-60.7 0-28.9 15.1-43.1 20.5-49 5.4-5.9 11.7-7.3 15.6-7.3 3.9 0 7.8.1 11.2.2 3.6.1 8.5-.7 13.3 10.8 4.9 11.8 16.7 40.8 18.1 43.7 1.4 2.9 2.4 6.3.4 10.3-2 3.9-3 6.3-5.9 9.8-2.9 3.4-6.1 7.7-8.7 10.3-2.9 2.9-5.9 6.1-2.5 11.9 3.4 5.9 15.2 25.1 32.7 40.7 22.5 20.1 41.5 26.3 47.4 29.2 5.9 2.9 9.3 2.4 12.7-1.5 3.4-3.9 14.7-17.1 18.6-22.9 3.9-5.9 7.8-4.9 13.2-2.9 5.4 1.9 34.3 16.2 40.1 19.1 5.9 2.9 9.8 4.4 11.2 6.8 1.5 2.5 1.5 14.2-2.4 25.2z"/>
  </svg>`,

  telegram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    <rect width="512" height="512" rx="128" fill="#24A1DE"/>
    <path fill="#FFFFFF" d="M380.6 142.1c4.5-2.1 9.4 1.7 8.5 6.6l-47.5 224.2c-1.1 5.2-6.8 8.1-11.7 5.8l-72.3-33.8-34.9 33.6c-4.1 3.9-10.9 1.6-11.8-4l-11.4-71.1 133.4-120.4c3.4-3.1-.9-8.4-5-5.6L164.7 290l-63.5-19.8c-5.2-1.6-5.4-8.8-.4-10.7l279.8-117.4z"/>
  </svg>`,

  instagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    <defs>
      <radialGradient id="igGrad" cx="30%" cy="105%" r="115%">
        <stop offset="0%" stop-color="#FFDD55"/>
        <stop offset="15%" stop-color="#FF543E"/>
        <stop offset="50%" stop-color="#C837AB"/>
        <stop offset="100%" stop-color="#3771C8"/>
      </radialGradient>
    </defs>
    <rect width="512" height="512" rx="128" fill="url(#igGrad)"/>
    <rect x="112" y="112" width="288" height="288" rx="80" fill="none" stroke="#FFFFFF" stroke-width="28"/>
    <circle cx="256" cy="256" r="70" fill="none" stroke="#FFFFFF" stroke-width="28"/>
    <circle cx="340" cy="172" r="16" fill="#FFFFFF"/>
  </svg>`,

  bale: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    <rect width="512" height="512" rx="128" fill="#00A859"/>
    <path fill="#FFFFFF" d="M140 160c0-11 9-20 20-20h192c11 0 20 9 20 20v192c0 11-9 20-20 20H160c-11 0-20-9-20-20V160zm52 40v112c0 6.6 5.4 12 12 12h104c6.6 0 12-5.4 12-12V200c0-6.6-5.4-12-12-12H204c-6.6 0-12 5.4-12 12zm36 24c0-4.4 3.6-8 8-8h40c4.4 0 8 3.6 8 8v40c0 4.4-3.6 8-8 8h-40c-4.4 0-8-3.6-8-8v-40z"/>
    <circle cx="256" cy="256" r="150" fill="none" stroke="#FFFFFF" stroke-width="20" stroke-dasharray="8 8"/>
    <path fill="#FFFFFF" d="M256 120c75.1 0 136 60.9 136 136s-60.9 136-136 136S120 331.1 120 256s60.9-136 136-136zm0 40c-53 0-96 43-96 96s43 96 96 96 96-43 96-96-43-96-96-96z"/>
  </svg>`,

  rubika: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    <rect width="512" height="512" rx="128" fill="#702082"/>
    <g fill="#FFFFFF">
      <path d="M256 120l110 63.5v127L256 374l-110-63.5v-127L256 120zm0 42.4L183 204.6v84.8L256 331.8l73-42.4v-84.8L256 162.4z"/>
      <path d="M256 200l48 27.7v55.4L256 310.8l-48-27.7v-55.4L256 200z"/>
    </g>
  </svg>`,

  eitaa: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    <rect width="512" height="512" rx="128" fill="#E65100"/>
    <path fill="#FFFFFF" d="M352 144H160c-8.8 0-16 7.2-16 16v192c0 8.8 7.2 16 16 16h192c8.8 0 16-7.2 16-16V160c0-8.8-7.2-16-16-16zm-32 56H208v32h112v24H208v32h112v24H184V176h136v24z"/>
  </svg>`,

  phone: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    <rect width="512" height="512" rx="128" fill="#9E1B22"/>
    <path fill="#FFFFFF" d="M362.7 318.2c-15.8-9.4-32.9-19-48.4-27.8-12.7-7.2-28.7-4-37.8 7.6l-18 22.9c-36.9-19.1-66.9-49.1-86-86l22.9-18c11.6-9.1 14.8-25.1 7.6-37.8-8.8-15.5-18.4-32.6-27.8-48.4-9.3-15.6-29.3-19.6-43.5-8.6l-29.6 22.9c-12.9 10-20.1 26-18.7 42.4 6 70.4 34.6 137.6 85.9 188.9 51.3 51.3 118.5 79.9 188.9 85.9 16.4 1.4 32.4-5.8 42.4-18.7l22.9-29.6c11-14.2 7-34.2-8.6-43.5z"/>
  </svg>`,

  website: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    <rect width="512" height="512" rx="128" fill="#1E293B"/>
    <path fill="none" stroke="#FFFFFF" stroke-width="28" d="M256 96C167.6 96 96 167.6 96 256s71.6 160 160 160 160-71.6 160-160S344.4 96 256 96zm-160 160h320M256 96c44.2 0 80 71.6 80 160s-35.8 160-80 160-80-71.6-80-160 35.8-160 80-160z"/>
  </svg>`,

  contact: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    <rect width="512" height="512" rx="128" fill="#9E1B22"/>
    <circle cx="256" cy="192" r="64" fill="#FFFFFF"/>
    <path fill="#FFFFFF" d="M256 288c-70.7 0-128 43-128 96 0 8.8 7.2 16 16 16h224c8.8 0 16-7.2 16-16 0-53-57.3-96-128-96z"/>
  </svg>`,

  location: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    <rect width="512" height="512" rx="128" fill="#9E1B22"/>
    <path fill="#FFFFFF" d="M256 96c-61.9 0-112 50.1-112 112 0 84 112 208 112 208s112-124 112-208c0-61.9-50.1-112-112-112zm0 152c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40z"/>
  </svg>`,

  email: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    <rect width="512" height="512" rx="128" fill="#9E1B22"/>
    <path fill="#FFFFFF" d="M128 160h256c17.7 0 32 14.3 32 32v128c0 17.7-14.3 32-32 32H128c-17.7 0-32-14.3-32-32V192c0-17.7 14.3-32 32-32zm128 112L128 192v160h256V192l-128 80z"/>
  </svg>`,

  share: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    <rect width="512" height="512" rx="128" fill="#475569"/>
    <path fill="#FFFFFF" d="M352 160c-26.5 0-48 21.5-48 48 0 4.2.6 8.3 1.6 12.2l-104 52c-8.8-8.7-20.9-14.2-34.4-14.2-26.5 0-48 21.5-48 48s21.5 48 48 48c13.5 0 25.6-5.5 34.4-14.2l104 52c-1 3.9-1.6 8-1.6 12.2 0 26.5 21.5 48 48 48s48-21.5 48-48-21.5-48-48-48c-13.5 0-25.6 5.5-34.4 14.2l-104-52c1-3.9 1.6-8 1.6-12.2s-.6-8.3-1.6-12.2l104-52c8.8 8.7 20.9 14.2 34.4 14.2 26.5 0 48-21.5 48-48s-21.5-48-48-48z"/>
  </svg>`,

  download: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    <rect width="512" height="512" rx="128" fill="#9E1B22"/>
    <path fill="#FFFFFF" d="M256 120v180m-80-80l80 80 80-80M140 372h232" stroke="#FFFFFF" stroke-width="32" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  home: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    <rect width="512" height="512" rx="128" fill="#9E1B22"/>
    <path fill="#FFFFFF" d="M256 128L112 240v176h96V320h96v96h96V240L256 128z"/>
  </svg>`,

  install: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    <rect width="512" height="512" rx="128" fill="#9E1B22"/>
    <path fill="none" stroke="#FFFFFF" stroke-width="28" stroke-linecap="round" stroke-linejoin="round" d="M256 120v180m-64-64l64 64 64-64M140 360h232"/>
  </svg>`
};

async function buildAssets() {
  console.log('Generating SVG and PNG icons...');

  for (const [key, svg] of Object.entries(svgIcons)) {
    // Write SVGs
    fs.writeFileSync(path.join(publicIconsDir, `${key}.svg`), svg);
    fs.writeFileSync(path.join(rootIconsDir, `${key}.svg`), svg);

    // Render PNGs
    const pngBuffer = await sharp(Buffer.from(svg)).resize(512, 512).png().toBuffer();
    fs.writeFileSync(path.join(publicIconsDir, `${key}.png`), pngBuffer);
    fs.writeFileSync(path.join(rootIconsDir, `${key}.png`), pngBuffer);
  }

  // App Icons from logo or fallback SVG
  let logoBuffer;
  if (logoPath && fs.existsSync(logoPath)) {
    logoBuffer = await sharp(logoPath).toBuffer();
  } else {
    // Fallback logo SVG
    const fallbackLogoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
      <rect width="512" height="512" rx="128" fill="#9E1B22"/>
      <text x="256" y="280" font-family="sans-serif" font-size="160" font-weight="bold" fill="#FFFFFF" text-anchor="middle">دسن</text>
    </svg>`;
    logoBuffer = await sharp(Buffer.from(fallbackLogoSvg)).png().toBuffer();
  }

  // Create logo.png in root and public
  const logoPng = await sharp(logoBuffer).resize(512, 512).png().toBuffer();
  fs.writeFileSync(path.join(process.cwd(), 'logo.png'), logoPng);
  fs.writeFileSync(path.join(publicDir, 'logo.png'), logoPng);

  // App PWA icons
  const icon192 = await sharp(logoBuffer).resize(192, 192).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'icon-192.png'), icon192);
  fs.writeFileSync(path.join(process.cwd(), 'icon-192.png'), icon192);

  const icon512 = await sharp(logoBuffer).resize(512, 512).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'icon-512.png'), icon512);
  fs.writeFileSync(path.join(process.cwd(), 'icon-512.png'), icon512);

  // Maskable icon (with 10% padding so icons fit nicely in adaptive Android launcher shapes)
  const maskable = await sharp(logoBuffer)
    .resize(410, 410)
    .extend({
      top: 51,
      bottom: 51,
      left: 51,
      right: 51,
      background: { r: 158, g: 27, b: 34, alpha: 1 }
    })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'maskable-icon-512.png'), maskable);
  fs.writeFileSync(path.join(process.cwd(), 'maskable-icon-512.png'), maskable);

  // Apple touch icon
  const appleTouch = await sharp(logoBuffer).resize(180, 180).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), appleTouch);
  fs.writeFileSync(path.join(process.cwd(), 'apple-touch-icon.png'), appleTouch);

  // Favicon
  const favicon = await sharp(logoBuffer).resize(64, 64).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon.png'), favicon);
  fs.writeFileSync(path.join(process.cwd(), 'favicon.png'), favicon);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), favicon);

  console.log('All icons and PWA assets successfully generated!');
}

buildAssets().catch(err => {
  console.error('Asset build error:', err);
  process.exit(1);
});
