import Decimal from 'decimal.js'
import { expect, test } from 'vitest'
import { Hex } from '../hex'
import { translate } from './translate'

test('returns a clone of the passed hex with the delta partial cube coordinates', () => {
  const hex = new Hex()
  const result = translate(hex, { q: new Decimal(-1), r: new Decimal(1) })

  expect(result).toBeInstanceOf(Hex)
  expect(result).not.toBe(Hex)
  expect(result.q).toStrictEqual(new Decimal(-1))
  expect(result.r).toStrictEqual(new Decimal(1))
  expect(result.s).toStrictEqual(new Decimal(0))
})

test('returns translated cube coordinates from partial cube coordinates', () => {
  const input = { r: new Decimal(2), s: new Decimal(-3) } // resolves to { q: 1, r: 2, s: -3 }
  const delta = { q: new Decimal(-3), s: new Decimal(1) } // resolves to { q: -3, r: 2, s: 1 }
  const result = translate(input, delta)

  expect(result).toStrictEqual({ q: new Decimal(-2), r: new Decimal(4), s: new Decimal(-2) })
})
