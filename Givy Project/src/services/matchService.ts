import { supabase } from '../lib/supabase'
import type { Match } from '../types/index'

// Trae todos los matches de un usuario
export async function getMatchesByUser(userId: string): Promise<Match[]> {
  const { data, error } = await supabase
    .from('matches')
    .select('*')
    .or(`user1Id.eq.${userId},user2Id.eq.${userId}`)

  if (error) {
    console.error('Error fetching matches:', error)
    return []
  }

  return data as Match[]
}

// Trae un match por id
export async function getMatchById(matchId: string): Promise<Match | null> {
  const { data, error } = await supabase
    .from('matches')
    .select('*')
    .eq('id', matchId)
    .single()

  if (error) {
    console.error('Error fetching match:', error)
    return null
  }

  return data as Match
}

// Sube un video del match a Supabase Storage
export async function uploadMatchVideo(
  matchId: string,
  userId: string,
  file: File
): Promise<string> {
  const fileExt = file.name.split('.').pop()
  const filePath = `matches/${matchId}/${userId}.${fileExt}`

  const { error: uploadError } = await supabase.storage
    .from('videos')
    .upload(filePath, file, { upsert: true })

  if (uploadError) throw uploadError

  const { data } = supabase.storage
    .from('videos')
    .getPublicUrl(filePath)

  return data.publicUrl
}

// Actualiza el match cuando un usuario sube su video
export async function updateMatchVideo(
  matchId: string,
  isUser1: boolean,
  videoUrl: string
): Promise<void> {
  const changes = isUser1
    ? { videoSentByUser1: true, videoIdUser1: videoUrl }
    : { videoSentByUser2: true, videoIdUser2: videoUrl }

  const { error } = await supabase
    .from('matches')
    .update(changes)
    .eq('id', matchId)

  if (error) throw error
}

// Trae el video del otro usuario en el match
export async function getOtherUserVideo(
  matchId: string,
  userId: string
): Promise<string | null> {
  const { data, error } = await supabase
    .from('videos')
    .select('URL')
    .eq('match_id', matchId)
    .neq('user_id', userId)
    .single()

  if (error) return null
  return data.URL
}