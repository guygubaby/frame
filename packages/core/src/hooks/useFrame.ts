import type { MaybeRef } from '@vueuse/core'
import { tryOnScopeDispose } from '@vueuse/core'
import type { AcceptedElements, AnimationOptionsWithOverrides, MotionKeyframesDefinition } from '@motionone/dom'
import type { AnimationControls } from 'motion'
import { animate } from 'motion'
import type { Nullable } from '@bryce-loskie/utils'
import { onMounted, shallowRef, unref } from 'vue'

type AnimationOptions = AnimationOptionsWithOverrides & {
  onComplete?: (el: AcceptedElements) => void
}

/**
 * Create a motion animation for a given element.
 * For more: https://motion.dev/dom/animate#options
 */
export const useFrame = (target: MaybeRef<AcceptedElements>, keyframes: MotionKeyframesDefinition, options?: AnimationOptions) => {
  const animationControl = shallowRef<Nullable<AnimationControls>>(null)

  onMounted(() => {
    const el = unref(target)
    if (!el)
      return
    const animation = animate(el, keyframes, options)
    animation.finished.finally(() => {
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
