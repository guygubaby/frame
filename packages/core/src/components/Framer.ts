import type { PropType } from 'vue'
import { Transition, defineComponent, h, useSlots } from 'vue'
import { animate } from 'motion'
import type { Fn } from '@bryce-loskie/utils'
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
      const keyframes = variants.enter
      const options = variants.enter.options

      animate(el, keyframes, options).finished.finally(() => {
        options?.onComplete?.(el)
        done()
      })
    }

    const onLeave = (el: Element, done: Fn) => {
      const keyframes = variants.leave
      const options = variants.leave.options
      animate(el, keyframes, options).finished.finally(() => {
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
