import Decimal from 'decimal.js'
import { expect, test } from 'vitest'
import { completeCube } from './completeCube'

test('returns complete cube coordinates', () => {
  expect(completeCube({ q: new Decimal(1), r: new Decimal(2), s: new Decimal(-3) })).toStrictEqual({
    q: new Decimal(1),
    r: new Decimal(2),
    s: new Decimal(-3),
  })
})

test('converts partial cube coordinates to complete cube coordinates', () => {
  expect(completeCube({ q: new Decimal(1), r: new Decimal(2) })).toEqual({
    q: new Decimal(1),
    r: new Decimal(2),
    s: new Decimal(-3),
  })
  expect(completeCube({ q: new Decimal(1), s: new Decimal(2) })).toEqual({
    q: new Decimal(1),
    r: new Decimal(-3),
    s: new Decimal(2),
  })
  expect(completeCube({ r: new Decimal(1), s: new Decimal(2) })).toEqual({
    q: new Decimal(-3),
    r: new Decimal(1),
    s: new Decimal(2),
  })
})

test('throws when passed less than 2 coordinates', () => {
  // @ts-expect-error
  expect(() => completeCube({ q: new Decimal(1) })).toThrowError(
    TypeError(
      `Can't determine three cube coordinates from less than two coordinates. Received: { q: 1, r: undefined, s: undefined }.`,
    ),
  )
})
