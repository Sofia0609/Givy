import { supabase } from '../lib/supabase'
import type { Video } from '../types/index'

export async function getAllVideos(): Promise<Video[]> {
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)

  return (data ?? []).map((v: any): Video => ({
    id: v.id,
    userId: v.user_id,
    matchId: v.match_id ?? null,
    url: v.URL,
    description: v.description,
    likes: v.likes ?? 0,
    teaches: v.teaches ?? '',
    wantsToLearn: v.wantsToLearn ?? ''
  }))
}