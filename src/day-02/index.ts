import { z } from 'zod'
import { stringToNumber } from '../utils'

interface SubmarinePosition {
  horizontalPosition: number
  depth: number
}

const Direction = z.tuple([z.enum(['forward', 'down', 'up']), stringToNumber])
type Direction = z.TypeOf<typeof Direction>

export type Calculator = (directions: Direction[]) => SubmarinePosition

export function createSubmarineLocationCalculator(calculator: Calculator) {
  return (input: string): SubmarinePosition => {
    const values = parseInput(input)
    const directions = values.map((value) => Direction.parse(value.split(' ')))
    return calculator(directions)
  }
}

function parseInput(input: string): string[] {
  const values = input.split('\n').filter(Boolean)
  return z.array(z.string().nonempty()).nonempty().parse(values)
}
