import { z } from 'zod'

export const CreatePersonSchema = z
  .object({
    name: z.string(),
    age: z.coerce.number(),
    email: z.string().email(),
    password: z.string().min(6),
  })
  .required()

export type CreatePersonDto = z.infer<typeof CreatePersonSchema>
