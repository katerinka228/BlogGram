'use client'

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { addComment } from "@/lib/posts"

export default function CommentForm({ postId }: { postId: string }) {
    const { data: session } = useSession()
    const router = useRouter()

    async function handleSubmit(formData: FormData) {
        const text = formData.get("text") as string
        await addComment(postId, text, session?.user?.name || "Аноним")
        router.refresh()
    }

    if (!session) {
        return (
            <div className="bg-blue-50 text-blue-800 p-4 rounded-lg">
                Войдите, чтобы оставить комментарий
            </div>
        )
    }

    return (
        <form action={handleSubmit} className="mt-6">
      <textarea
          name="text"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          rows={4}
          placeholder="Ваш комментарий..."
          required
      />
            <button
                type="submit"
                className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
                Отправить
            </button>
        </form>
    )
}