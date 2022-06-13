import type { PropType } from 'vue'
import { Transition, h } from 'vue'
import { animate } from 'motion'
import type { Fn } from '@bryce-loskie/utils'
import type { Variants } from './types'
import { preprocessVariants } from './utils'

export { spring } from 'motion'

export const defineVariants = (variants: Variants) => variants

export const Framer = defineComponent({
  name: 'Framer',
  inheritAttrs: true,
  props: {
    appear: {
      type: Boolean,
      required: false,
      default: false,
    },
    tag: {
      type: String,
      required: false,
    },
    variants: {
      type: Object as PropType<Variants>,
      required: true,
    },
  },
  setup({ appear, tag, variants }) {
    const slots = useSlots()

    const onEnter = (el: Element, done: Fn) => {
      const keyframes = preprocessVariants(variants)
      const options = variants.enter.options

      animate(el, keyframes, options).finished.finally(() => {
        options?.onComplete?.(el)
        done()
      })
    }

    const onLeave = (el: Element, done: Fn) => {
      const options = variants.leave.options
      animate(el, variants.leave, options).finished.finally(() => {
        options?.onComplete?.(el)
        done()
      })
    }

    return () =>
      h(
        Transition,
        {
          appear,
          onEnter,
          onLeave,
          tag,
          css: false,
        },
        slots.default,
      )
  },
})
