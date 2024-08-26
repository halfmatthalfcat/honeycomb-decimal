import Decimal from 'decimal.js'
import { offsetDelta } from '../../utils'
import { Hex } from '../hex'
import { HexOffset, OffsetCoordinates } from '../types'

Decimal.set({ rounding: 7 })

const hexToOffsetPointy = (q: Decimal, r: Decimal, offset: HexOffset): OffsetCoordinates => ({
  col: q.plus(offsetDelta(offset, r).round()),
  row: r,
})

const hexToOffsetFlat = (q: Decimal, r: Decimal, offset: HexOffset): OffsetCoordinates => ({
  col: q,
  row: r.plus(offsetDelta(offset, q).round()),
})

/**
 * @category Hex
 */
export const hexToOffset = ({ q, r, offset, isPointy }: Pick<Hex, 'q' | 'r' | 'offset' | 'isPointy'>) =>
  isPointy ? hexToOffsetPointy(q, r, offset) : hexToOffsetFlat(q, r, offset)
