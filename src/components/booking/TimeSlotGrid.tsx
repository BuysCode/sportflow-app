"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface TimeSlotGridProps {
  selectedTime: string | null
  onSelectTime: (time: string) => void
  availableSlots: string[]
  bookedSlots?: string[]
}

export function TimeSlotGrid({
  selectedTime,
  onSelectTime,
  availableSlots,
  bookedSlots = [],
}: TimeSlotGridProps) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
      {availableSlots.map((slot) => {
        const isBooked = bookedSlots.includes(slot)
        const isSelected = selectedTime === slot

        return (
          <Button
            key={slot}
            variant={isSelected ? "default" : "outline"}
            disabled={isBooked}
            onClick={() => onSelectTime(slot)}
            className={cn(
              "w-full",
              isBooked && "bg-muted text-muted-foreground cursor-not-allowed",
              isSelected && "bg-primary text-primary-foreground"
            )}
          >
            {slot}
          </Button>
        )
      })}
    </div>
  )
}
