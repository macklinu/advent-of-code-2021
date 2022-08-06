import { readFile } from 'fs/promises'
import { resolve } from 'path'
import { sumOfRiskLevels } from '.'

const readFileAsString = (fileName: string) =>
  readFile(resolve(__dirname, fileName), 'utf-8')

test.each([
  ['sampleInput.txt', 15],
  ['puzzleInput.txt', 603],
])('solves part 1 for %s', async (fileName, expected) => {
  const input = await readFileAsString(fileName)

  const sum = sumOfRiskLevels(input)

  expect(sum).toEqual(expected)
})
