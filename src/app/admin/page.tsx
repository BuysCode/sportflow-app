"use client"

import { useState } from "react"
import { Reservation, ReservationTable } from "@/components/admin/ReservationTable"
import { BookingForm } from "@/components/booking/BookingForm"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { type BookingFormValues } from "@/lib/schema"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

const mockReservations: Reservation[] = [
  {
    id: "1",
    name: "João Silva",
    phoneNumber: "11999999999",
    date: new Date(2026, 4, 18, 0, 0, 0),
    hour: "09:00",
    sport: "Futebol",
    courtType: "areia",
    courtNumber: "1",
    status: "confirmada" as const,
  },
  {
    id: "2",
    name: "Maria Santos",
    phoneNumber: "11988888888",
    date: new Date(2026, 4, 18, 0, 0, 0),
    hour: "10:00",
    sport: "Tênis",
    courtType: "salao",
    courtNumber: "2",
    status: "pendente" as const,
  },
  {
    id: "3",
    name: "Carlos Oliveira",
    phoneNumber: "11977777777",
    date: new Date(2026, 4, 19, 0, 0, 0),
    hour: "14:00",
    sport: "Basquete",
    courtType: "salao",
    courtNumber: "3",
    status: "confirmada" as const,
  },
]

export default function AdminPage() {
  const [reservations, setReservations] = useState(mockReservations)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleNewReservation = async (data: BookingFormValues) => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const courtId = data.court
      const [courtNumber, courtType] = courtId.split("-")
      const newReservation = {
        id: String(reservations.length + 1),
        name: data.name,
        phoneNumber: data.phoneNumber,
        date: data.date,
        hour: data.hour,
        sport: data.sport,
        courtType: courtType as "areia" | "salao",
        courtNumber,
        status: "pendente" as const,
      }
      setReservations([...reservations, newReservation])
      setDialogOpen(false)
      toast.success("Reserva criada com sucesso!", {
        description: `${data.name} - ${data.hour}`,
      })
    } catch {
      toast.error("Erro ao criar reserva", {
        description: "Tente novamente mais tarde.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8">
      <div className="mx-auto max-w-4xl w-full">
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold sm:text-3xl">Dashboard Administrativo</h1>
          <div className="flex gap-2">
            <a href="/admin/courts" className="bg-secondary text-secondary-foreground hover:bg-secondary/80 cursor-pointer p-2 rounded-lg">
              Gerenciar Quadras
            </a>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger className={'bg-primary text-primary-foreground hover:bg-primary/80 cursor-pointer p-2 rounded-lg'}>
                Nova Reserva Manual
              </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nova Reserva Manual</DialogTitle>
              </DialogHeader>
              <BookingForm
                onSubmit={handleNewReservation}
              />
              <DialogFooter>
                <Button
                  type="submit"
                  form="booking-form"
                  disabled={isLoading}
                  className="bg-primary text-primary-foreground hover:bg-primary/80 cursor-pointer p-2 rounded-lg w-full sm:w-auto"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    "Criar Reserva"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          </div>
        </div>

        <div className="overflow-x-auto">
          <ReservationTable reservations={reservations} />
        </div>
      </div>
    </div>
  )
}
