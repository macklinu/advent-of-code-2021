import { columns } from './utils'

test('columns()', () => {
  expect(
    columns([
      [0, 1, 2],
      [0, 1, 2],
      [0, 1, 2],
    ])
  ).toEqual([
    [0, 0, 0],
    [1, 1, 1],
    [2, 2, 2],
  ])
})
