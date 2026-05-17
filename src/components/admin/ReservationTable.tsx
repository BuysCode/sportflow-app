"use client"

import { useState } from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '../ui/dialog'

import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export interface Reservation {
  id: string
  name: string
  phoneNumber: string
  date: Date
  hour: string
  sport: string
  courtId: string
  status: "confirmada" | "pendente" | "cancelada"
}

interface ReservationTableProps {
  reservations: Reservation[]
}

export function ReservationTable({ reservations }: ReservationTableProps) {
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null)

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Data</TableHead>
          <TableHead className="hidden sm:table-cell">Horário</TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead className="hidden md:table-cell">Status</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reservations.map((reservation) => (
          <TableRow key={reservation.id}>
            <TableCell>
              {format(reservation.date, "dd/MM/yyyy", { locale: ptBR })}
            </TableCell>
            <TableCell className="hidden sm:table-cell">{reservation.hour}</TableCell>
            <TableCell>{reservation.name}</TableCell>
            <TableCell className="hidden md:table-cell">
              <span
                className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${reservation.status === "confirmada"
                  ? "bg-green-100 text-green-800"
                  : reservation.status === "pendente"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                  }`}
              >
                {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
              </span>
            </TableCell>
            <TableCell>
              <Dialog>
                <DialogTrigger onClick={() => setSelectedReservation(reservation)}>
                  Ver Detalhes
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Detalhes da Reserva</DialogTitle>
                    <DialogDescription>
                      Informações completas sobre a reserva.
                    </DialogDescription>
                  </DialogHeader>
                  {selectedReservation && (
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Cliente</p>
                        <p className="text-base">{selectedReservation.name}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Telefone</p>
                        <p className="text-base">{selectedReservation.phoneNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Data</p>
                        <p className="text-base">{format(selectedReservation.date, "dd/MM/yyyy", { locale: ptBR })}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Horário</p>
                        <p className="text-base">{selectedReservation.hour}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Esporte</p>
                        <p className="text-base">{selectedReservation.sport}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Status</p>
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${selectedReservation.status === "confirmada"
                            ? "bg-green-100 text-green-800"
                            : selectedReservation.status === "pendente"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                            }`}
                        >
                          {selectedReservation.status.charAt(0).toUpperCase() + selectedReservation.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
