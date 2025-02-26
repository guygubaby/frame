import type { AnimationOptions, DOMKeyframesDefinition } from 'motion'
import type { Directive, DirectiveBinding } from 'vue'
import { animate } from 'motion'

/**
 * Define frame for directive.
 */
export function defineFrame(
  keyframes: DOMKeyframesDefinition,
  options?: AnimationOptions,
) {
  return {
    keyframes,
    options,
  }
}

type Frame = ReturnType<typeof defineFrame>

export function defineDirective(): Directive<HTMLElement, any> {
  const register = async (el: HTMLElement, binding: DirectiveBinding) => {
    const frame = binding.value as Frame
    const { onComplete, ...restOptions } = frame.options || {}
    await animate(el, frame.keyframes, restOptions)
    onComplete?.()
  }

  return {
    mounted: register,
  }
}
