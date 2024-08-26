import { TupleCoordinates } from '../hex'

/**
 * @category Coordinates
 */
export const tupleToCube = ([q, r, s = q.neg().minus(r)]: TupleCoordinates) => ({ q, r, s })
