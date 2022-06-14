import type { MaybeRef } from '@vueuse/core'
import type { AnimationOptionsWithOverrides, MotionKeyframesDefinition } from '@motionone/dom'
import type { AnimationControls } from 'motion'
import { animate } from 'motion'
import type { Nullable } from '@bryce-loskie/utils'

type AnimationOptions = AnimationOptionsWithOverrides & {
  onComplete?: (el: Element) => void
}

/**
 * Create a motion animation for a given element.
 * For more: https://motion.dev/dom/animate#options
 */
export const useFrame = (target: MaybeRef<Element>, keyframes: MotionKeyframesDefinition, options?: AnimationOptions) => {
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
