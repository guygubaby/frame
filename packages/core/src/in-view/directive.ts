import type { Directive, DirectiveHook } from 'vue'
import type { InViewVariants } from './types'
import { noop } from '@bryce-loskie/utils'
import { inView } from 'motion'

export const defineInViewVariants = (payload: InViewVariants) => payload

type InViewDirectiveOptions = ReturnType<typeof defineInViewVariants>

export function defineInViewDirective(): Directive<HTMLElement, InViewDirectiveOptions> {
  let disposeFn = noop

  const register: DirectiveHook<HTMLElement, null, InViewDirectiveOptions> = (el, binding) => {
    const { onStart, options } = binding.value || {}
    disposeFn = inView(el, onStart, options)
  }

  const unregister = () => {
    disposeFn()
    disposeFn = noop
  }

  return {
    mounted: register,
    unmounted: unregister,
  }
}
