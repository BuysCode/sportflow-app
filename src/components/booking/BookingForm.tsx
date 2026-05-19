"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { bookingSchema, type BookingFormValues } from "@/lib/schema"
import { phoneNumberMask } from "@/lib/functions/phoneNumberMask"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const timeSlots = [
  "08:00", "09:00", "10:00", "11:00",
  "12:00", "13:00", "14:00", "15:00",
  "16:00", "17:00", "18:00", "19:00",
]

const courts = [
  { id: "1-areia", name: "Quadra 1", type: "areia" as const, label: "Quadra 1 - Areia" },
  { id: "2-areia", name: "Quadra 2", type: "areia" as const, label: "Quadra 2 - Areia" },
  { id: "3-areia", name: "Quadra 3", type: "areia" as const, label: "Quadra 3 - Areia" },
  { id: "4-areia", name: "Quadra 4", type: "areia" as const, label: "Quadra 4 - Areia" },
  { id: "1-salao", name: "Quadra 1", type: "salao" as const, label: "Quadra 1 - Salão" },
  { id: "2-salao", name: "Quadra 2", type: "salao" as const, label: "Quadra 2 - Salão" },
  { id: "3-salao", name: "Quadra 3", type: "salao" as const, label: "Quadra 3 - Salão" },
  { id: "4-salao", name: "Quadra 4", type: "salao" as const, label: "Quadra 4 - Salão" },
]

const sportsByCourtType: Record<"areia" | "salao", string[]> = {
  areia: ["Futebol de Areia", "Vôlei de Areia", "Tênis"],
  salao: ["Futsal", "Basquete", "Vôlei de Quadra", "Tênis"],
}

interface BookingFormProps {
  onSubmit: (data: BookingFormValues) => void
}

export function BookingForm({ onSubmit }: BookingFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      hour: "",
      court: "",
      sport: "",
    },
  })

  const selectedCourt = watch("court")
  const selectedCourtType = courts.find(c => c.id === selectedCourt)?.type

  const availableSports = selectedCourtType ? sportsByCourtType[selectedCourtType] : []

  const handleFormSubmit = (data: BookingFormValues) => {
    const court = courts.find(c => c.id === data.court)
    onSubmit({
      ...data,
      courtType: court?.type || "salao",
      courtNumber: court?.name.replace("Quadra ", "") || "",
    })
  }

  return (
    <form id="booking-form" onSubmit={handleSubmit(handleFormSubmit)} className="space-y-3">
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
          type="text"
          maxLength={15}
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

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="date">Data</Label>
          <Input
            id="date"
            type="date"
            {...register("date", {
              setValueAs: (value) => {
                const [year, month, day] = value.split("-").map(Number)
                return new Date(year, month - 1, day)
              },
            })}
          />
          {errors.date && (
            <p className="text-sm text-destructive">{errors.date.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="hour">Horário</Label>
          <Select onValueChange={(value) => { if (value) setValue("hour", value) }} value={String(watch("hour") ?? "")}>
            <SelectTrigger id="hour" className="w-full">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              {timeSlots.map((slot) => (
                <SelectItem key={slot} value={slot}>
                  {slot}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.hour && (
            <p className="text-sm text-destructive">{errors.hour.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="court">Quadra</Label>
        <Select onValueChange={(value) => { if (value) { setValue("court", value); setValue("sport", "") } }} value={String(watch("court") ?? "")}>
          <SelectTrigger id="court" className="w-full">
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            {courts.map((court) => (
              <SelectItem key={court.id} value={court.id}>
                {court.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.court && (
          <p className="text-sm text-destructive">{errors.court.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="sport">Esporte</Label>
        <Select onValueChange={(value) => { if (value) setValue("sport", value) }} value={String(watch("sport") ?? "")}>
          <SelectTrigger id="sport" className="w-full">
            <SelectValue placeholder={selectedCourtType ? "Selecione" : "Selecione uma quadra primeiro"} />
          </SelectTrigger>
          <SelectContent>
            {availableSports.map((sport) => (
              <SelectItem key={sport} value={sport}>
                {sport}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.sport && (
          <p className="text-sm text-destructive">{errors.sport.message}</p>
        )}
      </div>
    </form>
  )
}
