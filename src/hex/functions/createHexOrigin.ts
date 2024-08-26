import { isPoint } from '../../utils'
import { BoundingBox, Point } from '../types'

/**
 * @category Hex
 */
export function createHexOrigin(input: 'topLeft', boundingBox: BoundingBox): Point
export function createHexOrigin(input: Point): Point
export function createHexOrigin(input: Point | 'topLeft', boundingBox?: BoundingBox): Point {
  if (isPoint(input)) return input

  if (!boundingBox)
    throw new TypeError(
      `Supply a bounding box ({ width: Decimal, height: Decimal }). Received: ${JSON.stringify(boundingBox)}`,
    )

  if (input === 'topLeft') return { x: boundingBox.width.mul(-0.5), y: boundingBox.height.mul(-0.5) }

  throw new TypeError(
    `Invalid origin: ${JSON.stringify(
      input,
    )}. Origin must be expressed as a Point ({ x: number, y: number }) or the string 'topLeft'.`,
  )
}
