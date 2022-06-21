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

    const interceptor = (el: Element, done: Fn, type: 'enter' | 'leave') => {
      const keyframes = variants[type]
      const options = keyframes.options
      animate(el, keyframes, options)
        .finished
        .finally(() => {
          options?.onComplete?.(el)
          done()
        })
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
