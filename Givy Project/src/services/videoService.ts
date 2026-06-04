import { supabase } from '../lib/supabase'
import type { Video } from '../types/index'

develop

// Trae TODOS los videos
feature-search
export async function getAllVideos(): Promise<Video[]> {
  const { data, error } = await supabase
    .from('videos')
    .select('*')
develop
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)

  return (data ?? []).map((v: Record<string, unknown>): Video => ({
    id: v.id as string,
    userId: v.user_id as string,
    matchId: (v.match_id as string) ?? null,
    url: v.URL as string,
    description: v.description as string,
    likes: (v.likes as number) ?? 0,
    teaches: ((v.teaches as string) ?? '').split(',').filter(Boolean),
    wantsToLearn: ((v.wants_to_learn as string) ?? '').split(',').filter(Boolean),
    thumbnail: (v.thumbnail as string) ?? null,
    title: v.title as string,
    tags: ((v.tags as string) ?? '').split(',').filter(Boolean),
    uploadDate: v.upload_date as string
  }))
}
export async function updateLike(videoId: string, newCount: number): Promise<void> {
  const { error } = await supabase
    .from('videos')
    .update({ likes: newCount })
    .eq('id', videoId)

  if (error) throw new Error(error.message)
}
 

  if (error) {
    console.error('Error fetching videos:', error)
    return []
  }

  return data as Video[]
}

// Trae videos por tag
export async function getVideosByTag(tagId: string): Promise<Video[]> {
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .contains('teaches', [tagId])

  if (error) {
    console.error('Error fetching videos by tag:', error)
    return []
  }

  return data as Video[]
}
feature-search
