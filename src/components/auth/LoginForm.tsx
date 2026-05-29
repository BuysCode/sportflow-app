"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useSignIn } from '@clerk/nextjs'

const loginSchema = z.object({
  email: z.email("Email inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm() {
  const { signIn, errors: clerkErrors, fetchStatus } = useSignIn()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors, isSubmitting },
    setError,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: LoginFormValues) => {
    await signIn.password({
      emailAddress: data.email,
      password: data.password,
    })

    if (clerkErrors.fields?.identifier) {
      setError('email', { type: 'manual', message: clerkErrors.fields.identifier.message })
    }
    if (clerkErrors.fields?.password) {
      setError('password', { type: 'manual', message: clerkErrors.fields.password.message })
    }
    if (clerkErrors.fields?.identifier || clerkErrors.fields?.password) {
      return
    }

    if (signIn.status === 'complete') {
      await signIn.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) return
          const url = decorateUrl('/')
          if (url.startsWith('http')) window.location.href = url
          else router.push(url)
        },
      })
    }
    else if (signIn.status === 'needs_second_factor') {
      router.push('/sign-in/mfa')
    }
    else if (signIn.status === 'needs_client_trust') {
      const emailCodeFactor = signIn.supportedSecondFactors?.find(
        (factor) => factor.strategy === 'email_code'
      )
      if (emailCodeFactor) await signIn.mfa.sendEmailCode()
      router.push('/sign-in/verify')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

      <Button
        type="submit"
        className="w-full h-12 text-base"
        size="lg"
        disabled={fetchStatus === 'fetching'}
      >
        {fetchStatus === 'fetching' ? "Entrando..." : "Entrar"}
      </Button>
    </form>
  )
}