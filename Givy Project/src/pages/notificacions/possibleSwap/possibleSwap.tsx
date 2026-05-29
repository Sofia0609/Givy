import { useEffect, useState } from 'react'
import './possibleSwap.css'
import NavBar from '../../../components/navBar/navBar'
import Header from '../../../components/header/header'
import EntityCard from '../../../components/notifications/entityCard/entityCard'
import swapRequestsData from '../../../data/swapRequests.json'
import usersData from '../../../data/users.json'
import tagsData from '../../../data/tags.json'
import { Navigate } from 'react-router-dom'
import type { SwapRequest, User, Tag } from '../../../types/index'


function PossibleSwap() {

  const loggedUserData = JSON.parse(localStorage.getItem('loggeduser') || '{}')
  const userLogged = loggedUserData.id

  if (!userLogged) {
    return <Navigate to="/login" />
  }

  const [filteredSwap, setSwapRequest] = useState<SwapRequest[]>([])
  const [filteredSwapStatus, setSwapStatusUser] = useState<SwapRequest[]>([])

  useEffect(() => {
    
    function getSwapbyUser(user: string) {
      const stored = localStorage.getItem('swapRequests')
      const allSwaps: SwapRequest[] = stored ? JSON.parse(stored) : (swapRequestsData as SwapRequest[])
      const swapUser = allSwaps.filter((request) => request.toUserId === user && request.status === "pending")
      setSwapRequest(swapUser)
    } 

    function getStatusStatusbyUser(user: string) {
      const stored = localStorage.getItem('swapRequests')
      const allSwaps: SwapRequest[] = stored ? JSON.parse(stored) : (swapRequestsData as SwapRequest[])
      const swapStatusUser = allSwaps.filter((swapStatus) => swapStatus.fromUserId === user && swapStatus.status !== "pending")
      setSwapStatusUser(swapStatusUser)
    }

    getSwapbyUser(userLogged);
    getStatusStatusbyUser(userLogged);
  }, [userLogged]);

  function acceptSwap(swapId: string): void {
    setSwapRequest(actualList => actualList.filter(swapRequest => swapRequest.id !== swapId))

    const stored = localStorage.getItem('swapRequests')
    const allSwaps: SwapRequest[] = stored ? JSON.parse(stored) : (swapRequestsData as SwapRequest[])

    const updated: SwapRequest[] = allSwaps.map(swapRequest =>
      swapRequest.id === swapId ? { ...swapRequest, status: 'accepted' } : swapRequest
    )
    localStorage.setItem('swapRequests', JSON.stringify(updated))
  }

  function rejectSwap(swapId: string): void {
    setSwapRequest(actualList => actualList.filter(swapRequest => swapRequest.id !== swapId))

    const stored = localStorage.getItem('swapRequests')
    const allSwaps: SwapRequest[] = stored ? JSON.parse(stored) : (swapRequestsData as SwapRequest[])

    const updated: SwapRequest[] = allSwaps.map(swapRequest =>
      swapRequest.id === swapId ? { ...swapRequest, status: 'rejected' } : swapRequest
    )
    localStorage.setItem('swapRequests', JSON.stringify(updated))
  }

  return (
    <div className='swapLayout'>
      <div>
        <NavBar />
      </div>
      <div className='swapContent'>
        <Header title='Swap?' />  

        <div className='swapSectionsContainer'>
          <div className='swap'>
            <h2 className='swapTitle'>Do you wanna Swap?</h2>

            {filteredSwap.length === 0 ? (
              <h3>You don't have any pending swap requests</h3>
            ) : (
              filteredSwap.map((swap, key) => {
                const fromUser = (usersData as User[]).find(u => u.id === swap.fromUserId) 
                const tagOffered = (tagsData as Tag[]).find(tag => tag.id === swap.tagOffered)
                const tagRequested = (tagsData as Tag[]).find(tag => tag.id === swap.tagRequested)
                return (
                  <EntityCard
                    key={key}
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
                filteredSwapStatus.map((swap, key) => {
                    const fromUser = (usersData as User[]).find(u => u.id === swap.fromUserId)
                    const tagOffered = (tagsData as Tag[]).find(tag => tag.id === swap.tagOffered)
                    const tagRequested = (tagsData as Tag[]).find(tag => tag.id === swap.tagRequested)
                    
                    return (
                        <EntityCard
                        key={key}
                        photo={fromUser?.profilePicture}
                        name={`${fromUser?.username} • ${swap.status === "accepted" ? 'Accepted' : 'Rejected'}`}
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
