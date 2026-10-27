import { DodhamItineraryDay, DodhamPackageOption, DodhamPickupLocation, DodhamPackingItem } from '../types/dodhamTypes';

export interface SpitiAccommodation {
  name: string;
  type: string;
  location: string;
  image: string;
  description: string;
  features: string[];
}

export const SPITI_TRIP_META = {
  title: 'WINTER SPITI EXPEDITION',
  subtitle: '8 Days / 7 Nights • Chandigarh to Chandigarh',
  tagline: 'Experience the magical winter landscapes of Spiti Valley — snow-covered mountains, ancient monasteries, frozen waterfalls, high-altitude villages and the most breathtaking roads in the Himalayas.',
  duration: '8 Days / 7 Nights',
  startCity: 'Chandigarh',
  endCity: 'Chandigarh',
  packagePrice: 23000,
  packagePriceFormatted: '₹23,000',
  groupDiscountText: '₹1,000 OFF per person for bookings of 9 or more',
  highestAltitude: '14,567 ft (Hikkim Post Office) / 15,000 ft (Langza)',
  difficulty: 'Moderate to Challenging (Extreme Sub-Zero Winter & High Altitude)',
  bestSeason: 'November to May (Winter & Early Spring)',
  whatsappNumber: '919902937730',
  officialUpiId: 'ganapathibhat5@ybl',
  officialUpiPayee: 'Ganapathi Bhat (Trek & Stay Authorized)',
  officialBank: 'Canara Bank (A/C: ****2821)'
};

export const SPITI_PACKAGES: DodhamPackageOption[] = [
  {
    id: 'delhi', // reused ID slot for standard Chandigarh-to-Chandigarh
    name: 'Chandigarh to Chandigarh Standard Expedition',
    startLocation: 'Chandigarh Airport / Railway Station',
    endLocation: 'Chandigarh City Drop-off',
    pricePerPerson: 23000,
    badge: 'Flagship Winter Expedition',
    transportIncluded: [
      'Dedicated Mountain Tempo Traveler / SUV',
      'Experienced Himalayan Winter Driver & Chains',
      'All toll taxes, state road taxes & parking fees',
      'Chandigarh Airport / Station pickup & drop'
    ],
    popular: true
  }
];

export const SPITI_DEPARTURE_BATCHES = [
  { id: 'spiti-batch-1', dateRange: 'November 07 – 14, 2026', month: 'November 2026', duration: '8D/7N', status: 'Filling Fast', availableSlots: 8, badge: 'Early Winter' },
  { id: 'spiti-batch-2', dateRange: 'December 25, 2026 – January 01, 2027', month: 'December 2026', duration: '8D/7N', status: 'Few Slots Left', availableSlots: 4, badge: 'Christmas & New Year' },
  { id: 'spiti-batch-3', dateRange: 'January 23 – 30, 2027', month: 'January 2027', duration: '8D/7N', status: 'Filling Fast', availableSlots: 6, badge: 'Deep Freeze & White Spiti' },
  { id: 'spiti-batch-4', dateRange: 'March 06 – 13, 2027', month: 'March 2027', duration: '8D/7N', status: 'Available', availableSlots: 10, badge: 'Spring Snow' },
  { id: 'spiti-batch-5', dateRange: 'April 10 – 17, 2027', month: 'April 2027', duration: '8D/7N', status: 'Available', availableSlots: 12, badge: 'Spring Thaw' },
  { id: 'spiti-batch-6', dateRange: 'May 15 – 22, 2027', month: 'May 2027', duration: '8D/7N', status: 'Available', availableSlots: 14, badge: 'Summer Transition' }
];

export const SPITI_ITINERARY_DAYS: DodhamItineraryDay[] = [
  {
    dayNumber: 1,
    dayTitle: 'Chandigarh – Shimla – Narkanda',
    route: 'Chandigarh Airport / Station ➔ Himalayan Foothills ➔ Shimla Mall Road ➔ Narkanda',
    icon: 'Car',
    date: 'Day 1',
    tagline: 'Ascent to the Apple Country & Queen of Hills Foothills',
    description: [
      'Prompt pickup from Chandigarh Airport (IXC) or Railway Station by 07:00 AM in our dedicated mountain tempo traveler.',
      'Begin the scenic drive through the Himalayan foothills along the Himalayan Expressway towards Shimla.',
      'Explore Shimla Mall Road, the historic Ridge, and Christ Church (subject to arrival time and traffic).',
      'Visit Jakhu Temple dedicated to Lord Hanuman, if time and mountain weather permit.',
      'Continue through pine-clad ridges to the serene apple bowl town of Narkanda (8,884 ft).',
      'Check-in, hot dinner, and team briefing about winter mountain protocols. Overnight stay at Narkanda.'
    ],
    activities: [
      'Chandigarh pickup and scenic Himalayan drive',
      'Shimla Mall Road & Ridge walk (subject to time)',
      'Jakhu Temple viewpoint exploration (optional)',
      'Evening dinner and winter acclimatization briefing at Narkanda'
    ],
    mealsIncluded: 'Hot Dinner',
    stayLocation: 'Narkanda Mountain Lodge / Hotel',
    stayType: 'Comfortable Hotel with Attached Baths & Geyser',
    altitude: '8,884 ft (Narkanda)',
    distance: '175 km (approx. 6–7 hrs drive)',
    trekDifficulty: 'Road Journey • Gradual Altitude Ascent',
    mapQuery: 'Narkanda, Himachal Pradesh',
    mapUrl: 'https://maps.google.com/?q=Narkanda,Himachal+Pradesh',
    keyHighlights: ['Shimla Mall Road & Ridge', 'Jakhu Temple (weather permitting)', 'Himalayan mountain views', 'Apple orchards of Narkanda'],
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Scenic Himalayan snow ridges on the approach from Shimla to Narkanda'
  },
  {
    dayNumber: 2,
    dayTitle: 'Narkanda – Sangla – Chitkul – Kalpa',
    route: 'Narkanda ➔ Sutlej Valley ➔ Kinnaur Foothills ➔ Sangla & Baspa Valley ➔ Chitkul ➔ Kalpa',
    icon: 'Mountain',
    date: 'Day 2',
    tagline: 'Entering Kinnaur, Baspa Valley & Last Village of India',
    description: [
      'Early departure towards the majestic Kinnaur region through dramatic gorge-carved cliffs along the roaring Sutlej River.',
      'Pass through the world-famous Kinnaur Rock Cut tunnels, marveling at the engineering marvel of the Indo-Tibet Highway.',
      'Enter the pristine Baspa Valley and explore Sangla, surrounded by snow-draped cedar forests.',
      'Drive to Chitkul (11,320 ft), the last inhabited village on the Indo-Tibetan border along the Baspa River (subject to road & snow accessibility).',
      'In the afternoon, head towards Kalpa (9,711 ft), an ancient Kinnauri heritage hamlet perched right across the sacred Kinner Kailash range.',
      'Witness the breathtaking sunset turning the Kinner Kailash Shivling peak into shades of gold and amber. Delicious dinner and overnight stay at Kalpa.'
    ],
    activities: [
      'Drive through dramatic Sutlej Gorge and Kinnaur rock gates',
      'Sangla & Baspa Valley winter exploration',
      'Chitkul border outpost & "Hindustan Ka Aakhri Dhaba" visit (if accessible)',
      'Sunset photography of the sacred Kinner Kailash Shivling (20,000 ft)'
    ],
    mealsIncluded: 'Breakfast & Dinner',
    stayLocation: 'Kalpa Kinnauri Lodge / Hotel',
    stayType: 'Deluxe Heritage Mountain Hotel with Valley Views',
    altitude: '9,711 ft (Kalpa) / 11,320 ft (Chitkul)',
    distance: '160 km (approx. 6–7 hrs drive)',
    trekDifficulty: 'Scenic Mountain Drive & Short Village Walks',
    mapQuery: 'Kalpa, Himachal Pradesh',
    mapUrl: 'https://maps.google.com/?q=Kalpa,Himachal+Pradesh',
    keyHighlights: ['Sutlej Valley gorges', 'Sangla & Baspa Valley', 'Chitkul (last village of India)', 'Sacred Kinner Kailash panorama'],
    image: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'The majestic snow-clad peaks of Kinner Kailash rising above the village of Kalpa'
  },
  {
    dayNumber: 3,
    dayTitle: 'Kalpa – Khab Sangam – Nako – Tabo',
    route: 'Kalpa ➔ Pooh ➔ Khab Sangam ➔ Ka Loops ➔ Nako Village & Lake ➔ Tabo',
    icon: 'Compass',
    date: 'Day 3',
    tagline: 'River Confluences, Nako Frozen Lake & The Threshold of Spiti',
    description: [
      'Wake up early to catch the first golden rays illuminating the Kinner Kailash massif right from your balcony.',
      'After breakfast, embark along the Kinnaur–Spiti corridor towards the rain-shadow desert valley.',
      'Stop at Khab Sangam, the dramatic confluence where the turquoise Spiti River merges with the turbulent Sutlej River under towering vertical rock walls.',
      'Climb the famous Ka Loops hairpin bends to reach Nako village (12,014 ft). Walk to the ancient Nako Lake and explore the village prayer wheels.',
      'Cross the Spiti gate into the lower Spiti Valley and continue towards the peaceful monastery hamlet of Tabo (10,760 ft).',
      'Hot home-cooked dinner and cozy overnight stay at a traditional Tabo guesthouse.'
    ],
    activities: [
      'Khab Sangam confluence photo stop',
      'Ascent via Ka Loops mountain hairpins',
      'Nako village stroll & frozen Nako Lake viewpoint',
      'Evening arrival in ancient Tabo village'
    ],
    mealsIncluded: 'Breakfast & Dinner',
    stayLocation: 'Tabo Traditional Homestay / Guesthouse',
    stayType: 'Cozy Heated Homestay / Guesthouse with Authentic Spiti Hospitality',
    altitude: '10,760 ft (Tabo) / 12,014 ft (Nako)',
    distance: '150 km (approx. 5–6 hrs drive)',
    trekDifficulty: 'High-Altitude Transit & Acclimatization',
    mapQuery: 'Tabo Monastery, Himachal Pradesh',
    mapUrl: 'https://maps.google.com/?q=Tabo,Himachal+Pradesh',
    keyHighlights: ['Khab Sangam river confluence', 'Nako village & frozen lake', 'Dramatic rain-shadow gorges', 'Entry into sacred Spiti Valley'],
    image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Winding mountain roads through the rugged high-altitude desert of Spiti Valley'
  },
  {
    dayNumber: 4,
    dayTitle: 'Tabo – Gue – Dhankar – Kaza',
    route: 'Tabo Monastery ➔ Gue Mummy Temple ➔ Dhankar Cliff Fort ➔ Ice Café ➔ Kaza',
    icon: 'Sparkles',
    date: 'Day 4',
    tagline: '1000-Year-Old Murals, The Living Mummy & Cliff Monasteries',
    description: [
      'Visit the legendary Tabo Monastery, established in 996 AD—often revered as the "Ajanta of the Himalayas" for its extraordinary mud-plastered shrines and ancient Buddhist frescoes.',
      'Take the detour to Gue Monastery near the Indo-Tibetan border to witness the 500-year-old naturally preserved mummified body of Buddhist monk Sangha Tenzin, complete with intact teeth and hair.',
      'Ascend to the breathtaking Dhankar Monastery (12,774 ft), perched precariously on a razor-sharp cliff spine overlooking the confluence of the Spiti and Pin rivers.',
      'Stop at a local Ice Café or photograph natural frozen blue-ice cascades along the highway (subject to safe local access).',
      'Drive onwards to Kaza (12,500 ft), the bustling capital and cultural heart of Spiti Valley.',
      'Check-in to our warm winter homestay in Kaza. Enjoy hot thukpa/momos, warm Bukhari stove fires, and restful sleep.'
    ],
    activities: [
      'Tabo Monastery (UNESCO tentative heritage) exploration',
      'Gue Village 500-year-old preserved monk mummy visit',
      'Dhankar Monastery cliff-edge viewpoint scramble',
      'Frozen waterfall / Ice Café stop (conditions permitting)',
      'Evening arrival and Bukhari gathering in Kaza'
    ],
    mealsIncluded: 'Breakfast & Dinner',
    stayLocation: 'Kaza Winter Homestay / Hotel',
    stayType: 'Traditional Spiti Homestay with Bukhari Wood Heating & Insulated Bedding',
    altitude: '12,500 ft (Kaza) / 12,774 ft (Dhankar)',
    distance: '100 km (approx. 4–5 hrs drive)',
    trekDifficulty: 'Altitude Walks & Cold Acclimatization (-10°C to -18°C)',
    mapQuery: 'Kaza, Himachal Pradesh',
    mapUrl: 'https://maps.google.com/?q=Kaza,Himachal+Pradesh',
    keyHighlights: ['1,000-year Tabo Monastery frescoes', '500-year natural Gue Mummy', 'Dhankar cliff-top monastery fortress', 'Winter Kaza & local cafes'],
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'The ancient monastery of Dhankar perched high upon razor-sharp Spiti cliff spires'
  },
  {
    dayNumber: 5,
    dayTitle: 'Kaza – Key – Chicham – Langza – Hikkim – Kaza',
    route: 'Kaza ➔ Key Monastery ➔ Chicham Bridge ➔ Langza Buddha ➔ Hikkim Post Office ➔ Kaza',
    icon: 'Camera',
    date: 'Day 5',
    tagline: 'World’s Highest Post Office, Chicham Gorge & Key Gompa',
    description: [
      'A highlight day traversing the highest inhabited villages on Earth, draped in thick winter snow.',
      'Visit the world-renowned Key Monastery (13,668 ft), the largest training monastery in Spiti, cascading down a conical hill like a real-world Shangri-La.',
      'Cross Chicham Bridge (13,596 ft), the highest suspension bridge in Asia spanning a terrifying 500-foot-deep gorge between Chicham and Kibber.',
      'Ascend into the fossil wonderland of Langza (14,500 ft) to stand before the colossal golden Buddha statue gazing eternally across snow peaks.',
      'Head to Hikkim (14,567 ft) to post postcards to family and friends from the officially certified World’s Highest Post Office.',
      'Return to Kaza by late afternoon. Free time to explore Kaza local winter market and cafes. Hot dinner and overnight stay in Kaza.'
    ],
    activities: [
      'Key Monastery morning prayer hall & butter tea with lamas',
      'Walking across Asia’s highest suspension bridge at Chicham',
      'Giant Langza Buddha statue photography & marine fossil hunting',
      'Posting postcards from World’s Highest Post Office at Hikkim',
      'Kaza evening market stroll'
    ],
    mealsIncluded: 'Breakfast & Dinner',
    stayLocation: 'Kaza Winter Homestay / Hotel',
    stayType: 'Traditional Spiti Homestay with Bukhari Wood Heating',
    altitude: '14,567 ft (Hikkim) / 13,668 ft (Key Monastery)',
    distance: '75 km circuit (approx. 4–5 hrs drive)',
    trekDifficulty: 'High Altitude Snow Walks (Warm layers & boots mandatory)',
    mapQuery: 'Key Monastery, Himachal Pradesh',
    mapUrl: 'https://maps.google.com/?q=Key+Monastery,Himachal+Pradesh',
    keyHighlights: ['Iconic Key Monastery', 'Chicham 500ft gorge suspension bridge', 'Langza giant Buddha statue', 'World’s Highest Post Office at Hikkim'],
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'The majestic Key Gompa monastery perched over the frozen Spiti river basin'
  },
  {
    dayNumber: 6,
    dayTitle: 'Kaza – Tabo/Nako Region – Narkanda',
    route: 'Kaza ➔ Spiti Riverbed ➔ Nako ➔ Pooh ➔ Rampur Bushahr ➔ Narkanda',
    icon: 'Navigation',
    date: 'Day 6',
    tagline: 'Farewell Spiti: Long Scenic Descent from Desert to Pines',
    description: [
      'Early breakfast and farewell to the magical white wonderland of Kaza.',
      'Begin the return journey retracing the Kinnaur-Spiti highway alongside frozen riverbeds and canyon passes.',
      'En route stop at selected mountain viewpoints, Nako village area, and the Sutlej Valley.',
      'Descend progressively into warmer pine forests through Rampur Bushahr and Kumarsain.',
      'Ascend to Narkanda for the evening halt. (Note: If heavy snowfall or road clearing requires, an additional halt at Rampur or Kalpa may be arranged for safety).',
      'Check-in, hot dinner, and celebratory trip recap. Overnight stay at Narkanda.'
    ],
    activities: [
      'Early departure and dramatic canyon descent',
      'Scenic photo stops along Sutlej and Spiti rivers',
      'Transition from alpine desert to lush cedar and apple belt',
      'Celebration dinner at Narkanda'
    ],
    mealsIncluded: 'Breakfast & Dinner',
    stayLocation: 'Narkanda Mountain Lodge / Hotel',
    stayType: 'Comfortable Hotel with Attached Baths & Geyser',
    altitude: '8,884 ft (Narkanda)',
    distance: '240 km (approx. 8–9 hrs drive)',
    trekDifficulty: 'Long Mountain Drive Day • Rapid Altitude Descent',
    mapQuery: 'Narkanda, Himachal Pradesh',
    mapUrl: 'https://maps.google.com/?q=Narkanda,Himachal+Pradesh',
    keyHighlights: ['Dramatic canyon panoramas', 'Kinnaur valley vistas', 'Sunset over Himalayan pine ridges', 'Comfortable recovery sleep'],
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Golden evening light washing over snow-capped Himalayan ranges on the road to Narkanda'
  },
  {
    dayNumber: 7,
    dayTitle: 'Narkanda – Chandigarh',
    route: 'Narkanda ➔ Theog ➔ Shimla Bypass ➔ Kalka ➔ Chandigarh',
    icon: 'CheckCircle2',
    date: 'Day 7',
    tagline: 'Descent to the Plains & Chandigarh Drop-off',
    description: [
      'Enjoy a relaxed morning breakfast overlooking the pine-covered valleys of Narkanda.',
      'Pack bags and begin the final descent through Theog, the Shimla bypass, and Solan.',
      'Cruise down the smooth 4-lane Himalayan Expressway towards the plains of Punjab/Haryana.',
      'Arrive in Chandigarh by late afternoon or early evening (approx. 04:00 PM – 06:00 PM, subject to traffic and road conditions).',
      'Drop-off at Chandigarh Airport (IXC) or Railway Station for onward journeys.',
      'Bid farewell to fellow expeditioners with memories of a lifetime in the winter Himalayas.'
    ],
    activities: [
      'Leisurely mountain breakfast',
      'Descent through Solan and Himalayan Expressway',
      'Group farewell and photo exchanges',
      'Chandigarh drop-off at Airport/Station'
    ],
    mealsIncluded: 'Breakfast',
    stayLocation: 'Onward Journey (Stay not included unless requested)',
    stayType: 'Return to Destination',
    altitude: '1,050 ft (Chandigarh)',
    distance: '175 km (approx. 5–6 hrs drive)',
    trekDifficulty: 'Relaxed Highway Transit',
    mapQuery: 'Chandigarh Airport, Punjab',
    mapUrl: 'https://maps.google.com/?q=Chandigarh+Airport',
    keyHighlights: ['Scenic foothill views', 'Himalayan Expressway drive', 'Memories of frozen Spiti', 'Convenient transit connections'],
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Winding roads descending safely through the lower Shivalik hills toward Chandigarh'
  },
  {
    dayNumber: 8,
    dayTitle: 'Buffer Day / Return Journey Cushion',
    route: 'Weather Contingency & Transit Flexibility Day',
    icon: 'ShieldCheck',
    date: 'Day 8',
    tagline: 'Vital Weather Delay Absorption & Transit Safety Net',
    description: [
      'A mandatory provisioned buffer day strictly designated to absorb unpredictable winter weather challenges: heavy snowfall, sudden road closures by BRO, black ice clearing, or mechanical contingencies.',
      'If the weather is clear and all roads remain open on schedule, participants are free to take their confirmed return flights/trains from Chandigarh on Day 7 or Day 8 morning.',
      'If delayed on the mountain circuit, this buffer absorbs the delay without causing panic or missed flights.',
      'Important advisory: Always book flexible or refundable return tickets when travelling to high-altitude winter Himalayas.'
    ],
    activities: [
      'Buffer cushion for snow clearance or road delays',
      'Relaxed onward travel or local Chandigarh exploration',
      'Safe completion of the winter expedition'
    ],
    mealsIncluded: 'As per travel situation',
    stayLocation: 'Chandigarh / Transit Location',
    stayType: 'Cushion Day',
    altitude: 'Variable',
    distance: 'Buffer Contingency',
    trekDifficulty: 'Rest & Transit',
    mapQuery: 'Chandigarh, India',
    mapUrl: 'https://maps.google.com/?q=Chandigarh',
    keyHighlights: ['Zero-stress travel cushion', 'Safe absorption of winter mountain delays', 'Flexible return journey protection'],
    image: 'https://images.unsplash.com/photo-1589308454676-4658133529a1?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'The silent, unhurried magnificence of winter snow in the high Himalayas'
  }
];

export const SPITI_INCLUSIONS = [
  'Chandigarh-to-Chandigarh dedicated mountain transportation (Tempo Traveler / SUV) as per confirmed itinerary',
  'All local sightseeing and route transfers as per accessible road conditions',
  'Daily two meals: 7 Breakfasts & 6 Hot Dinners as specified in the meal plan',
  'Accommodation during scheduled 7 nights (Narkanda, Kalpa, Tabo, Kaza) in curated winter hotels & traditional heated homestays',
  'Experienced Himalayan winter expedition leader & certified local mountain drivers with snow chain expertise',
  'Toll taxes, fuel charges, state entry permits, and inner line documentation assistance',
  'Group medical first-aid kit, emergency pulse oximeter, and basic high-altitude medical support'
];

export const SPITI_EXCLUSIONS = [
  'Buffer-day accommodation, meals and transportation beyond scheduled 7 nights, if required due to road closures',
  'Additional 4×4 vehicle transfers or emergency rescue vehicles required due to excessive snowfall or administrative restrictions (shared pro-rata at actuals)',
  'Heater charges or special room blowers where separately charged by remote accommodations/homestays',
  'Lunches, mid-day cafe expenses, personal tea, coffee, mineral water, and snacks',
  'Personal expenses, laundry, telephone calls, monastery donation tickets, and souvenirs',
  'Any activity, sightseeing detour, or transit not specifically listed in the inclusions list',
  'Travel insurance, medical hospitalization, and helicopter emergency evacuation expenses'
];

export const SPITI_PACKING_ITEMS: DodhamPackingItem[] = [
  { id: 'sp1', category: 'Clothing & Thermals', title: 'Heavy Insulated Down Jacket (-15°C rated)', description: 'Crucial for freezing sub-zero winds in Kaza, Langza & Hikkim', iconName: 'Shirt', mandatory: true },
  { id: 'sp2', category: 'Clothing & Thermals', title: 'Thermal Innerwear (2-3 Top & Bottom Sets)', description: 'Merino wool or synthetic thermal base layers for round-the-clock wear', iconName: 'Shirt', mandatory: true },
  { id: 'sp3', category: 'Clothing & Thermals', title: 'Fleece or Woollen Mid-Layers (2-3 Nos)', description: 'Traps body warmth efficiently between thermals and down jacket', iconName: 'Layers', mandatory: true },
  { id: 'sp4', category: 'Clothing & Thermals', title: 'Windproof & Waterproof Outer Shell Pants', description: 'Prevents freezing mountain breeze from penetrating clothing', iconName: 'Shield', mandatory: true },
  { id: 'sp5', category: 'Clothing & Thermals', title: 'Warm Woollen Socks (4-5 Pairs) + Liner Socks', description: 'Keep feet warm & dry; damp socks cause rapid heat loss', iconName: 'Sparkles', mandatory: true },
  { id: 'sp6', category: 'Clothing & Thermals', title: 'Waterproof Winter Boots with High-Traction Lugged Sole', description: 'Deep rubber grooves for walking on compacted snow & ice', iconName: 'Compass', mandatory: true },
  { id: 'sp7', category: 'Clothing & Thermals', title: 'Insulated Waterproof Gloves (2 Pairs)', description: 'One fleece inner pair + one heavy waterproof ski glove outer', iconName: 'Hand', mandatory: true },
  { id: 'sp8', category: 'Clothing & Thermals', title: 'Woollen Beanie / Balaclava / Neck Gaiter', description: 'Protects ears, forehead, and neck from sub-zero blast', iconName: 'Smile', mandatory: true },
  { id: 'sp9', category: 'Essentials & ID', title: 'Valid Government Photo ID (Original + 3 Xerox)', description: 'Aadhaar Card, Passport, or Driving License for inner line checkposts', iconName: 'FileText', mandatory: true },
  { id: 'sp10', category: 'Essentials & ID', title: 'UV 400 Polarized Sunglasses', description: '100% mandatory to prevent snow blindness and glare off fresh snow', iconName: 'Glasses', mandatory: true },
  { id: 'sp11', category: 'Essentials & ID', title: 'Sunscreen (SPF 50+) & Cold Cream / Lip Balm', description: 'Intense high-altitude UV radiation & dry desert winds cause chapping', iconName: 'Sun', mandatory: true },
  { id: 'sp12', category: 'Essentials & ID', title: 'Hard Cash (₹5,000 – ₹8,000 per person)', description: 'ATMs rarely function in winter Spiti; digital payments fail due to network drops', iconName: 'Coins', mandatory: true },
  { id: 'sp13', category: 'Toiletries & Medical', title: 'Personal Medicines & Prescriptions', description: 'Diamox (if prescribed), pain relievers, ORS, paracetamol, band-aids', iconName: 'HeartPulse', mandatory: true },
  { id: 'sp14', category: 'Toiletries & Medical', title: 'Insulated Vacuum Flask (1 Litre)', description: 'To carry piping hot water throughout cold driving days', iconName: 'CupSoda', mandatory: true },
  { id: 'sp15', category: 'Electronics & Misc', title: 'High-Capacity Power Bank (20,000 mAh)', description: 'Cold rapidly drains smartphone and camera lithium batteries', iconName: 'BatteryCharging', mandatory: true },
  { id: 'sp16', category: 'Electronics & Misc', title: 'Headlamp or LED Torch with Extra Batteries', description: 'Essential for power cuts in remote villages and early morning departures', iconName: 'Flashlight', mandatory: true },
  { id: 'sp17', category: 'Footwear & Trek Gear', title: 'Microspikes / Traction Cleats (Recommended)', description: 'Slip-on rubber chains for shoes on frozen ice patches', iconName: 'Mountain', mandatory: false },
  { id: 'sp18', category: 'Footwear & Trek Gear', title: 'Trekking Pole with Snow Basket (Recommended)', description: 'Stabilizes walking across snow drifts and steep village paths', iconName: 'Flag', mandatory: false }
];

export const SPITI_ACCOMMODATIONS: SpitiAccommodation[] = [
  {
    name: 'Narkanda Valley Pine Lodge',
    type: 'Comfortable Mountain Hotel',
    location: 'Narkanda (8,884 ft)',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    description: 'Cozy rooms with attached western bathrooms, running hot water geysers, mountain views, and delicious north Indian dining.',
    features: ['Attached Bath', 'Hot Water Geyser', 'Electric Blankets / Extra Quilts', 'Pure Veg & Non-Veg Dining', 'Power Backup']
  },
  {
    name: 'Kalpa Heritage Kinner View Lodge',
    type: 'Deluxe Heritage Hotel',
    location: 'Kalpa, Kinnaur (9,711 ft)',
    image: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=800&q=80',
    description: 'Charming wood-panelled rooms facing the sacred Kinner Kailash range. Excellent sunrise views and warm mountain hospitality.',
    features: ['Kinner Kailash View', 'Attached Bath', 'Hot Water Facility', 'Traditional Kinnauri Meals', 'Room Heating Facility']
  },
  {
    name: 'Tabo Monastery Homestay & Guesthouse',
    type: 'Traditional Mud & Stone Guesthouse',
    location: 'Tabo Village (10,760 ft)',
    image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80',
    description: 'Authentic Spitian mud-brick architecture providing natural thermal insulation, thick woollen quilts, and home-cooked organic local meals.',
    features: ['Warm Mud Architecture', 'Heated Dining Area', 'Thick Himalayan Quilts', 'Local Spitian Food', 'Walking Distance to Monastery']
  },
  {
    name: 'Kaza Winter Alpine Homestay',
    type: 'Traditional Spitian Heated Homestay',
    location: 'Kaza Town (12,500 ft)',
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80',
    description: 'Our flagship winter base in Kaza. Features a traditional central Bukhari (wood/charcoal heating stove), warm woollen seating, and piping hot mountain meals.',
    features: ['Bukhari Wood Stove Heating', 'Insulated Double Bedding', 'Dry Compost & Bucket Hot Water', 'Traditional Spitian Hospitality', 'Central Town Location']
  }
];

export const SPITI_TERMS_AND_CONDITIONS = [
  'Booking Confirmation: Seats are locked and confirmed only after receipt of the booking advance deposit and official WhatsApp acknowledgment from Trek & Stay.',
  'Valid Photo Identification: Carrying an original, government-issued photo identity card (Aadhaar Card, Passport, Voter ID, or Driving License) along with 3 photocopies is strictly mandatory for inner line checkposts.',
  'Itinerary Flexibility & Mountain Conditions: The itinerary is tentative and strictly subject to on-ground Himalayan conditions, snowfall, blizzards, avalanches, road closures by BRO, administrative orders, or police travel advisories. The Trip Captain reserves the full authority to alter, delay, or shorten route segments in the interest of team safety.',
  'Buffer Day Scope & Stay Responsibilities: The package includes 7 nights of scheduled accommodation (Nights 1 to 7). Day 8 is a provisioned buffer to cushion unpredictable mountain weather. Any additional accommodation, meals, or transit expenses required beyond the scheduled 7 nights (Night 8 onwards, or forced halts due to roadblock) are directly payable at actuals by participants.',
  '4×4 Specialized Snow Transfers: The base package includes dedicated mountain tempo traveler / SUV transport. In the event of heavy snow, sheet black ice, or local administration orders prohibiting standard 2WD vehicles on specific stretches, local 4×4 Gypsy/Bolero transfers with snow chains will be arranged at transparent on-ground actual cost, shared pro-rata among participants.',
  'Winter Mountain Amenities & Heating: Due to extreme sub-zero temperatures (-10°C to -25°C), running water pipelines in Spiti freeze solid. Running tap water is replaced by bucket hot water and traditional dry compost eco-toilets in high villages. Traditional Bukhari wood stoves are provided in common dining spaces. Individual room electric heaters, where available, may carry an extra surcharge depending on village power supply.',
  'Meal Plan Inclusions: Only the 2 meals/day (7 Breakfasts & 6 Dinners) specified in the inclusion schedule are covered. Lunches, mid-day snacks, café stops, mineral water, and personal beverages are self-managed by participants.',
  'Participant Conduct & Leave-No-Trace Policy: Participants must maintain strict decorum, follow all safety instructions from the expedition leader, respect Buddhist monastery sanctity and local customs, avoid hazardous off-trail ventures, and practice 100% "Leave-No-Trace" environmental ethics (no littering of plastics or beverage bottles).',
  'Health & Altitude Assessment: Winter Spiti is an extreme high-altitude expedition (12,000 to 14,567 ft). Participants must possess reasonable physical fitness and consult a physician prior to departure if they have asthma, cardiac conditions, or severe hypertension.',
  'No Refund for Voluntary Dropout or Delays: No refund or price concession will be provided if a participant decides to leave the expedition early voluntarily, misses sightseeing due to road closures, or requires evacuation due to personal altitude issues.',
  'Personal Belongings & Electronics: Participants are solely responsible for their personal valuables, cameras, phones, and luggage. Trek & Stay is not liable for loss or cold-induced battery failure of electronic equipment.',
  'Travel Insurance & Emergency Evacuation: Participants are strongly advised to hold comprehensive travel insurance covering high-altitude Himalayan travel. Trek & Stay acts as a tour coordinator; any emergency medical treatment, hospital fees, or helicopter search & rescue evacuation expenses are strictly payable directly by the participant or their insurer.',
  'Definitive Cancellation & Refund Schedule: Cancellations made 30+ days prior to batch departure are eligible for a 90% refund (or 100% future trip voucher); cancellations 15–29 days prior receive a 50% refund; cancellations inside 14 days or no-shows are strictly non-refundable due to pre-contracted winter transport and homestay reservations.',
  'No Guarantee of Specific Winter Phenomena: Sightseeing features such as frozen waterfalls, frozen lakes, fresh snowfall, or border post access (Chitkul/Gue) depend entirely on seasonal weather and safe administrative clearance, and cannot be contractually guaranteed.',
  'Group Discount Terms: Group offer of ₹1,000 OFF per person is valid exclusively for direct group bookings of 9 or more travelers registered simultaneously on the same departure date.'
];
