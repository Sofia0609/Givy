import { useEffect, useState } from 'react'
import './possibleSwap.css'
import NavBar from '../../../components/navBar/navBar'
import Header from '../../../components/header/header'
import EntityCard from '../../../components/notifications/entityCard/entityCard'
import swapRequests from '../../../data/swapRequests.json'
import users from '../../../data/users.json'
import tags from '../../../data/tags.json'


function PossibleSwap() {
  const userLogged = "u1"

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
    const swapUser = swapRequests.filter((request)=> request.toUserId === user && request.status === "pending")
    console.log(swapUser )
    setSwapRequest(swapUser)
  } 

  function getStatusStatusbyUser(user:string){
    const swapStatusUser = swapRequests.filter((swapStatus)=> swapStatus.toUserId === user && swapStatus.status !== "pending")
    console.log(swapStatusUser)
    setSwapStatusUser(swapStatusUser)
  }

  getUserbyID(userLogged);
  getSwapbyUser(userLogged);
  getStatusStatusbyUser(userLogged);
}, []);


  function acceptSwap(swapId: string) {
    console.log("acepté el swap:", swapId)
  }

  function rejectSwap(swapId: string) {
    console.log("rechacé el swap:", swapId)
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
                        const tagOffered = tags.find(tag => tag.id === swap.tagOffered)
                        const tagRequested = tags.find(tag => tag.id === swap.tagRequested)
                        return (
                            <EntityCard
                                key={key}
                                photo={fromUser?.profilePicture}
                                name={fromUser?.username}
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
    </>
  )
}

export default PossibleSwap