// Standalone PWA & Interaction Initialization Script for Desan Graphic
console.log('Desan Graphic PWA Digital Business Card Initialized.');

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./service-worker.js')
      .then((reg) => console.log('SW Registered:', reg.scope))
      .catch((err) => console.warn('SW Register Error:', err));
  });
}
