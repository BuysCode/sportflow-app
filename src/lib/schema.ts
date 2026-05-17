import { z } from "zod"

export const bookingSchema = z.object({
  nome: z
    .string()
    .min(3, "Nome deve ter pelo menos 3 caracteres"),
  telefone: z
    .string()
    .min(10, "Telefone deve ter pelo menos 10 dígitos")
    .regex(/^\d+$/, "Telefone deve conter apenas números"),
  data: z.date(),
  hora: z
    .string()
    .min(1, "Selecione um horário"),
})

export type BookingFormValues = z.infer<typeof bookingSchema>
