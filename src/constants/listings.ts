import {ImageSourcePropType} from 'react-native';
import imagePath from './imagePath';

export type Category = 'all' | 'homes' | 'experiences' | 'services';
export type ListingKind = 'home' | 'experience' | 'service';

export type Listing = {
  id: string;
  kind: ListingKind;
  title: string;
  city: string;
  price: number;
  unit: string;
  rating?: number;
  reviews?: number;
  badge?: string;
  image: ImageSourcePropType;
  summary: string;
};

export type FeedSection = {
  id: string;
  title: string;
  subtitle?: string;
  listingIds: string[];
};

export type FeedItem =
  | ({type: 'section'} & FeedSection)
  | {type: 'banner'; id: string}
  | {type: 'heading'; id: string; title: string};

export const categories: {id: Category; label: string; icon: number}[] = [
  {id: 'all', label: 'All', icon: imagePath.globe},
  {id: 'homes', label: 'Homes', icon: imagePath.house},
  {id: 'experiences', label: 'Experiences', icon: imagePath.balloon},
  {id: 'services', label: 'Services', icon: imagePath.bell},
];

const favourite = 'Guest favourite';
const home = (
  id: string,
  title: string,
  city: string,
  price: number,
  rating: number,
  image: ImageSourcePropType,
  options: Partial<Listing> = {},
): Listing => ({
  id,
  kind: 'home',
  title,
  city,
  price,
  unit: 'for 2 nights',
  rating,
  reviews: 24 + Math.floor((price / 7) % 180),
  image,
  summary: title.startsWith('Room')
    ? 'Private room · 1 bed · Shared bathroom'
    : 'Entire home · 4 guests · 2 bedrooms · 2 bathrooms',
  ...options,
});
const activity = (
  id: string,
  kind: ListingKind,
  title: string,
  city: string,
  price: number,
  image: ImageSourcePropType,
  options: Partial<Listing> = {},
): Listing => ({
  id,
  kind,
  title,
  city,
  price,
  unit: '/ guest',
  rating: 5,
  reviews: 38 + (price % 90),
  image,
  summary:
    kind === 'experience'
      ? '2.5 hours · Hosted in English · Up to 10 guests'
      : 'At your location · 1 hour session · Edited photos included',
  ...options,
});

export const listings: Listing[] = [
  home(
    'hyd-1',
    'Flat in Hyderabad',
    'Hyderabad',
    9801,
    5,
    imagePath.hyderabad1,
  ),
  home(
    'hyd-2',
    'Flat in Rai Durg',
    'Hyderabad',
    8000,
    5,
    imagePath.hyderabad2,
    {badge: favourite},
  ),
  home(
    'hyd-3',
    'Flat in Hyderabad',
    'Hyderabad',
    9000,
    5,
    imagePath.hyderabad3,
    {badge: favourite},
  ),
  home(
    'hyd-4',
    'Flat in Hyderabad',
    'Hyderabad',
    12854,
    5,
    imagePath.hyderabad4,
  ),
  home(
    'hyd-5',
    'Room in Hyderabad',
    'Hyderabad',
    2400,
    4.84,
    imagePath.hyderabad5,
    {badge: favourite},
  ),
  home(
    'gur-1',
    'Place to stay in Gurugram',
    'Gurugram',
    10656,
    5,
    imagePath.gurugram1,
  ),
  home('gur-2', 'Flat in Gurugram', 'Gurugram', 6996, 5, imagePath.gurugram2, {
    badge: favourite,
  }),
  home(
    'chd-1',
    'Home in Sahibzada Ajit Singh Nagar',
    'Chandigarh',
    8049,
    5,
    imagePath.chandigarh1,
    {badge: favourite},
  ),
  home(
    'chd-2',
    'Home in Chandigarh',
    'Chandigarh',
    19515,
    4.85,
    imagePath.chandigarh2,
    {badge: favourite},
  ),
  home(
    'chd-3',
    'Flat in Chandigarh',
    'Chandigarh',
    7150,
    5,
    imagePath.chandigarh3,
    {badge: favourite},
  ),
  home(
    'chd-4',
    'Flat in Sahibzada Ajit Singh Nagar',
    'Chandigarh',
    38000,
    5,
    imagePath.chandigarh4,
    {badge: favourite},
  ),
  home(
    'del-1',
    'Room in East of Kailash',
    'New Delhi',
    1998,
    4.82,
    imagePath.delhi1,
    {badge: favourite},
  ),
  home(
    'del-2',
    'Room in Greater Kailash',
    'New Delhi',
    1700,
    5,
    imagePath.delhi2,
    {badge: favourite},
  ),
  home('lko-1', 'Home in Ashiyana', 'Lucknow', 15538, 5, imagePath.lucknow1, {
    badge: favourite,
  }),
  home('lko-2', 'Room in Aliganj', 'Lucknow', 2740, 4.89, imagePath.lucknow2, {
    badge: favourite,
  }),
  home(
    'tvm-1',
    'Room in Perookada',
    'Thiruvananthapuram',
    1091,
    5,
    imagePath.trivandrum1,
    {unit: 'for 1 night'},
  ),
  home(
    'tvm-2',
    'Room in Vazhuthacaud',
    'Thiruvananthapuram',
    1400,
    4.9,
    imagePath.trivandrum2,
    {unit: 'for 1 night', badge: favourite},
  ),
  home('mum-1', 'Room in Vikhroli West', 'Mumbai', 4590, 5, imagePath.mumbai1, {
    badge: favourite,
  }),
  home(
    'mum-2',
    'Shared room in Santacruz East',
    'Mumbai',
    2598,
    4.88,
    imagePath.mumbai2,
  ),
  home(
    'pdy-1',
    'Apartment in Puducherry',
    'Puducherry',
    13500,
    4.89,
    imagePath.puducherry1,
    {badge: favourite},
  ),
  home(
    'pdy-2',
    'Flat in Puducherry',
    'Puducherry',
    10490,
    4.94,
    imagePath.puducherry2,
    {badge: favourite},
  ),
  home(
    'blr-1',
    'Room in Mahadevapura',
    'Bengaluru',
    2218,
    4.91,
    imagePath.bengaluru1,
    {unit: 'for 1 night', badge: favourite},
  ),
  home(
    'blr-2',
    'Room in Bengaluru',
    'Bengaluru',
    1195,
    4.96,
    imagePath.bengaluru2,
    {unit: 'for 1 night', badge: favourite},
  ),
  home('goa-1', 'Home in Arpora', 'North Goa', 24527, 5, imagePath.goa1, {
    badge: favourite,
  }),
  home('goa-2', 'Flat in Calangute', 'North Goa', 8698, 4.95, imagePath.goa2, {
    badge: favourite,
  }),
  home('dxb-1', 'Villa in Sharjah', 'Dubai', 160829, 5, imagePath.dubai1),
  home('dxb-2', 'Flat in Dubai', 'Dubai', 47392, 5, imagePath.dubai2),
  activity(
    'koc-1',
    'experience',
    'Kochi stories with a local storyteller',
    'Kochi',
    1500,
    imagePath.kochi1,
    {badge: 'Trending'},
  ),
  activity(
    'koc-2',
    'experience',
    'Explore Kochi - food, history & culture',
    'Kochi',
    5500,
    imagePath.kochi2,
    {badge: 'Trending'},
  ),
  activity(
    'koc-3',
    'experience',
    'Kochi heritage walk & tuk-tuk ride',
    'Kochi',
    2000,
    imagePath.kochi3,
    {badge: 'Trending'},
  ),
  activity(
    'tmr-1',
    'experience',
    'Learn watercolour and sketch with a local artist',
    'Kochi',
    2500,
    imagePath.tomorrow1,
    {badge: '10:00'},
  ),
  activity(
    'tmr-2',
    'experience',
    'Walk spice N silk routes at sunrise',
    'Kochi',
    786,
    imagePath.tomorrow2,
    {badge: '06:45', rating: undefined},
  ),
  activity(
    'cap-1',
    'service',
    'Stylish portraits and love stories',
    'Kochi',
    2399,
    imagePath.portrait1,
  ),
  activity(
    'cap-2',
    'service',
    'Creative photography by the hills',
    'Kochi',
    9000,
    imagePath.portrait2,
    {unit: '/ group'},
  ),
  activity(
    'cap-3',
    'service',
    'Photography by a local studio',
    'Kochi',
    2000,
    imagePath.portrait3,
    {rating: undefined},
  ),
  activity(
    'svc-1',
    'service',
    'Creative photography',
    'Bengaluru',
    3499,
    imagePath.service1,
  ),
  activity(
    'svc-2',
    'service',
    'Joyful family portraits',
    'Bengaluru',
    4200,
    imagePath.service2,
    {rating: 4.97},
  ),
];

export const listingById = (id: string) =>
  listings.find(item => item.id === id);

const section = (
  id: string,
  title: string,
  subtitle: string | undefined,
  listingIds: string[],
): FeedItem => ({type: 'section', id, title, subtitle, listingIds});

export const feeds: Record<Category, FeedItem[]> = {
  all: [
    section(
      'stay-hyderabad',
      'Stay in Hyderabad',
      'Old city in India with Charminar',
      ['hyd-1', 'hyd-2', 'hyd-3', 'hyd-4', 'hyd-5'],
    ),
    {type: 'banner', id: 'banner'},
    section(
      'gurugram',
      'Places to stay in Gurugram',
      'Corporate center next door to Delhi',
      ['gur-1', 'gur-2'],
    ),
    section(
      'chandigarh',
      'Popular homes in Chandigarh',
      "India's modernist capital city",
      ['chd-1', 'chd-2'],
    ),
    section(
      'delhi',
      'Stay in New Delhi',
      "India's capital with grand boulevards",
      ['del-1', 'del-2'],
    ),
    section(
      'lucknow',
      'Popular homes in Lucknow',
      'North Indian city with Mughal cuisine',
      ['lko-1', 'lko-2'],
    ),
    section(
      'trivandrum',
      'Available in Thiruvananthapuram this weekend',
      "Kerala's capital with temple landmarks",
      ['tvm-1', 'tvm-2'],
    ),
    section(
      'mumbai',
      'Homes in Mumbai',
      "Bollywood hub on India's west coast",
      ['mum-1', 'mum-2'],
    ),
    section(
      'puducherry',
      'Check out homes in Puducherry',
      'Colonial city in southeast India',
      ['pdy-1', 'pdy-2'],
    ),
    section(
      'bengaluru',
      'Available in Bengaluru this weekend',
      'South Indian tech hub and garden city',
      ['blr-1', 'blr-2'],
    ),
    section(
      'goa',
      'Available next month in North Goa',
      'Indian coast with beach shacks',
      ['goa-1', 'goa-2'],
    ),
    section('kochi-experiences', 'Popular experiences in Kochi', undefined, [
      'koc-1',
      'koc-2',
      'koc-3',
    ]),
    section('capture', 'Capture memories nearby', undefined, [
      'cap-1',
      'cap-2',
      'cap-3',
    ]),
  ],
  homes: [
    section(
      'dubai',
      'Popular homes in Dubai',
      'Skyscrapers, malls, and desert resorts',
      ['dxb-1', 'dxb-2'],
    ),
    section(
      'chandigarh-next',
      'Available next month in Chandigarh',
      "India's modernist capital city",
      ['chd-3', 'chd-4'],
    ),
    section(
      'homes-chandigarh',
      'Popular homes in Chandigarh',
      "India's modernist capital city",
      ['chd-1', 'chd-2'],
    ),
    section(
      'homes-bengaluru',
      'Available in Bengaluru this weekend',
      'South Indian tech hub and garden city',
      ['blr-1', 'blr-2'],
    ),
    section(
      'homes-hyderabad',
      'Stay in Hyderabad',
      'Old city in India with Charminar',
      ['hyd-1', 'hyd-2', 'hyd-3', 'hyd-4', 'hyd-5'],
    ),
    section(
      'homes-goa',
      'Available next month in North Goa',
      'Indian coast with beach shacks',
      ['goa-1', 'goa-2'],
    ),
  ],
  experiences: [
    section('exp-kochi', 'Popular experiences in Kochi', undefined, [
      'koc-1',
      'koc-2',
      'koc-3',
    ]),
    section('exp-tomorrow', 'Tomorrow in Kochi', undefined, ['tmr-1', 'tmr-2']),
    section('exp-originals', 'Airbnb Originals', undefined, ['koc-2', 'tmr-1']),
    section('exp-capture', 'Capture memories nearby', undefined, [
      'cap-1',
      'cap-2',
      'cap-3',
    ]),
  ],
  services: [
    section('svc-photography', 'Photography', undefined, [
      'cap-1',
      'cap-2',
      'cap-3',
    ]),
    {type: 'heading', id: 'svc-heading', title: 'Discover services on Airbnb'},
    section('svc-bengaluru', 'Services in Bengaluru', undefined, [
      'svc-1',
      'svc-2',
    ]),
  ],
};

export const findSection = (id: string) => {
  for (const items of Object.values(feeds)) {
    const match = items.find(item => item.id === id);
    if (match?.type === 'section') return match;
  }
};

export const formatPrice = (value: number) =>
  `₹${String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;

export const priceLine = (item: Listing) =>
  item.kind === 'home'
    ? `${formatPrice(item.price)} ${item.unit}`
    : `From ${formatPrice(item.price)} ${item.unit}`;

export type Destination = {
  id: string;
  name: string;
  description: string;
  city?: string;
  tone?: 'green' | 'red' | 'forest';
};

export const destinations: Destination[] = [
  {id: 'nearby', name: 'Nearby', description: 'Find what’s around you'},
  {
    id: 'chandigarh',
    name: 'Chandigarh',
    description: 'A hidden gem',
    city: 'Chandigarh',
    tone: 'green',
  },
  {
    id: 'bengaluru',
    name: 'Bengaluru, Karnataka',
    description: 'For sights like Lalbagh Botanical Garden',
    city: 'Bengaluru',
    tone: 'red',
  },
  {
    id: 'delhi',
    name: 'New Delhi, Delhi',
    description: 'For its stunning architecture',
    city: 'New Delhi',
    tone: 'forest',
  },
  {
    id: 'hyderabad',
    name: 'Hyderabad, Telangana',
    description: 'For its historic old city',
    city: 'Hyderabad',
    tone: 'red',
  },
  {
    id: 'goa',
    name: 'North Goa, Goa',
    description: 'For beach shacks and sunsets',
    city: 'North Goa',
    tone: 'green',
  },
  {
    id: 'mumbai',
    name: 'Mumbai, Maharashtra',
    description: 'For the sea-facing promenade',
    city: 'Mumbai',
    tone: 'forest',
  },
  {
    id: 'kochi',
    name: 'Kochi, Kerala',
    description: 'For heritage walks and food',
    city: 'Kochi',
    tone: 'green',
  },
  {
    id: 'lucknow',
    name: 'Lucknow, Uttar Pradesh',
    description: 'For Mughal cuisine',
    city: 'Lucknow',
    tone: 'red',
  },
  {
    id: 'puducherry',
    name: 'Puducherry',
    description: 'For its colonial quarter',
    city: 'Puducherry',
    tone: 'forest',
  },
  {
    id: 'gurugram',
    name: 'Gurugram, Haryana',
    description: 'Next door to Delhi',
    city: 'Gurugram',
    tone: 'green',
  },
  {
    id: 'trivandrum',
    name: 'Thiruvananthapuram, Kerala',
    description: 'For temple landmarks',
    city: 'Thiruvananthapuram',
    tone: 'red',
  },
  {
    id: 'dubai',
    name: 'Dubai, United Arab Emirates',
    description: 'For skyscrapers and desert resorts',
    city: 'Dubai',
    tone: 'forest',
  },
];

export const searchDestinations = (query: string) => {
  const text = query.trim().toLowerCase();
  if (!text) return destinations.slice(0, 4);
  return destinations.filter(
    item => item.id !== 'nearby' && item.name.toLowerCase().includes(text),
  );
};

export const searchListings = (city: string | undefined, kind: ListingKind) =>
  listings.filter(item => item.kind === kind && (!city || item.city === city));
