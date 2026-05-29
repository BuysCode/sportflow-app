'use client'

import Image from 'next/image'
import Background from '../../../../public/background.png'
import { SignUpForm } from '@/components/auth/SignUpForm'
import { useSession } from '@clerk/nextjs'

import { redirect } from 'next/navigation'

export default function SignUp() {
  const { session } = useSession()

  if (session) {
    return redirect("/booking")
  }
  return (
    <div className='w-full h-screen fixed inset-0 overflow-y-hidden flex flex-row'>
      <section className='w-[45%] flex items-center justify-center p-12'>
        <div className='w-full max-w-md space-y-8'>
          <div className='space-y-2'>
            <h1 className='text-3xl font-bold tracking-tight'>Bem-vindo</h1>
            <p className='text-muted-foreground'>Faça login para continuar</p>
          </div>
          <SignUpForm />
        </div>
      </section>
      <div className='w-[55%] relative'>
        <Image fill alt='Background' className='object-cover' src={Background} />
      </div>
    </div>
  )
}