import { readFile } from 'fs/promises'
import { resolve } from 'path'
import { createIncreaseCounter } from '.'
import { sum } from '../utils'

const readFileAsString = (fileName: string) =>
  readFile(resolve(__dirname, fileName), 'utf-8')

test.each([
  ['sampleInput.txt', 7],
  ['puzzleInput.txt', 1655],
])('solves part 1 for %s', async (fileName, expected) => {
  const input = await readFileAsString(fileName)
  const totalIncreases = createIncreaseCounter(
    ({ currentValue, values, index }) => {
      const previousValue = values[index - 1]
      return currentValue > previousValue
    }
  )

  expect(totalIncreases(input)).toEqual(expected)
})

test.each([
  ['sampleInput.txt', 5],
  ['puzzleInput.txt', 1683],
])('solves part 2 for %s', async (fileName, expected) => {
  const input = await readFileAsString(fileName)
  const totalIncreasesWindow = createIncreaseCounter(({ values, index }) => {
    const previousValues = [values[index - 1], values[index], values[index + 1]]
    const currentValues = [values[index], values[index + 1], values[index + 2]]
    return sum(currentValues) > sum(previousValues)
  })

  expect(totalIncreasesWindow(input)).toEqual(expected)
})
