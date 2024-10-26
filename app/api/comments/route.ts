// app/api/comments/route.ts
import { NextResponse } from  'next/server'

let comments: { [key: string]: string[] } = {}

export async function POST(request: Request) {
  const { videoId, comment } = await request.json()
  
  if (!comments[videoId]) {
    comments[videoId] = []
  }
  
  comments[videoId].push(comment)
  
  return NextResponse.json({ success: true, comments: comments[videoId] })
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const videoId = searchParams.get('videoId')
  
  if (!videoId) {
    return NextResponse.json({ error: 'Video ID is required' }, { status: 400 })
  }
  
  return NextResponse.json({ comments: comments[videoId] || [] })
}

