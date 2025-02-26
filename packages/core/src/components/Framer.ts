import type { Fn } from '@bryce-loskie/utils'
import type { PropType } from 'vue'
import type { Variants } from './types'
import { animate } from 'motion'
import { defineComponent, h, Transition, useSlots } from 'vue'

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

    const interceptor = async (el: Element, done: Fn, type: 'enter' | 'leave') => {
      const { options, ...keyframes } = variants[type]
      const { onComplete, ...restOptions } = options || {}
      await animate(el, keyframes, restOptions)
      done()
      onComplete?.()
    }

    const onEnter = (el: Element, done: Fn) => {
      interceptor(el, done, 'enter')
    }

    const onLeave = (el: Element, done: Fn) => {
      interceptor(el, done, 'leave')
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
