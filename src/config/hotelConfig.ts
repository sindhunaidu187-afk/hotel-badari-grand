export interface RoomItem {
  id: string;
  name: string;
  description: string;
  amenities: string[];
  image: string;
  imageAlt: string;
  placeholderSlot: string;
}

export interface BanquetCategory {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface GalleryItem {
  id: string;
  category: 'HOTEL' | 'ROOMS' | 'DINING' | 'BANQUET';
  title: string;
  caption: string;
  image: string;
  imageAlt: string;
  aspectClass: string;
  placeholderSlot: string;
}

export const HOTEL_IMAGES = {
  heroExterior: '/src/assets/images/hotel_hero_exterior_1791287570481.jpg',
  welcomeInterior: '/src/assets/images/hotel_welcome_interior_1791287585113.jpg',
  guestRoom: '/src/assets/images/hotel_guest_room_1791287597627.jpg',
  diningRestaurant: '/src/assets/images/hotel_dining_restaurant_1791287608612.jpg',
  banquetHall: '/src/assets/images/hotel_banquet_hall_1791287620855.jpg',
} as const;

export const HOTEL_CONFIG = {
  brandName: 'HOTEL BADARI GRAND',
  shortDescription:
    'A comfortable destination for stays, dining, celebrations and memorable moments.',
  contact: {
    address: '[HOTEL COMPLETE ADDRESS]',
    phone: '[Phone Number]',
    whatsappNumber: '', // Populate with numeric WhatsApp number (e.g. "919876543210") when available
    email: '[Email]',
    googleMapsEmbedUrl: '', // Populate with official Google Maps embed iframe URL when available
    googleMapsDirectionsUrl: '', // Populate with official Google Maps directions link when available
  },
  socialLinks: {
    instagram: '#contact',
    facebook: '#contact',
    google: '#location',
  },
  whyChooseUs: [
    {
      number: '01',
      title: 'COMFORTABLE ROOMS',
      description: 'Thoughtfully designed spaces to relax, refresh and recharge.',
    },
    {
      number: '02',
      title: 'DELICIOUS DINING',
      description: 'Enjoy satisfying flavours in a welcoming dining environment.',
    },
    {
      number: '03',
      title: 'BANQUET & EVENTS',
      description: 'A versatile setting for celebrations, gatherings and special occasions.',
    },
    {
      number: '04',
      title: 'WARM HOSPITALITY',
      description: 'Attentive service designed around a comfortable guest experience.',
    },
  ],
  rooms: [
    {
      id: 'room-1',
      name: '[ROOM NAME]',
      description: '[ROOM DESCRIPTION]',
      amenities: ['[AMENITY 1]', '[AMENITY 2]', '[AMENITY 3]'],
      image: HOTEL_IMAGES.guestRoom,
      imageAlt: 'Comfortable room at Hotel Badari Grand',
      placeholderSlot: 'ROOM PHOTO SLOT 01',
    },
    {
      id: 'room-2',
      name: '[ROOM NAME]',
      description: '[ROOM DESCRIPTION]',
      amenities: ['[AMENITY 1]', '[AMENITY 2]', '[AMENITY 3]'],
      image: HOTEL_IMAGES.guestRoom,
      imageAlt: 'Spacious guest accommodation at Hotel Badari Grand',
      placeholderSlot: 'ROOM PHOTO SLOT 02',
    },
    {
      id: 'room-3',
      name: '[ROOM NAME]',
      description: '[ROOM DESCRIPTION]',
      amenities: ['[AMENITY 1]', '[AMENITY 2]', '[AMENITY 3]'],
      image: HOTEL_IMAGES.guestRoom,
      imageAlt: 'Relaxing room interior at Hotel Badari Grand',
      placeholderSlot: 'ROOM PHOTO SLOT 03',
    },
  ] as RoomItem[],
  banquetCategories: [
    {
      id: 'weddings',
      title: 'WEDDINGS',
      description:
        'A welcoming setting for wedding ceremonies, receptions and cherished family milestones.',
      image: HOTEL_IMAGES.banquetHall,
      imageAlt: 'Wedding banquet hall setup at Hotel Badari Grand',
    },
    {
      id: 'family-functions',
      title: 'FAMILY FUNCTIONS',
      description:
        'Comfortable and adaptable spaces for family gatherings, anniversaries and traditional functions.',
      image: HOTEL_IMAGES.banquetHall,
      imageAlt: 'Family function venue at Hotel Badari Grand',
    },
    {
      id: 'corporate-events',
      title: 'CORPORATE EVENTS',
      description:
        'Professional arrangements for business meetings, conferences, seminars and formal dinners.',
      image: HOTEL_IMAGES.banquetHall,
      imageAlt: 'Corporate event space at Hotel Badari Grand',
    },
    {
      id: 'special-celebrations',
      title: 'SPECIAL CELEBRATIONS',
      description:
        'Memorable venues tailored for birthdays, social get-togethers and private celebrations.',
      image: HOTEL_IMAGES.banquetHall,
      imageAlt: 'Special celebration venue at Hotel Badari Grand',
    },
  ] as BanquetCategory[],
  gallery: [
    {
      id: 'gal-hotel-1',
      category: 'HOTEL',
      title: 'Hotel Exterior & Entrance',
      caption: 'Hotel Badari Grand exterior view — Replaceable Photography Slot [HOTEL-01]',
      image: HOTEL_IMAGES.heroExterior,
      imageAlt: 'Hotel Badari Grand premium hotel exterior',
      aspectClass: 'md:col-span-2 md:row-span-2',
      placeholderSlot: 'HOTEL PHOTO [01]',
    },
    {
      id: 'gal-rooms-1',
      category: 'ROOMS',
      title: 'Guest Accommodation',
      caption: 'Comfortable room interior — Replaceable Photography Slot [ROOMS-01]',
      image: HOTEL_IMAGES.guestRoom,
      imageAlt: 'Comfortable room at Hotel Badari Grand',
      aspectClass: 'md:col-span-1 md:row-span-1',
      placeholderSlot: 'ROOMS PHOTO [01]',
    },
    {
      id: 'gal-dining-1',
      category: 'DINING',
      title: 'Dining Experience',
      caption: 'Welcoming dining space — Replaceable Photography Slot [DINING-01]',
      image: HOTEL_IMAGES.diningRestaurant,
      imageAlt: 'Welcoming dining space at Hotel Badari Grand',
      aspectClass: 'md:col-span-1 md:row-span-1',
      placeholderSlot: 'DINING PHOTO [01]',
    },
    {
      id: 'gal-hotel-2',
      category: 'HOTEL',
      title: 'Reception & Lounge',
      caption: 'Warm welcome at our reception lounge — Replaceable Photography Slot [HOTEL-02]',
      image: HOTEL_IMAGES.welcomeInterior,
      imageAlt: 'Reception and lounge interior at Hotel Badari Grand',
      aspectClass: 'md:col-span-1 md:row-span-1',
      placeholderSlot: 'HOTEL PHOTO [02]',
    },
    {
      id: 'gal-banquet-1',
      category: 'BANQUET',
      title: 'Banquet & Celebrations Hall',
      caption: 'Versatile banquet venue for occasions — Replaceable Photography Slot [BANQUET-01]',
      image: HOTEL_IMAGES.banquetHall,
      imageAlt: 'Banquet hall at Hotel Badari Grand',
      aspectClass: 'md:col-span-2 md:row-span-1',
      placeholderSlot: 'BANQUET PHOTO [01]',
    },
    {
      id: 'gal-rooms-2',
      category: 'ROOMS',
      title: 'Restful Stay',
      caption: 'Thoughtfully designed guest room — Replaceable Photography Slot [ROOMS-02]',
      image: HOTEL_IMAGES.guestRoom,
      imageAlt: 'Guest room bed and seating at Hotel Badari Grand',
      aspectClass: 'md:col-span-1 md:row-span-1',
      placeholderSlot: 'ROOMS PHOTO [02]',
    },
    {
      id: 'gal-dining-2',
      category: 'DINING',
      title: 'Dining Table Setting',
      caption: 'Good food and great moments — Replaceable Photography Slot [DINING-02]',
      image: HOTEL_IMAGES.diningRestaurant,
      imageAlt: 'Dining ambiance at Hotel Badari Grand',
      aspectClass: 'md:col-span-1 md:row-span-1',
      placeholderSlot: 'DINING PHOTO [02]',
    },
    {
      id: 'gal-banquet-2',
      category: 'BANQUET',
      title: 'Event & Gathering Setup',
      caption: 'Celebrations in grand style — Replaceable Photography Slot [BANQUET-02]',
      image: HOTEL_IMAGES.banquetHall,
      imageAlt: 'Event arrangement at Hotel Badari Grand banquet hall',
      aspectClass: 'md:col-span-1 md:row-span-1',
      placeholderSlot: 'BANQUET PHOTO [02]',
    },
  ] as GalleryItem[],
};
