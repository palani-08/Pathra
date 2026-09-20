/**
 * ------------------------------------------------------------------
 * Pro-Pathra — Build Your Pātra ingredients & macro estimates
 * ------------------------------------------------------------------
 * Each option carries approximate macros per standard portion.
 * The builder UI sums these dynamically. Figures are estimates.
 */

export type BuilderCategory = 'base' | 'protein' | 'fresh' | 'dressing' | 'seasoning'

export type BuilderOption = {
  id: string
  label: string
  /** Long label shown in the live summary. */
  fullLabel?: string
  category: BuilderCategory
  protein: number
  carbs: number
  fat: number
  calories: number
}

export type BuilderChoice = {
  base: string[]
  protein: string[]
  fresh: string[]
  dressing: string[]
  seasonings: string[]
}

export const BASE_OPTIONS: BuilderOption[] = [
  { id: 'plain-rice', label: 'Plain Rice', fullLabel: 'Plain rice (150g)', category: 'base', protein: 4, carbs: 42, fat: 0.5, calories: 195 },
  { id: 'jeera-rice', label: 'Jeera Rice', fullLabel: 'Jeera rice (150g)', category: 'base', protein: 4, carbs: 43, fat: 0.6, calories: 200 },
  { id: 'millet', label: 'Millet', fullLabel: 'Cooked millet (150g)', category: 'base', protein: 5, carbs: 41, fat: 1.8, calories: 210 },
]

export const PROTEIN_OPTIONS: BuilderOption[] = [
  { id: 'egg-whites', label: '2 Egg Whites', fullLabel: '2 egg whites (~66g)', category: 'protein', protein: 7.2, carbs: 0.5, fat: 0.1, calories: 33 },
  { id: 'rajma', label: 'Rajma', fullLabel: 'Rajma (60g cooked)', category: 'protein', protein: 5, carbs: 13.5, fat: 0.3, calories: 76 },
  { id: 'chickpeas', label: 'Chickpeas', fullLabel: 'Chickpeas (60g cooked)', category: 'protein', protein: 5.4, carbs: 16.6, fat: 1.2, calories: 99 },
  { id: 'black-chana', label: 'Black Chana', fullLabel: 'Black chana (60g cooked)', category: 'protein', protein: 5.4, carbs: 16, fat: 1.1, calories: 99 },
  { id: 'chicken-tikka', label: 'Chicken Tikka', fullLabel: 'Chicken tikka (80g)', category: 'protein', protein: 21.6, carbs: 3.2, fat: 4.4, calories: 148 },
  { id: 'paneer', label: 'Paneer', fullLabel: 'Paneer (50g)', category: 'protein', protein: 9.3, carbs: 1.7, fat: 11.5, calories: 148 },
]

export const FRESH_OPTIONS: BuilderOption[] = [
  { id: 'carrot', label: 'Carrot', fullLabel: 'Carrot (30g)', category: 'fresh', protein: 0.3, carbs: 2.9, fat: 0, calories: 12 },
  { id: 'tomato', label: 'Tomato', fullLabel: 'Tomato (30g)', category: 'fresh', protein: 0.3, carbs: 1.2, fat: 0, calories: 5 },
  { id: 'onion', label: 'Onion', fullLabel: 'Onion (30g)', category: 'fresh', protein: 0.3, carbs: 2.8, fat: 0, calories: 12 },
  { id: 'sweet-corn', label: 'Sweet Corn', fullLabel: 'Sweet corn (30g)', category: 'fresh', protein: 0.9, carbs: 5.4, fat: 0.3, calories: 26 },
]

export const DRESSING_OPTIONS: BuilderOption[] = [
  { id: 'garlic-curd', label: 'Garlic Curd', fullLabel: 'Garlic curd (25g)', category: 'dressing', protein: 0.9, carbs: 1.4, fat: 1, calories: 18 },
  { id: 'lemon', label: 'Lemon', fullLabel: 'Lemon (10g)', category: 'dressing', protein: 0.1, carbs: 0.9, fat: 0, calories: 3 },
  { id: 'garlic-lemon-curd', label: 'Garlic + Lemon Curd', fullLabel: 'Garlic + lemon curd (25g)', category: 'dressing', protein: 0.9, carbs: 1.4, fat: 1, calories: 18 },
]

export const SEASONING_OPTIONS: BuilderOption[] = [
  { id: 'pepper', label: 'Pepper', category: 'seasoning', protein: 0, carbs: 0, fat: 0, calories: 3 },
  { id: 'jeera', label: 'Jeera', category: 'seasoning', protein: 0, carbs: 0, fat: 0, calories: 3 },
  { id: 'green-chilli', label: 'Green Chilli', fullLabel: 'Green chilli (5g)', category: 'seasoning', protein: 0, carbs: 0.1, fat: 0, calories: 1 },
  { id: 'salt', label: 'Salt', category: 'seasoning', protein: 0, carbs: 0, fat: 0, calories: 0 },
]

export const BUILDER_PRICE = 99
export const BUILDER_BASE_PRICE_INCLUDED = true

export const allBuilderOptions: BuilderOption[] = [
  ...BASE_OPTIONS,
  ...PROTEIN_OPTIONS,
  ...FRESH_OPTIONS,
  ...DRESSING_OPTIONS,
  ...SEASONING_OPTIONS,
]

export function getOption(id?: string): BuilderOption | undefined {
  if (!id) return undefined
  return allBuilderOptions.find((o) => o.id === id)
}

export function getOptions(ids: string[]): BuilderOption[] {
  return ids.map(getOption).filter((o) => o !== undefined) as BuilderOption[]
}

export function sumMacros(options: BuilderOption[]): { protein: number; carbs: number; fat: number; calories: number } {
  const total = { protein: 0, carbs: 0, fat: 0, calories: 0 }
  for (const o of options) {
    total.protein += o.protein
    total.carbs += o.carbs
    total.fat += o.fat
    total.calories += o.calories
  }
  return total
}

export function macrosForChoice(choice: BuilderChoice) {
  const options = [
    ...getOptions(choice.base),
    ...getOptions(choice.protein),
    ...getOptions(choice.fresh),
    ...getOptions(choice.dressing),
    ...getOptions(choice.seasonings),
  ]
  return sumMacros(options)
}

export function roundMacro(value: number): number {
  return Math.round(value)
}

/** Default selection — a sensible starting bowl. */
export const defaultChoice: BuilderChoice = {
  base: ['plain-rice'],
  protein: ['chicken-tikka'],
  fresh: ['carrot', 'tomato', 'onion'],
  dressing: ['garlic-lemon-curd'],
  seasonings: ['pepper', 'jeera', 'salt'],
}