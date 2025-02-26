import type { Nullable } from '@bryce-loskie/utils'
import type { AnimationOptions, AnimationPlaybackControls, DOMKeyframesDefinition, ElementOrSelector } from 'motion'
import type { MaybeRef, ShallowRef } from 'vue'
import { tryOnScopeDispose } from '@vueuse/core'
import { animate } from 'motion'
import { onMounted, shallowRef, toValue } from 'vue'

/**
 * Create a motion animation for a given element.
 * For more: https://motion.dev/dom/animate#options
 */
export function useFrame(target: MaybeRef<ElementOrSelector | undefined> | Readonly<ShallowRef<HTMLElement | null>>, keyframes: DOMKeyframesDefinition, options?: AnimationOptions) {
  const animationControl = shallowRef<Nullable<AnimationPlaybackControls>>(null)

  onMounted(async () => {
    const el = toValue(target)
    if (!el)
      return

    const { onComplete, ...restOptions } = options || {}
    const animation = animate(el, keyframes, restOptions)
    animationControl.value = animation
    animation.then(() => {
      onComplete?.()
    })
  })

  tryOnScopeDispose(() => {
    animationControl.value?.stop()
    animationControl.value = null
  })

  return animationControl
}
