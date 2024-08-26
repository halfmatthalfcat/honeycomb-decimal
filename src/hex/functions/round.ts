import Decimal from 'decimal.js'
import { CubeCoordinates, PartialCubeCoordinates } from '../types'
import { completeCube } from './completeCube'

Decimal.set({ rounding: 7 })

/**
 * @category Hex
 */
export const round = (coordinates: PartialCubeCoordinates): CubeCoordinates => {
  const { q, r, s } = completeCube(coordinates)
  let roundedQ = q.round()
  let roundedR = r.round()
  let roundedS = s.round()
  const diffQ = roundedQ.minus(q).abs()
  const diffR = roundedR.minus(r).abs()
  const diffS = roundedS.minus(s).abs()

  if (diffQ.greaterThan(diffR) && diffQ.greaterThan(diffS)) {
    roundedQ = roundedR.neg().minus(roundedS)
  } else if (diffR.greaterThan(diffS)) {
    roundedR = roundedQ.neg().minus(roundedS)
  } else {
    roundedS = roundedQ.neg().minus(roundedR)
  }

  return { q: roundedQ, r: roundedR, s: roundedS }
}
