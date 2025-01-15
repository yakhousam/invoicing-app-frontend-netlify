import { z } from 'zod'

export const dateToZodDate = z.preprocess(
  (val: unknown) => {
    if (val instanceof Date) {
      return val.toISOString()
    }
    return val
  },
  z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date format'
  })
)
