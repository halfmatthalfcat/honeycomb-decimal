import { HexCoordinates, HexSettings, toCube } from '../../hex'

export function distance(
  hexSettings: Pick<HexSettings, 'offset' | 'orientation'>,
  from: HexCoordinates,
  to: HexCoordinates,
) {
  const { q: fromQ, r: fromR, s: fromS } = toCube(hexSettings, from)
  const { q: toQ, r: toR, s: toS } = toCube(hexSettings, to)
  return Math.max(
    fromQ.minus(toQ).abs().toNumber(),
    fromR.minus(toR).abs().toNumber(),
    fromS.minus(toS).abs().toNumber(),
  )
}
