import { z } from 'zod'

export const stringToNumber = z.string().nonempty().transform(Number)

export const sum = (array: number[]): number => array.reduce((a, b) => a + b, 0)
