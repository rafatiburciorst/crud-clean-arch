import { z } from 'zod'

export const CreateAddressSchema = z.object({
  street: z.string(),
  homeNumber: z.string(),
  district: z.string(),
  zipNumber: z.string(),
  personId: z.string(),
})

export type CreateAddressDto = z.infer<typeof CreateAddressSchema>
