import { z } from 'zod'
import { stringToNumber } from '../utils'

export function sumOfRiskLevels(input: string): number {
  const heightMap = parseInput(input)

  const results: number[] = []

  heightMap.forEach((row, rowIndex) => {
    row.forEach((position, positionIndex) => {
      const left = row[positionIndex - 1]
      const right = row[positionIndex + 1]
      const top = heightMap[rowIndex - 1]?.[positionIndex]
      const bottom = heightMap[rowIndex + 1]?.[positionIndex]

      const smallestExistingNeighbor = Math.min(
        ...[left, right, top, bottom].filter(
          (value) => typeof value !== 'undefined'
        )
      )

      if (position < smallestExistingNeighbor) {
        results.push(position)
      }
    })
  })

  return results.reduce(sumAdding(1), 0)
}

function sumAdding(number: number) {
  return (a: number, b: number) => a + b + number
}

function parseInput(input: string): number[][] {
  const values = input.split('\n').filter(Boolean)
  return values.map((row) =>
    z.array(stringToNumber).nonempty().parse(row.split(''))
  )
}
