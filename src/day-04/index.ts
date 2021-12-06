import { z } from 'zod'
import * as crypto from 'crypto'
import { columns, stringToNumber, sum } from '../utils'

type Board = number[][]

class BoardChecker {
  public readonly id: string = crypto.randomBytes(16).toString('hex')
  private readonly seen: Set<number> = new Set()
  private readonly matches: Set<number> = new Set()
  private readonly flattenedBoard: Set<number> = new Set()

  constructor(private readonly board: Board) {
    this.flattenedBoard = new Set(board.flatMap((b) => b))
  }

  mark(number: number): void {
    this.seen.add(number)
    if (this.flattenedBoard.has(number)) {
      this.matches.add(number)
    }
  }

  get unmarked(): number[] {
    return [...this.flattenedBoard].filter((value) => !this.matches.has(value))
  }

  get hasBingo(): boolean {
    return this.hasBingoRow || this.hasBingoColumn
  }

  private get hasBingoRow(): boolean {
    return this.board.some((row) =>
      row.every((number) => this.seen.has(number))
    )
  }

  private get hasBingoColumn(): boolean {
    return columns(this.board).some((column) =>
      column.every((number) => this.seen.has(number))
    )
  }
}

export function calculateFinalScoresOfWinningBoard(input: string): number[] {
  const { numbers, boards } = parseInput(input)
  const winningScores: number[] = []
  const boardCheckers = boards.map((board) => new BoardChecker(board))
  const completedBoards = new Set<string>()

  for (let i = 0; i < numbers.length; i++) {
    const number = numbers[i]
    for (let j = 0; j < boardCheckers.length; j++) {
      const checker = boardCheckers[j]
      if (completedBoards.has(checker.id)) {
        continue
      }

      checker.mark(number)
      if (checker.hasBingo) {
        winningScores.push(sum(checker.unmarked) * number)
        completedBoards.add(checker.id)
      }
    }
  }

  return winningScores
}

function parseInput(input: string) {
  const [numbers, ...boards] = input.split('\n\n')

  return {
    numbers: z.array(stringToNumber).nonempty().parse(numbers.split(',')),
    boards: boards.map((board) =>
      board
        .split('\n')
        .filter(Boolean)
        .map((s) =>
          z.array(stringToNumber).parse(s.split(/\s+/).filter(Boolean))
        )
    ),
  } as const
}
