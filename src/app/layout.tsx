import { Providers } from './providers'
import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Bloggram | Главная',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="ru">
        <body className="min-h-screen flex flex-col">
        <header className="bg-black text-white shadow-lg">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold hover:scale-105 transition-transform">
                    Blog<span className="text-[#00FF00]">Gram</span>
                </Link>
                <nav className="flex gap-6 items-center">
                    <Link href="/" className="hover:text-pink-200 transition-colors">
                        Главная
                    </Link>
                    <Link href="/account" className="hover:text-pink-200 transition-colors">
                        Профиль
                    </Link>
                </nav>
            </div>
        </header>

        <main className="flex-grow container mx-auto px-4 py-8">
            <Providers>{children}</Providers>
        </main>

        </body>
        </html>
    )
}