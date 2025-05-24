import { Suspense } from 'react'
import Loading from '@/app/loading'
import PostContent from './PostContent'

export default async function PostPage({ params }: { params: { id: string } }) {
    const { id } = params

    return (
        <Suspense fallback={<Loading />}>
            <PostContent id={id} />
        </Suspense>
    )
}

export const dynamic = 'force-dynamic'