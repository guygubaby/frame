import { noop } from '@bryce-loskie/utils'
import type { InViewOptions, ViewChangeHandler } from 'motion'
import type { Directive, DirectiveHook } from 'vue'
import { inView } from 'motion'

interface InViewVariants {
  onStart: (entry: IntersectionObserverEntry) => void | ViewChangeHandler
  options?: InViewOptions
}

export const defineInViewVariants = ({ onStart, options }: InViewVariants) => {
  return {
    onStart,
    options,
  }
}

type InViewDirectiveOptions = ReturnType<typeof defineInViewVariants>

export const defineInViewDirective = (): Directive<HTMLElement, InViewDirectiveOptions> => {
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
