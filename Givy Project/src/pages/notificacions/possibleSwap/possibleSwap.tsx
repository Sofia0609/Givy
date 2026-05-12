import { useEffect, useState } from 'react'
import './possibleSwap.css'
import NavBar from '../../../components/navBar/navBar'
import Header from '../../../components/header/header'
import EntityCard from '../../../components/notifications/entityCard/entityCard'
import swapRequests from '../../../data/swapRequests.json'
import users from '../../../data/users.json'
import tags from '../../../data/tags.json'
import { Navigate } from 'react-router-dom'


function PossibleSwap() {


    const loggedUserData = JSON.parse(localStorage.getItem('loggeduser') || '{}')
    const userLogged = loggedUserData.id

    if (!userLogged) {
        return <Navigate to="/login" />
    }

    const [filteredSwap, setSwapRequest] = useState<typeof swapRequests>([])
    const [filteredSwapStatus, setSwapStatusUser] = useState<typeof swapRequests>([])
    const [filteredUser,setUser] = useState<any>({})

    useEffect(() => {
    
        function getUserbyID(id:string){
            const user = users.find((user)=> user.id === id)
            setUser(user)
            console.log(user)
        }

        function getSwapbyUser(user:string){

            const stored = localStorage.getItem('swapRequests')
            const allSwaps = stored ? JSON.parse(stored) : swapRequests
            const swapUser = allSwaps.filter((request)=> request.toUserId === user && request.status === "pending")
            setSwapRequest(swapUser)
        } 

        function getStatusStatusbyUser(user:string){
            const stored = localStorage.getItem('swapRequests')
            const allSwaps = stored ? JSON.parse(stored) : swapRequests
            const swapStatusUser = allSwaps.filter((swapStatus)=> swapStatus.fromUserId === user && swapStatus.status !== "pending")
            setSwapStatusUser(swapStatusUser)
        }

  getUserbyID(userLogged?.id || "u3");
  getSwapbyUser(userLogged?.id || "u3");
  getStatusStatusbyUser(userLogged?.id || "u3");
}, []);


function acceptSwap(swapId: string) {

    setSwapRequest(actualList => actualList.filter(swapRequest => swapRequest.id !== swapId))

    const stored = localStorage.getItem('swapRequests')
    const allSwaps = stored ? JSON.parse(stored) : swapRequests

    const updated = allSwaps.map(swapRequest =>
        swapRequest.id === swapId ? { ...swapRequest, status: 'accepted' } : swapRequest
    )
    localStorage.setItem('swapRequests', JSON.stringify(updated))
}

function rejectSwap(swapId: string) {

    setSwapRequest(actualList => actualList.filter(swapRequest => swapRequest.id !== swapId))

    const stored = localStorage.getItem('swapRequests')
    const allSwaps = stored ? JSON.parse(stored) : swapRequests

    const updated = allSwaps.map(swapRequest =>
        swapRequest.id === swapId ? { ...swapRequest, status: 'rejected' } : swapRequest
    )
    localStorage.setItem('swapRequests', JSON.stringify(updated))
}
  

  return (
    <><div className='swapLayout'>
      <div>
          <NavBar></NavBar>
      </div>
      <div className='swapContent'>
          <Header title='Swap?'></Header>  
          
           

          <div className='swapSectionsContainer'>
            <div className='swap'>
                <h2 className='swapTitle'>Do you wanna Swap?</h2>

                {filteredSwap.length === 0 ? (

                    <h3>You don't have any pending swap requests</h3>
                ) : (

                    filteredSwap.map((swap, key) => {


                        const fromUser = users.find(u => u.id === swap.fromUserId) 
                        const tagOffered = tags.find(tag => tag.id === swap.tagOffered)
                        const tagRequested = tags.find(tag => tag.id === swap.tagRequested)
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

                        const fromUser = users.find(u => u.id === swap.fromUserId)
                        if(swap.status === "accepted") {

                            return (
                                <EntityCard
                                    key={key}
                                    photo={fromUser?.profilePicture}
                                    name={fromUser?.username}
                                    description='Accepted'
                                />
                            )
                        }else{
                        
                            return (
                                <EntityCard
                                    key={key}
                                    photo={fromUser?.profilePicture}
                                    name={fromUser?.username}
                                    description='Rejected'
                                />
                            )
                        }
                    })
                )}

          </div>
          </div>
      </div>
    </div>
    </>
  )
}

export default PossibleSwap