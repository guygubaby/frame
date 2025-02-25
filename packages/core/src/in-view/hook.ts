import type { MaybeRef } from '@vueuse/core'
import type { ElementOrSelector, InViewOptions, ViewChangeHandler } from 'motion'
import type { AcceptedElements } from '../types'
import { noop } from '@bryce-loskie/utils'
import { tryOnScopeDispose } from '@vueuse/core'
import { inView } from 'motion'
import { onMounted, toValue } from 'vue'

export function useInView(targetRef: MaybeRef<AcceptedElements>, onStart: (entry: IntersectionObserverEntry) => void | ViewChangeHandler, options?: InViewOptions) {
  let disposeFn = noop

  onMounted(() => {
    const target = toValue(targetRef) as ElementOrSelector
    if (!target)
      return

    const { root, margin: rootMargin, amount } = options || {}
    disposeFn = inView(target, onStart, { root, margin: rootMargin, amount })
  })

  tryOnScopeDispose(() => {
    disposeFn()
    disposeFn = noop
  })
}
