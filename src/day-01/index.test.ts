import { createIncreaseCounter } from '.'
import * as fs from 'fs'
import * as path from 'path'

const sampleInput = () =>
  fs.promises.readFile(path.resolve(__dirname, 'sampleInput.txt'), 'utf-8')

const puzzleInput = () =>
  fs.promises.readFile(path.resolve(__dirname, 'puzzleInput.txt'), 'utf-8')

const totalIncreases = createIncreaseCounter(
  ({ currentValue, values, index }) => {
    const previousValue = values[index - 1]
    return currentValue > previousValue
  }
)

const totalIncreasesWindow = createIncreaseCounter(({ values, index }) => {
  const sum = (array: number[]): number => array.reduce((a, b) => a + b, 0)
  const previousValues = [values[index - 1], values[index], values[index + 1]]
  const currentValues = [values[index], values[index + 1], values[index + 2]]
  return sum(currentValues) > sum(previousValues)
})

test('solves part 1 sample input', async () => {
  expect(totalIncreases(await sampleInput())).toEqual(7)
})

test('solves part 1 puzzle input', async () => {
  expect(totalIncreases(await puzzleInput())).toEqual(1655)
})

test('solves part 2 sample input', async () => {
  expect(totalIncreasesWindow(await sampleInput())).toEqual(5)
})

test('solves part 2 puzzle input', async () => {
  expect(totalIncreasesWindow(await puzzleInput())).toEqual(1683)
})
