import { noop } from '@bryce-loskie/utils'
import type { MaybeRef } from '@vueuse/core'
import { tryOnScopeDispose } from '@vueuse/core'
import type { InViewOptions, ViewChangeHandler } from 'motion'
import { inView } from 'motion'
import { onMounted, toValue } from 'vue'
import type { AcceptedElements } from '../types'

export function useInView(targetRef: MaybeRef<AcceptedElements>,
  onStart: (entry: IntersectionObserverEntry) => void | ViewChangeHandler,
  options?: InViewOptions,
) {
  let disposeFn = noop

  onMounted(() => {
    const target = toValue(targetRef)
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
