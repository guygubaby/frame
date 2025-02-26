// Framer component related
export { Framer } from './components'

export type { VariantItem as InViewVariants, Variants as IVariants } from './components/types'

export { defineVariants } from './components/utils'

// directive
export { defineDirective, defineFrame } from './directive/frame'

// easing presets
export { EasingPresets } from './easing/presets'

// hooks
export { useFrame } from './hooks/useFrame'

// in view module
export { defineInViewDirective, defineInViewVariants, useInView } from './in-view/index'

// motion
export * from 'motion'
