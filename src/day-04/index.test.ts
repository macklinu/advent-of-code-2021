import { readFile } from 'fs/promises'
import { resolve } from 'path'
import { calculateFinalScoreOfWinningBoard } from '.'

const readFileAsString = (fileName: string) =>
  readFile(resolve(__dirname, fileName), 'utf-8')

test.each([
  ['sampleInput.txt', 4512],
  ['puzzleInput.txt', 65325],
])('solves part 1 for %s', async (fileName, expected) => {
  const input = await readFileAsString(fileName)

  const finalScore = calculateFinalScoreOfWinningBoard(input)

  expect(finalScore).toEqual(expected)
})
