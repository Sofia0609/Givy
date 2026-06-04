import { supabase } from '../lib/supabase'
import type { CommentData, ReplyData } from '../types/index'

export async function getCommentsByVideoId(videoId: string): Promise<CommentData[]> {
  const { data: comments, error } = await supabase
    .from('comments')
    .select('*')
    .eq('videoId', videoId)
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)

  const { data: replies, error: repliesError } = await supabase
    .from('replies')
    .select('*')

  if (repliesError) throw new Error(repliesError.message)

  return (comments ?? []).map((c): CommentData => ({
    id: c.id,
    videoId: c.videoId,
    userId: c.userId,
    text: c.text,
    date: c.created_at,
    replies: (replies ?? [])
      .filter(r => r.commentId === c.id)
      .map((r): ReplyData => ({
        id: r.id,
        parentCommentId: r.commentId,
        userId: r.userId,
        text: r.text,
        date: r.created_at
      }))
  }))
}