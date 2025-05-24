'use client'
import { signIn, signOut, useSession } from 'next-auth/react'

export default function AuthButton() {
    const { data: session } = useSession()

    return (
        <button
            onClick={() => (session ? signOut() : signIn())}
            className="border-[1px] border-gray-300 bg-white text-indigo-600 px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition-colors font-medium flex items-center gap-2"
        >
            {session ? (
                <>
                    <span className="w-2 h-2 rounded-full bg-green-500 "></span>
                    Выйти
                </>
            ) : (
                'Войти'
            )}
        </button>
    )
}