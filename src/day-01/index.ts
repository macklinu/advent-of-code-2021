export function createIncreaseCounter(
  comparisonFunction: (comparison: {
    currentValue: number
    values: number[]
    index: number
  }) => boolean
) {
  return (input: string): number => {
    const values = input.split('\n').filter(Boolean).map(Number)

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
