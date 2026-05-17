"use client"

import { useState } from "react"
import { ReservationTable } from "@/components/admin/ReservationTable"
import { BookingForm } from "@/components/booking/BookingForm"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { type BookingFormValues } from "@/lib/schema"

const mockReservations = [
  {
    id: "1",
    nome: "João Silva",
    telefone: "11999999999",
    data: new Date(2026, 4, 18, 0, 0, 0),
    hora: "09:00",
    status: "confirmada" as const,
  },
  {
    id: "2",
    nome: "Maria Santos",
    telefone: "11988888888",
    data: new Date(2026, 4, 18, 0, 0, 0),
    hora: "10:00",
    status: "pendente" as const,
  },
  {
    id: "3",
    nome: "Carlos Oliveira",
    telefone: "11977777777",
    data: new Date(2026, 4, 19, 0, 0, 0),
    hora: "14:00",
    status: "confirmada" as const,
  },
]

export default function AdminPage() {
  const [reservations, setReservations] = useState(mockReservations)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  const handleNewReservation = (data: BookingFormValues) => {
    const newReservation = {
      id: String(reservations.length + 1),
      nome: data.nome,
      telefone: data.telefone,
      data: data.data,
      hora: data.hora,
      status: "pendente" as const,
    }
    setReservations([...reservations, newReservation])
    setDialogOpen(false)
    setSelectedDate(undefined)
    setSelectedTime(null)
    alert("Nova reserva criada com sucesso!")
  }

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard Administrativo</h1>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger className={'cursor-pointer'}>
              Nova Reserva Manual
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nova Reserva Manual</DialogTitle>
              </DialogHeader>
              <BookingForm
                onSubmit={handleNewReservation}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
              />
            </DialogContent>
          </Dialog>
        </div>

        <ReservationTable reservations={reservations} />
      </div>
    </div>
  )
}
