import Decimal from 'decimal.js'
import { offsetDelta } from '../../utils'
import { CubeCoordinates, HexOffset, HexSettings, OffsetCoordinates, Orientation } from '../types'

Decimal.set({ rounding: 7 })

/**
 * @hidden
 */
export const offsetToCubePointy = (col: Decimal, row: Decimal, offset: HexOffset): CubeCoordinates => {
  const q = col.minus(offsetDelta(offset, row).round())
  const r = row
  const s = q.neg().minus(r)
  return { q, r, s }
}

/**
 * @hidden
 */
export const offsetToCubeFlat = (col: Decimal, row: Decimal, offset: HexOffset): CubeCoordinates => {
  const q = col
  const r = row.minus(offsetDelta(offset, col).round())
  const s = q.neg().minus(r)
  return { q, r, s }
}

/**
 * @category Hex
 */
export const offsetToCube = (
  { offset, orientation }: Pick<HexSettings, 'offset' | 'orientation'>,
  { col, row }: OffsetCoordinates,
) => (orientation === Orientation.POINTY ? offsetToCubePointy(col, row, offset) : offsetToCubeFlat(col, row, offset))
