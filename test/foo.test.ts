import { expect, test } from 'vitest'
import { foo } from 'core'

test('test foo', () => {
  expect(foo).toBe('foo')
})
