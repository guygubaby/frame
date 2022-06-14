import type { AnimationOptionsWithOverrides, MotionKeyframesDefinition } from '@motionone/dom'

export type AnimationOptions = AnimationOptionsWithOverrides & {
  onComplete?: (el: Element) => void
}

export type VariantItem = MotionKeyframesDefinition & {
  options?: AnimationOptions
}

export interface Variants {
  enter: VariantItem
  leave: VariantItem
}
