import Decimal from 'decimal.js'
import { CubeCoordinates, PartialCubeCoordinates } from '../types'

/**
 * @category Coordinates
 */
export function completeCube({ q, r, s }: PartialCubeCoordinates): CubeCoordinates {
  const validQ = Decimal.isDecimal(q)
  const validR = Decimal.isDecimal(r)
  const validS = Decimal.isDecimal(s)

  if (validQ && validR && validS) return { q, r, s }

  if (validQ && validR) return { q, r, s: q.neg().minus(r) }

  if (validQ && validS) return { q, r: q.neg().minus(s), s }

  if (validR && validS) return { q: r.neg().minus(s), r, s }

  throw new TypeError(
    `Can't determine three cube coordinates from less than two coordinates. Received: { q: ${q?.toString()}, r: ${r?.toString()}, s: ${s?.toString()} }.`,
  )
}
