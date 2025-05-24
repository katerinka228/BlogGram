'use client'

import { useEffect, useState } from 'react'
import { getPostById, getCommentsByPostId, addComment } from '@/lib/posts'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface Post {
    id: string
    title: string
    content: string
    author: string
}

interface Comment {
    id: string
    postId: string
    text: string
    author: string
}

export default function PostContent({ id }: { id: string }) {
    const [post, setPost] = useState<Post | null>(null)
    const [comments, setComments] = useState<Comment[]>([])
    const [loading, setLoading] = useState(true)
    const { data: session } = useSession()
    const router = useRouter()

    const fetchData = async () => {
        const [postData, commentsData] = await Promise.all([
            getPostById(id),
            getCommentsByPostId(id)
        ])
        setPost(postData || null)
        setComments(commentsData)
        setLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [id])

    const handleAddComment = async (text: string) => {
        if (!session?.user?.name) return

        await addComment(id, text, session.user.name)
        await fetchData()
        router.refresh()
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    if (!post) {
        return <div className="text-center py-12">Пост не найден</div>
    }

    return (
        <article className="max-w-3xl mx-auto">
            <div className="mb-12">
                <h1 className="text-4xl font-bold mb-4 text-gray-900">{post.title}</h1>
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold">
                        {post.author.charAt(0)}
                    </div>
                    <div>
                        <p className="font-medium">{post.author}</p>
                    </div>
                </div>
                <div className="prose max-w-none">
                    <p className="text-lg leading-relaxed">{post.content}</p>
                </div>
            </div>

            <section className="border-t pt-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <span className="text-pink-500"></span> Комментарии ({comments.length})
                </h2>

                <div className="space-y-6 mb-8">
                    {comments.map((comment) => (
                        <div key={comment.id} className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm">
                                {comment.author.charAt(0)}
                            </div>
                            <div className="flex-1">
                                <div className="bg-gray-100 rounded-lg p-4">
                                    <p className="font-medium text-indigo-700">{comment.author}</p>
                                    <p className="text-gray-700">{comment.text}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {session ? (
                    <form
                        onSubmit={async (e) => {
                            e.preventDefault()
                            const form = e.currentTarget
                            const formData = new FormData(form)
                            const text = formData.get('text') as string
                            if (text.trim()) {
                                await handleAddComment(text)
                                form.reset()
                            }
                        }}
                        className="mt-6"
                    >
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
    ) : (
        <div className="bg-blue-50 text-blue-800 p-4 rounded-lg">
            Войдите, чтобы оставить комментарий
        </div>
    )}
        </section>
    </article>
    )
}