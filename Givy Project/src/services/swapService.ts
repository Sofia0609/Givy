import { supabase } from '../lib/supabase'
import type { SwapRequest } from '../types/index'

export async function createSwapRequest(
  fromUserId: string,
  toUserId: string,
  tagOffered: string,
  tagRequested: string
): Promise<SwapRequest> {
  const { data, error } = await supabase
    .from('swapRequests')
    .insert({
      id: crypto.randomUUID(),  
      fromUserId,
      toUserId,
      status: 'pending',
      tagOffered,
      tagRequested
    })
    .select()
    .single()

  if (error) throw new Error(error.message)

  return {
    id: data.id,
    fromUserId: data.fromUserId,
    toUserId: data.toUserId,
    status: data.status,
    tagOffered: data.tagOffered,
    tagRequested: data.tagRequested,
    date: data.created_at
  }
}