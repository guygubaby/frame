import type { Nullable } from '@bryce-loskie/utils'
import type { AnimationOptionsWithOverrides, MotionKeyframesDefinition } from '@motionone/dom'
import type { MaybeRef } from '@vueuse/core'
import type { AnimationControls } from 'motion'
import type { AcceptedElements } from '../types'
import { tryOnScopeDispose } from '@vueuse/core'
import { animate } from 'motion'
import { onMounted, shallowRef, unref } from 'vue'

type AnimationOptions = AnimationOptionsWithOverrides & {
  onComplete?: (el: AcceptedElements) => void
}

/**
 * Create a motion animation for a given element.
 * For more: https://motion.dev/dom/animate#options
 */
export function useFrame(target: MaybeRef<AcceptedElements>, keyframes: MotionKeyframesDefinition, options?: AnimationOptions) {
  const animationControl = shallowRef<Nullable<AnimationControls>>(null)

  onMounted(() => {
    const el = unref(target) as AcceptedElements
    if (!el)
      return
    const animation = animate(el, keyframes, options)
    animation.then(() => {
      options?.onComplete?.(el)
    })
    animationControl.value = animation
  })

  tryOnScopeDispose(() => {
    animationControl.value?.stop()
    animationControl.value = null
  })

  return animationControl
}
