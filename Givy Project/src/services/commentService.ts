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

export async function addComment(videoId: string, userId: string, text: string): Promise<CommentData> {
  const { data, error } = await supabase
    .from('comments')
    .insert({ videoId, userId, text })
    .select()
    .single()

  if (error) throw new Error(error.message)

  return {
    id: data.id,
    videoId: data.videoId,
    userId: data.userId,
    text: data.text,
    date: data.created_at,
    replies: [],
    isOwn: true
  }
}

export async function deleteComment(commentId: string): Promise<void> {
  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', commentId)

  if (error) throw new Error(error.message)
}

export async function addReply(commentId: string, userId: string, text: string): Promise<ReplyData> {
  const { data, error } = await supabase
    .from('replies')
    .insert({ commentId, userId, text })
    .select()
    .single()

  if (error) throw new Error(error.message)

  return {
    id: data.id,
    parentCommentId: data.commentId,
    userId: data.userId,
    text: data.text,
    date: data.created_at
  }
}

export async function deleteReply(replyId: string): Promise<void> {
  const { error } = await supabase
    .from('replies')
    .delete()
    .eq('id', replyId)

  if (error) throw new Error(error.message)
}