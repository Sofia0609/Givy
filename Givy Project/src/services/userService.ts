import { supabase } from '../lib/supabase'
import type { User } from '../types/index'

// Trae UN usuario por su id
export async function getUserById(id: string): Promise<User | any> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single()//data.users[0]
  
  if (error) {
    console.error('Error fetching user:', error)
    return error.message
  }
  
  return data as User
}

// Trae TODOS los usuarios (útil para listas)
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

//Usuario Loogeado

export async function loginUser(email: string, password: string) {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
    })

    if (authError) throw new Error(authError.message)
    if (!authData.user) throw new Error('Could not log in')

    const { data: profileData, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', authData.user.id)
        .single()

    if (profileError) throw new Error(profileError.message)

    return profileData
}

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

export async function followUser(followerId: string, targetId: string) {
  const follower = await getUserById(followerId)
  const target = await getUserById(targetId)

  await supabase.from('users').update({ following: follower.following + 1 }).eq('id', followerId)
  await supabase.from('users').update({ followers: target.followers + 1 }).eq('id', targetId)
}

export async function unfollowUser(followerId: string, targetId: string) {
  const follower = await getUserById(followerId)
  const target = await getUserById(targetId)

  await supabase.from('users').update({ following: follower.following - 1 }).eq('id', followerId)
  await supabase.from('users').update({ followers: target.followers - 1 }).eq('id', targetId)
}