import Decimal from 'decimal.js'
import { expect, test } from 'vitest'
import { createHexOrigin } from './createHexOrigin'

test(`returns the top left point relative to the passed bounding box's center`, () => {
  expect(createHexOrigin('topLeft', { width: new Decimal(10), height: new Decimal(10) })).toStrictEqual({
    x: new Decimal(-5),
    y: new Decimal(-5),
  })
})

test(`returns the passed point`, () => {
  expect(createHexOrigin({ x: new Decimal(10), y: new Decimal(10) })).toEqual({
    x: new Decimal(10),
    y: new Decimal(10),
  })
})
