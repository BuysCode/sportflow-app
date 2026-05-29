import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
      <h1 className="mb-4 text-8xl font-bold text-primary">404</h1>
      <h2 className="mb-2 text-2xl font-semibold">Página não encontrada</h2>
      <p className="mb-8 max-w-md text-center text-muted-foreground">
        A página que você está procurando não existe ou foi movida.
      </p>
      <Link
        href="/"
        className="rounded-lg bg-primary px-6 py-3 text-primary-foreground transition-colors hover:bg-primary/80"
      >
        Voltar ao início
      </Link>
    </div>
  )
}
