import Decimal from 'decimal.js'
import { HexOffset } from '../hex/types'

export const offsetDelta = (offset: HexOffset, rowOrCol: Decimal) => {
  const shift = rowOrCol.modulo(2).abs().lessThan(1) ? 0 : 1

  return rowOrCol.plus(shift * offset).div(2)
}
