import { z } from 'zod'
import * as assert from 'assert'

export const stringToNumber = z.string().nonempty().transform(Number)

export const sum = (array: number[]): number => array.reduce((a, b) => a + b, 0)

export function columns<T>(array: T[][]): T[][] {
  const rowLength = array[0]?.length

  assert.ok(
    typeof rowLength !== 'undefined',
    '2D array must contain at least one row'
  )
  assert.ok(
    array.every((row) => row.length === rowLength),
    'All rows must be the same length'
  )

  const columns: T[][] = []
  for (let i = 0; i < rowLength; i++) {
    const column = array.map((row) => row[i])
    columns.push(column)
  }
  return columns
}
