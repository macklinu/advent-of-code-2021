import { readFile } from 'fs/promises'
import { resolve } from 'path'
import { createSubmarineLocationCalculator, Calculator } from '.'

const readFileAsString = (fileName: string) =>
  readFile(resolve(__dirname, fileName), 'utf-8')

const basicCalculator: Calculator = (directions) => {
  let horizontalPosition = 0
  let depth = 0

  for (const [command, unit] of directions) {
    switch (command) {
      case 'forward': {
        horizontalPosition += unit
        break
      }
      case 'down': {
        depth += unit
        break
      }
      case 'up': {
        depth -= unit
        break
      }
      default:
        break
    }
  }

  return { horizontalPosition, depth }
}

const aimCalculator: Calculator = (directions) => {
  let horizontalPosition = 0
  let depth = 0
  let aim = 0

  for (const [command, unit] of directions) {
    switch (command) {
      case 'forward': {
        horizontalPosition += unit
        depth += aim * unit
        break
      }
      case 'down': {
        aim += unit
        break
      }
      case 'up': {
        aim -= unit
        break
      }
      default:
        break
    }
  }

  return { horizontalPosition, depth }
}

test.each([
  ['sampleInput.txt', 150],
  ['puzzleInput.txt', 1727835],
])('solves part 1 for %s', async (fileName, expected) => {
  const input = await readFileAsString(fileName)
  const calculate = createSubmarineLocationCalculator(basicCalculator)

  const { horizontalPosition, depth } = calculate(input)

  expect(horizontalPosition * depth).toEqual(expected)
})

test.each([
  ['sampleInput.txt', 900],
  ['puzzleInput.txt', 1544000595],
])('solves part 2 for %s', async (fileName, expected) => {
  const input = await readFileAsString(fileName)
  const calculate = createSubmarineLocationCalculator(aimCalculator)

  const { horizontalPosition, depth } = calculate(input)

  expect(horizontalPosition * depth).toEqual(expected)
})
