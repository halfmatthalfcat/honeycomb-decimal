import Decimal from 'decimal.js'
import { describe, expect, test } from 'vitest'
import { defaultHexSettings, Hex } from './hex'
import { CubeCoordinates, Ellipse, HexCoordinates, Orientation, Point } from './types'

describe('creation', () => {
  test('returns a hex with coordinates 0,0 when created without arguments', () => {
    expect(new Hex()).toStrictEqual<CubeCoordinates>({ q: new Decimal(0), r: new Decimal(0), s: new Decimal(0) })
  })

  test('returns a hex from the passed hex coordinates', () => {
    expect(new Hex([new Decimal(1), new Decimal(2)])).toStrictEqual<CubeCoordinates>({
      q: new Decimal(1),
      r: new Decimal(2),
      s: new Decimal(-3),
    })
    expect(new Hex({ col: new Decimal(1), row: new Decimal(2) })).toStrictEqual<CubeCoordinates>({
      q: new Decimal(0),
      r: new Decimal(2),
      s: new Decimal(-2),
    })
    expect(new Hex({ q: new Decimal(1), r: new Decimal(2) })).toStrictEqual<CubeCoordinates>({
      q: new Decimal(1),
      r: new Decimal(2),
      s: new Decimal(-3),
    })
    expect(new Hex({ r: new Decimal(2), s: new Decimal(0) })).toStrictEqual<CubeCoordinates>({
      q: new Decimal(-3),
      r: new Decimal(3),
      s: new Decimal(0),
    })
    expect(new Hex({ q: new Decimal(-3), r: new Decimal(4), s: new Decimal(-1) })).toStrictEqual<CubeCoordinates>({
      q: new Decimal(-3),
      r: new Decimal(4),
      s: new Decimal(-1),
    })
  })
})

test('has static settings property', () => {
  expect(Hex.settings).toEqual(defaultHexSettings)
})

test('has center property in the prototype', () => {
  const hex = new Hex()

  expect(hex.center).toEqual<Point>({ x: new Decimal('0.86602540378443864675'), y: new Decimal(1) })
  expect(Object.hasOwn(hex, 'center')).toBe(false)
})

test('implements offset coordinates in the prototype', () => {
  const hex = new Hex([new Decimal(1), new Decimal(2)])

  expect(hex.col).toStrictEqual(new Decimal(2))
  expect(hex.row).toStrictEqual(new Decimal(2))
  expect(Object.hasOwn(hex, 'col')).toBe(false)
  expect(Object.hasOwn(hex, 'row')).toBe(false)
})

test('has corners property relative to Hex(0,0) in the prototype', () => {
  const hex = new Hex()

  expect(hex.corners).toMatchInlineSnapshot(`
    [
      {
        "x": "0.86602540378443864675",
        "y": "-0.5",
      },
      {
        "x": "0.86602540378443864675",
        "y": "0.5",
      },
      {
        "x": "0",
        "y": "1",
      },
      {
        "x": "-0.86602540378443864675",
        "y": "0.5",
      },
      {
        "x": "-0.86602540378443864675",
        "y": "-0.5",
      },
      {
        "x": "0",
        "y": "-1",
      },
    ]
  `)
  expect(new Hex([new Decimal(3), new Decimal(4)]).corners).toMatchInlineSnapshot(`
    [
      {
        "x": "9.5262794416288251143",
        "y": "5.5",
      },
      {
        "x": "9.5262794416288251143",
        "y": "6.5",
      },
      {
        "x": "8.6602540378443864675",
        "y": "7",
      },
      {
        "x": "7.7942286340599478208",
        "y": "6.5",
      },
      {
        "x": "7.7942286340599478208",
        "y": "5.5",
      },
      {
        "x": "8.6602540378443864675",
        "y": "5",
      },
    ]
  `)
  expect(Object.hasOwn(hex, 'corners')).toBe(false)
})

test('has dimensions property in the prototype', () => {
  const hex = new Hex()

  expect(hex.dimensions).toEqual<Ellipse>(defaultHexSettings.dimensions)
  expect(Object.hasOwn(hex, 'dimensions')).toBe(false)
})

test('implements a bounding box in the prototype', () => {
  const hex = new Hex()

  expect(hex.width).toStrictEqual(new Decimal('1.7320508075688772935'))
  expect(hex.height).toStrictEqual(new Decimal(2))
  expect(Object.hasOwn(hex, 'width')).toBe(false)
  expect(Object.hasOwn(hex, 'height')).toBe(false)
})

test('has isFlat property in the prototype', () => {
  const hex = new Hex()

  expect(hex.isFlat).toBe(false)
  expect(Object.hasOwn(hex, 'isFlat')).toBe(false)

  class FlatHex extends Hex {
    get orientation(): Orientation {
      return Orientation.FLAT
    }
  }
  expect(new FlatHex().isFlat).toBe(true)
})

test('has isPointy property in the prototype', () => {
  const hex = new Hex()

  expect(hex.isPointy).toBe(true)
  expect(Object.hasOwn(hex, 'isPointy')).toBe(false)

  class FlatHex extends Hex {
    get orientation(): Orientation {
      return Orientation.FLAT
    }
  }
  expect(new FlatHex().isPointy).toBe(false)
})

test('has orientation property in the prototype', () => {
  const hex = new Hex()

  expect(hex.orientation).toEqual<Orientation>(defaultHexSettings.orientation)
  expect(Object.hasOwn(hex, 'orientation')).toBe(false)
})

test('has origin property in the prototype', () => {
  const hex = new Hex()

  expect(hex.origin).toEqual<Point>(defaultHexSettings.origin)
  expect(Object.hasOwn(hex, 'origin')).toBe(false)
})

test('implements a point in the prototype', () => {
  const hex = new Hex([new Decimal(1), new Decimal(2)])

  expect(hex.x).toStrictEqual(new Decimal('3.464101615137754587'))
  expect(hex.y).toStrictEqual(new Decimal(3))
  expect(Object.hasOwn(hex, 'x')).toBe(false)
  expect(Object.hasOwn(hex, 'y')).toBe(false)
})

test('implements axial coordinates in the instance and the s coordinate in the prototype', () => {
  const hex = new Hex([new Decimal(3), new Decimal(-1)])

  expect(hex.q).toStrictEqual(new Decimal(3))
  expect(hex.r).toStrictEqual(new Decimal(-1))
  expect(hex.s).toStrictEqual(new Decimal(-2))
  expect(Object.hasOwn(hex, 'q')).toBe(true)
  expect(Object.hasOwn(hex, 'r')).toBe(true)
  expect(Object.hasOwn(hex, 's')).toBe(false)
})

describe('clone()', () => {
  test('returns a clone of the instance', () => {
    const hex = new Hex([new Decimal(6), new Decimal(-2)])
    const result = hex.clone()

    expect(result).toStrictEqual<CubeCoordinates>({ q: new Decimal(6), r: new Decimal(-2), s: new Decimal(-4) })
    expect(result).not.toBe<Hex>(hex)
  })

  test('returns a clone of the instance with different coordinates', () => {
    const hex = new Hex([new Decimal(6), new Decimal(-2)])

    expect(hex.clone([new Decimal(1), new Decimal(2)])).toStrictEqual<CubeCoordinates>({
      q: new Decimal(1),
      r: new Decimal(2),
      s: new Decimal(-3),
    })
  })

  test('maintains any custom properties', () => {
    class CustomHex extends Hex {
      custom: string
      constructor(coordinates?: HexCoordinates) {
        super(coordinates)
        this.custom = 'test'
      }
    }
    const hex = new CustomHex([new Decimal(3), new Decimal(0)])

    expect(hex.clone()).toStrictEqual<Partial<CustomHex>>({
      q: new Decimal(3),
      r: new Decimal(0),
      s: new Decimal(-3),
      custom: 'test',
    })
    expect(hex.clone([new Decimal(0), new Decimal(1)])).toStrictEqual<Partial<CustomHex>>({
      q: new Decimal(0),
      r: new Decimal(1),
      s: new Decimal(-1),
      custom: 'test',
    })
  })
})

describe('equals()', () => {
  test('returns whether the passed hex coordinates are equal to the instance', () => {
    const hex = new Hex([new Decimal(-2), new Decimal(3)])

    expect(hex.equals([new Decimal(-2), new Decimal(3)])).toBe(true)
    expect(hex.equals({ q: new Decimal(-2), r: new Decimal(3) })).toBe(true)
    expect(hex.equals({ col: new Decimal(-1), row: new Decimal(3) })).toBe(true)

    expect(hex.equals([new Decimal(-1), new Decimal(2)])).toBe(false)
  })
})

describe('toString()', () => {
  test('returns the constructor name and q and r coordinates', () => {
    const hex = new Hex([new Decimal(-2), new Decimal(2)])

    expect(hex.toString()).toBe('Hex(-2,2)')
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    expect(`${hex}`).toBe('Hex(-2,2)')

    class CustomHex extends Hex {}
    expect(new CustomHex([new Decimal(4), new Decimal(0)]).toString()).toBe('CustomHex(4,0)')
  })
})

describe('translate', () => {
  test('returns a clone of the instance with the delta partial cube coordinates', () => {
    const hex = new Hex([new Decimal(0), new Decimal(0)])
    const translated = hex.translate({ q: new Decimal(-2), r: new Decimal(1) })
    expect(translated.q).toStrictEqual(new Decimal(1))
    expect(translated.r).toStrictEqual(new Decimal(1))
    expect(translated.s).toStrictEqual(new Decimal(-2))
  })
})
