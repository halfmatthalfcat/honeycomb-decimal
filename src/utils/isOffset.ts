import Decimal from 'decimal.js'
import { OffsetCoordinates } from '../hex'
import { isObject } from './isObject'

/**
 * @category Coordinates
 */
export const isOffset = (value: unknown): value is OffsetCoordinates =>
  isObject<OffsetCoordinates>(value) && Decimal.isDecimal(value.col) && Decimal.isDecimal(value.row)
