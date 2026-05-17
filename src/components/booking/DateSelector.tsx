"use client"

import { ptBR } from "date-fns/locale"
import { Calendar } from "@/components/ui/calendar"

interface DateSelectorProps {
  selectedDate: Date | undefined
  onSelectDate: (date: Date | undefined) => void
}

export function DateSelector({ selectedDate, onSelectDate }: DateSelectorProps) {
  return (
    <Calendar
      mode="single"
      selected={selectedDate}
      onSelect={onSelectDate}
      locale={ptBR}
      disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
      className="rounded-md border"
    />
  )
}
