import Decimal from 'decimal.js'
import { describe, expect, test } from 'vitest'
import { defineHex, Hex, Orientation } from '../../hex'
import { Direction } from '../types'
import { neighborOf } from './neighborOf'

test('returns a hex', () => {
  const hex = new Hex()
  expect(neighborOf(hex, Direction.E)).toBeInstanceOf(Hex)
})

describe('pointy hexes', () => {
  test(`returns the neighboring hex in unambiguous directions (bordering on the hex's side)`, () => {
    const PointyHex = defineHex({ orientation: Orientation.POINTY })
    const pointyHex = new PointyHex([new Decimal(1), new Decimal(2)])

    expect(neighborOf(pointyHex, Direction.NE)).toStrictEqual(new PointyHex({ q: new Decimal(2), r: new Decimal(1) }))
    expect(neighborOf(pointyHex, Direction.E)).toStrictEqual(new PointyHex({ q: new Decimal(2), r: new Decimal(2) }))
    expect(neighborOf(pointyHex, Direction.SE)).toStrictEqual(new PointyHex({ q: new Decimal(1), r: new Decimal(3) }))
    expect(neighborOf(pointyHex, Direction.SW)).toStrictEqual(new PointyHex({ q: new Decimal(0), r: new Decimal(3) }))
    expect(neighborOf(pointyHex, Direction.W)).toStrictEqual(new PointyHex({ q: new Decimal(0), r: new Decimal(2) }))
    expect(neighborOf(pointyHex, Direction.NW)).toStrictEqual(new PointyHex({ q: new Decimal(1), r: new Decimal(1) }))
  })

  test(`returns the neighboring hex in ambiguous directions (N and S) for a hex with a negative offset`, () => {
    const PointyNegativeOffsetHex = defineHex({ orientation: Orientation.POINTY, offset: -1 })
    const evenRowHex = new PointyNegativeOffsetHex([new Decimal(1), new Decimal(2)])
    const oddRowHex = new PointyNegativeOffsetHex([new Decimal(0), new Decimal(3)])

    expect(neighborOf(evenRowHex, Direction.N)).toStrictEqual(
      new PointyNegativeOffsetHex({ q: new Decimal(2), r: new Decimal(1) }),
    )
    expect(neighborOf(evenRowHex, Direction.S)).toStrictEqual(
      new PointyNegativeOffsetHex({ q: new Decimal(1), r: new Decimal(3) }),
    )
    expect(neighborOf(oddRowHex, Direction.N)).toStrictEqual(
      new PointyNegativeOffsetHex({ q: new Decimal(0), r: new Decimal(2) }),
    )
    expect(neighborOf(oddRowHex, Direction.S)).toStrictEqual(
      new PointyNegativeOffsetHex({ q: new Decimal(-1), r: new Decimal(4) }),
    )
  })

  test(`returns the neighboring hex in ambiguous directions (N and S) for a hex with a positive offset`, () => {
    const PointyPositiveOffsetHex = defineHex({ orientation: Orientation.POINTY, offset: 1 })
    const evenRowHex = new PointyPositiveOffsetHex([new Decimal(1), new Decimal(2)])
    const oddRowHex = new PointyPositiveOffsetHex([new Decimal(0), new Decimal(3)])

    expect(neighborOf(evenRowHex, Direction.N)).toStrictEqual(
      new PointyPositiveOffsetHex({ q: new Decimal(1), r: new Decimal(1) }),
    )
    expect(neighborOf(evenRowHex, Direction.S)).toStrictEqual(
      new PointyPositiveOffsetHex({ q: new Decimal(0), r: new Decimal(3) }),
    )
    expect(neighborOf(oddRowHex, Direction.N)).toStrictEqual(
      new PointyPositiveOffsetHex({ q: new Decimal(1), r: new Decimal(2) }),
    )
    expect(neighborOf(oddRowHex, Direction.S)).toStrictEqual(
      new PointyPositiveOffsetHex({ q: new Decimal(0), r: new Decimal(4) }),
    )
  })
})

describe('flat hexes', () => {
  test(`returns the neighboring hex in unambiguous directions (bordering on the hex's side)`, () => {
    const FlatHex = defineHex({ orientation: Orientation.FLAT })
    const flatHex = new FlatHex([new Decimal(1), new Decimal(2)])

    expect(neighborOf(flatHex, Direction.N)).toStrictEqual(new FlatHex({ q: new Decimal(1), r: new Decimal(1) }))
    expect(neighborOf(flatHex, Direction.NE)).toStrictEqual(new FlatHex({ q: new Decimal(2), r: new Decimal(1) }))
    expect(neighborOf(flatHex, Direction.SE)).toStrictEqual(new FlatHex({ q: new Decimal(2), r: new Decimal(2) }))
    expect(neighborOf(flatHex, Direction.S)).toStrictEqual(new FlatHex({ q: new Decimal(1), r: new Decimal(3) }))
    expect(neighborOf(flatHex, Direction.SW)).toStrictEqual(new FlatHex({ q: new Decimal(0), r: new Decimal(3) }))
    expect(neighborOf(flatHex, Direction.NW)).toStrictEqual(new FlatHex({ q: new Decimal(0), r: new Decimal(2) }))
  })

  test(`returns the neighboring hex in ambiguous directions (E and W) for a hex with a negative offset`, () => {
    const FlatNegativeOffsetHex = defineHex({ orientation: Orientation.FLAT, offset: -1 })
    const evenColHex = new FlatNegativeOffsetHex([new Decimal(2), new Decimal(0)])
    const oddColHex = new FlatNegativeOffsetHex([new Decimal(1), new Decimal(1)])

    expect(neighborOf(evenColHex, Direction.E)).toStrictEqual(
      new FlatNegativeOffsetHex({ q: new Decimal(3), r: new Decimal(0) }),
    )
    expect(neighborOf(evenColHex, Direction.W)).toStrictEqual(
      new FlatNegativeOffsetHex({ q: new Decimal(1), r: new Decimal(1) }),
    )
    expect(neighborOf(oddColHex, Direction.E)).toStrictEqual(
      new FlatNegativeOffsetHex({ q: new Decimal(2), r: new Decimal(0) }),
    )
    expect(neighborOf(oddColHex, Direction.W)).toStrictEqual(
      new FlatNegativeOffsetHex({ q: new Decimal(0), r: new Decimal(1) }),
    )
  })

  test(`returns the neighboring hex in ambiguous directions (E and W) for a hex with a positive offset`, () => {
    const FlatPositiveOffsetHex = defineHex({ orientation: Orientation.FLAT, offset: 1 })
    const evenColHex = new FlatPositiveOffsetHex([new Decimal(2), new Decimal(0)])
    const oddColHex = new FlatPositiveOffsetHex([new Decimal(1), new Decimal(1)])

    expect(neighborOf(evenColHex, Direction.E)).toStrictEqual(
      new FlatPositiveOffsetHex({ q: new Decimal(3), r: new Decimal(-1) }),
    )
    expect(neighborOf(evenColHex, Direction.W)).toStrictEqual(
      new FlatPositiveOffsetHex({ q: new Decimal(1), r: new Decimal(0) }),
    )
    expect(neighborOf(oddColHex, Direction.E)).toStrictEqual(
      new FlatPositiveOffsetHex({ q: new Decimal(2), r: new Decimal(1) }),
    )
    expect(neighborOf(oddColHex, Direction.W)).toStrictEqual(
      new FlatPositiveOffsetHex({ q: new Decimal(0), r: new Decimal(2) }),
    )
  })
})
