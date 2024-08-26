import Decimal from 'decimal.js'
import { TupleCoordinates } from '../hex'

/**
 * @category Coordinates
 */
export const isTuple = (value: unknown): value is TupleCoordinates =>
  Array.isArray(value) && Decimal.isDecimal(value[0]) && Decimal.isDecimal(value[1])
