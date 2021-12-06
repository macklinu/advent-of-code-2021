import { z } from 'zod'
import { stringToNumber, sum } from '../utils'

type Board = number[][]

class BoardChecker {
  private readonly seen: Set<number> = new Set()
  private readonly matches: Set<number> = new Set()
  private readonly flattenedBoard: Set<number> = new Set()
  private readonly rowLength: number

  constructor(private readonly board: Board) {
    this.flattenedBoard = new Set(board.flatMap((b) => b))
    this.rowLength = this.board[0].length
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
    for (let i = 0; i < this.rowLength; i++) {
      const column = this.board.map((row) => row[i])
      if (column.every((number) => this.seen.has(number))) {
        return true
      }
    }
    return false
  }
}

export function calculateFinalScoreOfWinningBoard(input: string): number {
  const { numbers, boards } = parseInput(input)

  const boardCheckers = boards.map((board) => new BoardChecker(board))

  for (let i = 0; i < numbers.length; i++) {
    const number = numbers[i]
    for (let j = 0; j < boardCheckers.length; j++) {
      const checker = boardCheckers[j]

      checker.mark(number)
      if (checker.hasBingo) {
        return sum(checker.unmarked) * number
      }
    }
  }

  return -1
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
