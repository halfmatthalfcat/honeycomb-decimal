import Decimal from 'decimal.js'
import { describe, expect, test, vi } from 'vitest'
import { Hex, HexCoordinates } from '../../hex'
import { Rotation } from '../types'
import { ring } from './ring'

const cursor: HexCoordinates = [new Decimal(1), new Decimal(2)]
const createHex = vi.fn((coordinates?: HexCoordinates) => new Hex(coordinates))

describe('when called with a center', () => {
  describe('without cursor', () => {
    test('returns a traverser that returns hexes in a ring shape around the center, starting at [0, 0]', () => {
      expect(ring({ center: [new Decimal(0), new Decimal(1)] })(createHex)).toMatchInlineSnapshot(`
        [
          Hex {
            "q": "0",
            "r": "0",
          },
          Hex {
            "q": "1",
            "r": "0",
          },
          Hex {
            "q": "1",
            "r": "1",
          },
          Hex {
            "q": "0",
            "r": "2",
          },
          Hex {
            "q": "-1",
            "r": "2",
          },
          Hex {
            "q": "-1",
            "r": "1",
          },
        ]
      `)
    })
  })

  describe('with cursor', () => {
    test('returns a traverser that returns hexes in a rectangular shape starting at the cursor, excluding the cursor', () => {
      expect(ring({ center: [new Decimal(1), new Decimal(1)] })(createHex, cursor)).toMatchInlineSnapshot(`
        [
          Hex {
            "q": "0",
            "r": "2",
          },
          Hex {
            "q": "0",
            "r": "1",
          },
          Hex {
            "q": "1",
            "r": "0",
          },
          Hex {
            "q": "2",
            "r": "0",
          },
          Hex {
            "q": "2",
            "r": "1",
          },
        ]
      `)
    })
  })
})

describe('when called with a center and start', () => {
  describe('without cursor', () => {
    test('returns a traverser that returns hexes in a ring shape around the center, starting at start', () => {
      expect(ring({ center: [new Decimal(1), new Decimal(1)], start: [new Decimal(1), new Decimal(2)] })(createHex))
        .toMatchInlineSnapshot(`
        [
          Hex {
            "q": "1",
            "r": "2",
          },
          Hex {
            "q": "0",
            "r": "2",
          },
          Hex {
            "q": "0",
            "r": "1",
          },
          Hex {
            "q": "1",
            "r": "0",
          },
          Hex {
            "q": "2",
            "r": "0",
          },
          Hex {
            "q": "2",
            "r": "1",
          },
        ]
      `)
    })
  })

  describe('with cursor', () => {
    test('returns a traverser that returns hexes in a ring shape around the center, starting at start', () => {
      expect(
        ring({ center: [new Decimal(1), new Decimal(3)], start: [new Decimal(2), new Decimal(2)] })(createHex, cursor),
      ).toMatchInlineSnapshot(`
        [
          Hex {
            "q": "2",
            "r": "2",
          },
          Hex {
            "q": "2",
            "r": "3",
          },
          Hex {
            "q": "1",
            "r": "4",
          },
          Hex {
            "q": "0",
            "r": "4",
          },
          Hex {
            "q": "0",
            "r": "3",
          },
          Hex {
            "q": "1",
            "r": "2",
          },
        ]
      `)
    })
  })
})

describe('when called with center and rotation', () => {
  test('returns a traverser that returns hexes in a ring shape around the center with the given rotation', () => {
    expect(ring({ center: [new Decimal(-1), new Decimal(1)], rotation: Rotation.COUNTERCLOCKWISE })(createHex))
      .toMatchInlineSnapshot(`
      [
        Hex {
          "q": "0",
          "r": "0",
        },
        Hex {
          "q": "-1",
          "r": "0",
        },
        Hex {
          "q": "-2",
          "r": "1",
        },
        Hex {
          "q": "-2",
          "r": "2",
        },
        Hex {
          "q": "-1",
          "r": "2",
        },
        Hex {
          "q": "0",
          "r": "1",
        },
      ]
    `)
  })
})

describe('when called with center and radius', () => {
  describe('without cursor', () => {
    test('returns a traverser that returns hexes in a ring shape around the center with the given radius', () => {
      expect(ring({ center: [new Decimal(0), new Decimal(0)], radius: 1 })(createHex)).toMatchInlineSnapshot(`
        [
          Hex {
            "q": "1",
            "r": "0",
          },
          Hex {
            "q": "0",
            "r": "1",
          },
          Hex {
            "q": "-1",
            "r": "1",
          },
          Hex {
            "q": "-1",
            "r": "0",
          },
          Hex {
            "q": "0",
            "r": "-1",
          },
          Hex {
            "q": "1",
            "r": "-1",
          },
        ]
      `)
    })
  })

  describe('with cursor', () => {
    test('returns a traverser that returns hexes in a ring shape around the center with the given radius', () => {
      expect(ring({ center: [new Decimal(0), new Decimal(0)], radius: 1 })(createHex, cursor)).toMatchInlineSnapshot(`
        [
          Hex {
            "q": "1",
            "r": "0",
          },
          Hex {
            "q": "0",
            "r": "1",
          },
          Hex {
            "q": "-1",
            "r": "1",
          },
          Hex {
            "q": "-1",
            "r": "0",
          },
          Hex {
            "q": "0",
            "r": "-1",
          },
          Hex {
            "q": "1",
            "r": "-1",
          },
        ]
      `)
    })
  })
})
