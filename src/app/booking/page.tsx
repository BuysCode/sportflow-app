"use client"

import { useState } from "react"
import { DateSelector } from "@/components/booking/DateSelector"
import { TimeSlotGrid } from "@/components/booking/TimeSlotGrid"
import { BookingForm } from "@/components/booking/BookingForm"
import { Button } from "@/components/ui/button"
import { type BookingFormValues } from "@/lib/schema"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

const availableSlots = [
  "08:00", "09:00", "10:00", "11:00",
  "12:00", "13:00", "14:00", "15:00",
  "16:00", "17:00", "18:00", "19:00",
]

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  const handleBookingSubmit = (data: BookingFormValues) => {
    console.log("Reserva enviada:", {
      nome: data.nome,
      telefone: data.telefone,
      data: format(data.data, "dd/MM/yyyy", { locale: ptBR }),
      hora: data.hora,
    })
    alert(`Reserva confirmada!

Nome: ${data.nome}
Data: ${format(data.data, "dd/MM/yyyy", { locale: ptBR })}
Horário: ${data.hora}`)
  }

  const handleSelectTime = (time: string) => {
    setSelectedTime(time)
  }

  const isFormDisabled = !selectedDate || !selectedTime

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-center text-3xl font-bold">Agendamento</h1>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <div>
              <h2 className="mb-4 text-xl font-semibold">Selecione a Data</h2>
              <DateSelector
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
              />
            </div>

            <div>
              <h2 className="mb-4 text-xl font-semibold">Selecione o Horário</h2>
              <TimeSlotGrid
                selectedTime={selectedTime}
                onSelectTime={handleSelectTime}
                availableSlots={availableSlots}
              />
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-semibold">Seus Dados</h2>
            <BookingForm
              onSubmit={handleBookingSubmit}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
            />
            <Button
              className="mt-4 w-full"
              disabled={isFormDisabled}
              type="submit"
              form="booking-form"
            >
              Confirmar Agendamento
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
