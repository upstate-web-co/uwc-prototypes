/**
 * Sample inventory for The Tech Shop.
 * Prices are in cents. Tags drive shop filters.
 */

export type Condition = 'New' | 'Refurbished' | 'Used — Excellent' | 'Used — Good'
export type Category = 'laptops' | 'phones' | 'consoles' | 'games' | 'accessories' | 'merch'

export interface Product {
  id: string
  name: string
  brand: string
  category: Category
  price: number
  msrp?: number
  condition: Condition
  stock: number
  warranty: string
  highlight?: 'staff-pick' | 'limited' | 'low-stock'
  blurb: string
  specs?: string[]
  icon: string // emoji-like SVG accent character, no real photos in prototype
}

export const CATEGORIES: { key: Category; label: string }[] = [
  { key: 'laptops', label: 'Laptops' },
  { key: 'phones', label: 'Phones' },
  { key: 'consoles', label: 'Consoles' },
  { key: 'games', label: 'Games' },
  { key: 'accessories', label: 'Accessories' },
  { key: 'merch', label: 'Limited Merch' },
]

export const PRODUCTS: Product[] = [
  // Laptops
  { id: 'l-mbp14-22', name: 'MacBook Pro 14" (M1 Pro)', brand: 'Apple', category: 'laptops', price: 129900, msrp: 199900, condition: 'Refurbished', stock: 2, warranty: '90-day shop warranty', highlight: 'staff-pick', blurb: '16GB / 512GB. Battery cycle count under 80. Boxed with charger.', specs: ['M1 Pro', '16GB RAM', '512GB SSD', 'Ventura'], icon: '💻' },
  { id: 'l-x1c-g10', name: 'ThinkPad X1 Carbon Gen 10', brand: 'Lenovo', category: 'laptops', price: 89900, msrp: 149900, condition: 'Refurbished', stock: 3, warranty: '90-day shop warranty', blurb: 'Business workhorse. New battery, clean Win 11 Pro install.', specs: ['i7-1265U', '16GB RAM', '1TB SSD'], icon: '💻' },
  { id: 'l-dell-xps13', name: 'Dell XPS 13 (2023)', brand: 'Dell', category: 'laptops', price: 74900, condition: 'Used — Excellent', stock: 1, warranty: '60-day shop warranty', highlight: 'low-stock', blurb: 'Tiny dent under hinge — otherwise mint. Great writing laptop.', specs: ['i5-1340P', '16GB', '512GB SSD'], icon: '💻' },
  { id: 'l-mba-m2', name: 'MacBook Air 13" (M2)', brand: 'Apple', category: 'laptops', price: 84900, msrp: 119900, condition: 'Refurbished', stock: 4, warranty: '90-day shop warranty', blurb: 'Midnight. 8/256. Cycle count 30s. Student favorite.', specs: ['M2', '8GB', '256GB'], icon: '💻' },
  { id: 'l-asus-g14', name: 'ASUS ROG Zephyrus G14', brand: 'ASUS', category: 'laptops', price: 109900, condition: 'Used — Excellent', stock: 1, warranty: '60-day shop warranty', highlight: 'low-stock', blurb: 'Portable gaming powerhouse with RTX 4060. Repaste included.', specs: ['Ryzen 9', '16GB', 'RTX 4060'], icon: '💻' },
  { id: 'l-chromebook-spin', name: 'Acer Chromebook Spin 514', brand: 'Acer', category: 'laptops', price: 24900, condition: 'Refurbished', stock: 6, warranty: '90-day shop warranty', blurb: 'Convertible 2-in-1. Perfect for students.', icon: '💻' },
  { id: 'l-hp-eb840', name: 'HP EliteBook 840 G8', brand: 'HP', category: 'laptops', price: 49900, condition: 'Refurbished', stock: 4, warranty: '90-day shop warranty', blurb: 'Bulletproof business laptop. Smart card reader, docking station ready.', icon: '💻' },
  { id: 'l-frame-13', name: 'Framework Laptop 13 (i7)', brand: 'Framework', category: 'laptops', price: 99900, condition: 'Used — Excellent', stock: 1, warranty: '60-day shop warranty', highlight: 'staff-pick', blurb: 'Fully modular & repairable. We stock the parts.', icon: '💻' },

  // Phones
  { id: 'p-iphone15', name: 'iPhone 15 (128GB)', brand: 'Apple', category: 'phones', price: 64900, msrp: 79900, condition: 'Used — Excellent', stock: 3, warranty: '60-day shop warranty', blurb: 'Unlocked, battery health 96%. Comes with new case.', icon: '📱' },
  { id: 'p-iphone13', name: 'iPhone 13 (256GB)', brand: 'Apple', category: 'phones', price: 49900, condition: 'Refurbished', stock: 5, warranty: '90-day shop warranty', highlight: 'staff-pick', blurb: 'Our best value iPhone right now. Battery > 90%.', icon: '📱' },
  { id: 'p-iphone-se', name: 'iPhone SE (2022)', brand: 'Apple', category: 'phones', price: 27900, condition: 'Refurbished', stock: 4, warranty: '90-day shop warranty', blurb: 'Home button forever. Tough little phone.', icon: '📱' },
  { id: 'p-s23', name: 'Samsung Galaxy S23', brand: 'Samsung', category: 'phones', price: 52900, condition: 'Used — Excellent', stock: 2, warranty: '60-day shop warranty', blurb: 'Unlocked, dual-SIM. Phantom black, no scratches on glass.', icon: '📱' },
  { id: 'p-pixel8', name: 'Google Pixel 8', brand: 'Google', category: 'phones', price: 47900, condition: 'Used — Excellent', stock: 2, warranty: '60-day shop warranty', blurb: 'Tensor G3, best camera under $500.', icon: '📱' },
  { id: 'p-pixel7a', name: 'Google Pixel 7a', brand: 'Google', category: 'phones', price: 32900, condition: 'Refurbished', stock: 3, warranty: '90-day shop warranty', blurb: 'Battery replaced, like-new screen.', icon: '📱' },
  { id: 'p-oneplus11', name: 'OnePlus 11', brand: 'OnePlus', category: 'phones', price: 44900, condition: 'Used — Good', stock: 1, warranty: '60-day shop warranty', highlight: 'low-stock', blurb: 'Light scuffs on frame. Performance still rips.', icon: '📱' },
  { id: 'p-iphone-12-mini', name: 'iPhone 12 mini', brand: 'Apple', category: 'phones', price: 32900, condition: 'Refurbished', stock: 2, warranty: '90-day shop warranty', blurb: 'For people who still want a small phone. New battery.', icon: '📱' },

  // Consoles
  { id: 'c-ps5-slim', name: 'PlayStation 5 Slim (Disc)', brand: 'Sony', category: 'consoles', price: 44900, msrp: 49900, condition: 'Used — Excellent', stock: 2, warranty: '60-day shop warranty', highlight: 'staff-pick', blurb: 'Two controllers, all cables. We tested every port.', icon: '🎮' },
  { id: 'c-ps5-digital', name: 'PlayStation 5 Digital', brand: 'Sony', category: 'consoles', price: 39900, condition: 'Used — Excellent', stock: 1, warranty: '60-day shop warranty', highlight: 'low-stock', blurb: 'One DualSense, factory-reset.', icon: '🎮' },
  { id: 'c-xsx', name: 'Xbox Series X', brand: 'Microsoft', category: 'consoles', price: 42900, condition: 'Used — Excellent', stock: 2, warranty: '60-day shop warranty', blurb: '1TB. One wireless controller, HDMI cable.', icon: '🎮' },
  { id: 'c-xss', name: 'Xbox Series S', brand: 'Microsoft', category: 'consoles', price: 22900, condition: 'Refurbished', stock: 3, warranty: '90-day shop warranty', blurb: 'Compact, perfect dorm-room machine.', icon: '🎮' },
  { id: 'c-switch-oled', name: 'Nintendo Switch OLED', brand: 'Nintendo', category: 'consoles', price: 27900, condition: 'Refurbished', stock: 4, warranty: '90-day shop warranty', blurb: 'Joycon drift fixed, dock + grip included.', icon: '🎮' },
  { id: 'c-switch-lite', name: 'Nintendo Switch Lite', brand: 'Nintendo', category: 'consoles', price: 16900, condition: 'Used — Good', stock: 2, warranty: '60-day shop warranty', blurb: 'Turquoise. Light cosmetic wear, screen flawless.', icon: '🎮' },
  { id: 'c-steamdeck', name: 'Steam Deck OLED 1TB', brand: 'Valve', category: 'consoles', price: 64900, condition: 'Used — Excellent', stock: 1, warranty: '60-day shop warranty', highlight: 'staff-pick', blurb: 'OLED model, carrying case, all original packaging.', icon: '🎮' },

  // Games
  { id: 'g-zelda-totk', name: 'Zelda: Tears of the Kingdom (Switch)', brand: 'Nintendo', category: 'games', price: 4900, condition: 'Used — Excellent', stock: 3, warranty: 'Trade-in eligible', blurb: 'Cart + case, no scratches.', icon: '🎮' },
  { id: 'g-eldenring', name: 'Elden Ring (PS5)', brand: 'Bandai Namco', category: 'games', price: 3900, condition: 'Used — Excellent', stock: 2, warranty: 'Trade-in eligible', blurb: 'Standard edition. You\'ll die a lot.', icon: '🎮' },
  { id: 'g-spiderman2', name: "Marvel's Spider-Man 2 (PS5)", brand: 'Sony', category: 'games', price: 4900, condition: 'Used — Excellent', stock: 4, warranty: 'Trade-in eligible', blurb: 'Disc edition.', icon: '🎮' },
  { id: 'g-forza', name: 'Forza Horizon 5 (Xbox)', brand: 'Microsoft', category: 'games', price: 3500, condition: 'Used — Excellent', stock: 3, warranty: 'Trade-in eligible', blurb: 'Premium edition disc, all DLC codes redeemed.', icon: '🎮' },
  { id: 'g-mario-wonder', name: 'Super Mario Bros Wonder (Switch)', brand: 'Nintendo', category: 'games', price: 4500, condition: 'Used — Excellent', stock: 5, warranty: 'Trade-in eligible', blurb: 'Bring this one for trade — we always have buyers.', icon: '🎮' },

  // Accessories
  { id: 'a-airpods-pro', name: 'AirPods Pro (2nd gen)', brand: 'Apple', category: 'accessories', price: 17900, condition: 'Used — Excellent', stock: 3, warranty: '60-day shop warranty', blurb: 'New silicon tips. Battery replaced.', icon: '🎧' },
  { id: 'a-dualsense', name: 'DualSense Controller', brand: 'Sony', category: 'accessories', price: 5900, condition: 'Refurbished', stock: 5, warranty: '60-day shop warranty', blurb: 'Stick drift fixed, like-new triggers.', icon: '🎮' },
  { id: 'a-xbox-pad', name: 'Xbox Wireless Controller', brand: 'Microsoft', category: 'accessories', price: 4900, condition: 'Refurbished', stock: 4, warranty: '60-day shop warranty', blurb: 'Carbon black.', icon: '🎮' },
  { id: 'a-keychron-k2', name: 'Keychron K2 (V2)', brand: 'Keychron', category: 'accessories', price: 7900, condition: 'New', stock: 2, warranty: 'Manufacturer 1-year', blurb: 'Wireless mechanical. Brown switches.', icon: '⌨️' },
  { id: 'a-mxmaster3', name: 'Logitech MX Master 3S', brand: 'Logitech', category: 'accessories', price: 8900, condition: 'Used — Excellent', stock: 2, warranty: '60-day shop warranty', blurb: 'Smooth scroll, USB-C charging.', icon: '🖱️' },
  { id: 'a-ssd-2tb', name: 'Samsung T7 Shield 2TB', brand: 'Samsung', category: 'accessories', price: 12900, condition: 'New', stock: 3, warranty: 'Manufacturer 3-year', blurb: 'Drop-proof portable SSD.', icon: '💾' },
  { id: 'a-cable-pack', name: 'USB-C Cable Triple Pack', brand: 'Anker', category: 'accessories', price: 2400, condition: 'New', stock: 12, warranty: '—', blurb: '3ft / 6ft / 10ft. 100W rated.', icon: '🔌' },

  // Limited Merch (monthly drop)
  { id: 'm-hoodie-may', name: 'Tech Shop Hoodie — May "Reboot" Drop', brand: 'The Tech Shop', category: 'merch', price: 5900, condition: 'New', stock: 8, warranty: '—', highlight: 'limited', blurb: 'Limited edition. Embroidered chest, soft cotton fleece. 40 made.', icon: '👕' },
  { id: 'm-tee-may', name: 'Tech Shop Tee — "ESC" Tee', brand: 'The Tech Shop', category: 'merch', price: 2900, condition: 'New', stock: 14, warranty: '—', highlight: 'limited', blurb: 'Monthly drop. The ESC key, but on you.', icon: '👕' },
  { id: 'm-sticker', name: 'Sticker Pack (Vol. 4)', brand: 'The Tech Shop', category: 'merch', price: 800, condition: 'New', stock: 30, warranty: '—', blurb: 'Five stickers. Slap on your laptop, become legend.', icon: '🏷️' },
  { id: 'm-mug', name: '"Have you tried turning it off and on" Mug', brand: 'The Tech Shop', category: 'merch', price: 1800, condition: 'New', stock: 12, warranty: '—', blurb: 'Ceramic, 12oz. Coffee not included.', icon: '☕' },
]

export const FEATURED_IDS: string[] = ['l-mbp14-22', 'p-iphone13', 'c-ps5-slim', 'c-switch-oled', 'l-mba-m2', 'm-hoodie-may']

export function formatPrice(cents: number): string {
  return '$' + (cents / 100).toFixed(cents % 100 === 0 ? 0 : 2)
}
