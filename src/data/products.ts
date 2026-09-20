/**
 * ------------------------------------------------------------------
 * Pro-Pathra — Product catalogue
 * ------------------------------------------------------------------
 * Pure data. Swap this module (or point it at an API) later without
 * touching any UI code. All nutrition figures are approximate and
 * based on standard portion sizes.
 */

import type { BowlArt } from '../components/art/types'

export type ProductType = 'bowl' | 'wrap' | 'soup'
export type Diet = 'veg' | 'nonveg'

export type NutritionRange = {
  label: string
  /** e.g. "40–45g" */
  value: string
  kind: 'protein' | 'veg' | 'flag'
}

export type Badge = {
  text: string
  tone: 'turmeric' | 'green' | 'terra' | 'cream'
}

export type Product = {
  id: string
  type: ProductType
  name: string
  diet: Diet
  /** Short one-liner used on the card. */
  blurb: string
  ingredients: string[]
  price: number
  badge?: Badge
  nutrition?: NutritionRange
  /** Visual recipe used by the SVG bowl illustration. */
  art?: BowlArt
  /** Optional real product photo — used automatically instead of the illustration. */
  image?: string
  /** Marks the signature / hero item. */
  featured?: boolean
  available?: boolean
}

/* ------------------------------------------------------------------ */
/* Bowls                                                                 */
/* ------------------------------------------------------------------ */

export const bowls: Product[] = [
  {
    id: 'bowl-namma-chicken',
    type: 'bowl',
    name: 'Namma Chicken Pātra',
    diet: 'nonveg',
    blurb: 'Our signature bowl — chicken tikka, egg whites and chickpeas over rice.',
    ingredients: [
      'Rice',
      'Chicken tikka',
      'Egg whites',
      'Chickpeas',
      'Carrot',
      'Tomato',
      'Onion',
      'Sweet corn',
      'Garlic curd',
      'Lemon',
      'Pepper',
    ],
    price: 179,
    badge: { text: 'High Protein', tone: 'turmeric' },
    nutrition: { label: 'Protein', value: '~40–45g', kind: 'protein' },
    image: '/products/namma-chicken.png',
    art: {
      base: 'rice',
      proteins: ['chicken', 'eggwhite', 'chickpea'],
      veg: ['carrot', 'tomato', 'onion', 'corn'],
      dressing: 'curd',
      garnish: ['chilli', 'pepper'],
    },
    featured: true,
  },
  {
    id: 'bowl-muttai-power',
    type: 'bowl',
    name: 'Muttai Power Pātra',
    diet: 'nonveg',
    blurb: 'Eggs and black chana with fresh crunch — simple, filling, everyday.',
    ingredients: [
      'Rice',
      'Egg whites',
      'Whole egg',
      'Black chana',
      'Fresh vegetables',
      'Garlic curd',
      'Lemon',
      'Pepper',
    ],
    price: 129,
    nutrition: { label: 'Protein', value: '~28–32g', kind: 'protein' },
    image: '/products/namma-chicken.png',
    art: {
      base: 'rice',
      proteins: ['eggwhite', 'egg', 'chana'],
      veg: ['carrot', 'tomato', 'onion'],
      dressing: 'curd',
      garnish: ['lemon', 'pepper'],
    },
  },
  {
    id: 'bowl-chana-champion',
    type: 'bowl',
    name: 'Chana Champion Pātra',
    diet: 'nonveg',
    blurb: 'A proud vegetarian bowl of chickpeas, rajma and jeera rice.',
    ingredients: [
      'Jeera rice',
      'Chickpeas',
      'Rajma',
      'Egg whites',
      'Vegetables',
      'Garlic curd',
      'Lemon',
      'Spices',
    ],
    price: 139,
    nutrition: { label: 'Protein', value: '~23–27g', kind: 'protein' },
    image: '/products/namma-chicken.png',
    art: {
      base: 'jeerarice',
      proteins: ['chickpea', 'rajma', 'eggwhite'],
      veg: ['carrot', 'tomato', 'onion', 'corn'],
      dressing: 'curd',
      garnish: ['lemon', 'pepper'],
    },
  },
  {
    id: 'bowl-double-chicken',
    type: 'bowl',
    name: 'Double Protein Chicken Pātra',
    diet: 'nonveg',
    blurb: '150g of chicken tikka, egg whites and chickpeas. Serious fuel.',
    ingredients: [
      'Rice',
      '150g chicken tikka',
      'Egg whites',
      'Chickpeas',
      'Vegetables',
      'Garlic curd',
      'Lemon',
    ],
    price: 219,
    badge: { text: '50g+ Protein', tone: 'green' },
    nutrition: { label: 'Protein', value: '~50–55g', kind: 'protein' },
    image: '/products/namma-chicken.png',
    art: {
      base: 'rice',
      proteins: ['chicken', 'chicken', 'eggwhite', 'chickpea'],
      veg: ['carrot', 'tomato', 'onion', 'corn'],
      dressing: 'curd',
      garnish: ['chilli', 'pepper'],
    },
  },
  {
    id: 'bowl-lemon-pepper-chicken',
    type: 'bowl',
    name: 'Lemon Pepper Chicken Pātra',
    diet: 'nonveg',
    blurb: 'Bright lemon, cracked pepper and juicy chicken tikka over rice.',
    ingredients: [
      'Rice',
      'Chicken tikka',
      'Egg whites',
      'Chickpeas',
      'Fresh vegetables',
      'Lemon',
      'Pepper',
      'Garlic curd',
    ],
    price: 169,
    nutrition: { label: 'Protein', value: '~38–43g', kind: 'protein' },
    image: '/products/namma-chicken.png',
    art: {
      base: 'rice',
      proteins: ['chicken', 'eggwhite', 'chickpea'],
      veg: ['tomato', 'onion', 'corn'],
      dressing: 'lemon',
      garnish: ['lemon', 'chilli', 'pepper'],
    },
  },
  {
    id: 'bowl-naatu-veg',
    type: 'bowl',
    name: 'Naatu Veg Protein Pātra',
    diet: 'veg',
    blurb: 'Black chana, rajma and paneer on jeera rice — pure desi protein.',
    ingredients: [
      'Jeera rice',
      'Black chana',
      'Rajma',
      'Paneer',
      'Fresh vegetables',
      'Garlic curd',
      'Lemon',
      'Pepper',
    ],
    price: 159,
    badge: { text: 'Vegetarian', tone: 'green' },
    nutrition: { label: 'Protein', value: '~25–30g', kind: 'protein' },
    image: '/products/namma-chicken.png',
    art: {
      base: 'jeerarice',
      proteins: ['chana', 'rajma', 'paneer'],
      veg: ['carrot', 'tomato', 'onion', 'corn'],
      dressing: 'curd',
      garnish: ['lemon', 'pepper', 'chilli'],
    },
  },
]

/* ------------------------------------------------------------------ */
/* Wraps                                                                 */
/* ------------------------------------------------------------------ */

export const wraps: Product[] = [
  {
    id: 'wrap-pepper-chicken',
    type: 'wrap',
    name: 'Pepper Chicken Wrap',
    diet: 'nonveg',
    blurb: 'Protein chapati, chicken tikka, vegetables and a peppery garlic curd.',
    ingredients: ['Protein chapati', 'Chicken tikka', 'Vegetables', 'Garlic curd', 'Pepper', 'Lemon'],
    price: 149,
    nutrition: { label: 'Protein', value: '~30–35g', kind: 'protein' },
    image: '/products/wraps.png',
    art: {
      base: 'wrap',
      proteins: ['chicken', 'eggwhite'],
      veg: ['tomato', 'onion', 'corn'],
      dressing: 'curd',
      garnish: ['pepper'],
    },
  },
  {
    id: 'wrap-chicken-egg',
    type: 'wrap',
    name: 'Chicken & Egg Wrap',
    diet: 'nonveg',
    blurb: 'Chicken, egg whites and a curd dressing wrapped in protein chapati.',
    ingredients: ['Protein chapati', 'Chicken', 'Egg whites', 'Vegetables', 'Curd dressing'],
    price: 169,
    nutrition: { label: 'Protein', value: '~35g', kind: 'protein' },
    image: '/products/wraps.png',
    art: {
      base: 'wrap',
      proteins: ['chicken', 'eggwhite'],
      veg: ['carrot', 'tomato', 'onion'],
      dressing: 'curd',
      garnish: ['lemon'],
    },
  },
  {
    id: 'wrap-egg-chana',
    type: 'wrap',
    name: 'Egg & Chana Wrap',
    diet: 'nonveg',
    blurb: 'Egg, chickpeas and garlic curd — an affordable everyday protein wrap.',
    ingredients: ['Protein chapati', 'Egg', 'Chickpeas', 'Vegetables', 'Garlic curd'],
    price: 119,
    nutrition: { label: 'Protein', value: '~22–27g', kind: 'protein' },
    image: '/products/wraps.png',
    art: {
      base: 'wrap',
      proteins: ['egg', 'chickpea'],
      veg: ['tomato', 'onion', 'corn'],
      dressing: 'curd',
      garnish: [],
    },
  },
  {
    id: 'wrap-paneer-protein',
    type: 'wrap',
    name: 'Paneer Protein Wrap',
    diet: 'veg',
    blurb: 'Paneer, chickpeas and a light curd dressing in a protein chapati.',
    ingredients: ['Protein chapati', 'Paneer', 'Chickpeas', 'Vegetables', 'Curd dressing'],
    price: 139,
    badge: { text: 'Vegetarian', tone: 'green' },
    nutrition: { label: 'Protein', value: '~25–30g', kind: 'protein' },
    image: '/products/wraps.png',
    art: {
      base: 'wrap',
      proteins: ['paneer', 'chickpea'],
      veg: ['carrot', 'tomato', 'onion'],
      dressing: 'curd',
      garnish: ['lemon'],
    },
  },
]

/* ------------------------------------------------------------------ */
/* Soups                                                                 */
/* ------------------------------------------------------------------ */

export const soups: Product[] = [
  {
    id: 'soup-murungai',
    type: 'soup',
    name: 'Murungai Keerai Soup',
    diet: 'veg',
    blurb: 'Drumstick leaves, dal, tomato, garlic, pepper and jeera.',
    ingredients: ['Drumstick leaves', 'Dal', 'Tomato', 'Garlic', 'Pepper', 'Jeera'],
    price: 79,
    image: '/products/soups.png',
    art: {
      base: 'soup',
      proteins: [],
      veg: ['tomato'],
      dressing: 'lemon',
      garnish: ['pepper'],
    },
  },
  {
    id: 'soup-kollu-pepper',
    type: 'soup',
    name: 'Kollu Pepper Soup',
    diet: 'veg',
    blurb: 'Horse gram, tomato, garlic, pepper and jeera — warm and grounding.',
    ingredients: ['Horse gram', 'Tomato', 'Garlic', 'Pepper', 'Jeera'],
    price: 79,
    image: '/products/soups.png',
    art: {
      base: 'soup',
      proteins: [],
      veg: ['tomato'],
      dressing: 'lemon',
      garnish: ['pepper'],
    },
  },
  {
    id: 'soup-chicken-clear',
    type: 'soup',
    name: 'Chicken Pepper Clear Soup',
    diet: 'nonveg',
    blurb: 'Clear chicken broth with pepper, garlic and green chilli.',
    ingredients: ['Chicken', 'Pepper', 'Garlic', 'Green chilli', 'Coriander'],
    price: 99,
    image: '/products/soups.png',
    art: {
      base: 'soup',
      proteins: ['chicken'],
      veg: [],
      dressing: 'lemon',
      garnish: ['chilli', 'pepper'],
    },
  },
]

export const allProducts: Product[] = [...bowls, ...wraps, ...soups]

/* ------------------------------------------------------------------ */
/* Cheat Day — exclusive planned menu (coming soon)                    */
/* ------------------------------------------------------------------ */

export const cheatDayDishes: Product[] = [
  {
    id: 'cheat-naatu-veg-biryani',
    type: 'bowl',
    name: 'Naatu Veg Biryani Pātra',
    diet: 'veg',
    blurb: 'Chettinad-style veg biryani with basmati rice, fresh vegetables, curd and bold masala.',
    ingredients: ['Basmati rice', 'Mixed vegetables', 'Curd', 'Biryani masala', 'Mint', 'Fried onion'],
    price: 0,
    badge: { text: 'Cheat Day', tone: 'terra' },
    available: false,
    art: {
      base: 'jeerarice',
      proteins: ['paneer'],
      veg: ['carrot', 'tomato', 'onion', 'corn'],
      dressing: 'curd',
      garnish: ['chilli', 'coriander'],
    },
  },
  {
    id: 'cheat-paneer-butter-masala',
    type: 'bowl',
    name: 'Paneer Butter Masala Pātra',
    diet: 'veg',
    blurb: 'Rich, creamy tomato-butter masala with soft paneer over jeera rice — the classic cheat.',
    ingredients: ['Jeera rice', 'Paneer', 'Creamy tomato masala', 'Butter', 'Kasuri methi', 'Coriander'],
    price: 0,
    badge: { text: 'Cheat Day', tone: 'terra' },
    available: false,
    art: {
      base: 'jeerarice',
      proteins: ['paneer'],
      veg: ['tomato', 'onion'],
      dressing: 'curd',
      garnish: ['coriander', 'pepper'],
    },
  },
  {
    id: 'cheat-mushroom-ghee-roast',
    type: 'bowl',
    name: 'Mushroom Ghee Roast Pātra',
    diet: 'veg',
    blurb: 'Mangalorean-style ghee-roast mushrooms — punchy, fiery and unforgettable.',
    ingredients: ['Rice', 'Ghee-roast mushrooms', 'Byadagi chilli', 'Garlic', 'Curry leaves', 'Lemon'],
    price: 0,
    badge: { text: 'Cheat Day', tone: 'terra' },
    available: false,
    art: {
      base: 'rice',
      proteins: ['paneer'],
      veg: ['tomato', 'onion', 'corn'],
      dressing: 'lemon',
      garnish: ['chilli', 'coriander'],
    },
  },
]

export const nutritionDisclaimer = 'Nutrition values are approximate and may vary slightly based on portion size.'