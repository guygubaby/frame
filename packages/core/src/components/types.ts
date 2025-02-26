import type { AnimationOptions, DOMKeyframesDefinition } from 'motion'

export type VariantItem = DOMKeyframesDefinition & {
  options?: AnimationOptions
}

export interface Variants {
  enter: VariantItem
  leave: VariantItem
}
