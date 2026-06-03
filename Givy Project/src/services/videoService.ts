import { supabase } from '../lib/supabase'
import type { Video } from '../types/index'

// Trae TODOS los videos
export async function getAllVideos(): Promise<Video[]> {
  const { data, error } = await supabase
    .from('videos')
    .select('*')

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