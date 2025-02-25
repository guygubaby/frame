import type { Fn } from '@bryce-loskie/utils'
import type { DOMKeyframesDefinition } from 'motion'
import type { PropType } from 'vue'
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
      type: Object as PropType<DOMKeyframesDefinition>,
      required: true,
    },
  },
  setup({ appear, tag, variants }) {
    const slots = useSlots()

    const interceptor = (el: Element, done: Fn, type: 'enter' | 'leave') => {
      const keyframes = variants[type]
      const options = keyframes.options
      animate(el, keyframes, options)
        .then(() => {
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
