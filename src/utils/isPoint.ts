import Decimal from 'decimal.js'
import { Point } from '../hex'
import { isObject } from './isObject'

export const isPoint = (value: unknown): value is Point =>
  isObject<Point>(value) && Decimal.isDecimal(value.x) && Decimal.isDecimal(value.y)
