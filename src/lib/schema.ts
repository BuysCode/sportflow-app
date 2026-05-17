import { z } from "zod"

export const bookingSchema = z.object({
  name: z
    .string()
    .min(3, "Nome deve ter pelo menos 3 caracteres"),
  phoneNumber: z
    .string()
    .min(10, "Telefone deve ter pelo menos 10 dígitos")
    .regex(/^\d+$/, "Telefone deve conter apenas números"),
  date: z.date(),
  hour: z
    .string()
    .min(1, "Selecione um horário"),
  sport: z.string(),
  courtId: z.cuid2()
})

export type BookingFormValues = z.infer<typeof bookingSchema>
