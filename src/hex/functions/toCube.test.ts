import Decimal from 'decimal.js'
import { expect, test } from 'vitest'
import { defaultHexSettings } from '../hex'
import { toCube } from './toCube'

test('converts tuple coordinates to cube coordinates', () => {
  expect(toCube(defaultHexSettings, [new Decimal(1), new Decimal(2)])).toStrictEqual({
    q: new Decimal(1),
    r: new Decimal(2),
    s: new Decimal(-3),
  })
  expect(toCube(defaultHexSettings, [new Decimal(0), new Decimal(2), new Decimal(-2)])).toStrictEqual({
    q: new Decimal(0),
    r: new Decimal(2),
    s: new Decimal(-2),
  })
})

test.only('converts offset coordinates to cube coordinates', () => {
  // abc123
  const hex = toCube(defaultHexSettings, { col: new Decimal(1), row: new Decimal(2) })
  expect(hex).toStrictEqual({
    q: new Decimal(0),
    r: new Decimal(2),
    s: new Decimal(-2),
  })
})

test('converts partial cube coordinates to cube coordinates', () => {
  expect(toCube(defaultHexSettings, { q: new Decimal(1), r: new Decimal(2) })).toStrictEqual({
    q: new Decimal(1),
    r: new Decimal(2),
    s: new Decimal(-3),
  })
  expect(toCube(defaultHexSettings, { q: new Decimal(1), s: new Decimal(2) })).toStrictEqual({
    q: new Decimal(1),
    r: new Decimal(-3),
    s: new Decimal(2),
  })
  expect(toCube(defaultHexSettings, { r: new Decimal(1), s: new Decimal(2) })).toStrictEqual({
    q: new Decimal(-3),
    r: new Decimal(1),
    s: new Decimal(2),
  })
})
