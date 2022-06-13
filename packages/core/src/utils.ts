import { isDef, objectOmit } from '@bryce-loskie/utils'
import type { Variants } from './types'

const toArray = <T>(arrayLike: T) => {
  if (Array.isArray(arrayLike))
    return arrayLike
  return [arrayLike]
}

export const preprocessVariants = (vars: Variants) => {
  const { initial, enter: _enter } = vars
  const enter = objectOmit(_enter, 'transition')

  return Object.keys(enter).reduce((acc, key) => {
    // @ts-expect-error ignore-next-line
    const initialVal = initial[key]
    // @ts-expect-error ignore-next-line
    const enterVal = enter[key]

    const initialValue = toArray(initialVal)

    const enterValue = toArray(enterVal)

    const keyframes = [initialValue, enterValue].flat().filter(item => isDef(item))

    return {
      ...acc,
      [key]: keyframes,
    }
  }, {})
}

export const defineVariants = (variants: Variants) => variants
