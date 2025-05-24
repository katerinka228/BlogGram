import { NextResponse } from "next/server";
import { addComment, getCommentsByPostId } from "@/lib/posts";

export async function POST(request: Request) {
    const { postId, text, author } = await request.json();
    const newComment = addComment(postId, text, author);
    return NextResponse.json(newComment);
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("postId");
    if (!postId) return NextResponse.json([]);

    const comments = getCommentsByPostId(postId);
    return NextResponse.json(comments);
}