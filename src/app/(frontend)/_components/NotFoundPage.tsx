import Link from 'next/link'

export default function NotFoundPage() {
  return (
    <main className="text-palette-eggshell flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="text-7xl font-medium">404</h1>
      <div className="space-y-2">
        <h2 className="text-2xl font-medium uppercase">страница не найдена</h2>
        <p className="lowercase">возможно, она была удалена или перемещена.</p>
      </div>
      <Link href="/">вернуться на главную</Link>
    </main>
  )
}
