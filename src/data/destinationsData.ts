export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  meals: string;
  stay: string;
  activities: string[];
}

export interface DestinationDetail {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  subtitle: string;
  price: string;
  regularPrice: string;
  badge: string;
  duration: string;
  difficulty: string;
  highestAltitude: string;
  trekDistance: string;
  departureHubs: string[];
  campsiteLocation: string;
  bestSeason: string;
  groupDiscountOffer: string;
  overview: string;
  story: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  dayByDayItinerary: ItineraryDay[];
  campsiteDetails: {
    name: string;
    location: string;
    amenities: string[];
    elevation: string;
    description: string;
  };
  image: string;
  gallery: string[];
  faq: { question: string; answer: string }[];
}

export const destinationsData: DestinationDetail[] = [
  {
    id: 'maharashtra-monsoon-trails',
    slug: 'maharashtra-monsoon-trails',
    title: 'Maharashtra Monsoon Trails',
    tagline: 'Sahyadri Cloudbursts, Ancient Fortresses & Emerald Gorges',
    subtitle: '4N/5D • Harishchandragad, Kalu & Harihar Fort',
    price: '₹ 13,499',
    regularPrice: '₹ 14,999',
    badge: 'Early Bird',
    duration: '4 Nights / 5 Days',
    difficulty: 'Moderate',
    highestAltitude: '4,670 ft (Harishchandragad Peak)',
    trekDistance: '28 km total across 3 trails',
    departureHubs: ['Bengaluru', 'Mysuru', 'Mangaluru', 'Hubballi', 'Pune', 'Mumbai'],
    campsiteLocation: 'Malshej Ghat Lakeside Camp & Khireshwar Alpine Tents',
    bestSeason: 'June to October (Monsoon & Post-Monsoon)',
    groupDiscountOffer: '₹500 off on 3+ trekkers | Book 6 get 1 Free slot',
    overview: 'Experience the thunderous beauty of the Western Ghats during full monsoon. Traverse misty plateaus, stand on the edge of the 1,400-meter concave cliff of Konkan Kada, marvel at the 1,200ft cascade of Kalu Waterfall, and test your mettle on the iconic 80-degree stone-cut steps of Harihar Fort.',
    story: 'For centuries, the Sahyadri mountains served as the impenetrable spine of the Maratha Empire. When the southwest monsoon clouds sweep in from the Arabian Sea, these ancient basalt battlements transform into a living emerald kingdom draped in thousands of roaring cascades. Trek & Stay curates an exclusive circuit linking Khireshwar, Harishchandragad, and Igatpuri with seasoned local sherpas and certified UIAA climbing leads.',
    highlights: [
      'Konkan Kada panoramic cloud inversion and reverse waterfall phenomenon',
      'Kalu Falls 1,200-foot roaring multi-tier drop in Malshej Ghat',
      'Harihar Fort adrenaline-pumping 80° rock-cut steps with notch hand grips',
      'Campfire night under mist at our private Khireshwar eco-camp',
      'Authentic hot Maharashtrian village meals (Pithla Bhakri, Thecha, hot chai)'
    ],
    inclusions: [
      'Round-trip AC pushback transit from chosen departure hub',
      '4 Nights comfortable shared alpine camping / deluxe rustic stays',
      'All meals (4 Breakfasts, 4 Lunches, 4 Dinners & Evening Trail Snacks)',
      'Certified Wilderness Trek Captains & Local Mountain Guides',
      'Forest entry permits, toll fees, and village sanctuary charges',
      'First-aid medical support, pulse oximeter & safety ropes'
    ],
    exclusions: [
      'Personal emergency transit or porter expenses',
      'Optional adventure gear rentals',
      'Items not explicitly mentioned in the itinerary'
    ],
    dayByDayItinerary: [
      {
        day: 1,
        title: 'Overnight Departure from Hub Cities & Western Ghats Ingress',
        description: 'Board our luxury sleeper/AC coach from Bengaluru, Mysuru, Hubballi or Pune. Team briefing, ice-breaking session, and scenic night drive into the foothills of Malshej Ghat.',
        meals: 'Dinner on route',
        stay: 'Overnight Transit / Early check-in Basecamp',
        activities: ['Group briefing', 'Transit check-in', 'Equipment distribution']
      },
      {
        day: 2,
        title: 'Khireshwar Trail to Harishchandragad & Konkan Kada Sunset',
        description: 'Begin ascent through lush green paddies and seven waterfalls. Reach the ancient 6th-century Harishchandrareshwar Temple and Caves, then witness the jaw-dropping circular rainbow / fog phenomenon at Konkan Kada cliff.',
        meals: 'Breakfast, Packed Lunch, Hot Maharashtrian Dinner',
        stay: 'Alpine Tents at Harishchandragad Plateau',
        activities: ['Ascent via Tolarkhind', 'Temple exploration', 'Konkan Kada sunset cliff walk']
      },
      {
        day: 3,
        title: 'Kalu Falls Deep Gorge Descent & Malshej Mist Trek',
        description: 'Wake up above the clouds. Descend toward Malshej Ghat to explore Kalu Waterfall, known as God’s own cascade. Hike through pristine streams and shallow river crossings to reach the base amphitheatre.',
        meals: 'Breakfast, Farmhouse Lunch, Campfire Dinner',
        stay: 'Malshej Ghat Lakeside Eco-Campsite',
        activities: ['Stream trekking', 'Kalu viewpoint scramble', 'Acoustic campfire session']
      },
      {
        day: 4,
        title: 'Harihar Fort Rock-Cut Steps Climb & Trimbak Foothills',
        description: 'Early morning transfer to Nirgudpada. Tackle the world-famous vertical rock stairs carved directly into the triangular rock prism of Harihar Fort. Soak in 360-degree views of Vaitarna lake basin from the summit.',
        meals: 'Breakfast, Trail Energy Pack, Authentic Dinner',
        stay: 'Igatpuri Nature Homestay',
        activities: ['Harihar vertical step ascent', 'Fort bastion exploration', 'Celebration dinner']
      },
      {
        day: 5,
        title: 'Scenic Return Journey with Cherished Memories',
        description: 'Morning leisure and breakfast amidst misty valleys. Board our return transport with drop-offs across Pune, Hubballi, Mangaluru, Mysuru, and Bengaluru.',
        meals: 'Breakfast & Highway Lunch',
        stay: 'Return to origin',
        activities: ['Group photo ceremonies', 'Certificate of Completion', 'Return transit']
      }
    ],
    campsiteDetails: {
      name: 'Trek & Stay Malshej Lakeside & Harishchandra Alpine Camp',
      location: 'Khireshwar & Malshej Valley, Maharashtra',
      elevation: '2,850 ft to 4,200 ft',
      amenities: ['Weatherproof waterproof dome tents', 'Clean mobile washrooms', 'Dining shamiana', 'High-powered solar lighting', 'Campfire ring', '24/7 First-Aid station'],
      description: 'Nestled between Arthur Lake tributaries and towering Sahyadri cliff walls, our camp features insulated bedding, organic locally sourced hot meals, and panoramic sunrise vistas.'
    },
    image: 'https://images.unsplash.com/photo-1596245050071-705307593c7f?q=80&w=2070&auto=format&fit=crop', // Konkan Kada cliff view
    gallery: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1626014303757-646c21425821?q=80&w=2070&auto=format&fit=crop'
    ],
    faq: [
      {
        question: 'Are Harihar Fort stairs safe for trekkers with vertigo?',
        answer: 'Our certified trek captains provide harness assist and three-point contact guidance on the rock steps. Trekkers can also opt to halt at the base plateau if uncomfortable with height.'
      },
      {
        question: 'What footwear is mandatory for monsoon trails?',
        answer: 'Trekking shoes with deep rubber lugs/traction (Decathlon Forclaz, Quechua or Action Trekker) are mandatory. Smooth running shoes are strictly prohibited.'
      }
    ]
  },
  {
    id: 'kalu-falls-misty-sahyadris',
    slug: 'kalu-falls-misty-sahyadris',
    title: 'Kalu Falls Misty Sahyadris',
    tagline: 'The 1,200-Foot Giant Cascade & Jivdhan Bastion',
    subtitle: '2N/3D • Jivdhan Fort & Reverse Waterfall',
    price: '₹ 7,999',
    regularPrice: '₹ 8,999',
    badge: 'Weekend Special',
    duration: '2 Nights / 3 Days',
    difficulty: 'Easy to Moderate',
    highestAltitude: '3,755 ft',
    trekDistance: '14 km total',
    departureHubs: ['Bengaluru', 'Mysuru', 'Hubballi', 'Pune', 'Mumbai'],
    campsiteLocation: 'Ghatghar Riverside Glamping, Malshej Region',
    bestSeason: 'July to November',
    groupDiscountOffer: '₹500 discount for groups of 3+ | Early bird booking slots live',
    overview: 'Witness one of Western India’s highest and most majestic waterfalls tumbling 1,200 feet over sheer volcanic cliffs into the Malshej gorge. Combined with the historic Jivdhan Fort trek and the mind-boggling Naneghat reverse waterfall phenomenon.',
    story: 'Kalu Waterfall originates in the high ranges of Harishchandragad and plunges down through five dramatic stages. Standing on the cliff edge opposite Kalu, feeling the immense spray of water vapor drift upward as clouds swirl around you, is a sensory spectacle like no other in the Western Ghats.',
    highlights: [
      'Direct panoramic cliffside view of the massive 1,200ft Kalu Waterfall',
      'Naneghat ancient trade pass with centuries-old stone inscriptions and reverse waterfall',
      'Jivdhan Fort climb with rock-cut water cisterns and Kalyan Darwaja',
      'Lush stream crossings and natural pool swimming under guide supervision',
      'Riverside tent stay with hot desi barbecue and piping hot chai'
    ],
    inclusions: [
      'Travel in comfortable pushback sanitized vehicle from pickup point',
      '2 Nights Riverside Tents / Eco Homestay accommodation',
      '2 Breakfasts, 2 Lunches, 2 Dinners (Veg & Non-Veg options)',
      'Certified Trek Leaders with satellite walkie-talkies',
      'All forest permits and entry fees'
    ],
    exclusions: ['Personal snacks & mineral water beyond provided supply'],
    dayByDayItinerary: [
      {
        day: 1,
        title: 'Departure & Scenic Ingress to Ghatghar Plateau',
        description: 'Night pickup from Bengaluru/Pune. Cross lush mountain passes and arrive at Ghatghar baseline camp as morning sun breaks through monsoon fog.',
        meals: 'Breakfast at basecamp',
        stay: 'Ghatghar Riverside Tents',
        activities: ['Camp check-in', 'Breakfast', 'Trail preparation']
      },
      {
        day: 2,
        title: 'Kalu Falls Gorge Scramble & Naneghat Reverse Gale',
        description: 'Trek through dense forests and crystal streams to reach the cliff face facing Kalu Falls. Experience the roaring wind updraft reversing water spray at Naneghat pass.',
        meals: 'Breakfast, Hot Packed Lunch, Campfire Dinner',
        stay: 'Lakeside Eco Tents',
        activities: ['Kalu waterfall trail', 'Naneghat cave exploration', 'Campfire storytelling']
      },
      {
        day: 3,
        title: 'Jivdhan Fort Ascent & Homeward Return',
        description: 'Morning summit hike up Jivdhan Fort overlooking the legendary thumb-like pinnacle of Vanar Lingi. Savor a farewell lunch before return transit.',
        meals: 'Breakfast & Traditional Lunch',
        stay: 'Return to pickup cities',
        activities: ['Jivdhan rock route', 'Summit photo session', 'Departure']
      }
    ],
    campsiteDetails: {
      name: 'Trek & Stay Ghatghar Riverside Glamping',
      location: 'Naneghat / Malshej Range, Maharashtra',
      elevation: '2,600 ft',
      amenities: ['Waterproof twin/triple sharing tents', 'Foam mattresses & sleeping bags', 'Covered dining area', 'Clean washrooms'],
      description: 'Set alongside a freshwater hill stream surrounded by paddy fields and towering Sahyadri cliffs.'
    },
    image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=2070&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596245050071-705307593c7f?q=80&w=2070&auto=format&fit=crop'
    ],
    faq: [
      {
        question: 'Can beginners do the Kalu Falls trail?',
        answer: 'Yes! The Kalu Falls viewpoint trek is very beginner friendly. The trek captains provide full support during water crossings.'
      }
    ]
  },
  {
    id: 'maharashtra-waterfalls-mania',
    slug: 'maharashtra-waterfalls-mania',
    title: 'Maharashtra Waterfalls Mania',
    tagline: 'Devkund Secret Blue Lagoon, Nanemachi & Raigad Vistas',
    subtitle: '4D/3N • Devkund, Nanemachi & Raigad Fort',
    price: '₹ 8,500',
    regularPrice: '₹ 10,000',
    badge: 'Monsoon Special',
    duration: '4 Days / 3 Nights',
    difficulty: 'Easy to Moderate',
    highestAltitude: '2,700 ft',
    trekDistance: '22 km across 3 waterfall canyons',
    departureHubs: ['Bengaluru', 'Mysuru', 'Hubballi', 'Pune', 'Mumbai'],
    campsiteLocation: 'Kundalika River Camp & Kolad Riverside Cottages',
    bestSeason: 'June to December',
    groupDiscountOffer: '₹500 off on 3+ registrations | Special student batches available',
    overview: 'Dive into Maharashtra’s most legendary monsoon waterfall circuit. Hike into the dense Tamhini jungle to discover the emerald plunge pool of Devkund, marvel at the roaring curtains of Nanemachi waterfall, and visit the historical capital of the Marathas at Raigad.',
    story: 'Hidden within the rugged Plus Valley and Tamhini Wildlife Sanctuary, Devkund is revered as the "Bathing Pond of Gods". The crystal-clear azure waters emerge from the confluence of three forest streams dropping from vertical volcanic cliffs. Trek & Stay ensures guided lifejacket-assisted swimming and secluded sunrise entries before mainstream crowds arrive.',
    highlights: [
      'Devkund deep forest hike with turquoise natural swimming lagoon',
      'Nanemachi roaring single-drop curtain waterfall hidden inside deep ravines',
      'Plus Valley panoramic viewpoint over deep Sahyadri gorges',
      'Raigad Fort historic exploration via ropeway / heritage steps',
      'Kundalika river rafting & tranquil waterside camp stays'
    ],
    inclusions: [
      'AC Pushback travel from departure city',
      '3 Nights riverside stay (tents/cottages)',
      'All meals (3 Breakfasts, 3 Lunches, 3 Dinners)',
      'Lifejackets & water safety equipment',
      'Forest entry and eco-tourism charges'
    ],
    exclusions: ['Optional river rafting charges at Kolad (₹1,200 add-on)'],
    dayByDayItinerary: [
      {
        day: 1,
        title: 'Arrival & Kolad Riverside Camp Settling',
        description: 'Morning arrival at Kundalika valley. Settle into riverside camps, enjoy warm breakfast, and take an acclimatization stream walk.',
        meals: 'Lunch, Evening Snacks & Dinner',
        stay: 'Kundalika Riverside Camp',
        activities: ['Camp orientation', 'Stream dip', 'Fireside barbecue']
      },
      {
        day: 2,
        title: 'Devkund Secret Waterfall Trek & Tamhini Rainforest Trail',
        description: 'Hike 6.5 km through dense sub-tropical forests, crossing two shallow river streams. Arrive at the stunning Devkund emerald basin for a refreshing swim with lifejackets.',
        meals: 'Breakfast, Packed Lunch, Village Dinner',
        stay: 'Tamhini Eco Homestay',
        activities: ['Dense forest trek', 'Devkund lagoon swim', 'Village culinary feast']
      },
      {
        day: 3,
        title: 'Nanemachi Cascades & Raigad Fort Foothills',
        description: 'Explore the hidden Nanemachi waterfall with its unique amphitheatre rock formation and thunderous spray. Afternoon visit to historic Raigad Fort.',
        meals: 'Breakfast, Farm Lunch, Camp Dinner',
        stay: 'Raigad Foothills Cottages',
        activities: ['Nanemachi ravine exploration', 'Raigad heritage tour', 'Stargazing']
      },
      {
        day: 4,
        title: 'Scenic Return via Khandala Ghats',
        description: 'Morning leisure breakfast and farewell group ceremony before return coach journey to your home city.',
        meals: 'Breakfast & Return transit snacks',
        stay: 'Return to origin',
        activities: ['Group memories ceremony', 'Return journey']
      }
    ],
    campsiteDetails: {
      name: 'Trek & Stay Kundalika Riverside & Tamhini Camp',
      location: 'Kolad & Tamhini Ghat, Raigad, Maharashtra',
      elevation: '950 ft to 1,800 ft',
      amenities: ['Riverside swiss cottages & luxury dome tents', 'Hot shower facilities', 'Barbecue pits', 'Kayaking gear'],
      description: 'Lush green riverside sanctuary offering serene river sounds and immediate access to monsoon trailheads.'
    },
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=2070&auto=format&fit=crop', // Deep monsoon forest and waterfall
    gallery: [
      'https://images.unsplash.com/photo-1517824806704-9040b037703b?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?q=80&w=2070&auto=format&fit=crop'
    ],
    faq: [
      {
        question: 'Are life jackets provided at Devkund?',
        answer: 'Yes! Certified life jackets are provided for all trekkers wishing to enter the permitted lagoon zone under guide supervision.'
      }
    ]
  },
  {
    id: 'shitkada-rappel-harihar-fort',
    slug: 'shitkada-rappel-harihar-fort',
    title: 'Shitkada Rappel + Harihar Fort',
    tagline: '300-Foot Waterfall Rappelling & Vertical 80° Rock Stairs',
    subtitle: '3D/2N • Rock-Cut Steps & Waterfall Rappel',
    price: '₹ 8,999',
    regularPrice: '₹ 9,999',
    badge: 'Adventure High',
    duration: '3 Days / 2 Nights',
    difficulty: 'Technical & Thrilling',
    highestAltitude: '3,676 ft (Harihar Peak)',
    trekDistance: '12 km trek + 300ft Rappel',
    departureHubs: ['Bengaluru', 'Mysuru', 'Hubballi', 'Pune', 'Mumbai'],
    campsiteLocation: 'Nashik Foothills Alpine Camp & Igatpuri Valley',
    bestSeason: 'June to February',
    groupDiscountOffer: '₹500 discount for groups of 3+ trekkers',
    overview: 'The ultimate adrenaline double-feature! Experience an exhilarating 300-foot waterfall rappel down the roaring cascades of Shitkada / Vihigaon, followed by climbing the world-renowned vertical rock stairs of Harihar Fort.',
    story: 'Engineered by the Seuna (Yadava) dynasty in the 9th to 14th century, Harihar Fort stands like a monolithic arrowhead carved out of basalt rock. The iconic staircase cuts straight up an 80-degree incline, with carved thumbholes offering a firm grip. Paired with certified UIAA twin-rope waterfall rappelling at Shitkada under the direction of licensed mountaineering instructors.',
    highlights: [
      'Thrilling 300-foot waterfall rappelling down roaring water curtains with full safety rigs',
      'Conquer the iconic 80° rock-cut steps of Harihar Fort',
      'Panoramic summit view of Basgad, Utwad, and Brahma hill peaks',
      'Training session on descender devices, carabiners, and harness mechanics',
      'Campfire evening under Igatpuri starlit skies with hot barbecue'
    ],
    inclusions: [
      'Complete UIAA / CE certified climbing gear (Harnesses, Helmets, Descenders, Ropes)',
      'Expert certified mountaineering instructors and safety anchors',
      '2 Nights campsite/resort accommodation',
      'All meals (2 Breakfasts, 2 Lunches, 2 Dinners)',
      'Round-trip transport from pickup hub'
    ],
    exclusions: ['Personal camera harness mounts (GoPro rentals available)'],
    dayByDayItinerary: [
      {
        day: 1,
        title: 'Arrival, Technical Briefing & Waterfall Rappel Training',
        description: 'Arrive at Igatpuri adventure camp. Safety orientation, gear fitting, and basic dry rappelling practice on natural rock faces.',
        meals: 'Lunch & Dinner',
        stay: 'Igatpuri Foothills Adventure Camp',
        activities: ['Gear inspection', 'Safety demonstration', 'Campfire dinner']
      },
      {
        day: 2,
        title: 'The Great 300ft Shitkada Waterfall Rappel',
        description: 'Hike to Shitkada waterfall. Under guidance of our chief mountaineering instructor, take the 300-foot descent right through the roaring cascade with dual-anchor safety backups.',
        meals: 'Breakfast, Hot Packed Lunch, Camp Celebration Dinner',
        stay: 'Adventure Campsite Tents',
        activities: ['300ft waterfall rappelling', 'Stream plunge', 'Action photography']
      },
      {
        day: 3,
        title: 'Harihar Fort Rock-Cut Steps Climb & Homeward Journey',
        description: 'Trek to Harihar base village and climb the iconic vertical stone staircase to the summit. Savor high-altitude panoramic vistas and descent before return coach departure.',
        meals: 'Breakfast & Traditional Maharashtrian Lunch',
        stay: 'Return to origin',
        activities: ['Harihar stone stairs climb', 'Summit bastion exploration', 'Return transit']
      }
    ],
    campsiteDetails: {
      name: 'Trek & Stay Igatpuri Adventure Basecamp',
      location: 'Igatpuri / Trimbak Hills, Maharashtra',
      elevation: '2,100 ft',
      amenities: ['Climbing gear depot', 'Spacious weather-proof alpine tents', 'Clean washrooms', 'First-Aid trauma kit'],
      description: 'Situated at the base of the Sahyadri adventure corridors with direct access to technical rappelling sites.'
    },
    image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=2070&auto=format&fit=crop', // Rappelling / Climbing focus
    gallery: [
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542401886-65d6c61de115?q=80&w=2070&auto=format&fit=crop'
    ],
    faq: [
      {
        question: 'Do I need prior rappelling experience for Shitkada?',
        answer: 'No prior experience is necessary! Our instructors provide complete on-ground practice and maintain top-rope secondary safety control on all descents.'
      }
    ]
  },
  {
    id: 'maharashtra-4-dham-pilgrimage',
    slug: 'maharashtra-4-dham-pilgrimage',
    title: 'Maharashtra 4-Dham Pilgrimage',
    tagline: 'Jyotirlingas, Sacred Ghats & Shirdi Sai Sansthan',
    subtitle: '4N/5D • Bhimashankara, Trimbak, Grishneshwar, Shirdi',
    price: '₹ 9,499',
    regularPrice: '₹ 10,999',
    badge: 'Divine Tour',
    duration: '4 Nights / 5 Days',
    difficulty: 'Easy / Family Friendly',
    highestAltitude: '3,100 ft (Bhimashankar)',
    trekDistance: 'Temple circuits with vehicle transit',
    departureHubs: ['Bengaluru', 'Mysuru', 'Mangaluru', 'Hubballi', 'Pune'],
    campsiteLocation: 'Premium Spiritual Ashrams & Deluxe AC Hotels in Shirdi & Nashik',
    bestSeason: 'All Year Round (Special Shravan Batches)',
    groupDiscountOffer: '₹500 discount for family groups of 3+ devotees',
    overview: 'A spiritually enriching circuit covering 3 sacred Jyotirlingas of Maharashtra (Bhimashankar, Trimbakeshwar, Grishneshwar) alongside the revered holy shrine of Shirdi Sai Baba and the Ellora world heritage caves.',
    story: 'Immerse yourself in centuries of spiritual devotion. From the sacred waters of Kushavarta tirtha at the origin of the Godavari River to the divine darshan of the 12th Jyotirlinga at Grishneshwar, our pilgrimage tours are meticulously designed for comfortable elder and family travel with VIP darshan passes and pure satvik dining.',
    highlights: [
      'VIP Darshan coordination at Shirdi Sai Baba Samadhi Temple',
      'Sacred Jyotirlinga Abhishekams at Trimbakeshwar, Bhimashankar & Grishneshwar',
      'Visit to ancient Ellora Caves (Kailasa Temple monolithic wonder)',
      'Godavari River Snan and Panchavati Ramayana holy spots in Nashik',
      'Comfortable AC multi-axle transit and 3-star hotel stays throughout'
    ],
    inclusions: [
      'All transfers in AC Deluxe Coach / Pushback Innova',
      '4 Nights comfortable AC Hotel / Ashram Accommodation',
      'All Pure Vegetarian / Satvik meals (Breakfasts & Dinners)',
      'Experienced Pilgrimage Coordinator throughout the journey',
      'Toll taxes, parking, and driver allowances'
    ],
    exclusions: ['Special puja personal offerings (Dakshina) and VIP special queue tickets'],
    dayByDayItinerary: [
      {
        day: 1,
        title: 'Arrival in Pune & Bhimashankar Jyotirlinga Darshan',
        description: 'Pickup from Pune/Bengaluru train or flight. Drive through scenic Sahyadri reserve to holy Bhimashankar Jyotirlinga set amidst the sacred grove. Evening Aarti and transfer to Shirdi.',
        meals: 'Lunch & Dinner',
        stay: 'Deluxe Hotel in Shirdi',
        activities: ['Bhimashankar Darshan', 'Aarti participation', 'Transfer to Shirdi']
      },
      {
        day: 2,
        title: 'Shirdi Sai Baba Samadhi & Shani Shingnapur',
        description: 'Early morning Kakad Aarti / Samadhi Darshan at Shirdi Sai Temple. Visit Dwarkamai, Chavadi, and Gurusthan. Afternoon drive to the famous village of Shani Shingnapur.',
        meals: 'Breakfast & Dinner',
        stay: 'Deluxe Hotel in Shirdi',
        activities: ['Sai Samadhi Darshan', 'Shani Shingnapur Darshan', 'Spiritual discourse']
      },
      {
        day: 3,
        title: 'Grishneshwar Jyotirlinga & Ellora Kailasa Temple',
        description: 'Drive to Aurangabad / Verul. Have darshan at the 12th Jyotirlinga Grishneshwar and marvel at the breathtaking rock-carved Kailasa Temple of Ellora.',
        meals: 'Breakfast & Dinner',
        stay: 'Hotel in Nashik / Aurangabad',
        activities: ['Grishneshwar Abhishek', 'Ellora cave tour', 'Transit to Nashik']
      },
      {
        day: 4,
        title: 'Trimbakeshwar Jyotirlinga & Panchavati Sacred Trail',
        description: 'Early morning visit to Trimbakeshwar Jyotirlinga near Brahmagiri mountain. Visit Kushavarta Kund, Sita Gumpha, Kalaram Temple, and Kapaleshwar in Panchavati.',
        meals: 'Breakfast & Dinner',
        stay: 'Hotel in Nashik',
        activities: ['Trimbakeshwar Darshan', 'Panchavati temple tour', 'Godavari Aarti']
      },
      {
        day: 5,
        title: 'Blessed Homeward Journey',
        description: 'Morning prayer and blessed prasad distribution. Comfortable return transit back to departure hubs.',
        meals: 'Breakfast & Transit snacks',
        stay: 'Return to origin',
        activities: ['Prasad distribution', 'Return drop-offs']
      }
    ],
    campsiteDetails: {
      name: 'Trek & Stay Shirdi & Nashik Pilgrim Lodgings',
      location: 'Shirdi & Nashik, Maharashtra',
      elevation: '1,900 ft',
      amenities: ['Deluxe AC rooms with attached bath', 'Pure vegetarian dining hall', 'Wheelchair accessibility', 'Elevator access'],
      description: 'Peaceful, immaculate hotels located within 500 meters of temple premises for convenient early-morning aarti access.'
    },
    image: 'https://images.unsplash.com/photo-1624396115568-55b89052b694?q=80&w=2070&auto=format&fit=crop', // Iconic Trimbakeshwar / Temple style view
    gallery: [
      'https://images.unsplash.com/photo-1583733113057-04021287042a?q=80&w=2073&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop'
    ],
    faq: [
      {
        question: 'Are elder citizens and families comfortable on this tour?',
        answer: 'Yes! The entire Maharashtra 4-Dham tour is designed specifically for families and senior citizens with minimum walking, AC vehicle doorstep transfers, and ground assistance.'
      }
    ]
  },
  {
    id: 'kedarnath-badrinath-do-dham',
    slug: 'kedarnath-badrinath-do-dham',
    title: 'Kedarnath - Badrinath Do Dham',
    tagline: 'The Crown of the Garhwal Himalayas & Holy Alaknanda',
    subtitle: '6N/7D • Ganga Aarti, Gaurikund Trek & Flights',
    price: '₹ 17,499',
    regularPrice: '₹ 19,999',
    badge: 'Himalayan Yatra',
    duration: '6 Nights / 7 Days',
    difficulty: 'Moderate to Strenuous',
    highestAltitude: '11,755 ft (Kedarnath Shrine)',
    trekDistance: '16 km Gaurikund to Kedarnath (Pony/Palki options available)',
    departureHubs: ['Bengaluru', 'Delhi', 'Haridwar', 'Dehradun', 'Pune'],
    campsiteLocation: 'Sonprayag Alpine Lodges & Kedarnath Top Basecamp',
    bestSeason: 'May to June & September to November',
    groupDiscountOffer: '₹500 off per booking for groups of 3+ devotees',
    overview: 'Embark on the journey of a lifetime to Kedarnath and Badrinath in the high Himalayas. Witness the divine evening Ganga Aarti at Haridwar, trek along the roaring Mandakini river to Lord Shiva’s highest abode, and take holy dip in Tapt Kund at Badrinath.',
    story: 'Surrounded by snow-draped Himalayan sentinels, Kedarnath stands as an eternal monument of devotion and architectural resilience. With seamless flight and train logistics from Bengaluru and Delhi, Trek & Stay handles all biometric Yatra registrations, medical screenings, Sonprayag shuttle coordinates, and high-altitude accommodation.',
    highlights: [
      'Divine Darshan and Aarti at holy Kedarnath Temple (11,755 ft)',
      'Visit Badrinath Dham, Mana (First Indian Village), and Saraswati River origin',
      'Enthralling Ganga Aarti at Har Ki Pauri, Haridwar & Rishikesh Triveni Ghat',
      'Confluence tours of Devprayag (Bhagirathi + Alaknanda = Ganga) & Rudraprayag',
      'End-to-end Yatra registration, medical monitoring, and heated lodge stays'
    ],
    inclusions: [
      'Transport in comfortable Tempo Traveller / Innova from Haridwar/Dehradun',
      '6 Nights Deluxe Hotel & Alpine Lodge accommodation',
      '6 Breakfasts & 6 Dinners (Pure Satvik Vegetarian Meals)',
      'Mandatory Yatra registration and biometric pass facilitation',
      'Certified Yatra Captain & High-Altitude Medical Kit with Portable Oxygen'
    ],
    exclusions: ['Helicopter tickets, pony/doli charges at Gaurikund (can be arranged on request)'],
    dayByDayItinerary: [
      {
        day: 1,
        title: 'Arrival in Haridwar / Dehradun & Ganga Aarti',
        description: 'Arrive at Haridwar / Dehradun. Check into hotel, attend magical evening Ganga Aarti at Har Ki Pauri, and receive comprehensive Yatra briefing.',
        meals: 'Dinner',
        stay: 'Hotel in Haridwar / Rishikesh',
        activities: ['Har Ki Pauri Ganga Aarti', 'Yatra orientation', 'Registration check']
      },
      {
        day: 2,
        title: 'Haridwar to Guptkashi / Sonprayag via Devprayag',
        description: 'Scenic drive along the holy rivers. Stop at Devprayag confluence to witness the divine union of Bhagirathi and Alaknanda. Reach Sonprayag basecamp.',
        meals: 'Breakfast & Dinner',
        stay: 'Deluxe Lodge in Guptkashi / Sonprayag',
        activities: ['Devprayag sangam viewing', 'Mandakini valley drive', 'Acclimatization']
      },
      {
        day: 3,
        title: 'Sonprayag to Gaurikund & Ascent to Kedarnath Dham',
        description: 'Early morning shuttle to Gaurikund. Begin the 16 km sacred trek along the roaring Mandakini river with views of towering Himalayan peaks. Arrive at Kedarnath top.',
        meals: 'Breakfast & Dinner',
        stay: 'Alpine Lodge near Kedarnath Temple',
        activities: ['Gaurikund to Kedarnath trek', 'Evening Temple Aarti', 'Stargazing at 11,750 ft']
      },
      {
        day: 4,
        title: 'Morning Kedarnath Darshan & Descent to Guptkashi',
        description: 'Early morning VIP Darshan and Abhishekam. Visit Bhairavnath Temple for panoramic valley views. Descend back to Gaurikund and transfer to Guptkashi hotel.',
        meals: 'Breakfast & Dinner',
        stay: 'Deluxe Hotel in Guptkashi',
        activities: ['Morning Darshan', 'Bhairavnath temple hike', 'Descent to base']
      },
      {
        day: 5,
        title: 'Guptkashi to Badrinath Dham via Chopta & Joshimath',
        description: 'Scenic journey through the "Mini Switzerland of India" Chopta and Joshimath. Arrive in Badrinath, take holy dip in Tapt Kund, and attend evening temple Darshan.',
        meals: 'Breakfast & Dinner',
        stay: 'Hotel in Badrinath / Pandukeshwar',
        activities: ['Chopta valley drive', 'Tapt Kund holy snan', 'Badrinath evening Aarti']
      },
      {
        day: 6,
        title: 'Mana First Village Exploration & Drive to Rudraprayag',
        description: 'Visit Mana (the first Indian village on the Indo-Tibetan border), Bhim Pul, and Vyas Gufa. Drive down to Rudraprayag confluence hotel.',
        meals: 'Breakfast & Dinner',
        stay: 'Riverside Resort in Rudraprayag / Srinagar',
        activities: ['Mana village walk', 'Vyas Gufa visit', 'Rudraprayag sangam']
      },
      {
        day: 7,
        title: 'Rudraprayag to Rishikesh / Haridwar & Farewell',
        description: 'Drive back to Rishikesh. Visit Ram Jhula and Laxman Jhula before drop-off at Dehradun airport / Haridwar railway station for your return flight/train.',
        meals: 'Breakfast',
        stay: 'Return to origin',
        activities: ['Rishikesh visit', 'Airport / Railway drop-off']
      }
    ],
    campsiteDetails: {
      name: 'Trek & Stay Sonprayag & Kedarnath Top Base Lodges',
      location: 'Sonprayag & Kedarnath Dham, Uttarakhand',
      elevation: '6,000 ft to 11,755 ft',
      amenities: ['Heated rooms / thermal bedding', 'Pure satvik dining', 'Oxygen cylinder support', 'Instant hot water'],
      description: 'Clean, reliable and fully winterized mountain lodges ensuring safety and warmth at high Himalayan altitudes.'
    },
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop', // Majestic Himalayan peak/temple backdrop
    gallery: [
      'https://images.unsplash.com/photo-1626014303757-646c21425821?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop'
    ],
    faq: [
      {
        question: 'How is high-altitude acclimatization handled?',
        answer: 'Our itinerary includes gradual altitude stages, rest halts at Guptkashi, constant pulse-oximeter health monitoring, and portable oxygen cylinders with every batch.'
      }
    ]
  },
  {
    id: 'south-maharashtra-gems',
    slug: 'south-maharashtra-gems',
    title: 'South Maharashtra Hidden Gems',
    tagline: 'Vajrai, Thoseghar, Amboli & Coastal Sahyadri Chasm',
    subtitle: '5 Days • Vajrai, Thoseghar, Amboli & Marleshwar',
    price: '₹ 11,500',
    regularPrice: '₹ 12,500',
    badge: 'Sahyadri Loop',
    duration: '5 Days / 4 Nights',
    difficulty: 'Easy to Moderate',
    highestAltitude: '3,400 ft (Kaas & Thoseghar)',
    trekDistance: '20 km across 4 waterfalls',
    departureHubs: ['Bengaluru', 'Mysuru', 'Mangaluru', 'Hubballi', 'Pune'],
    campsiteLocation: 'Kaas Plateau Lake Resort & Amboli Rainforest Tents',
    bestSeason: 'August to January',
    groupDiscountOffer: '₹500 discount for 3+ bookings | 6 bookings = 1 free slot',
    overview: 'Discover the lush, untamed Southern Sahyadri paradise. Experience India’s second highest waterfall Vajrai (853 ft drop), the thunderous Thoseghar gorge, UNESCO World Heritage Kaas Valley of Flowers, and the mist-shrouded rainforests of Amboli Ghat.',
    story: 'Far away from crowded tourist circuits, the southern reaches of Maharashtra’s Western Ghats boast pristine evergreen biospheres teeming with vibrant orchids, amphibians, and towering cascades. Trek & Stay guides you through secluded forest trails, cave temples behind falling water curtains at Marleshwar, and serene lakeside camping.',
    highlights: [
      'Witness the majestic Vajrai Waterfall dropping 853 ft over three vertical steps',
      'Explore Thoseghar multi-tier waterfall and chalky mountain ravines',
      'UNESCO World Heritage Kaas Plateau Valley of Flowers seasonal bloom',
      'Amboli misty hill station waterfalls and bioluminescent night walks',
      'Marleshwar cave shrine hidden behind a thunderous waterfall gorge'
    ],
    inclusions: [
      'AC Deluxe Pushback vehicle throughout the circuit',
      '4 Nights comfortable eco-resorts / lakeside tents',
      'All meals (4 Breakfasts, 4 Lunches, 4 Dinners)',
      'Forest sanctuary entry fees and UNESCO Kaas permit passes',
      'Certified Wilderness Trek Captains'
    ],
    exclusions: ['Personal laundry and room service'],
    dayByDayItinerary: [
      {
        day: 1,
        title: 'Departure & Ingress to Satara Lake Country',
        description: 'Scenic drive from Bengaluru/Hubballi/Pune to Satara. Check in to Kaas lakeside campsite, enjoy traditional Maharashtrian lunch, and take an evening boat cruise.',
        meals: 'Lunch & Dinner',
        stay: 'Kaas Lakeside Camp',
        activities: ['Lakeside settling', 'Sunset boat ride', 'Campfire dinner']
      },
      {
        day: 2,
        title: 'Vajrai 853ft Waterfall & Kaas Plateau Bloom',
        description: 'Trek to the spectacular Vajrai Waterfall viewpoint over the Koyna river basin. Explore the vibrant seasonal endemic flower blooms across the Kaas plateau.',
        meals: 'Breakfast, Packed Lunch, Camp Dinner',
        stay: 'Kaas Lakeside Camp',
        activities: ['Vajrai cascade hike', 'Kaas flower tour', 'Botanical photography']
      },
      {
        day: 3,
        title: 'Thoseghar Waterfall & Chalkewadi Windmill Plateau',
        description: 'Explore the roaring Thoseghar waterfall ravine and the vast breeze-swept windmill ridges of Chalkewadi. Scenic transfer to Amboli rainforest.',
        meals: 'Breakfast, Highway Lunch, Dinner',
        stay: 'Amboli Rainforest Homestay',
        activities: ['Thoseghar viewing', 'Windmill plateau scramble', 'Amboli night walk']
      },
      {
        day: 4,
        title: 'Amboli Mist Falls & Sacred Marleshwar Cave',
        description: 'Hike to Amboli main falls, Nangartas waterfall gorge, and Marleshwar cave temple situated inside an amphitheatre of cascading waters.',
        meals: 'Breakfast, Farm Lunch, Dinner',
        stay: 'Amboli Homestay',
        activities: ['Amboli gorge trail', 'Marleshwar temple tour', 'Celebration banquet']
      },
      {
        day: 5,
        title: 'Scenic Return Journey with Cherished Memories',
        description: 'Morning tea among the mist-covered trees. Return transport with drop-offs at Pune, Hubballi, Belagavi, Mangaluru, and Bengaluru.',
        meals: 'Breakfast & Return Lunch',
        stay: 'Return to origin',
        activities: ['Souvenir shopping', 'Return transit']
      }
    ],
    campsiteDetails: {
      name: 'Trek & Stay Kaas & Amboli Rainforest Retreat',
      location: 'Satara & Amboli, South Maharashtra',
      elevation: '2,200 ft to 3,200 ft',
      amenities: ['Lakeside glamping tents & cottages', 'Forest view dining deck', 'Clean sanitised washrooms', 'Nature library'],
      description: 'Serene eco-camp located on the shores of Kaas lake with birdwatching trails and night stargazing decks.'
    },
    image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?q=80&w=2070&auto=format&fit=crop', // Lush valley flowers for Kaas
    gallery: [
      'https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=2073&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop'
    ],
    faq: [
      {
        question: 'When is the best time to see flowers at Kaas Plateau?',
        answer: 'Kaas Plateau flowers bloom predominantly between late August and early October after peak monsoon rains.'
      }
    ]
  }
];

export const verifiedCampsitesData = [
  {
    name: 'Trek and Stay Wilderness & Kodachadri Base',
    region: 'Kollur, Karnataka 576220',
    type: 'Rainforest Glamping',
    description: 'Our primary headquarters base nestled in the Mookambika Wildlife Sanctuary. Features high-powered solar grids, spring water, and direct Kodachadri peak access.',
    amenities: ['Private Stream Dip', 'Kodachadri 4x4 Trails', 'Coastal Malnad Meals', 'Solar Powered']
  },
  {
    name: 'Malshej Ghat & Khireshwar Alpine Camp',
    region: 'Khireshwar, Maharashtra',
    type: 'Sahyadri Tents',
    description: 'Strategically located at the base of Harishchandragad and Kalu Falls. Perfect for high-altitude monsoon stargazing and cloudburst experiences.',
    amenities: ['Harishchandragad Base', 'Kalu Falls Proximity', 'Starlit Dining', 'Alpine Tents']
  },
  {
    name: 'Bhandardara Lakeside Campsite',
    region: 'Arthur Lake, Maharashtra',
    type: 'Lakeside Glamping',
    description: 'Located on the tranquil shores of Arthur Lake. The perfect staging point for Sandhan Valley exploration and Alang-Madan-Kulang treks.',
    amenities: ['Boating & Kayaking', 'Barbecue Pits', 'Sandhan Valley Staging', 'Freshwater Swim']
  }
];

export const hqDetails = {
  name: 'Trek and Stay',
  tagline: 'Welcome to the Wilderness',
  locationBrief: 'Kollur, Karnataka',
  website: 'https://trekandstay.com',
  domain: 'trekandstay.com',
  googleMapsUrl: 'https://maps.app.goo.gl/uGLFMEgJYDw5wEyR8',
  headquartersAddress: {
    street: 'Trek and Stay, Kollur Road / Foothills Base',
    city: 'Kollur',
    state: 'Karnataka',
    postalCode: '576220',
    country: 'India',
    geoCoordinates: {
      latitude: '13.8647',
      longitude: '74.8122'
    }
  },
  regionalDepartureHubs: [
    { city: 'Kollur / Kundapura / Udupi Base', address: 'Kollur Mookambika & NH-66 Junction, Udupi Dist', phone: '+91 99029 37730' },
    { city: 'Bengaluru (Bangalore)', address: 'Indiranagar & Majestic Hub, Bengaluru', phone: '+91 99029 37730' },
    { city: 'Mangaluru', address: 'Hampankatta & KSRTC Junction, Mangaluru', phone: '+91 99029 37730' },
    { city: 'Shivamogga (Shimoga)', address: 'KSRTC Bus Station & Bypass, Shivamogga', phone: '+91 99029 37730' },
    { city: 'Mysuru (Mysore)', address: 'Lashkar Mohalla, Near Suburban Bus Stand, Mysuru', phone: '+91 99029 37730' },
    { city: 'Hubballi (Hubli)', address: 'Vidyanagar & Old Bus Stand, Hubballi', phone: '+91 99029 37730' },
    { city: 'Pune', address: 'Shivajinagar & Wakad Flyover, Pune', phone: '+91 99029 37730' },
    { city: 'Delhi / NCR', address: 'Connaught Place & Kashmiri Gate, Delhi', phone: '+91 99029 37730' }
  ],
  phoneHelpline: '+91 99029 37730',
  pilgrimageHelpline: '+91 82175 59456',
  email: 'info@trekandstay.com',
  instagram: '@trek_and_stay',
  instagramUrl: 'https://instagram.com/trek_and_stay',
  whatsappBookingUrl: 'https://wa.me/919902937730?text=I%20would%20like%20to%20book%20my%20stay%20with%20trek%20and%20stay',
  activeCampsites: [
    {
      name: 'Trek and Stay Wilderness & Kodachadri Base',
      region: 'Kollur, Karnataka 576220',
      type: 'Rainforest Glamping, Homestay & Kodachadri Trek Base',
      features: 'Private stream dip, Kodachadri peak 4x4 trails, Hidlumane falls access, Coastal Malnad meals'
    },
    {
      name: 'Sakleshpur Western Ghats Campsite',
      region: 'Sakleshpur, Hassan District, Karnataka',
      type: 'Riverbed Eco-Glamping & Coffee Estate Base',
      features: 'Waterfall trails, river dips, tent camping, Malnad homecooked food'
    },
    {
      name: 'Kudremukh Foothills Homestay & Base',
      region: 'Kalasa / Samse, Chikmagalur, Karnataka',
      type: 'Shola Forest Wilderness Camp',
      features: 'Peak permit assistance, organic estate dining, bonfire'
    },
    {
      name: 'Malshej Ghat & Khireshwar Alpine Camp',
      region: 'Khireshwar, Ahmednagar-Pune Border, Maharashtra',
      type: 'Sahyadri High-Altitude Tents',
      features: 'Harishchandragad base, Kalu falls proximity, starlit dining'
    },
    {
      name: 'Bhandardara Lakeside Campsite',
      region: 'Arthur Lake, Igatpuri Range, Maharashtra',
      type: 'Lakeside Watersports & Glamping',
      features: 'Sandhan valley staging, boating, barbecue pits'
    },
    {
      name: 'Kedarnath Sonprayag Acclimatization Lodges',
      region: 'Sonprayag / Gaurikund, Rudraprayag, Uttarakhand',
      type: 'High Altitude Pilgrim Rest Haven',
      features: 'Mandakini riverfront, thermal heating, 24/7 medical kit'
    }
  ]
};
