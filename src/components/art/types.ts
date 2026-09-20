export type BaseKind = 'rice' | 'jeerarice' | 'millet' | 'wrap' | 'soup'
export type ProteinKind = 'chicken' | 'eggwhite' | 'egg' | 'chickpea' | 'chana' | 'rajma' | 'paneer'
export type VegKind = 'carrot' | 'tomato' | 'onion' | 'corn'
export type DressingKind = 'curd' | 'lemon'
export type GarnishKind = 'lemon' | 'chilli' | 'pepper' | 'coriander'

export type BowlArt = {
  base: BaseKind
  proteins?: ProteinKind[]
  veg?: VegKind[]
  dressing?: DressingKind
  garnish?: GarnishKind[]
}