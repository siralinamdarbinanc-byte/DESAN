import { businessData } from '../data/businessData';

export const generateVCardString = (): string => {
  return `BEGIN:VCARD
VERSION:3.0
FN:${businessData.name}
ORG:${businessData.name};${businessData.tagline}
TITLE:استودیو طراحی گرافیک و چاپ
TEL;TYPE=WORK,VOICE:${businessData.phone}
TEL;TYPE=CELL,VOICE,MSG:${businessData.mobile}
TEL;TYPE=CELL,WA:${businessData.whatsapp}
URL;TYPE=WORK:${businessData.website}
URL;TYPE=TELEGRAM:${businessData.telegram}
URL;TYPE=INSTAGRAM:${businessData.instagram}
URL;TYPE=BALE:${businessData.bale}
URL;TYPE=RUBIKA:${businessData.rubika}
URL;TYPE=EITAA:${businessData.eitaa}
EMAIL;TYPE=INTERNET:${businessData.email}
ADR;TYPE=WORK:;;${businessData.address};تهران;تهران;16816;IRAN
NOTE:${businessData.description}
END:VCARD`;
};

export const downloadVCard = (): void => {
  const vcardContent = generateVCardString();
  const blob = new Blob([vcardContent], { type: 'text/vcard;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'Desan-Graphic-Contact.vcf');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 1000);
};

export const shareBusinessCard = async (): Promise<boolean> => {
  const shareData = {
    title: businessData.name,
    text: `${businessData.name} - ${businessData.tagline}\nتلفن: ${businessData.phoneFormatted}`,
    url: window.location.href,
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return true;
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        console.warn('Share error:', err);
      }
    }
  }

  // Fallback to copying URL
  try {
    await navigator.clipboard.writeText(window.location.href);
    return false; // Indicating copied to clipboard fallback
  } catch (e) {
    console.error('Clipboard copy failed:', e);
    return false;
  }
};
