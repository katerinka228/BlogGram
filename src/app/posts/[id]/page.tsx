import { Suspense } from 'react'
import Loading from '@/app/loading'
import PostContent from './PostContent'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Блог | Ваши посты',
    }
}

export default function PostPage() {
    return (
        <Suspense fallback={<Loading />}>
            <PostContent />
        </Suspense>
    )
}

export const dynamic = 'force-dynamic'