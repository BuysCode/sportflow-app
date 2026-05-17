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
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'

import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface Reservation {
  id: string
  nome: string
  telefone: string
  data: Date
  hora: string
  status: "confirmada" | "pendente" | "cancelada"
}

interface ReservationTableProps {
  reservations: Reservation[]
}

export function ReservationTable({ reservations }: ReservationTableProps) {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Data</TableHead>
          <TableHead>Horário</TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead>Status</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reservations.map((reservation) => (
          <TableRow key={reservation.id}>
            <TableCell>
              {format(reservation.data, "dd/MM/yyyy", { locale: ptBR })}
            </TableCell>
            <TableCell>{reservation.hora}</TableCell>
            <TableCell>{reservation.nome}</TableCell>
            <TableCell>
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
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger className={'cursor-pointer'}>
                  Ver Detalhes
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Nova Reserva Manual</DialogTitle>
                  </DialogHeader>
                  <h1>Detalhes</h1>
                </DialogContent>
              </Dialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
