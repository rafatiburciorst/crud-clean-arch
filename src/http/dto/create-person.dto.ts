import { z } from 'zod'

export const CreatePersonSchema = z
  .object({
    name: z.string(),
    age: z.coerce.number(),
  })
  .required()

export type CreatePersonDto = z.infer<typeof CreatePersonSchema>
