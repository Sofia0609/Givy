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