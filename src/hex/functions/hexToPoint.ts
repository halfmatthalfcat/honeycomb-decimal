import Decimal from 'decimal.js'
import { Hex } from '../hex'
import { Orientation, Point } from '../types'

/**
 * @category Hex
 */
export const hexToPoint = ({ orientation, dimensions: { xRadius, yRadius }, origin: { x, y }, q, r }: Hex): Point =>
  orientation === Orientation.POINTY
    ? {
        x: x.neg().plus(new Decimal(3).sqrt().mul(xRadius).mul(new Decimal(r).div(2).plus(q))),
        y: y.neg().plus(new Decimal(r).mul(new Decimal(yRadius).mul(3).div(2))),
      }
    : {
        x: x.neg().plus(new Decimal(q).mul(new Decimal(xRadius).mul(3).div(2))),
        y: y.neg().plus(new Decimal(3).sqrt().mul(yRadius).mul(new Decimal(q).div(2).plus(r))),
      }
