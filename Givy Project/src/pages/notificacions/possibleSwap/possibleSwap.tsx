import { useEffect, useState } from 'react'
import { Navigate } from 'react-router'
import { useSelector } from 'react-redux'
import type { RootState } from '../../../store'
import './possibleSwap.css'
import NavBar from '../../../components/navBar/navBar'
import Header from '../../../components/header/header'
import EntityCard from '../../../components/notifications/entityCard/entityCard'
import { supabase } from '../../../lib/supabase'
import tagsData from '../../../data/tags.json'

function PossibleSwap() {
  const currentUser = useSelector((state: RootState) => state.user.currentUser)
  const [filteredSwap, setSwapRequest] = useState<any[]>([])
  const [filteredSwapStatus, setSwapStatusUser] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [processingIds, setProcessingIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (!currentUser) return

    async function loadData() {
      const { data: usersData } = await supabase.from('users').select('*')
      if (usersData) setUsers(usersData)

      const { data: received } = await supabase
        .from('swapRequests')
        .select('*')
        .eq('toUserId', currentUser!.id)
        .eq('status', 'pending')
      if (received) setSwapRequest(received)

      const { data: sent } = await supabase
        .from('swapRequests')
        .select('*')
        .eq('fromUserId', currentUser!.id)
        .neq('status', 'pending')
      if (sent) setSwapStatusUser(sent)
    }

    loadData()
  }, [currentUser])

  if (!currentUser) return <Navigate to="/Login" />

  async function acceptSwap(swapId: string) {
    if (processingIds.has(swapId)) return
    setProcessingIds(prev => new Set(prev).add(swapId))

    const swap = filteredSwap.find(s => s.id === swapId)
    if (!swap) return

    setSwapRequest(prev => prev.filter(s => s.id !== swapId))

    await supabase
      .from('swapRequests')
      .update({ status: 'accepted' })
      .eq('id', swapId)

    const { error } = await supabase
      .from('matches')
      .insert({
        user1Id: swap.fromUserId,
        user2Id: swap.toUserId,
        tagOffered: swap.tagOffered,
        tagRequested: swap.tagRequested,
        videoSentByUser1: false,
        videoIdUser1: null,
        videoSentByUser2: false,
        videoIdUser2: null
      })

    if (error) {
      console.error('Error creating match:', error)
    }

    setProcessingIds(prev => {
      const next = new Set(prev)
      next.delete(swapId)
      return next
    })
  }

  async function rejectSwap(swapId: string) {
    if (processingIds.has(swapId)) return
    setProcessingIds(prev => new Set(prev).add(swapId))

    setSwapRequest(prev => prev.filter(s => s.id !== swapId))
    await supabase
      .from('swapRequests')
      .update({ status: 'rejected' })
      .eq('id', swapId)

    setProcessingIds(prev => {
      const next = new Set(prev)
      next.delete(swapId)
      return next
    })
  }

  return (
    <div className='swapLayout'>
      <div><NavBar /></div>
      <div className='swapContent'>
        <Header title='Swap?' />
        <div className='swapSectionsContainer'>
          <div className='swap'>
            <h2 className='swapTitle'>Do you wanna Swap?</h2>
            {filteredSwap.length === 0 ? (
              <h3>You don't have any pending swap requests</h3>
            ) : (
              filteredSwap.map((swap) => {
                const fromUser = users.find(u => u.id === swap.fromUserId)
                const tagOffered = tagsData.find(tag => tag.id === swap.tagOffered)
                const tagRequested = tagsData.find(tag => tag.id === swap.tagRequested)
                return (
                  <EntityCard
                    key={swap.id}
                    photo={fromUser?.profilePicture}
                    name={fromUser?.username}
                    content={tagOffered?.name}
                    content2={tagRequested?.name}
                    desicionButtons={true}
                    onAccept={() => acceptSwap(swap.id)}
                    onReject={() => rejectSwap(swap.id)}
                  />
                )
              })
            )}
          </div>

          <div className='swap'>
            <h2 className='swapTitle'>Swap Status</h2>
            {filteredSwapStatus.length === 0 ? (
              <h3>You don't have any swap requests notification</h3>
            ) : (
              filteredSwapStatus.map((swap) => {
                const fromUser = users.find(u => u.id === swap.fromUserId)
                const tagOffered = tagsData.find(tag => tag.id === swap.tagOffered)
                const tagRequested = tagsData.find(tag => tag.id === swap.tagRequested)
                return (
                  <EntityCard
                    key={swap.id}
                    photo={fromUser?.profilePicture}
                    name={`${fromUser?.username} • ${swap.status === 'accepted' ? 'Accepted' : 'Rejected'}`}
                    content={tagOffered?.name}
                    content2={tagRequested?.name}
                  />
                )
              })
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PossibleSwap