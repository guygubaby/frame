// Framer component related
export { Framer } from './components'

export type { VariantItem, Variants } from './components/types'

export { defineVariants } from './components/utils'

// directive
export { defineDirective, defineFrame } from './directive/frame'

// easing presets
export { EasingPresets } from './easing/presets'

// hooks
export { useFrame } from './hooks/useFrame'

// in view module
export { defineInViewDirective, defineInViewVariants, inView, useInView } from './in-view/index'

// types
export type { AcceptedElements } from './types/index'

// misc
export { animate, hover, press, scroll, spring, stagger, view } from 'motion'
