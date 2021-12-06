import { z } from 'zod'
import { columns } from '../utils'

interface PowerConsumption {
  gammaRate: number
  epsilonRate: number
}

type Bit = '0' | '1'

class BitCounter {
  private map: Record<Bit, number>

  constructor() {
    this.map = {
      0: 0,
      1: 0,
    }
  }

  countAll(values: Bit[]): void {
    values.forEach((value) => {
      this.map[value] = this.map[value] + 1
    })
  }

  get mostCommonBit(): string {
    return this.map[0] > this.map[1] ? '0' : '1'
  }

  get leastCommonBit(): string {
    return this.map[0] > this.map[1] ? '1' : '0'
  }
}

export function calculatePowerConsumption(input: string): PowerConsumption {
  const values = parseInput(input)
  const bits = values.map((v) => v.split('') as Bit[])

  const bitCounters = columns(bits).reduce<BitCounter[]>(
    (bitCounters, column) => {
      const bitCounter = new BitCounter()
      bitCounter.countAll(column)
      bitCounters.push(bitCounter)
      return bitCounters
    },
    []
  )

  const gammaRate = binaryToDecimal(
    bitCounters.map(({ mostCommonBit }) => mostCommonBit).join('')
  )
  const epsilonRate = binaryToDecimal(
    bitCounters.map(({ leastCommonBit }) => leastCommonBit).join('')
  )

  return {
    gammaRate,
    epsilonRate,
  }
}

function binaryToDecimal(binary: string): number {
  return parseInt(binary, 2)
}

function parseInput(input: string): Bit[] {
  const values = input.split('\n').filter(Boolean)
  return z
    .array(
      z
        .string()
        .nonempty()
        .regex(/^(0|1)+$/)
    )
    .nonempty()
    .parse(values) as Bit[]
}
