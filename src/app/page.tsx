'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { getPosts, addPost, deletePost } from '@/lib/posts'
import type { Post } from '@/lib/posts'
import AuthButton from '@/components/AuthButton'

export default function HomePage() {
    const { data: session } = useSession()
    const [posts, setPosts] = useState<Post[]>([])
    const [isCreating, setIsCreating] = useState(false)
    const [newPost, setNewPost] = useState({
        title: '',
        content: ''
    })

    useEffect(() => {
        const loadPosts = async () => {
            const loadedPosts = await getPosts()
            setPosts(loadedPosts)
        }
        loadPosts()
    }, [])

    const handleAddPost = async () => {
        if (!session?.user?.name) return

        const createdPost = {
            id: Date.now().toString(),
            title: newPost.title || 'Без названия',
            content: newPost.content || 'Нет содержимого',
            author: session.user.name
        }

        setPosts([createdPost, ...posts])
        setNewPost({ title: '', content: '' })
        setIsCreating(false)

        try {
            await addPost(createdPost)
        } catch (error) {
            setPosts(posts)
            console.error('Ошибка при добавлении поста:', error)
        }
    }

    const handleDeletePost = async (postId: string) => {
        setPosts(posts.filter(post => post.id !== postId))
        try {
            await deletePost(postId)
        } catch (error) {
            setPosts(posts)
            console.error('Ошибка при удалении поста:', error)
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Последние публикации</h1>
                <div className="flex gap-4">
                    {session && (
                        <button
                            onClick={() => setIsCreating(true)}
                            className="border-[1px] border-gray-300 shadow bg-[#00FF00] text-indigo-600 px-4 py-2 rounded-lg hover:bg-[#73FE56] transition-colors"
                        >
                            + Добавить пост
                        </button>
                    )}
                    <AuthButton />
                </div>
            </div>

            {isCreating && (
                <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4">Создать новый пост</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Заголовок
                            </label>
                            <input
                                type="text"
                                value={newPost.title}
                                onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                                className="w-full p-2 border rounded-lg"
                                placeholder="Введите заголовок"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Содержимое
                            </label>
                            <textarea
                                value={newPost.content}
                                onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                                className="w-full p-2 border rounded-lg"
                                rows={4}
                                placeholder="Начните писать здесь..."
                            />
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={handleAddPost}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Опубликовать
                            </button>
                            <button
                                onClick={() => setIsCreating(false)}
                                className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Отмена
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                    <div key={post.id} className="card bg-[#F8FAD1] rounded-lg shadow-xl overflow-hidden hover:shadow-md transition-shadow">
                        <div className="p-6">
                            <h2 className="text-xl font-bold mb-2">
                                <Link href={`/posts/${post.id}`}>
                                    {post.title}
                                </Link>
                            </h2>
                            <p className="text-gray-600 mb-4 line-clamp-2">{post.content}</p>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-indigo-600">{post.author}</span>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleDeletePost(post.id)}
                                        className="text-red-600 hover:text-red-800 text-sm"
                                        aria-label="Удалить пост"
                                    >
                                        Удалить
                                    </button>
                                    <Link
                                        href={`/posts/${post.id}`}
                                        className="text-green-600 hover:underline text-sm"
                                    >
                                        Читать →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}