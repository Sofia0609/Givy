import { supabase } from '../lib/supabase'
import type { User } from '../types/index'

// Trae UN usuario por su id
export async function getUserById(id: string): Promise<User | any> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching user:', error)
    return error.message
  }

  return data as User
}

// Trae TODOS los usuarios
export async function getAllUsers(): Promise<User[]> {
  const { data, error } = await supabase
    .from('users')
    .select('*')

  if (error) {
    console.error('Error fetching users:', error)
    return []
  }

  return data as User[]
}

// Trae los videos de un usuario
export async function getVideosByUserId(userId: string) {
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching videos:', error)
    return []
  }

  return data
}

// Actualiza datos del usuario
export async function updateUser(id: string, changes: Partial<User>): Promise<User> {
  const { data, error } = await supabase
    .from('users')
    .update(changes)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as User
}

// Seguir a un usuario
export async function followUser(followerId: string, targetId: string) {
  const follower = await getUserById(followerId)
  const target = await getUserById(targetId)

  await supabase.from('users').update({ following: follower.following + 1 }).eq('id', followerId)
  await supabase.from('users').update({ followers: target.followers + 1 }).eq('id', targetId)
}

// Dejar de seguir a un usuario
export async function unfollowUser(followerId: string, targetId: string) {
  const follower = await getUserById(followerId)
  const target = await getUserById(targetId)

  await supabase.from('users').update({ following: follower.following - 1 }).eq('id', followerId)
  await supabase.from('users').update({ followers: target.followers - 1 }).eq('id', targetId)
}

export async function uploadAvatar(userId: string, file: File): Promise<string> {
  const fileExt = file.name.split('.').pop()
  const filePath = `${userId}.${fileExt}`

  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(filePath, file, { upsert: true })

  if (uploadError) throw uploadError

  const { data } = supabase.storage
    .from('avatars')
    .getPublicUrl(filePath)

  await updateUser(userId, { profilePicture: data.publicUrl })

  return data.publicUrl
}