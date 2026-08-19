import { DodhamItineraryDay, DodhamPackageOption, DodhamPickupLocation, DodhamPackingItem } from '../types/dodhamTypes';
import { BROCHURE_IMAGES } from './brochureImages';

export const TRIP_META = {
  title: 'DODHAM YATRA + ADVENTURE SPECIAL',
  subtitle: 'Kedarnath • Badrinath • Rishikesh • Rafting • Bungee Jump',
  dates: '2nd – 8th October',
  durationDays: 7,
  durationNights: 6,
  destination: 'Uttarakhand Himalayas, India',
  minAge: '12+ Years (18+ for Extreme Bungee)',
  difficulty: 'Moderate to High (High-altitude trek)',
  highestAltitude: '11,755 ft (Kedarnath Dham)',
  companyName: 'Trek & Stay',
  legalName: 'Trek & Stay Expeditions India',
  organizerName: 'Trek & Stay',
  organizerTagline: 'Welcome to the Wilderness • Karnataka Treks, Sahyadri Trails & Sacred Himalayan Yatras',
  headquarters: 'Kodachadri Foothills Road, Near Mookambika Sanctuary, Kollur, Karnataka 576220',
  hqMapUrl: 'https://maps.app.goo.gl/uGLFMEgJYDw5wEyR8',
  departureHubs: 'Bengaluru, Mangaluru, Mysuru, Hubballi, Pune & Delhi',
  contactPhone: '+91 99029 37730',
  secondaryPhone: '+91 82175 59456',
  whatsappNumber: '919902937730',
  upiId: 'ganapathibhat5@ybl',
  upiPayeeName: 'Ganapathi Bhat',
  bankName: 'Canara Bank (A/c ending 2821)',
  email: 'info@trekandstay.com',
  website: 'https://trekandstay.com',
  livePortalUrl: 'https://trekandstay.vercel.app',
  instagram: '@trek_and_stay',
  instagramUrl: 'https://instagram.com/trek_and_stay',
  tokenAdvanceAmount: 5000,
  aboutStory: 'Founded at the serene foothills of Kodachadri near Mookambika Sanctuary in Kollur, Karnataka, Trek & Stay is India’s premier wilderness trekking organization and sacred yatra coordinator. Our certified mountain captains, high-altitude leaders, and local logistics network provide safe, ecologically conscious, and spiritually enriching expeditions across the Western Ghats, Sahyadri ranges, and the divine Himalayas.'
};

export const PACKAGES: DodhamPackageOption[] = [
  {
    id: 'delhi',
    name: 'Delhi to Delhi Package',
    startLocation: 'Delhi / Haridwar',
    endLocation: 'Haridwar / Delhi',
    pricePerPerson: 17500,
    badge: 'Popular Base Plan',
    transportIncluded: [
      'Delhi ↔ Haridwar 3A Sleeper / Express transit',
      'All local Himalayan Transfers in dedicated Tempo Traveller / SUV',
      'Sonprayag ↔ Gaurikund local transfers',
      'Badrinath scenic mountain transit'
    ],
    popular: false,
  },
  {
    id: 'bangalore',
    name: 'Bangalore to Bangalore Complete Tour',
    startLocation: 'Bangalore (BLR)',
    endLocation: 'Bangalore (BLR)',
    pricePerPerson: 34000,
    badge: 'All-Inclusive South Flight Tour',
    transportIncluded: [
      'Bangalore ✈️ Delhi Roundtrip Flight Coordination / Ticket Option',
      'Delhi 🚆 Haridwar 3A Sleeper Train transfers',
      'All local Himalayan Transfers in dedicated Tempo Traveller / SUV',
      'Sonprayag ↔ Gaurikund local transfers',
      'Badrinath scenic mountain transit'
    ],
    popular: true,
  },
];

export const GROUP_OFFERS = [
  {
    minTravelers: 5,
    title: '5+ Bookings Offer',
    discountText: '₹1,000 OFF per person',
    badge: '🔥 Group Saver',
    description: 'Book for a group of 5 or more travelers and get an instant flat ₹1,000 discount per ticket!',
  },
  {
    minTravelers: 9,
    title: '9+ Bookings Mega Offer',
    discountText: '1 SLOT COMPLETELY FREE',
    badge: '🎁 Mega Squad Deal',
    description: 'Book 9 slots and pay only for 8! The 9th traveler travels 100% free of tour cost.',
  },
];

export const ITINERARY_DAYS: DodhamItineraryDay[] = [
  {
    dayNumber: 0,
    dayTitle: 'Bangalore → Delhi → Haridwar',
    route: 'Bangalore (BLR) ✈️ Delhi (DEL) 🚆 Haridwar',
    icon: 'Plane',
    date: '2nd October (Wed)',
    tagline: 'The Journey Commences: Flight & Overnight Train to the Gateway of Gods',
    description: [
      'Board scheduled flight from Bangalore (Kempegowda Int. Airport) to New Delhi.',
      'Assemble at Delhi Railway Station / designated meeting hub.',
      'Board the 3A Sleeper Train from Delhi to Haridwar Junction.',
      'Relax during the scenic overnight train journey into the Himalayan foothills.'
    ],
    activities: [
      'Bangalore to Delhi Flight',
      'Group meet & briefing at Delhi',
      '3A AC Sleeper Train journey overnight to Haridwar'
    ],
    mealsIncluded: 'Train snacks & dinner (Self/Train catering)',
    stayLocation: 'Overnight 3A Train Journey',
    stayType: '3A Sleeper Berth',
    mapQuery: 'Haridwar Railway Station, Uttarakhand',
    mapUrl: 'https://maps.google.com/?q=Haridwar+Railway+Station',
    keyHighlights: ['Overnight 3A train journey', 'Himalayan foothills arrival', 'Group ice-breaking session'],
    image: BROCHURE_IMAGES.flight,
    imageCaption: 'BLR to Delhi Flight & Onward Overnight Train to Haridwar',
  },
  {
    dayNumber: 1,
    dayTitle: 'Haridwar → Rishikesh → Sonprayag',
    route: 'Haridwar 🚐 Rishikesh 🚐 Devprayag 🚐 Sonprayag',
    icon: 'Waves',
    date: '3rd October (Thu)',
    tagline: 'Rishikesh Thrills, Confluence of Rivers & Mountain Drive to Base Camp',
    description: [
      'Early morning arrival at the holy city of Haridwar.',
      'Private transfer towards the Adventure Capital — Rishikesh.',
      'Opportunity for high-adrenaline optional activities: Bungee Jumping (India’s highest) & River Rafting on the roaring Ganga.',
      'Explore the iconic spiritual vibe of Rishikesh, Ram Jhula, and the holy Ganga riverbanks.',
      'Board our dedicated mountain vehicle and drive through scenic Himalayan valleys alongside the Alaknanda and Mandakini rivers towards Sonprayag / Guptkashi.',
      'Check-in at hotel near Sonprayag as per travel timings. Enjoy hot dinner and rest up for the big trek.'
    ],
    activities: [
      'Ganga Aarti / Morning dip in Rishikesh',
      'Optional White Water River Rafting',
      'Optional Bungee Jump at Mohan Chatti',
      'Scenic drive past Devprayag (Sangam of Bhagirathi & Alaknanda)',
      'Check-in & hearty group dinner at Sonprayag base'
    ],
    mealsIncluded: 'Dinner included (2-Meals/Day Plan)',
    stayLocation: 'Hotel near Sonprayag / Guptkashi',
    stayType: 'Comfortable Mountain Hotel Stay',
    distance: 'Approx. 210 km (7-8 hrs drive)',
    altitude: 'Sonprayag: 6,000 ft',
    mapQuery: 'Sonprayag, Uttarakhand',
    mapUrl: 'https://maps.google.com/?q=Sonprayag+Uttarakhand',
    keyHighlights: ['White water rafting in Rishikesh', 'View Devprayag Sangam', 'Himalayan mountain highway drive', 'Pre-trek briefing'],
    image: BROCHURE_IMAGES.tempo,
    imageCaption: 'Mountain Tempo Traveller & Bus Transport cruising through Himalayan valleys',
  },
  {
    dayNumber: 2,
    dayTitle: 'Sonprayag → Gaurikund → Kedarnath Dham',
    route: 'Sonprayag 🚐 Gaurikund 🥾 16km Trek ⛰️ Kedarnath Temple',
    icon: 'Mountain',
    date: '4th October (Fri)',
    tagline: 'The Sacred Ascent: 16 km Trek to the Abode of Lord Shiva',
    description: [
      'Early morning departure from Sonprayag via local shared taxi to Gaurikund (the official base of the Kedarnath trek).',
      'Begin the mesmerizing 16-18 km pilgrimage trek alongside the roaring Mandakini river, gushing waterfalls, and panoramic glacier views.',
      'Pass through Jungle Chatti, Bheembali, and Lincholi resting camps.',
      'Arrive at the holy Kedarnath Valley (11,755 ft) under the shadow of the colossal snow-clad Kedarnath peak.',
      'Evening Darshan & experience the divine vibration of the Kedarnath temple lit against the twilight sky.',
      'Check-in to mountain alpine tents near the temple. Overnight stay in Kedarnath.'
    ],
    activities: [
      'Sonprayag to Gaurikund shared shuttle',
      '16 km Himalayan Trek across Jungle Chatti & Lincholi',
      'Grand Kedarnath Temple evening Darshan & Aarti',
      'Witness the miraculous Bhim Shila boulder',
      'Cozy alpine tent stay under star-filled Himalayan skies'
    ],
    mealsIncluded: 'Self-managed during trek (Dhabas along the route)',
    stayLocation: 'Kedarnath Valley (Near Temple)',
    stayType: 'Alpine Tent Camping / Mountain Dorm Stay',
    distance: '16-18 km Trek (6-8 hours walk)',
    altitude: '11,755 ft (3,583 m)',
    trekDifficulty: 'Challenging (Pony / Palki options available at self-cost)',
    mapQuery: 'Kedarnath Temple, Uttarakhand',
    mapUrl: 'https://maps.google.com/?q=Kedarnath+Temple',
    keyHighlights: ['Sacred Kedarnath Darshan', 'Majestic snow-capped Himalayan peaks', 'Bhim Shila darshan', 'Alpine tent stay at high altitude'],
    image: BROCHURE_IMAGES.kedarnath,
    imageCaption: 'The sacred Kedarnath Temple situated amidst majestic snow-capped peaks (11,755 ft)',
  },
  {
    dayNumber: 3,
    dayTitle: 'Kedarnath → Gaurikund',
    route: 'Kedarnath 🥾 Descent Trek 🚐 Gaurikund Stay',
    icon: 'Footprints',
    date: '5th October (Sat)',
    tagline: 'Morning Temple Aarti & Scenic Descent to Gaurikund',
    description: [
      'Attend the soul-stirring early morning Darshan / Maha Aarti at Kedarnath temple as the sun paints the peaks gold.',
      'Explore the sacred temple complex and capture unforgettable memories with the majestic Himalayas.',
      'Begin the downhill trek back from Kedarnath to Gaurikund.',
      'Reach Gaurikund by afternoon/evening.',
      'Check into comfortable hotel accommodation at Gaurikund / Sonprayag for a well-deserved rest and hot dinner.'
    ],
    activities: [
      'Early Morning Kedarnath Darshan & Photography',
      'Descent trek (16 km) through alpine gorges',
      'Arrival at Gaurikund base',
      'Relaxation, warm dinner & overnight stay'
    ],
    mealsIncluded: 'Breakfast/Lunch self-managed during trek, Dinner at stay included',
    stayLocation: 'Hotel at Gaurikund / Sonprayag',
    stayType: 'Comfortable Hotel Room',
    distance: '16 km Descent (4-5 hours)',
    altitude: 'Sonprayag: 6,000 ft',
    mapQuery: 'Gaurikund, Uttarakhand',
    mapUrl: 'https://maps.google.com/?q=Gaurikund+Uttarakhand',
    keyHighlights: ['Early morning Golden Hour Kedarnath Aarti', 'Relaxed downhill trek', 'Hot dinner and recovery sleep'],
    image: BROCHURE_IMAGES.gaurikund,
    imageCaption: 'Gaurikund bustling pilgrimage market road & bridge over Mandakini river',
  },
  {
    dayNumber: 4,
    dayTitle: 'Gaurikund → Badrinath',
    route: 'Gaurikund 🚐 Chopta / Joshimath 🚐 Badrinath Dham',
    icon: 'Compass',
    date: '6th October (Sun)',
    tagline: 'Spectacular Garhwal Mountain Drive & Badrinath Dham Darshan',
    description: [
      'Early morning departure in our private mountain tempo/vehicle.',
      'Embark on an awe-inspiring 8-hour drive winding through high mountain passes, Chopta alpine meadows ("Mini Switzerland"), and Joshimath.',
      'Cross the scenic Alaknanda river gorge and ascend towards Badrinath Dham (10,279 ft) between Nar and Narayana mountain ranges.',
      'Check-in at hotel in Badrinath.',
      'Visit the vibrant, multi-colored Badrinath Temple for evening Darshan, Tapt Kund hot springs, and evening prayers.',
      'Overnight stay at Badrinath.'
    ],
    activities: [
      'Scenic Himalayan high pass road trip (Approx. 8 hours)',
      'Scenic viewpoints across Chopta / Ukhimath / Joshimath',
      'Arrival at Badrinath Dham',
      'Evening Darshan at Badrinath Temple & holy Tapt Kund',
      'Overnight stay at Badrinath'
    ],
    mealsIncluded: '2 Meals included (Breakfast/Dinner as per plan)',
    stayLocation: 'Hotel at Badrinath / Pandukeshwar',
    stayType: 'Comfortable Hotel Stay',
    distance: 'Approx. 215 km (7-8 hrs drive)',
    altitude: '10,279 ft (3,133 m)',
    mapQuery: 'Badrinath Temple, Uttarakhand',
    mapUrl: 'https://maps.google.com/?q=Badrinath+Temple',
    keyHighlights: ['Scenic Chopta Valley views', 'Sacred Badrinath Temple Darshan', 'Tapt Kund natural hot springs', 'Alaknanda river origins'],
    image: BROCHURE_IMAGES.badrinath,
    imageCaption: 'The iconic and vibrant Shri Badrinath Temple nestled between Nar & Narayana mountains',
  },
  {
    dayNumber: 5,
    dayTitle: 'Badrinath → Rishikesh Side',
    route: 'Badrinath 🚐 Mana Village 🚐 Rishikesh Foothills',
    icon: 'MapPin',
    date: '7th October (Mon)',
    tagline: 'Mana (India’s First Village), Bheem Pul & Return Journey Towards Rishikesh',
    description: [
      'Morning Darshan at Badrinath Temple.',
      'Visit Mana Village — officially celebrated as "The First Village of India" near the Indo-Tibetan border.',
      'Explore Bheem Pul, Saraswati River origin, and Vyas Gufa where the Mahabharata was written.',
      'Begin the scenic return journey driving downwards through the Garhwal Himalayas towards Rishikesh side.',
      'Check into hotel / resort near Rishikesh depending on road timing. Rest and prepare for adventure activities.'
    ],
    activities: [
      'Morning Badrinath Temple visit',
      'Explore Mana Village & Bheem Pul',
      'Witness Saraswati River emergence & Vyas Gufa',
      'Scenic downhill drive towards Rishikesh',
      'Hotel check-in near Rishikesh & overnight stay'
    ],
    mealsIncluded: '2 Meals included (Breakfast & Dinner)',
    stayLocation: 'Hotel / Resort near Rishikesh / Shivpuri',
    stayType: 'Comfortable Hotel Stay',
    distance: 'Approx. 280 km (8-9 hrs drive)',
    altitude: 'Rishikesh: 1,120 ft',
    mapQuery: 'Mana Village, Uttarakhand',
    mapUrl: 'https://maps.google.com/?q=Mana+Village+Uttarakhand',
    keyHighlights: ['Mana: India’s First Village', 'Saraswati River origin', 'Vyas Gufa historical site', 'Descending to lush Rishikesh foothills'],
    image: BROCHURE_IMAGES.mana,
    imageCaption: 'Mana — The First Village of India near the Indo-Tibetan border',
  },
  {
    dayNumber: 6,
    dayTitle: 'Rishikesh Adventure Day → Return Transit',
    route: 'Rishikesh 🌊 Adventure 🚐 Haridwar 🚆 Delhi ✈️ Bangalore',
    icon: 'Zap',
    date: '8th October (Tue)',
    tagline: 'River Rafting, Bungee Jump, Ganga Ghats & Return Journey',
    description: [
      'Wake up in the adventure capital of India!',
      'Experience thrilling White Water River Rafting on the emerald waters of Ganga, hitting rapids like Three Blind Mice and Roller Coaster.',
      'High-altitude adrenaline rush: Bungee Jump at India’s highest bungee platform at Mohan Chatti (Optional add-on).',
      'Explore Rishikesh local markets, cafe culture, and scenic Ganga riverbanks.',
      'Evening transfer to Haridwar Railway Station.',
      'Board train from Haridwar to Delhi, and connected flight / overnight travel to Bangalore.'
    ],
    activities: [
      'Ganga River Rafting & Cliff Jumping',
      'Bungee Jumping at Mohan Chatti (Optional activity)',
      'Rishikesh cafe & market exploration',
      'Transfer from Rishikesh to Haridwar Station',
      'Train to Delhi and return flight/transit to Bangalore'
    ],
    mealsIncluded: 'Breakfast included, daytime lunch/cafes self-managed',
    stayLocation: 'Overnight transit to Delhi / Bangalore',
    stayType: '3A Train / Flight Transit',
    mapQuery: 'Rishikesh, Uttarakhand',
    mapUrl: 'https://maps.google.com/?q=Rishikesh+Uttarakhand',
    keyHighlights: ['White Water River Rafting with cliff jump', 'India’s highest Bungee jump at Mohan Chatti', 'Evening Ganga riverbanks', 'Return transit starts'],
    image: BROCHURE_IMAGES.rafting,
    imageCaption: 'Ganga White Water River Rafting & Adventure in Rishikesh',
  },
  {
    dayNumber: 7,
    dayTitle: 'Buffer Day (Safety & Contingency)',
    route: 'Safe arrival back in Bangalore / Delhi',
    icon: 'ShieldCheck',
    date: '9th October (Contingency Buffer)',
    tagline: 'Essential Himalayan Buffer Day for Safe & Unhurried Travel',
    description: [
      'Himalayan weather and high-altitude mountain highways are dynamic.',
      'This dedicated buffer day is kept to safeguard against:',
      '• Unforeseen weather delays or cloudbursts',
      '• Mountain roadblocks or landslides clearing',
      '• Extended Kedarnath trek timings or darshan queues',
      '• Transport and mountain pass safety clearance',
      'Ensures stress-free return home without missing connecting flights!'
    ],
    activities: [
      'Contingency management for weather or transit delays',
      'Safe final arrival in Bangalore / Delhi',
      'Fond farewells with fellow yatra companions'
    ],
    mealsIncluded: 'As per actual schedule status',
    stayLocation: 'Home / Transit safe arrival',
    stayType: 'Return Home Safe',
    mapQuery: 'Kempegowda International Airport Bengaluru',
    mapUrl: 'https://maps.google.com/?q=Kempegowda+International+Airport',
    keyHighlights: ['Zero stress transit safety', 'Weather delay resilience', 'Smooth flight return'],
    image: BROCHURE_IMAGES.safe_return,
    imageCaption: 'Safe journey conclusion with eternal memories of the Devbhoomi Himalayas',
  },
];

export const INCLUSIONS = [
  'All local Himalayan transportation as per itinerary in dedicated Tempo Traveller / SUV',
  'Hotel accommodation as mentioned across Haridwar, Sonprayag, Gaurikund, Badrinath & Rishikesh',
  'Alpine tent camping / mountain stay at Kedarnath Valley',
  '2 Meals per day (Breakfast & Dinner) as per the package plan',
  'Expert Trip Captain & Experienced Trek Guide throughout the yatra',
  'Kedarnath & Badrinath darshan travel assistance & coordination',
  'Trek safety assistance, oxygen meter check, and basic first aid',
  '1 Dedicated Buffer Day kept for Himalayan travel uncertainties',
  'All toll taxes, state permits, parking charges and driver allowances'
];

export const EXCLUSIONS = [
  'Bangalore–Delhi flight tickets (unless opted in specific flight package)',
  'Delhi–Haridwar / return train tickets (unless specifically included in custom plan)',
  'Bungee Jump charges (Optional add-on ~₹3,700)',
  'River Rafting charges (Optional add-on ~₹1,200)',
  'Food during the Kedarnath trek where mentioned as self-managed at local dhabas',
  'Pony / horse / palki charges for Kedarnath trek',
  'Helicopter services to Kedarnath (Optional at self cost)',
  'Personal donations / special VIP puja charges at temples',
  'Personal photography, video equipment permits & personal shopping',
  'Personal medicines and hospitalization insurance',
  'Any expense arising from landslides, severe weather roadblocks, or unforeseen force majeure'
];

export const PICKUP_POINTS: DodhamPickupLocation[] = [
  {
    name: 'Bangalore Kempegowda Int. Airport (BLR)',
    city: 'Bangalore',
    address: 'Terminal 1 Departure Gate, Devanahalli, Bengaluru, Karnataka 560300',
    reportingTime: '06:00 AM (Day 0)',
    googleMapUrl: 'https://maps.google.com/?q=Kempegowda+International+Airport+Bengaluru',
    notes: 'Direct group meeting point for travelers booking Bangalore to Bangalore package.'
  },
  {
    name: 'New Delhi Railway Station (NDLS) / Airport',
    city: 'New Delhi',
    address: 'Pahar Ganj Side Gate 1 / Kashmere Gate Metro Hub, New Delhi',
    reportingTime: '02:00 PM (Day 0)',
    googleMapUrl: 'https://maps.google.com/?q=New+Delhi+Railway+Station',
    notes: 'Assemble point for Delhi to Delhi package travelers and flight arrivals.'
  },
  {
    name: 'Haridwar Junction Railway Station',
    city: 'Haridwar',
    address: 'Station Rd, Mayapur, Haridwar, Uttarakhand 249401',
    reportingTime: '05:30 AM (Day 1)',
    googleMapUrl: 'https://maps.google.com/?q=Haridwar+Junction+Railway+Station',
    notes: 'Main departure junction for mountain tempo travellers towards Rishikesh & Sonprayag.'
  },
  {
    name: 'Rishikesh Tapovan Adventure Base',
    city: 'Rishikesh',
    address: 'Tapovan / Laxman Jhula Road, Rishikesh, Uttarakhand 249192',
    reportingTime: '08:00 AM (Day 1 / Day 6)',
    googleMapUrl: 'https://maps.google.com/?q=Tapovan+Rishikesh+Uttarakhand',
    notes: 'Starting hub for river rafting and bungee jump adventure activities.'
  },
  {
    name: 'Sonprayag Parking & Shuttle Stand',
    city: 'Sonprayag',
    address: 'Sonprayag Taxi Stand, Rudraprayag District, Uttarakhand 246471',
    reportingTime: '05:00 AM (Day 2 Trek Start)',
    googleMapUrl: 'https://maps.google.com/?q=Sonprayag+Uttarakhand',
    notes: 'Base camp where private vehicles halt and shared taxis proceed to Gaurikund.'
  },
  {
    name: 'Kedarnath Temple Complex',
    city: 'Kedarnath',
    address: 'Kedarnath Dham, Rudraprayag, Uttarakhand 246445',
    reportingTime: 'Evening 05:00 PM / Morning 06:00 AM',
    googleMapUrl: 'https://maps.google.com/?q=Kedarnath+Temple',
    notes: 'High-altitude holy shrine at 11,755 ft elevation.'
  },
  {
    name: 'Badrinath Temple Complex',
    city: 'Badrinath',
    address: 'Badri Puri, Chamoli District, Uttarakhand 246422',
    reportingTime: 'Evening 06:00 PM / Morning 06:00 AM',
    googleMapUrl: 'https://maps.google.com/?q=Badrinath+Temple',
    notes: 'Sacred shrine of Lord Vishnu between Nar & Narayana mountains.'
  }
];

export const PACKING_ITEMS: DodhamPackingItem[] = [
  { id: 'p1', category: 'Essentials & ID', title: 'Original Government ID (Aadhaar/Passport/DL)', description: 'Mandatory for Yatra biometric registration & hotel check-ins', iconName: 'IdCard', mandatory: true },
  { id: 'p2', category: 'Essentials & ID', title: '2 Photocopies of Government ID & Yatra Slip', description: 'Kept in waterproof ziplock pouch', iconName: 'Files', mandatory: true },
  { id: 'p3', category: 'Essentials & ID', title: 'Physical Cash (₹3,000 - ₹5,000)', description: 'ATMs are limited/often out of cash in Sonprayag & Kedarnath', iconName: 'Coins', mandatory: true },
  
  { id: 'p4', category: 'Clothing & Thermals', title: 'Heavy Warm Jacket / Down Feather Fleece', description: 'Sub-zero temperatures at Kedarnath night (0°C to 5°C)', iconName: 'Shirt', mandatory: true },
  { id: 'p5', category: 'Clothing & Thermals', title: 'Thermal Inners (Top & Bottom - 2 Sets)', description: 'Essential base layer for high altitude', iconName: 'Layers', mandatory: true },
  { id: 'p6', category: 'Clothing & Thermals', title: 'Quick-dry Trekking T-Shirts & Pants (3-4 pairs)', description: 'Lightweight, synthetic and comfortable for walking', iconName: 'Activity', mandatory: true },
  { id: 'p7', category: 'Clothing & Thermals', title: 'Woollen Gloves & Windproof Outer Gloves', description: 'Keeps hands warm while holding trekking poles', iconName: 'Hand', mandatory: true },
  { id: 'p8', category: 'Clothing & Thermals', title: 'Woollen Beanie / Monkey Cap & Sun Cap', description: 'Protects ears and head from cold Himalayan winds and sharp UV sun', iconName: 'Smile', mandatory: true },
  { id: 'p9', category: 'Clothing & Thermals', title: '4-5 Pairs of Woollen & Cotton Socks', description: 'Always keep one dry pair strictly for sleeping', iconName: 'Footprints', mandatory: true },

  { id: 'p10', category: 'Footwear & Trek Gear', title: 'Good Trekking Shoes with Deep Grip', description: 'Broken-in shoes with ankle support (Quechua/Wildcraft/Columbia)', iconName: 'Footprints', mandatory: true },
  { id: 'p11', category: 'Footwear & Trek Gear', title: 'Comfortable Backpack (40-50L) + Rain Cover', description: 'With padded hip belt for carrying Kedarnath night essentials', iconName: 'Backpack', mandatory: true },
  { id: 'p12', category: 'Footwear & Trek Gear', title: 'Heavy Raincoat or Sturdy Poncho', description: 'Weather in mountains changes rapidly; umbrellas are hard to hold on trek', iconName: 'CloudRain', mandatory: true },
  { id: 'p13', category: 'Footwear & Trek Gear', title: 'Trekking Pole / Walking Stick', description: 'Reduces 25% knee impact during 16km descent', iconName: 'Navigation', mandatory: false },

  { id: 'p14', category: 'Toiletries & Medical', title: 'Personal Medicines & Diamox (AMS)', description: 'Paracetamol, ORS, Avomine (motion sickness), Band-aids, Pain spray', iconName: 'Pill', mandatory: true },
  { id: 'p15', category: 'Toiletries & Medical', title: 'Sunscreen (SPF 50+) & Lip Balm', description: 'Prevents severe high-altitude sun peeling and cracked lips', iconName: 'Sun', mandatory: true },
  { id: 'p16', category: 'Toiletries & Medical', title: 'Wet Wipes, Sanitizer & Quick Dry Towel', description: 'Water can be freezing cold at Kedarnath', iconName: 'Droplet', mandatory: true },

  { id: 'p17', category: 'Electronics & Misc', title: 'Heavy Duty Power Bank (20,000 mAh)', description: 'Cold battery drain happens rapidly; limited sockets in mountain camps', iconName: 'BatteryCharging', mandatory: true },
  { id: 'p18', category: 'Electronics & Misc', title: 'Headlamp or LED Torch + Extra Batteries', description: 'Crucial for early morning departure and night trails', iconName: 'Flashlight', mandatory: true },
  { id: 'p19', category: 'Electronics & Misc', title: 'UV Sunglasses & Reusable Water Bottle', description: 'Avoid buying single-use plastics in the sacred Himalayas', iconName: 'Glasses', mandatory: true },
];

export const TERMS_AND_CONDITIONS = [
  'Kedarnath & Badrinath routes and darshan timings are strictly subject to prevailing Himalayan weather conditions, cloudburst alerts, and government/temple board regulations.',
  'The day-wise itinerary is flexible and subject to modifications on-ground depending on landslides, road clearing by BRO (Border Roads Organisation), high traffic, or local administrative directives.',
  'Participants must strictly adhere to the reporting and departure timings instructed by the Trip Captain to ensure timely entry and darshan.',
  'Kedarnath is a high-altitude pilgrimage trek (11,755 ft) that requires reasonable physical stamina and cardiovascular fitness. Walk at a steady, comfortable pace.',
  'Helicopter, pony, horse, or palki services are completely optional, not part of the standard package, and must be booked/paid directly by the participant.',
  'Rishikesh River Rafting and Bungee Jumping are optional adventure activities; entry tickets and activity fees are extra unless explicitly chosen as an add-on during booking.',
  'Food during the 16 km Kedarnath trek is self-managed by participants at the numerous certified dhabas along the pilgrim route.',
  'Carrying an original, valid government photo identity card (Aadhaar Card, Voter ID, Passport, or Driving License) along with photocopies is strictly mandatory.',
  'Personal expenses, room service, laundry, extra snacks, and mineral water bottles outside the 2-Meals/Day plan are not included.',
  'No refund or price reduction will be provided if a participant decides to leave the tour midway voluntarily or due to personal fitness constraints.',
  'Any unforeseen expenses incurred due to roadblocks, landslides, curfews, or force majeure events must be borne directly by the participant.',
  'The 7th Day buffer is intentionally provisioned to absorb unpredictable Himalayan travel challenges and protect return flights/train connections.',
  'Group booking offers are valid for direct confirmed registrations: 5+ travelers receive ₹1,000 flat discount per person; 9+ travelers receive 1 full tour slot free (pay for 8).',
  'Booking confirmation is issued solely against payment of the registration deposit and seat availability on the departure date.',
  'Participants are expected to maintain the utmost sanctity and decorum towards local temple traditions, priests, shrine regulations, fellow yatris, and flora/fauna.',
  'Strict "Leave No Trace" Environmental Policy: Do not litter plastic bottles, wrappers, or damage the sacred Devbhoomi ecosystem.',
  'Participants must declare any pre-existing medical conditions (heart disease, asthma, severe hypertension) to the trip organizers prior to departure.'
];

export const ACCOMMODATIONS = [
  {
    name: 'Sonprayag / Guptkashi Mountain Lodge',
    type: 'Comfortable Hotel with Attached Baths',
    location: 'Sonprayag / Guptkashi Base',
    image: BROCHURE_IMAGES.gaurikund,
    description: 'Clean, sanitized rooms with hot water facilities, delicious vegetarian food, and valley views before starting the trek.',
    features: ['Attached Bathroom', 'Hot Water', 'Geyser / Bucket Facility', 'Pure Veg Dining', '24/7 Power Backup']
  },
  {
    name: 'Kedarnath Alpine High-Altitude Tents',
    type: 'Alpine Mountain Camping / GMVN Dorm',
    location: 'Kedarnath Dham (Near Temple)',
    image: BROCHURE_IMAGES.tent,
    description: 'Special alpine tent accommodation pitched under starry Himalayan skies, just minutes away from the holy Kedarnath shrine.',
    features: ['Heavy Thermal Blankets', 'Foam Mattresses', 'Walkable to Temple', 'Magnificent Peak Views', 'Safe Group Campsite']
  },
  {
    name: 'Badrinath Pilgrim Hotel',
    type: 'Standard Pilgrim Hotel',
    location: 'Badrinath Puri Valley',
    image: BROCHURE_IMAGES.badrinath,
    description: 'Cozy hotel stay situated in the sacred Badrinath town, walking distance from Tapt Kund and the main temple entrance.',
    features: ['Thermal Bedding', 'Room Heating (on request)', 'Walking Distance to Temple', 'Hot Water', 'Mountain Views']
  },
  {
    name: 'Rishikesh Riverside Resort / Camp',
    type: 'Adventure Resort with Ganga View',
    location: 'Rishikesh / Shivpuri Foothills',
    image: BROCHURE_IMAGES.camp,
    description: 'Scenic resort near the banks of holy Ganga, equipped with river views, outdoor dining, and easy access to rafting launch points.',
    features: ['Riverside Ambience', 'Adventure Sports Desk', 'Bonfire & Music', 'Attached Bathrooms', 'Delicious Buffet']
  }
];
