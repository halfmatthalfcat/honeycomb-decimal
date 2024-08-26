import Decimal from 'decimal.js'
import { expect, test } from 'vitest'
import { Orientation } from '../types'
import { offsetToCube } from './offsetToCube'

test('returns axial coordinates bases on the passed offset coordinates', () => {
  expect(
    offsetToCube({ offset: -1, orientation: Orientation.POINTY }, { col: new Decimal(1), row: new Decimal(4) }),
  ).toStrictEqual({
    q: new Decimal(-1),
    r: new Decimal(4),
    s: new Decimal(-3),
  })
  expect(
    offsetToCube({ offset: 1, orientation: Orientation.POINTY }, { col: new Decimal(1), row: new Decimal(4) }),
  ).toStrictEqual({
    q: new Decimal(-1),
    r: new Decimal(4),
    s: new Decimal(-3),
  })
  expect(
    offsetToCube({ offset: -1, orientation: Orientation.FLAT }, { col: new Decimal(1), row: new Decimal(4) }),
  ).toStrictEqual({
    q: new Decimal(1),
    r: new Decimal(4),
    s: new Decimal(-5),
  })
  expect(
    offsetToCube({ offset: 1, orientation: Orientation.FLAT }, { col: new Decimal(1), row: new Decimal(4) }),
  ).toStrictEqual({
    q: new Decimal(1),
    r: new Decimal(3),
    s: new Decimal(-4),
  })

  expect(
    offsetToCube({ offset: -1, orientation: Orientation.POINTY }, { col: new Decimal(4), row: new Decimal(1) }),
  ).toStrictEqual({
    q: new Decimal(4),
    r: new Decimal(1),
    s: new Decimal(-5),
  })
  expect(
    offsetToCube({ offset: 1, orientation: Orientation.POINTY }, { col: new Decimal(4), row: new Decimal(1) }),
  ).toStrictEqual({
    q: new Decimal(3),
    r: new Decimal(1),
    s: new Decimal(-4),
  })
  expect(
    offsetToCube({ offset: -1, orientation: Orientation.FLAT }, { col: new Decimal(4), row: new Decimal(1) }),
  ).toStrictEqual({
    q: new Decimal(4),
    r: new Decimal(-1),
    s: new Decimal(-3),
  })
  expect(
    offsetToCube({ offset: 1, orientation: Orientation.FLAT }, { col: new Decimal(4), row: new Decimal(1) }),
  ).toStrictEqual({
    q: new Decimal(4),
    r: new Decimal(-1),
    s: new Decimal(-3),
  })
})
