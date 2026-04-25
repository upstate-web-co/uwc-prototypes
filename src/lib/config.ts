export const SITE = {
  name: 'The Car Wash',
  tagline: 'Drive In. Drive Clean.',
  url: 'https://thecarwash.pages.dev',
  email: 'joshkim04@gmail.com',
  phone: '(864) 555-0182',
  address: '123 Pelham Rd, Greer, SC 29650',
  hours: 'Mon–Sat 7am–8pm · Sun 8am–6pm',
  facebook: 'https://facebook.com/thecar',
  instagram: 'https://instagram.com/thecar',
  indexable: false,
} as const

export const BRAND = {
  primaryColor: '#0284c7',
  accentColor: '#fbbf24',
} as const

export interface PackageItem {
  id: string
  name: string
  price: number
  priceDisplay: string
  period: 'mo' | null
  description: string
  features: string[]
  popular: boolean
  recurring: boolean
}

export const PACKAGES: PackageItem[] = [
  {
    id: 'basic',
    name: 'Basic Wash',
    price: 800,
    priceDisplay: '$8',
    period: null,
    description: 'A quick, thorough rinse to knock off the daily grime.',
    features: [
      'High-pressure exterior spray',
      'Undercarriage rinse',
      'Spot-free final rinse',
      'Air dry',
    ],
    popular: false,
    recurring: false,
  },
  {
    id: 'classic',
    name: 'Classic Clean',
    price: 1500,
    priceDisplay: '$15',
    period: null,
    description: 'Full exterior wash with wheel cleaning and a polished finish.',
    features: [
      'Everything in Basic',
      'Wheel & tire scrub',
      'Foam pre-soak',
      'Spot-free wax rinse',
      'Soft-cloth finish',
    ],
    popular: false,
    recurring: false,
  },
  {
    id: 'premium',
    name: 'Premium Shine',
    price: 2500,
    priceDisplay: '$25',
    period: null,
    description: 'Our signature wash — outside spotless, inside fresh.',
    features: [
      'Everything in Classic',
      'Interior vacuum',
      'Window cleaning',
      'Tire shine',
      'Air freshener',
      'Dashboard wipe-down',
    ],
    popular: true,
    recurring: false,
  },
  {
    id: 'unlimited-basic',
    name: 'Unlimited Basic',
    price: 3500,
    priceDisplay: '$35',
    period: 'mo',
    description: 'Wash as often as you like with unlimited Basic Washes.',
    features: [
      'Unlimited Basic Washes',
      'Priority drive-in lane',
      'Digital membership pass',
      'Cancel anytime',
    ],
    popular: false,
    recurring: true,
  },
  {
    id: 'unlimited-premium',
    name: 'Unlimited Premium',
    price: 5500,
    priceDisplay: '$55',
    period: 'mo',
    description: 'The full experience, every single visit, every month.',
    features: [
      'Unlimited Premium Shine Washes',
      'Priority drive-in lane',
      'Free tire shine every visit',
      'Digital membership pass',
      'Cancel anytime',
    ],
    popular: true,
    recurring: true,
  },
]

export const ERRORS = {
  VALIDATION_ERROR: { status: 400, message: 'Validation failed' },
  NOT_FOUND: { status: 404, message: 'Resource not found' },
  UNAUTHORIZED: { status: 401, message: 'Unauthorized' },
  CONTACT_SEND_FAILED: { status: 500, message: 'Failed to send message' },
  CHECKOUT_FAILED: { status: 500, message: 'Failed to create checkout session' },
} as const
