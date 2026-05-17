"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { bookingSchema, type BookingFormValues } from "@/lib/schema"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface BookingFormProps {
  onSubmit: (data: BookingFormValues) => void
  selectedDate: Date | undefined
  selectedTime: string | null
}

export function BookingForm({ onSubmit, selectedDate, selectedTime }: BookingFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      nome: "",
      telefone: "",
    },
  })

  const handleFormSubmit = (data: BookingFormValues) => {
    onSubmit({
      ...data,
      data: selectedDate ?? new Date(),
      hora: selectedTime ?? "",
    })
  }

  return (
    <form id="booking-form" onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="nome">Nome</Label>
        <Input id="nome" placeholder="Seu nome completo" {...register("nome")} />
        {errors.nome && (
          <p className="text-sm text-destructive">{errors.nome.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="telefone">WhatsApp</Label>
        <Input
          id="telefone"
          placeholder="(11) 99999-9999"
          {...register("telefone")}
        />
        {errors.telefone && (
          <p className="text-sm text-destructive">{errors.telefone.message}</p>
        )}
      </div>
    </form>
  )
}
