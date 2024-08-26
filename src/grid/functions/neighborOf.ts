import Decimal from 'decimal.js'
import { AxialCoordinates, Hex, offsetToCubeFlat, offsetToCubePointy, PartialCubeCoordinates } from '../../hex'
import { Direction } from '../types'

const DIRECTIONS_POINTY = [
  null, // ambiguous
  { q: new Decimal(1), r: new Decimal(-1) }, // NE
  { q: new Decimal(1), r: new Decimal(0) }, // E
  { q: new Decimal(0), r: new Decimal(1) }, // SE
  null, // ambiguous
  { q: new Decimal(-1), r: new Decimal(1) }, // SW
  { q: new Decimal(-1), r: new Decimal(0) }, // W
  { q: new Decimal(0), r: new Decimal(-1) }, // NW
] as AxialCoordinates[]
const DIRECTIONS_FLAT = [
  { q: new Decimal(0), r: new Decimal(-1) }, // N
  { q: new Decimal(1), r: new Decimal(-1) }, // NE
  null, // ambiguous
  { q: new Decimal(1), r: new Decimal(0) }, // SE
  { q: new Decimal(0), r: new Decimal(1) }, // S
  { q: new Decimal(-1), r: new Decimal(1) }, // SW
  null, // ambiguous
  { q: new Decimal(-1), r: new Decimal(0) }, // NW
] as AxialCoordinates[]

const neighborOfPointy = <T extends Hex>(
  { offset, q, r, col, row }: T,
  direction: Direction,
): PartialCubeCoordinates => {
  if (direction === Direction.S || direction === Direction.N) {
    const nextRow = direction === Direction.S ? row.plus(1) : row.minus(1)
    return offsetToCubePointy(col, nextRow, offset)
  }
  const neighbor = DIRECTIONS_POINTY[direction]
  return { q: q.plus(neighbor.q), r: r.plus(neighbor.r) }
}

const neighborOfFlat = <T extends Hex>({ offset, q, r, col, row }: T, direction: Direction): PartialCubeCoordinates => {
  if (direction === Direction.E || direction === Direction.W) {
    const nextCol = direction === Direction.E ? col.plus(1) : col.minus(1)
    return offsetToCubeFlat(nextCol, row, offset)
  }
  const neighbor = DIRECTIONS_FLAT[direction]
  return { q: q.plus(neighbor.q), r: r.plus(neighbor.r) }
}

// todo: add option that makes it possible to return 2 hexes for ambiguous directions
export const neighborOf = <T extends Hex>(hex: T, direction: Direction): T =>
  hex.clone(hex.isPointy ? neighborOfPointy(hex, direction) : neighborOfFlat(hex, direction))
