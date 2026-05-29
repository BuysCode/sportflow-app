import { notFound } from "next/navigation"
import bcrypt from "bcrypt"

export default async function AdminCodeLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ "admin-code": string }>
}) {
  const { "admin-code": adminCode } = await params

  const storedHash = process.env.ADMIN_CODE as string

  const isCodeValidated = await bcrypt.compare(adminCode, storedHash)

  if (!storedHash || !isCodeValidated) {
    notFound()
  }

  return (
    <>
      {children}
    </>
  )
}
