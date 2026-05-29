"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useSignUp } from '@clerk/nextjs'

const signUpSchema = z.object({
  firstName: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  lastName: z.string().min(2, "Sobrenome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não conferem",
  path: ["confirmPassword"],
})

type SignUpFormValues = z.infer<typeof signUpSchema>

export function SignUpForm() {
  const { signUp, errors: clerkErrors, fetchStatus } = useSignUp()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    setError,
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (data: SignUpFormValues) => {
    await signUp.create({
      emailAddress: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
    })

    if (clerkErrors.fields?.emailAddress) {
      setError('email', { type: 'manual', message: clerkErrors.fields.emailAddress.message })
    }
    if (clerkErrors.fields?.password) {
      setError('password', { type: 'manual', message: clerkErrors.fields.password.message })
    }
    if (clerkErrors.fields?.firstName) {
      setError('firstName', { type: 'manual', message: clerkErrors.fields.firstName.message })
    }
    if (clerkErrors.fields?.lastName) {
      setError('lastName', { type: 'manual', message: clerkErrors.fields.lastName.message })
    }
    if (Object.keys(clerkErrors.fields || {}).length > 0) {
      return
    }

    if (signUp.status === 'complete') {
      await signUp.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) return
          const url = decorateUrl('/')
          if (url.startsWith('http')) window.location.href = url
          else router.push(url)
        },
      })
    }
    else if (signUp.status === 'missing_requirements') {
      const missingVerifications = signUp.missingFields || []
      if (missingVerifications.includes('email_address')) {
        await signUp.verifications.sendEmailCode()
        router.push(`/sign-up/verify?email=${encodeURIComponent(data.email)}`)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-3">
          <Label htmlFor="firstName" className="text-base">Nome</Label>
          <Input
            id="firstName"
            type="text"
            placeholder="Seu nome"
            className="h-12 text-base"
            {...register("firstName")}
            disabled={fetchStatus === 'fetching'}
          />
          {formErrors.firstName && (
            <p className="text-sm text-destructive">{formErrors.firstName.message}</p>
          )}
        </div>

        <div className="space-y-3">
          <Label htmlFor="lastName" className="text-base">Sobrenome</Label>
          <Input
            id="lastName"
            type="text"
            placeholder="Seu sobrenome"
            className="h-12 text-base"
            {...register("lastName")}
            disabled={fetchStatus === 'fetching'}
          />
          {formErrors.lastName && (
            <p className="text-sm text-destructive">{formErrors.lastName.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <Label htmlFor="email" className="text-base">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="seu@email.com"
          className="h-12 text-base"
          {...register("email")}
          disabled={fetchStatus === 'fetching'}
        />
        {formErrors.email && (
          <p className="text-sm text-destructive">{formErrors.email.message}</p>
        )}
      </div>

      <div className="space-y-3">
        <Label htmlFor="password" className="text-base">Senha</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          className="h-12 text-base"
          {...register("password")}
          disabled={fetchStatus === 'fetching'}
        />
        {formErrors.password && (
          <p className="text-sm text-destructive">{formErrors.password.message}</p>
        )}
      </div>

      <div className="space-y-3">
        <Label htmlFor="confirmPassword" className="text-base">Confirmar Senha</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="••••••••"
          className="h-12 text-base"
          {...register("confirmPassword")}
          disabled={fetchStatus === 'fetching'}
        />
        {formErrors.confirmPassword && (
          <p className="text-sm text-destructive">{formErrors.confirmPassword.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full h-12 text-base"
        size="lg"
        disabled={fetchStatus === 'fetching'}
      >
        {fetchStatus === 'fetching' ? "Cadastrando..." : "Criar conta"}
      </Button>
    </form>
  )
}