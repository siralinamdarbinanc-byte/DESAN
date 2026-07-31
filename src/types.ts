export interface BusinessContact {
  name: string;
  englishName: string;
  tagline: string;
  description: string;
  phone: string;
  phoneFormatted: string;
  mobile: string;
  mobileFormatted: string;
  whatsapp: string;
  whatsappFormatted: string;
  website: string;
  cardUrl?: string;
  telegram: string;
  instagram: string;
  bale: string;
  rubika: string;
  eitaa: string;
  email: string;
  address: string;
  city: string;
  locationLinks?: {
    google: string;
    neshan: string;
    balad: string;
    waze: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  badge?: string;
}

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}
