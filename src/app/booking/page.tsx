"use client"

import { useState } from "react"
import { BookingForm } from "@/components/booking/BookingForm"
import { Button } from "@/components/ui/button"
import { type BookingFormValues } from "@/lib/schema"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

const availableSlots = [
  "08:00", "09:00", "10:00", "11:00",
  "12:00", "13:00", "14:00", "15:00",
  "16:00", "17:00", "18:00", "19:00",
]

export default function BookingPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleBookingSubmit = async (data: BookingFormValues) => {
    setIsLoading(true)
    try {
      console.log("Reserva enviada:", {
        courtType: data.courtType,
        courtNumber: data.courtNumber,
        name: data.name,
        phoneNumber: data.phoneNumber,
        date: format(data.date, "dd/MM/yyyy", { locale: ptBR }),
        hour: data.hour,
        sport: data.sport
      })
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success("Reserva confirmada!", {
        description: `${data.name} - ${format(data.date, "dd/MM/yyyy", { locale: ptBR })} às ${data.hour}`,
      })
    } catch {
      toast.error("Erro ao confirmar reserva", {
        description: "Tente novamente mais tarde.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-center text-2xl font-bold sm:mb-8 sm:text-3xl">Agendamento</h1>

        <div className="mx-auto max-w-md">
          <BookingForm
            onSubmit={handleBookingSubmit}
          />
          <Button
            className="mt-4 w-full"
            disabled={isLoading}
            type="submit"
            form="booking-form"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processando...
              </>
            ) : (
              "Confirmar Agendamento"
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
