import type { Nullable } from '@bryce-loskie/utils'
import { noop } from '@bryce-loskie/utils'
import type { MaybeRef } from '@vueuse/core'
import { tryOnScopeDispose } from '@vueuse/core'
import type { AnimationControls, AnimationListOptions, ElementOrSelector, MotionKeyframesDefinition } from 'motion'
import { timeline } from 'motion'
import { onMounted, shallowRef, unref } from 'vue'

type TimelineOptions = Parameters<typeof timeline>[1]

type TimelineSegment = [MaybeRef<ElementOrSelector | undefined>, MotionKeyframesDefinition] | [MaybeRef<ElementOrSelector | undefined>, MotionKeyframesDefinition, AnimationListOptions]

type TimelineDefinition = TimelineSegment[]

/**
 * Create complex sequences of animations across multiple elements.

 * Doc: https://motion.dev/dom/timeline
 */
export const useTimeline = (
  definition: TimelineDefinition,
  options?: TimelineOptions,
) => {
  const controlRef = shallowRef<Nullable<AnimationControls>>(null)
  let disposeFn = noop

  onMounted(() => {
    const _definition = definition.map((item) => {
      const [el, keyframes, options] = item
      return [unref(el), keyframes, options]
    })

    // @ts-expect-error this type is actually correct
    const control = timeline(_definition, options)

    controlRef.value = control

    disposeFn = () => {
      control.stop()
      controlRef.value = null
    }
  })

  tryOnScopeDispose(() => {
    disposeFn()
    disposeFn = noop
  })

  return controlRef
}
