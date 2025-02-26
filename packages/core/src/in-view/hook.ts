import type { ElementOrSelector } from 'motion'
import type { MaybeRef, ShallowRef } from 'vue'
import type { InViewOptions, IOnStart } from './types'
import { noop } from '@bryce-loskie/utils'
import { tryOnScopeDispose } from '@vueuse/core'
import { inView } from 'motion'
import { onMounted, toValue } from 'vue'

export function useInView(targetRef: MaybeRef<ElementOrSelector | undefined> | Readonly<ShallowRef<HTMLElement | null>>, onStart: IOnStart, options?: InViewOptions) {
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
