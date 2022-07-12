import { isDef, objectOmit } from '@bryce-loskie/utils'
import { expect, test } from 'vitest'

const variants = {
  initial: {
    x: -100,
    y: -100,
  },
  enter: {
    x: 0,
    y: 0,
    options: {
      easing: {},
    },
  },
}

type Vars = typeof variants

const toArray = <T>(arrayLike: T) => {
  if (Array.isArray(arrayLike))
    return arrayLike
  return [arrayLike]
}

const preprocessVariants = (vars: Vars) => {
  const { initial, enter: _enter } = vars
  const enter = objectOmit(_enter, 'options')

  return Object.keys(enter).reduce((acc, key) => {
    // @ts-expect-error ignore-next-line
    const initialVal = initial[key]
    // @ts-expect-error ignore-next-line
    const enterVal = enter[key]

    const shouldAdd = isDef(initialVal) && isDef(enterVal)
    if (!shouldAdd)
      return acc

    const initialValue = toArray(initialVal)
    const enterValue = toArray(enterVal)

    return {
      ...acc,
      [key]: [initialValue, enterValue].flat(2),
    }
  }, {})
}

test('test variants utility fn', () => {
  const res = preprocessVariants(variants)
  expect(res).toMatchInlineSnapshot(`
    {
      "x": [
        -100,
        0,
      ],
      "y": [
        -100,
        0,
      ],
    }
  `)
})
