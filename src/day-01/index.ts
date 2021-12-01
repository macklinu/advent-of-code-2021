import { z } from 'zod'
import { stringToNumber } from '../utils'

export function createIncreaseCounter(
  comparisonFunction: (comparison: {
    currentValue: number
    values: number[]
    index: number
  }) => boolean
) {
  return (input: string): number => {
    const values = parseInput(input)

    return values.reduce((increaseCount, value, index) => {
      if (index === 0) {
        return increaseCount
      }

      if (comparisonFunction({ currentValue: value, values, index })) {
        return increaseCount + 1
      }

      return increaseCount
    }, 0)
  }
}

function parseInput(input: string): number[] {
  const valueArray = input.split('\n').filter(Boolean)
  return z.array(stringToNumber).nonempty().parse(valueArray)
}
