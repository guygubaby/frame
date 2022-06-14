import type { PropType } from 'vue'
import { Transition, h } from 'vue'
import { animate } from 'motion'
import type { Fn } from '@bryce-loskie/utils'
import { preprocessVariants } from './utils'
import type { Variants } from './types'

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
      const transition = variants.enter.transition

      animate(el, keyframes, transition).finished.finally(() => {
        transition?.onComplete?.(el)
        done()
      })
    }

    const onLeave = (el: Element, done: Fn) => {
      const transition = variants.leave.transition
      animate(el, variants.leave, transition).finished.finally(() => {
        transition?.onComplete?.(el)
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
