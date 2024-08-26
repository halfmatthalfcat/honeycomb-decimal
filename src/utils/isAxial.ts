import Decimal from 'decimal.js'
import { AxialCoordinates } from '../hex'
import { isObject } from './isObject'

/**
 * @category Coordinates
 */
export const isAxial = (value: unknown): value is AxialCoordinates =>
  isObject<AxialCoordinates>(value) && Decimal.isDecimal(value.q) && Decimal.isDecimal(value.r)
