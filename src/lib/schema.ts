import { z } from "zod"

export const bookingSchema = z.object({
  name: z
    .string()
    .min(3, "Nome deve ter pelo menos 3 caracteres"),
  phoneNumber: z
    .string()
    .min(11, "Telefone deve ter pelo menos 10 dígitos")
    .regex(/^\d+$/, "Telefone deve conter apenas números"),
  date: z.date().refine((val) => !isNaN(val.getTime()), "Selecione uma data válida"),
  hour: z
    .string()
    .min(1, "Selecione um horário"),
  sport: z.string().min(1, "Selecione um esporte"),
  court: z.string().min(1, "Selecione uma quadra"),
  courtType: z.enum(["areia", "salao"]).optional(),
  courtNumber: z.string().optional(),
})

export type BookingFormValues = z.infer<typeof bookingSchema>
