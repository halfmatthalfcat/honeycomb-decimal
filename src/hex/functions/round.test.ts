import Decimal from 'decimal.js'
import { expect, test } from 'vitest'
import { round } from './round'

test('rounds the passed axial or cube coordinates', () => {
  expect(round({ q: new Decimal(1.5), r: new Decimal(1.1) })).toEqual({
    q: new Decimal(2),
    r: new Decimal(1),
    s: new Decimal(-3),
  })
  expect(round({ q: new Decimal(1.1), r: new Decimal(1.5) })).toEqual({
    q: new Decimal(1),
    r: new Decimal(2),
    s: new Decimal(-3),
  })
  expect(round({ q: new Decimal(1.1), r: new Decimal(1.1) })).toEqual({
    q: new Decimal(1),
    r: new Decimal(1),
    s: new Decimal(-2),
  })
})
