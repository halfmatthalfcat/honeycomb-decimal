import Decimal from 'decimal.js'
import { expect, test } from 'vitest'
import { equals } from './equals'

test('returns whether the 2 passed offset coordinates are the same', () => {
  expect(equals({ col: new Decimal(1), row: new Decimal(2) }, { col: new Decimal(1), row: new Decimal(2) })).toBe(true)
  expect(equals({ col: new Decimal(1), row: new Decimal(2) }, { col: new Decimal(3), row: new Decimal(4) })).toBe(false)
})

test('throws when offset coordinates and non-offset coordinates are passed', () => {
  expect(() =>
    equals({ col: new Decimal(1), row: new Decimal(2) }, { q: new Decimal(1), r: new Decimal(2) } as never),
  ).toThrowError(
    `Can't compare coordinates where one are offset coordinates. Either pass two offset coordinates or two axial/cube coordinates. Received: {"col":"1","row":"2"} and {"q":"1","r":"2"}`,
  )
})

test('returns whether the 2 passed axial or tuple coordinates are the same', () => {
  expect(equals({ q: new Decimal(1), r: new Decimal(2) }, { q: new Decimal(1), r: new Decimal(2) })).toBe(true)
  expect(equals({ q: new Decimal(1), r: new Decimal(2) }, { q: new Decimal(3), r: new Decimal(4) })).toBe(false)

  expect(equals([new Decimal(1), new Decimal(2)], [new Decimal(1), new Decimal(2)])).toBe(true)
  expect(equals([new Decimal(1), new Decimal(2)], [new Decimal(3), new Decimal(4)])).toBe(false)
})
