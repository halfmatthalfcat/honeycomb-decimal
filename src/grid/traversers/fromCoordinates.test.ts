import Decimal from 'decimal.js'
import { expect, test } from 'vitest'
import { Hex, HexCoordinates } from '../../hex'
import { fromCoordinates } from './fromCoordinates'

const createHex = (coordinates?: HexCoordinates) => new Hex(coordinates)

test('accepts coordinates and returns a traverser that returns the hexes with those coordinates', () => {
  expect(fromCoordinates([new Decimal(1), new Decimal(2)], [new Decimal(3), new Decimal(4)])(createHex))
    .toMatchInlineSnapshot(`
    [
      Hex {
        "q": "1",
        "r": "2",
      },
      Hex {
        "q": "3",
        "r": "4",
      },
    ]
  `)
})

test('ignores the cursor', () => {
  expect(
    fromCoordinates([new Decimal(1), new Decimal(2)], [new Decimal(3), new Decimal(4)])(createHex, [
      new Decimal(20),
      new Decimal(10),
    ]),
  ).not.toContain(new Hex([new Decimal(20), new Decimal(10)]))
})
