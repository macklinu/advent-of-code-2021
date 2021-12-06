import { readFile } from 'fs/promises'
import { resolve } from 'path'
import { calculateFinalScoresOfWinningBoard } from '.'
import { last } from '../utils'

const readFileAsString = (fileName: string) =>
  readFile(resolve(__dirname, fileName), 'utf-8')

test.each([
  ['sampleInput.txt', 4512],
  ['puzzleInput.txt', 65325],
])('solves part 1 for %s', async (fileName, expected) => {
  const input = await readFileAsString(fileName)

  const [firstWinningScore] = calculateFinalScoresOfWinningBoard(input)

  expect(firstWinningScore).toEqual(expected)
})

test.each([
  ['sampleInput.txt', 1924],
  ['puzzleInput.txt', 4624],
])('solves part 2 for %s', async (fileName, expected) => {
  const input = await readFileAsString(fileName)

  const winningScores = calculateFinalScoresOfWinningBoard(input)

  expect(last(winningScores)).toEqual(expected)
})
