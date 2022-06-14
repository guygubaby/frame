import type { Directive, DirectiveBinding } from 'vue'
import { animate } from 'motion'
import type { AnimationOptionsWithOverrides, MotionKeyframesDefinition } from '@motionone/dom'

type AnimationOptions = AnimationOptionsWithOverrides & {
  onComplete?: (el: Element) => void
}

type Frame = ReturnType<typeof defineFrame>

/**
 * Define frame for directive.
 */
export const defineFrame = (keyframes: MotionKeyframesDefinition, options?: AnimationOptions) => {
  return {
    keyframes,
    options,
  }
}

export const defineDirective = (): Directive<HTMLElement, any> => {
  const register = (
    el: HTMLElement,
    binding: DirectiveBinding,
  ) => {
    const frame = binding.value as Frame
    animate(el, frame.keyframes, frame.options).finished.finally(() => {
      frame.options?.onComplete?.(el)
    })
  }

  return {
    mounted: register,
  }
}
