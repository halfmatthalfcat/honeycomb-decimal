import Decimal from 'decimal.js'
import { HexSettings, Orientation, Point } from '../types'
import { round } from './round'

// inspired by https://github.com/gojuno/hexgrid-py
// and simplified by https://www.symbolab.com/solver/simplify-calculator/simplify

/**
 * @category Hex
 */
export const pointToCube = (
  { dimensions: { xRadius, yRadius }, origin, orientation }: Pick<HexSettings, 'dimensions' | 'origin' | 'orientation'>,
  { x, y }: Point,
) => {
  if (orientation === Orientation.POINTY) {
    const q = x
      .plus(origin.x)
      .mul(new Decimal(3).sqrt())
      .div(xRadius * 3)
      .minus(y.plus(origin.y).div(yRadius * 3))
    const r = new Decimal(2).div(3).mul(y.plus(origin.y).div(yRadius))

    return round({ q, r })
  }

  const q = new Decimal(2).div(3).mul(x.plus(origin.x).div(xRadius))
  const r = origin.y
    .plus(y)
    .mul(new Decimal(3).sqrt())
    .div(yRadius * 3)
    .minus(origin.x.plus(x).div(xRadius * 3))

  return round({ q, r })
}
