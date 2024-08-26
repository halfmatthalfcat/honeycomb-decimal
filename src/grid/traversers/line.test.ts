import Decimal from 'decimal.js'
import { describe, expect, test, vi } from 'vitest'
import { Hex, HexCoordinates } from '../../hex'
import { Direction } from '../types'
import { line } from './line'

const cursor: HexCoordinates = [new Decimal(1), new Decimal(2)]
const createHex = vi.fn((coordinates?: HexCoordinates) => new Hex(coordinates))

describe('when called with a direction and length', () => {
  describe('without cursor', () => {
    test('returns a traverser that returns length hexes in passed direction starting at [0, 0]', () => {
      expect(line({ direction: Direction.SE, length: new Decimal(3) })(createHex)).toMatchInlineSnapshot(`
        [
          Hex {
            "q": "0",
            "r": "0",
          },
          Hex {
            "q": "0",
            "r": "1",
          },
          Hex {
            "q": "0",
            "r": "2",
          },
        ]
      `)
    })
  })

  describe('with cursor', () => {
    test('returns a traverser that returns length hexes in passed direction starting at the cursor, excluding the cursor', () => {
      expect(line({ direction: Direction.NW, length: new Decimal(3) })(createHex, cursor)).toMatchInlineSnapshot(`
        [
          Hex {
            "q": "1",
            "r": "1",
          },
          Hex {
            "q": "1",
            "r": "0",
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

describe('when called with a direction, length and start', () => {
  describe('without cursor', () => {
    test('returns a traverser that returns length hexes in passed direction relative to start, including start', () => {
      expect(
        line({ direction: Direction.S, length: new Decimal(3), start: [new Decimal(2), new Decimal(0)] })(createHex),
      ).toMatchInlineSnapshot(`
        [
          Hex {
            "q": "2",
            "r": "0",
          },
          Hex {
            "q": "2",
            "r": "1",
          },
          Hex {
            "q": "1",
            "r": "2",
          },
        ]
      `)
    })
  })

  describe('with cursor', () => {
    test('returns a traverser that returns length hexes in passed direction relative to start, including start', () => {
      expect(
        line({ direction: Direction.E, length: new Decimal(3), start: [new Decimal(3), new Decimal(4)] })(
          createHex,
          cursor,
        ),
      ).toMatchInlineSnapshot(`
        [
          Hex {
            "q": "3",
            "r": "4",
          },
          Hex {
            "q": "4",
            "r": "4",
          },
          Hex {
            "q": "5",
            "r": "4",
          },
        ]
      `)
    })
  })
})

describe('when called with stop', () => {
  describe('without cursor', () => {
    test('returns a traverser that returns the hexes between [0, 0] and stop (inclusive)', () => {
      expect(line({ stop: [new Decimal(2), new Decimal(1)] })(createHex)).toMatchInlineSnapshot(`
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
            "q": "2",
            "r": "1",
          },
        ]
      `)
    })
  })

  describe('with cursor', () => {
    test('returns a traverser that returns the hexes between cursor and stop (excluding cursor, including stop)', () => {
      expect(line({ stop: [new Decimal(2), new Decimal(-1)] })(createHex, cursor)).toMatchInlineSnapshot(`
        [
          Hex {
            "q": "1",
            "r": "1",
          },
          Hex {
            "q": "2",
            "r": "0",
          },
          Hex {
            "q": "2",
            "r": "-1",
          },
        ]
      `)
    })
  })
})

describe('when called with start and stop', () => {
  describe('without cursor', () => {
    test('returns a traverser that returns the hexes between start and stop (inclusive)', () => {
      expect(line({ start: [new Decimal(3), new Decimal(5)], stop: [new Decimal(4), new Decimal(7)] })(createHex))
        .toMatchInlineSnapshot(`
        [
          Hex {
            "q": "3",
            "r": "5",
          },
          Hex {
            "q": "3",
            "r": "6",
          },
          Hex {
            "q": "4",
            "r": "6",
          },
          Hex {
            "q": "4",
            "r": "7",
          },
        ]
      `)
    })
  })

  describe('with cursor', () => {
    test('returns a traverser that returns the hexes between start and stop (inclusive)', () => {
      expect(
        line({ start: [new Decimal(5), new Decimal(4)], stop: [new Decimal(4), new Decimal(2)] })(createHex, cursor),
      ).toMatchInlineSnapshot(`
        [
          Hex {
            "q": "5",
            "r": "4",
          },
          Hex {
            "q": "5",
            "r": "3",
          },
          Hex {
            "q": "4",
            "r": "3",
          },
          Hex {
            "q": "4",
            "r": "2",
          },
        ]
      `)
    })
  })
})
