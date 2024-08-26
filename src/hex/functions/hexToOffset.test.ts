import Decimal from 'decimal.js'
import { expect, test } from 'vitest'
import { Orientation } from '../types'
import { defineHex } from './defineHex'
import { hexToOffset } from './hexToOffset'

test(`returns a hex's offset (col, row) coordinates`, () => {
  const PointyOddOffsetHex = defineHex({ orientation: Orientation.POINTY, offset: -1 })
  const PointyEvenOffsetHex = defineHex({ orientation: Orientation.POINTY, offset: 1 })
  const FlatOddOffsetHex = defineHex({ orientation: Orientation.FLAT, offset: -1 })
  const FlatEvenOffsetHex = defineHex({ orientation: Orientation.FLAT, offset: 1 })

  expect(hexToOffset(new PointyOddOffsetHex({ q: new Decimal(1), r: new Decimal(3) }))).toEqual({
    col: new Decimal(2),
    row: new Decimal(3),
  })
  expect(hexToOffset(new PointyEvenOffsetHex({ q: new Decimal(1), r: new Decimal(3) }))).toEqual({
    col: new Decimal(3),
    row: new Decimal(3),
  })
  expect(hexToOffset(new FlatOddOffsetHex({ q: new Decimal(1), r: new Decimal(3) }))).toEqual({
    col: new Decimal(1),
    row: new Decimal(3),
  })
  expect(hexToOffset(new FlatEvenOffsetHex({ q: new Decimal(1), r: new Decimal(3) }))).toEqual({
    col: new Decimal(1),
    row: new Decimal(4),
  })
})
