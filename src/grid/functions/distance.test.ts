import Decimal from 'decimal.js'
import { expect, test } from 'vitest'
import { defaultHexSettings } from '../../hex'
import { distance } from './distance'

test('returns the number of hexes between the passed 2 hexes (excluding the last hex)', () => {
  expect(
    distance(defaultHexSettings, { q: new Decimal(1), r: new Decimal(3) }, { q: new Decimal(8), r: new Decimal(7) }),
  ).toBe(11)
})
