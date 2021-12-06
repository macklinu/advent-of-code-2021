import { readFile } from 'fs/promises'
import { resolve } from 'path'
import { calculatePowerConsumption } from '.'

const readFileAsString = (fileName: string) =>
  readFile(resolve(__dirname, fileName), 'utf-8')

test.each([
  ['sampleInput.txt', 198],
  ['puzzleInput.txt', 3923414],
])('solves part 1 for %s', async (fileName, expected) => {
  const input = await readFileAsString(fileName)

  const { gammaRate, epsilonRate } = calculatePowerConsumption(input)

  expect(gammaRate * epsilonRate).toEqual(expected)
})
