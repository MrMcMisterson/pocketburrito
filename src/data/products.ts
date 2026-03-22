export interface Product {
  id: string;
  name: string;
  category: 'Gadgets' | 'Audio' | 'Smart Home' | 'Accessories';
  description: string;
  price: string;
  amazonUrl: string;
  imageAlt: string;
  rating: number;
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: 'anker-soundcore-p3',
    name: 'Anker Soundcore Life P3 Wireless Earbuds',
    category: 'Audio',
    description:
      'Active noise cancelling earbuds with 35-hour playtime, powerful bass, and IPX5 water resistance. Perfect for commutes and workouts.',
    price: '$49.99',
    amazonUrl: 'https://www.amazon.ca/dp/B08WJMP41V?tag=pocketburrito-20',
    imageAlt: 'Anker Soundcore Life P3 Wireless Earbuds in charging case',
    rating: 4.5,
    featured: true,
  },
  {
    id: 'anker-65w-charger',
    name: 'Anker 735 Charger (Nano II 65W)',
    category: 'Accessories',
    description:
      'Compact GaN II charger delivering 65W across three ports. Charge a MacBook, iPad, and iPhone simultaneously from one tiny brick.',
    price: '$45.99',
    amazonUrl: 'https://www.amazon.ca/dp/B09C6XNBNV?tag=pocketburrito-20',
    imageAlt: 'Anker 735 Nano II 65W GaN charger',
    rating: 4.7,
    featured: true,
  },
  {
    id: 'kasa-smart-plug',
    name: 'Kasa Smart Plug Mini (4-Pack)',
    category: 'Smart Home',
    description:
      'WiFi smart plugs compatible with Alexa and Google Home. Schedule, monitor energy, and control your devices from anywhere — no hub required.',
    price: '$34.99',
    amazonUrl: 'https://www.amazon.ca/dp/B08LN3C7WK?tag=pocketburrito-20',
    imageAlt: 'Kasa Smart Plug Mini 4-pack for smart home automation',
    rating: 4.6,
    featured: true,
  },
  {
    id: 'keychron-k2-keyboard',
    name: 'Keychron K2 Wireless Mechanical Keyboard',
    category: 'Accessories',
    description:
      'Compact 75% layout mechanical keyboard with Bluetooth 5.1, hot-swappable switches, RGB backlight, and Mac/Windows compatibility.',
    price: '$99.99',
    amazonUrl: 'https://www.amazon.ca/dp/B0868ZFRCV?tag=pocketburrito-20',
    imageAlt: 'Keychron K2 wireless mechanical keyboard with RGB lighting',
    rating: 4.5,
    featured: true,
  },
  {
    id: 'logitech-c920-webcam',
    name: 'Logitech C920x HD Pro Webcam',
    category: 'Gadgets',
    description:
      'Full 1080p/30fps HD video with dual stereo microphones and automatic light correction. The go-to webcam for streaming, video calls, and remote work.',
    price: '$79.99',
    amazonUrl: 'https://www.amazon.ca/dp/B085TFF7M1?tag=pocketburrito-20',
    imageAlt: 'Logitech C920x HD Pro Webcam on monitor mount',
    rating: 4.7,
    featured: true,
  },
  {
    id: 'anker-usb-hub',
    name: 'Anker 10-in-1 USB-C Hub',
    category: 'Accessories',
    description:
      '10-port USB-C hub with 4K HDMI, 100W Power Delivery, SD/microSD card reader, USB 3.0 ports, and ethernet. Turn one USB-C port into a full workstation.',
    price: '$54.99',
    amazonUrl: 'https://www.amazon.ca/dp/B07ZVKTP53?tag=pocketburrito-20',
    imageAlt: 'Anker 10-in-1 USB-C Hub with multiple ports',
    rating: 4.4,
  },
  {
    id: 'echo-dot-5',
    name: 'Amazon Echo Dot (5th Gen)',
    category: 'Smart Home',
    description:
      'Compact smart speaker with improved audio, built-in Alexa, and motion detection. Control your smart home, stream music, and get answers hands-free.',
    price: '$59.99',
    amazonUrl: 'https://www.amazon.ca/dp/B09B8RF4PY?tag=pocketburrito-20',
    imageAlt: 'Amazon Echo Dot 5th Generation smart speaker in charcoal',
    rating: 4.6,
  },
  {
    id: 'samsung-t7-ssd',
    name: 'Samsung T7 Portable SSD 1TB',
    category: 'Gadgets',
    description:
      'Blazing-fast 1TB portable SSD with USB 3.2 Gen 2 speeds up to 1050MB/s. AES 256-bit hardware encryption keeps your data safe on the go.',
    price: '$109.99',
    amazonUrl: 'https://www.amazon.ca/dp/B0874XN4D8?tag=pocketburrito-20',
    imageAlt: 'Samsung T7 1TB portable solid state drive in indigo blue',
    rating: 4.7,
  },
  {
    id: 'ring-video-doorbell',
    name: 'Ring Video Doorbell (2nd Gen)',
    category: 'Smart Home',
    description:
      '1080p HD video doorbell with improved motion detection, two-way audio, and night vision. See and speak to visitors from anywhere with the Ring app.',
    price: '$119.99',
    amazonUrl: 'https://www.amazon.ca/dp/B08N5NQ869?tag=pocketburrito-20',
    imageAlt: 'Ring Video Doorbell 2nd Generation in satin nickel',
    rating: 4.3,
  },
  {
    id: 'govee-led-strip',
    name: 'Govee RGBIC LED Strip Lights 16.4ft',
    category: 'Smart Home',
    description:
      'App-controlled LED strip with music sync, 16 million colours, and works with Alexa and Google Home. Instant ambiance for any room.',
    price: '$29.99',
    amazonUrl: 'https://www.amazon.ca/dp/B09BKJR5VR?tag=pocketburrito-20',
    imageAlt: 'Govee RGBIC LED strip lights illuminating a desk setup',
    rating: 4.4,
  },
];

export const categories = ['Gadgets', 'Audio', 'Smart Home', 'Accessories'] as const;
export type Category = typeof categories[number];

export const featuredProducts = products.filter((p) => p.featured);
