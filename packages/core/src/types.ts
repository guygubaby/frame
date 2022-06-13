import type { AnimationOptionsWithOverrides, MotionKeyframesDefinition } from '@motionone/dom'

export type AnimationTransition = AnimationOptionsWithOverrides & {
  onComplete?: (el: Element) => void
}

export type VariantItem = MotionKeyframesDefinition & {
  transition?: AnimationTransition
}

export interface Variants {
  initial: MotionKeyframesDefinition
  enter: VariantItem
  leave: VariantItem
}
