import Decimal from 'decimal.js'
import { describe, expect, test } from 'vitest'
import { Orientation } from '../types'
import { pointToCube } from './pointToCube'

describe('pointy hex', () => {
  test('converts a point to cube coordinates', () => {
    const hexSettings = {
      orientation: Orientation.POINTY,
      dimensions: { xRadius: 50, yRadius: 30 },
      origin: { x: new Decimal(-30), y: new Decimal(-30) },
    }

    // test points close to each side of all edges of hex with coordinates { q: 3, r: 4 }
    expect(pointToCube(hexSettings, { x: new Decimal(440), y: new Decimal(185) })).toMatchObject({
      q: new Decimal(3),
      r: new Decimal(3),
    })
    expect(pointToCube(hexSettings, { x: new Decimal(440), y: new Decimal(190) })).toMatchObject({
      q: new Decimal(3),
      r: new Decimal(4),
    })
    expect(pointToCube(hexSettings, { x: new Decimal(485), y: new Decimal(185) })).toMatchObject({
      q: new Decimal(4),
      r: new Decimal(3),
    })
    expect(pointToCube(hexSettings, { x: new Decimal(485), y: new Decimal(190) })).toMatchObject({
      q: new Decimal(3),
      r: new Decimal(4),
    })
    expect(pointToCube(hexSettings, { x: new Decimal(505), y: new Decimal(210) })).toMatchObject({
      q: new Decimal(3),
      r: new Decimal(4),
    })
    expect(pointToCube(hexSettings, { x: new Decimal(510), y: new Decimal(210) })).toMatchObject({
      q: new Decimal(4),
      r: new Decimal(4),
    })
    expect(pointToCube(hexSettings, { x: new Decimal(440), y: new Decimal(230) })).toMatchObject({
      q: new Decimal(3),
      r: new Decimal(4),
    })
    expect(pointToCube(hexSettings, { x: new Decimal(440), y: new Decimal(235) })).toMatchObject({
      q: new Decimal(2),
      r: new Decimal(5),
    })
    expect(pointToCube(hexSettings, { x: new Decimal(485), y: new Decimal(230) })).toMatchObject({
      q: new Decimal(3),
      r: new Decimal(4),
    })
    expect(pointToCube(hexSettings, { x: new Decimal(485), y: new Decimal(235) })).toMatchObject({
      q: new Decimal(3),
      r: new Decimal(5),
    })
    expect(pointToCube(hexSettings, { x: new Decimal(415), y: new Decimal(210) })).toMatchObject({
      q: new Decimal(2),
      r: new Decimal(4),
    })
    expect(pointToCube(hexSettings, { x: new Decimal(420), y: new Decimal(210) })).toMatchObject({
      q: new Decimal(3),
      r: new Decimal(4),
    })
  })
})

describe('flat hex', () => {
  test('converts a point to cube coordinates', () => {
    const hexSettings = {
      orientation: Orientation.FLAT,
      dimensions: { xRadius: 50, yRadius: 30 },
      origin: { x: new Decimal(-30), y: new Decimal(-30) },
    }

    // test points close to each side of all edges of hex with coordinates { q: 3, r: 4 }
    expect(pointToCube(hexSettings, { x: new Decimal(255), y: new Decimal(285) })).toMatchObject({
      q: new Decimal(3),
      r: new Decimal(3),
    })
    expect(pointToCube(hexSettings, { x: new Decimal(255), y: new Decimal(290) })).toMatchObject({
      q: new Decimal(3),
      r: new Decimal(4),
    })
    expect(pointToCube(hexSettings, { x: new Decimal(290), y: new Decimal(300) })).toMatchObject({
      q: new Decimal(4),
      r: new Decimal(3),
    })
    expect(pointToCube(hexSettings, { x: new Decimal(290), y: new Decimal(305) })).toMatchObject({
      q: new Decimal(3),
      r: new Decimal(4),
    })
    expect(pointToCube(hexSettings, { x: new Decimal(290), y: new Decimal(325) })).toMatchObject({
      q: new Decimal(3),
      r: new Decimal(4),
    })
    expect(pointToCube(hexSettings, { x: new Decimal(290), y: new Decimal(335) })).toMatchObject({
      q: new Decimal(4),
      r: new Decimal(4),
    })
    expect(pointToCube(hexSettings, { x: new Decimal(255), y: new Decimal(340) })).toMatchObject({
      q: new Decimal(3),
      r: new Decimal(4),
    })
    expect(pointToCube(hexSettings, { x: new Decimal(255), y: new Decimal(345) })).toMatchObject({
      q: new Decimal(3),
      r: new Decimal(5),
    })
    expect(pointToCube(hexSettings, { x: new Decimal(220), y: new Decimal(325) })).toMatchObject({
      q: new Decimal(3),
      r: new Decimal(4),
    })
    expect(pointToCube(hexSettings, { x: new Decimal(220), y: new Decimal(335) })).toMatchObject({
      q: new Decimal(2),
      r: new Decimal(5),
    })
    expect(pointToCube(hexSettings, { x: new Decimal(220), y: new Decimal(300) })).toMatchObject({
      q: new Decimal(2),
      r: new Decimal(4),
    })
    expect(pointToCube(hexSettings, { x: new Decimal(220), y: new Decimal(305) })).toMatchObject({
      q: new Decimal(3),
      r: new Decimal(4),
    })
  })
})
