"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"

const courtTypes = [
  { value: "areia", label: "Areia" },
  { value: "salao", label: "Salão" },
]

const allSports = [
  "Futebol de Areia",
  "Vôlei de Areia",
  "Futsal",
  "Basquete",
  "Vôlei de Quadra",
  "Tênis",
]

interface Court {
  id: string
  name: string
  number: string
  type: "areia" | "salao"
  compatibleSports: string[]
}

const mockCourts: Court[] = [
  {
    id: "1",
    name: "Quadra 1",
    number: "1",
    type: "areia",
    compatibleSports: ["Futebol de Areia", "Vôlei de Areia", "Tênis"],
  },
  {
    id: "2",
    name: "Quadra 2",
    number: "2",
    type: "salao",
    compatibleSports: ["Futsal", "Basquete", "Vôlei de Quadra", "Tênis"],
  },
]

export default function AdminCourtsPage() {
  const [courts, setCourts] = useState(mockCourts)
  const [courtName, setCourtName] = useState("")
  const [courtNumber, setCourtNumber] = useState("")
  const [courtType, setCourtType] = useState<"areia" | "salao">("salao")
  const [selectedSports, setSelectedSports] = useState<string[]>([])

  const handleSportToggle = (sport: string) => {
    setSelectedSports((prev) =>
      prev.includes(sport) ? prev.filter((s) => s !== sport) : [...prev, sport]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!courtName || !courtNumber || !courtType || selectedSports.length === 0) {
      toast.error("Preencha todos os campos")
      return
    }

    const newCourt: Court = {
      id: String(courts.length + 1),
      name: courtName,
      number: courtNumber,
      type: courtType,
      compatibleSports: selectedSports,
    }

    setCourts([...courts, newCourt])
    setCourtName("")
    setCourtNumber("")
    setCourtType("salao")
    setSelectedSports([])

    toast.success("Quadra cadastrada com sucesso!")
  }

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8">
      <div className="mx-auto max-w-4xl w-full">
        <h1 className="text-2xl font-bold sm:text-3xl mb-6 sm:mb-8">
          Gerenciar Quadras
        </h1>

        <div className="mb-8 p-4 sm:p-6 border rounded-lg bg-card">
          <h2 className="text-xl font-semibold mb-4">Nova Quadra</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="courtName">Nome da Quadra</Label>
                <Input
                  id="courtName"
                  placeholder="Ex: Quadra Principal"
                  value={courtName}
                  onChange={(e) => setCourtName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="courtNumber">Número</Label>
                <Input
                  id="courtNumber"
                  placeholder="Ex: 1"
                  value={courtNumber}
                  onChange={(e) => setCourtNumber(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="courtType">Tipo de Quadra</Label>
              <Select
                onValueChange={(value) => setCourtType(value as "areia" | "salao")}
                value={courtType}
              >
                <SelectTrigger id="courtType" className="w-full">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {courtTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Esportes Compatíveis</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {allSports.map((sport) => (
                  <label
                    key={sport}
                    className="flex items-center gap-2 p-2 border rounded cursor-pointer hover:bg-accent"
                  >
                    <input
                      type="checkbox"
                      checked={selectedSports.includes(sport)}
                      onChange={() => handleSportToggle(sport)}
                      className="h-4 w-4"
                    />
                    <span className="text-sm">{sport}</span>
                  </label>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/80 cursor-pointer w-full sm:w-auto"
            >
              Cadastrar Quadra
            </Button>
          </form>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Quadras Cadastradas</h2>
          {courts.length === 0 ? (
            <p className="text-muted-foreground">Nenhuma quadra cadastrada.</p>
          ) : (
            <div className="grid gap-4">
              {courts.map((court) => (
                <div
                  key={court.id}
                  className="p-4 border rounded-lg bg-card"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <h3 className="font-semibold">
                        {court.name} - {court.type === "areia" ? "Areia" : "Salão"}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Número: {court.number}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {court.compatibleSports.map((sport) => (
                        <span
                          key={sport}
                          className="px-2 py-1 text-xs bg-secondary rounded"
                        >
                          {sport}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
