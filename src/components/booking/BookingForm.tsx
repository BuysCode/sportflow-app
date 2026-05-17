"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { bookingSchema, type BookingFormValues } from "@/lib/schema"
import { phoneNumberMask } from "@/lib/functions/phoneNumberMask"
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
      name: "",
      phoneNumber: "",
    },
  })

  const handleFormSubmit = (data: BookingFormValues) => {
    onSubmit({
      ...data,
      date: selectedDate ?? new Date(),
      hour: selectedTime ?? "",
    })
  }

  return (
    <form id="booking-form" onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nome</Label>
        <Input id="name" placeholder="Seu nome completo" {...register("name")} />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phoneNumber">WhatsApp</Label>
        <Input
          id="phoneNumber"
          placeholder="(11) 99999-9999"
          {...register("phoneNumber", {
            onChange: (e) => {
              e.target.value = phoneNumberMask(e.target.value)
            },
          })}
        />
        {errors.phoneNumber && (
          <p className="text-sm text-destructive">{errors.phoneNumber.message}</p>
        )}
      </div>
    </form>
  )
}
