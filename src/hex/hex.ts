/* eslint @typescript-eslint/class-literal-property-style: ["error", "getters"] */

import Decimal from 'decimal.js'
import { isOffset } from '../utils'
import { equals, hexToOffset, hexToPoint, offsetToCube, toCube, translate } from './functions'
import {
  BoundingBox,
  CubeCoordinates,
  Ellipse,
  HexConstructor,
  HexCoordinates,
  HexOffset,
  HexSettings,
  OffsetCoordinates,
  Orientation,
  PartialCubeCoordinates,
  Point,
} from './types'

export class Hex
  implements Readonly<CubeCoordinates>, Readonly<OffsetCoordinates>, Readonly<Point>, Readonly<BoundingBox>
{
  static get settings(): HexSettings {
    const { dimensions, orientation, origin, offset } = this.prototype
    return { dimensions, orientation, origin, offset }
  }

  /**
   * This returns a point relative to the __top left corner__ of the hex with coordinates `[0, 0]`, ignoring any `origin` you may have set.
   *
   * @deprecated This probably doesn't do what you expect. If you want the center coordinates of a hex, use `hex.x` and `hex.y` instead.
   * See https://github.com/flauwekeul/honeycomb/discussions/95#discussioncomment-5158862.
   */
  get center(): Point {
    const { width, height, x, y } = this
    return { x: new Decimal(width).div(2).minus(x), y: new Decimal(height).div(2).minus(y) }
  }

  get col(): Decimal {
    return hexToOffset(this).col
  }

  // todo: add to docs that this always returns corners relative to Hex(0, 0)
  get corners(): Point[] {
    const { orientation, width, height, x, y } = this
    return orientation === Orientation.POINTY ? cornersPointy(width, height, x, y) : cornersFlat(width, height, x, y)
  }

  get dimensions(): Ellipse {
    return defaultHexSettings.dimensions
  }

  get height(): Decimal {
    const {
      orientation,
      dimensions: { yRadius },
    } = this
    return orientation === Orientation.POINTY
      ? new Decimal(yRadius).mul(2)
      : new Decimal(yRadius).mul(new Decimal(3).sqrt())
  }

  get isFlat(): boolean {
    return this.orientation === Orientation.FLAT
  }

  get isPointy(): boolean {
    return this.orientation === Orientation.POINTY
  }

  get orientation(): Orientation {
    return defaultHexSettings.orientation
  }

  get origin(): Point {
    return defaultHexSettings.origin
  }

  get offset(): HexOffset {
    return defaultHexSettings.offset
  }

  get row(): Decimal {
    return hexToOffset(this).row
  }

  get width(): Decimal {
    const {
      orientation,
      dimensions: { xRadius },
    } = this
    return orientation === Orientation.POINTY
      ? new Decimal(xRadius).mul(new Decimal(3).sqrt())
      : new Decimal(xRadius).mul(2)
  }

  get x(): Decimal {
    return hexToPoint(this).x
  }

  get y(): Decimal {
    return hexToPoint(this).y
  }

  get s(): Decimal {
    return this.q.neg().minus(this.r)
  }

  readonly q: Decimal
  readonly r: Decimal

  constructor(coordinates: HexCoordinates = [new Decimal(0), new Decimal(0)]) {
    const { q, r } = toCube(this, coordinates)
    this.q = q
    this.r = r
  }

  clone<T extends Hex>(newProps: HexCoordinates = this): T {
    return new (this.constructor as HexConstructor<T>)(newProps)
  }

  equals(coordinates: HexCoordinates) {
    return equals(this, isOffset(coordinates) ? offsetToCube(this, coordinates) : coordinates)
  }

  toString() {
    return `${this.constructor.name}(${this.q.toString()},${this.r.toString()})`
  }

  translate(delta: PartialCubeCoordinates) {
    return translate(this, delta)
  }
}

/**
 * @category Hex
 */
export const defaultHexSettings: HexSettings = {
  dimensions: { xRadius: 1, yRadius: 1 },
  orientation: Orientation.POINTY,
  origin: { x: new Decimal(0), y: new Decimal(0) },
  offset: -1,
}

const cornersPointy = (width: Decimal, height: Decimal, x: Decimal, y: Decimal) => [
  { x: width.times(0.5).plus(x), y: height.times(-0.25).plus(y) },
  { x: width.times(0.5).plus(x), y: height.times(0.25).plus(y) },
  { x, y: height.times(0.5).plus(y) },
  { x: width.times(-0.5).plus(x), y: height.times(0.25).plus(y) },
  { x: width.times(-0.5).plus(x), y: height.times(-0.25).plus(y) },
  { x, y: height.times(-0.5).plus(y) },
]

const cornersFlat = (width: Decimal, height: Decimal, x: Decimal, y: Decimal) => [
  { x: width.times(0.25).plus(x), y: height.times(-0.5).plus(y) },
  { x: width.times(0.5).plus(x), y },
  { x: width.times(0.25).plus(x), y: height.times(0.5).plus(y) },
  { x: width.times(-0.25).plus(x), y: height.times(0.5).plus(y) },
  { x: width.times(-0.5).plus(x), y },
  { x: width.times(-0.25).plus(x), y: height.times(-0.5).plus(y) },
]
