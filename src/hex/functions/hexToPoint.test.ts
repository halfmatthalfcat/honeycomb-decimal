import Decimal from 'decimal.js'
import { expect, test } from 'vitest'
import { Orientation } from '../types'
import { defineHex } from './defineHex'
import { hexToPoint } from './hexToPoint'

test('returns the point relative to the origin of the passed hex', () => {
  const PointyHex = defineHex({
    orientation: Orientation.POINTY,
    origin: { x: new Decimal(1), y: new Decimal(1) },
    dimensions: { xRadius: 1, yRadius: 1 },
  })
  const FlatHex = defineHex({
    orientation: Orientation.FLAT,
    origin: { x: new Decimal(1), y: new Decimal(1) },
    dimensions: { xRadius: 1, yRadius: 1 },
  })

  expect(hexToPoint(new PointyHex({ q: new Decimal(1), r: new Decimal(2) }))).toEqual({
    x: new Decimal('2.464101615137754587'),
    y: new Decimal(2),
  })
  expect(hexToPoint(new FlatHex({ q: new Decimal(1), r: new Decimal(2) }))).toEqual({
    x: new Decimal(0.5),
    y: new Decimal('3.3301270189221932338'),
  })
})
